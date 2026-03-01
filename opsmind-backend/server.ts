import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Asset from './Asset'; // ✅ Import the model from the separate file

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. DATABASE CONNECTION
const MONGO_URI = 'mongodb://localhost:27017/opsmind_assets';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err: any) => console.error('❌ MongoDB Connection Error:', err));

// --- DATA CONSTANTS ---
const BUILDINGS = [
  'Central Warehouse', 'Main Building', 'K Building', 
  'N Building', 'S Building', 'R Building', 'Pharmacy Building'
];

const DEPARTMENTS = [
  'Computer Science', 'Engineering', 'Architecture', 'Business', 
  'Mass Comm', 'Alsun', 'Pharmacy', 'Dentistry', 'Unassigned'
];

const ASSET_TYPES = [
  // IT & Computing
  { value: 'laptop', label: 'Laptop', category: 'IT & Computing' },
  { value: 'desktop', label: 'Desktop PC', category: 'IT & Computing' },
  { value: 'monitor', label: 'Monitor', category: 'IT & Computing' },
  { value: 'server', label: 'Server', category: 'IT & Computing' },
  { value: 'tablet', label: 'Tablet / iPad', category: 'IT & Computing' },
  { value: 'peripheral', label: 'Peripheral (Keyboard/Mouse)', category: 'IT & Computing' },
  
  // AV & Classroom
  { value: 'projector', label: 'Projector', category: 'AV & Classroom' },
  { value: 'smartboard', label: 'Smartboard', category: 'AV & Classroom' },
  { value: 'camera', label: 'Camera', category: 'AV & Classroom' },
  { value: 'microphone', label: 'Microphone', category: 'AV & Classroom' },
  { value: 'speaker', label: 'Speaker System', category: 'AV & Classroom' },

  // Networking
  { value: 'router', label: 'Router', category: 'Networking' },
  { value: 'switch', label: 'Network Switch', category: 'Networking' },
  { value: 'access_point', label: 'Access Point (WiFi)', category: 'Networking' },
  
  // Office & Furniture
  { value: 'printer', label: 'Printer', category: 'Office & Furniture' },
  { value: 'scanner', label: 'Scanner', category: 'Office & Furniture' },
  { value: 'desk', label: 'Desk', category: 'Office & Furniture' },
  { value: 'chair', label: 'Chair', category: 'Office & Furniture' },
  
  // Facilities
  { value: 'vehicle', label: 'University Vehicle', category: 'Facilities' },
  { value: 'generator', label: 'Generator', category: 'Facilities' },
  { value: 'hvac', label: 'HVAC Unit', category: 'Facilities' }
];

// --- ROUTES ---

// 0. GET CONFIG
app.get('/api/config', (req: Request, res: Response) => {
  res.json({
    buildings: BUILDINGS,
    departments: DEPARTMENTS,
    assetTypes: ASSET_TYPES
  });
});

// 1. GET ALL ASSETS
app.get('/api/assets', async (req: Request, res: Response) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });
    res.json(assets); 
  } catch (err) { res.status(500).json({ error: 'Failed to fetch assets' }); }
});

// 2. CREATE ASSET (Updated for Quantity)
app.post('/api/assets', async (req: Request, res: Response) => {
  try {
    // ✅ Receive quantity from frontend
    const { name, type, value, customId, location, department, quantity } = req.body;
    
    const newAsset = await Asset.create({
      customId, name, type, value,
      location: location || 'Central Warehouse',
      department: department || 'Unassigned',
      quantity: quantity || 1, // ✅ Default to 1
      history: [{ 
        event: 'Created', 
        details: `Received batch of ${quantity || 1} at ${location || 'Central Warehouse'}`, 
        date: new Date() 
      }]
    });
    res.json(newAsset);
  } catch (error: any) {
    if (error.code === 11000) {
        return res.status(400).json({ message: "Asset ID already exists" });
    }
    res.status(500).json({ message: error.message });
  }
});

// 3. TRANSFER ASSET (Updated for Split/Distribution Logic)
app.patch('/api/assets/:id/transfer', async (req: Request, res: Response) => {
  const { newLocation, quantityToMove } = req.body; 

  try {
    const asset = await Asset.findOne({ customId: req.params.id });
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    // ✅ Determine how much to move
    const moveQty = Number(quantityToMove) || asset.quantity; 

    // VALIDATION
    if (moveQty > asset.quantity) {
      return res.status(400).json({ message: "Not enough quantity to transfer." });
    }

    // SCENARIO 1: Moving the ENTIRE batch (No split needed)
    if (moveQty === asset.quantity) {
      asset.history.push({ 
        event: 'Transfer', 
        details: `Moved entire batch (${moveQty}) from ${asset.location} to ${newLocation}`, 
        date: new Date() 
      });
      asset.location = newLocation;
      await asset.save();
      console.log(`[EVENT] Moved All: ${asset.customId} to ${newLocation}`);
      return res.json(asset);
    }

    // SCENARIO 2: PARTIAL TRANSFER (Splitting the batch)
    
    // A. Decrease original location quantity
    asset.quantity -= moveQty;
    asset.history.push({
      event: 'Distributed',
      details: `Split batch. Sent ${moveQty} items to ${newLocation}. Remaining here: ${asset.quantity}`,
      date: new Date()
    });
    await asset.save(); // Save the "Source" asset with reduced quantity

    // B. Create NEW batch at destination
    // We append a random 4-digit code to the ID to ensure uniqueness
    const newSplitId = `${asset.customId}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBatch = await Asset.create({
      customId: newSplitId,
      name: asset.name,
      type: asset.type,
      value: asset.value,
      location: newLocation,        // The NEW location
      department: asset.department, // Keep same department
      quantity: moveQty,            // The amount we moved
      status: asset.status,
      history: [{
        event: 'Received_Distribution',
        details: `Received ${moveQty} items from split of ${asset.customId}`,
        date: new Date()
      }]
    });

    console.log(`[EVENT] Distributed: ${moveQty} moved to ${newLocation}. New ID: ${newSplitId}`);
    
    // Return both so frontend can update state if needed
    res.json({ original: asset, newBatch });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Transfer failed" });
  }
});

// 4. DELETE ASSET (✅ UPDATED: PERMANENT DELETE BY DB ID)
app.delete('/api/assets/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Use findByIdAndDelete (requires the MongoDB _id)
    const deletedAsset = await Asset.findByIdAndDelete(id);

    if (!deletedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.json({ success: true, message: 'Permanently deleted' });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// 5. ASSIGN USER
app.post('/api/assets/:id/assign', async (req: Request, res: Response) => {
  const { userId } = req.body;
  const asset = await Asset.findOne({ customId: req.params.id });
  
  if (!asset) return res.status(404).json({ message: "Asset not found" });

  asset.assignedUser = userId;
  asset.status = 'assigned';
  asset.history.push({ 
      event: 'AssetAssigned', 
      details: `Assigned to user ${userId}`, 
      date: new Date() 
  });

  await asset.save();
  res.json(asset);
});

// 6. REPORT FAULT
app.post('/api/assets/:id/tickets', async (req: Request, res: Response) => {
  const { ticketId, reason } = req.body;
  const asset = await Asset.findOne({ customId: req.params.id });

  if (!asset) return res.status(404).json({ message: "Asset not found" });

  asset.tickets.push(ticketId);
  asset.status = 'repair';
  asset.history.push({ 
      event: 'AssetFaultReported', 
      details: `Ticket ${ticketId}: ${reason}`, 
      date: new Date() 
  });

  await asset.save();
  res.json(asset);
});

// 7. UPDATE STATUS
app.patch('/api/assets/:id/status', async (req: Request, res: Response) => {
    const { status } = req.body;
    await Asset.findOneAndUpdate({ customId: req.params.id }, { status });
    res.json({ success: true });
});

// 8. UPDATE DETAILS (✅ UPDATED to allow Quantity changes)
app.patch('/api/assets/:id/details', async (req: Request, res: Response) => {
  // 1. WE ADD 'quantity' HERE so we can read it
  const { name, type, department, quantity } = req.body;
  
  try {
    const asset = await Asset.findOne({ customId: req.params.id });
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    asset.name = name;
    asset.type = type;
    asset.department = department;

    // 2. WE ADD THIS CHECK: If quantity is sent, update it
    if (quantity !== undefined && quantity !== null) {
        asset.quantity = Number(quantity);
    }

    asset.history.push({ 
        event: 'InfoUpdate', 
        details: `Details updated. Dept: ${department}. Quantity: ${asset.quantity}`, 
        date: new Date() 
    });

    await asset.save();
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Asset Service running on http://localhost:${PORT}`);
});