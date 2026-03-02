// src/types/contracts.ts

// 1. Define specific allowed values for Status
export type AssetStatus = 'active' | 'repair' | 'retired' | 'assigned' | 'maintenance';

// ✅ UPDATED: Comprehensive University Asset Types
export type AssetType = 
  // IT & Computing
  | 'laptop' | 'desktop' | 'tablet' | 'server' | 'monitor' | 'peripheral'
  // AV & Classroom
  | 'projector' | 'smartboard' | 'camera' | 'speaker' | 'microphone'
  // Networking
  | 'router' | 'switch' | 'access_point' | 'firewall'
  // Office & Furniture
  | 'printer' | 'scanner' | 'desk' | 'chair' | 'whiteboard' | 'filing_cabinet'
  // Lab & Research
  | 'microscope' | 'centrifuge' | 'oscilloscope' | '3d_printer' | 'lab_bench'
  // Facilities
  | 'vehicle' | 'generator' | 'hvac' | 'maintenance_tool';

// 2. Define Locations and Departments
export type LocationType = 'Central Warehouse' | 'Main Building' | 'K Building' | 'N Building' | 'S Building' | 'R Building' | 'Pharmacy Building';
export type DepartmentType = 'Computer Science' | 'Engineering' | 'Architecture' | 'Business' | 'Mass Comm' | 'Alsun' | 'Pharmacy' | 'Dentistry' | 'Unassigned';

// 3. Define the History structure
export interface AssetHistory {
    // ✅ Added 'Transfer', 'InfoUpdate', 'Distributed', and 'Received_Distribution'
    event: 'AssetAssigned' | 'AssetFaultReported' | 'Created' | 'StatusChange' | 'Transfer' | 'InfoUpdate' | 'Distributed' | 'Received_Distribution';
    details: string;
    date: string | Date; // ✅ Allow Date objects too (often returned by Mongoose)
}

// 4. Main Asset Interface
export interface Asset {
    customId: string;
    name: string;
    
    // We allow 'string' here to act as a fallback, but IDEs will suggest the types above
    type: AssetType | string; 
    
    status: AssetStatus;
    value: number;

    // ✅ NEW: Added Quantity Field
    quantity: number;
    
    // ✅ Mandatory Location/Department fields
    location: LocationType;
    department: DepartmentType;
    
    // Optional fields
    assignedUser?: string; // Note: Changed to assignedUser to match your server code, was assignedTo?
    tickets?: string[];
    history?: AssetHistory[];
    
    // Optional timestamps
    createdAt?: string;
    updatedAt?: string;
}