import { useEffect, useState } from 'react';
import { AssetService } from '../../services/assetService';
import { ConfigService, type AppConfig } from '../../services/configService';
import type { Asset, AssetType, DepartmentType } from '../../types/contracts';
import TransferAssetModal from '../../components/TransferAssetModal.tsx';

export function AssetPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  // --- CONFIG STATE ---
  const [config, setConfig] = useState<AppConfig>({
    buildings: [],
    departments: [],
    assetTypes: []
  });
  
  // --- FILTER STATE ---
  const [viewLocation, setViewLocation] = useState<string>('All'); 
  const [viewDepartment, setViewDepartment] = useState<string>('All');

  // --- MODAL VISIBILITY STATES ---
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedAssetHistory, setSelectedAssetHistory] = useState<Asset | null>(null);
  const [assetToTransfer, setAssetToTransfer] = useState<Asset | null>(null);

  // DELETE MODAL STATE
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    asset: Asset | null;
  }>({ isOpen: false, asset: null });

  // EDIT MODAL STATE
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    assetId: string | null;
    name: string;
    type: string;
    department: DepartmentType;
  }>({ isOpen: false, assetId: null, name: '', type: 'laptop', department: 'Unassigned' });

  // ASSIGN MODAL STATE
  const [assignModal, setAssignModal] = useState<{
    isOpen: boolean;
    assetId: string | null;
    assetName: string;
    currentUser: string;
    maxQuantity: number;      
    assignQuantity: number;   
    currentLocation: string;  
  }>({ isOpen: false, assetId: null, assetName: '', currentUser: '', maxQuantity: 1, assignQuantity: 1, currentLocation: '' });
  
  // CREATE ASSET STATE
  const [newAsset, setNewAsset] = useState<{
    customId: string; name: string; type: AssetType | string; department: DepartmentType; quantity: number;
  }>({ customId: '', name: '', type: 'laptop', department: 'Unassigned', quantity: 1 });

  // --- INITIAL DATA LOADING ---
  useEffect(() => {
    const initData = async () => {
      try {
        const [assetsData, configData] = await Promise.all([
          AssetService.getAll(),
          ConfigService.getConfig()
        ]);
        setAssets(assetsData);
        setConfig(configData);
      } catch (error) { console.error("Failed to load initial data", error); } 
      finally { setLoading(false); }
    };
    initData();
  }, []);

  const loadAssets = async () => {
    try { setAssets(await AssetService.getAll()); } 
    catch (error) { console.error("Failed to load assets", error); } 
  };

  const renderAssetTypeOptions = () => {
    const categories = Array.from(new Set(config.assetTypes.map(a => a.category)));
    return categories.map(category => (
      <optgroup key={category} label={category}>
        {config.assetTypes.filter(type => type.category === category).map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
        ))}
      </optgroup>
    ));
  };

  // --- HANDLERS ---
  const handleCreate = async () => {
    if (!newAsset.customId || !newAsset.name) return alert("Please fill in ID and Name");
    try {
      await AssetService.createAsset(newAsset);
      setShowCreateForm(false);
      setNewAsset({ customId: '', name: '', type: 'laptop', department: 'Unassigned', quantity: 1 }); 
      loadAssets(); 
    } catch (error) { alert("Error creating asset. ID might be duplicate."); }
  };

  const openEditModal = (asset: Asset) => {
    setEditModal({
      isOpen: true, assetId: asset.customId, name: asset.name, type: asset.type, department: asset.department as DepartmentType
    });
  };

  const handleEditSubmit = async () => {
    if (!editModal.assetId) return;
    try {
      await AssetService.updateAssetDetails(editModal.assetId, {
        name: editModal.name, type: editModal.type, department: editModal.department
      });
      setEditModal({ ...editModal, isOpen: false });
      loadAssets(); 
    } catch (error) { alert("Failed to update asset details"); }
  };

  const handleTransferSubmit = async (newLocation: string, quantityToMove: number) => {
    if (!assetToTransfer) return;
    await AssetService.transferAsset(assetToTransfer.customId, newLocation, quantityToMove);
    setAssetToTransfer(null); 
    loadAssets(); 
  };

  // DELETE LOGIC
  const openDeleteModal = (asset: Asset) => setDeleteModal({ isOpen: true, asset });
  
  const confirmRetireOne = async () => {
    if (!deleteModal.asset) return;
    try {
      // Logic: Update quantity to -1
      await AssetService.updateAssetDetails(deleteModal.asset.customId, {
        ...deleteModal.asset, quantity: (deleteModal.asset.quantity || 1) - 1 
      }); 
      setDeleteModal({ isOpen: false, asset: null });
      loadAssets();
    } catch (error) { alert("Failed to update quantity."); }
  };

  // --- HARD DELETE FUNCTION (PERMANENT DB DELETE) ---
  const confirmDeleteAll = async () => {
    if (!deleteModal.asset) return;

    // 1. We grab the ACTUAL database ID (usually _id in Mongo), not the custom string ID
    // We cast to 'any' because strict Typescript might not see the _id field
    const dbId = (deleteModal.asset as any)._id;

    if (!dbId) {
      alert("Error: Could not find the Database ID (_id) for this asset. Cannot delete.");
      return;
    }

    try {
      console.log(`Sending PERMANENT DELETE request for DB ID: ${dbId}`);
      
      // 2. Send the Request using the DB ID
      await AssetService.deleteAsset(dbId);
      
      // 3. Close and Reload
      setDeleteModal({ isOpen: false, asset: null });
      loadAssets(); 
      
    } catch (error) { 
      console.error("Delete failed:", error);
      alert(`Failed to delete. The server responded with an error.`); 
    }
  };

  // ASSIGN LOGIC
  const openAssignModal = (asset: Asset) => {
    setAssignModal({
      isOpen: true, assetId: asset.customId, assetName: asset.name, currentUser: asset.assignedUser || '',
      maxQuantity: asset.quantity || 1, assignQuantity: 1, currentLocation: asset.location   
    });
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!assignModal.assetId || !assignModal.currentUser) return;
    try {
      let targetAssetId = assignModal.assetId;
      if (assignModal.assignQuantity < assignModal.maxQuantity) {
        const splitResult = await AssetService.transferAsset(
          assignModal.assetId, assignModal.currentLocation, assignModal.assignQuantity
        );
        if (splitResult && (splitResult as any).customId) targetAssetId = (splitResult as any).customId;
      }
      await AssetService.assignToUser(targetAssetId, assignModal.currentUser);
      setAssignModal({ ...assignModal, isOpen: false }); 
      loadAssets(); 
    } catch (error) { alert("Failed to assign user."); }
  };

  const handleReturn = async (asset: Asset) => {
    if (window.confirm(`Confirm return of ${asset.name} from ${asset.assignedUser}?`)) {
      try { await AssetService.unassignAsset(asset.customId); loadAssets(); } 
      catch (error) { alert("Failed to return asset."); }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'repair': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // --- HELPER FOR HISTORY COLORS ---
  const getHistoryColor = (event: string) => {
    if (event === 'AssetAssigned') return 'bg-indigo-500'; 
    if (event === 'Created') return 'bg-green-500';
    if (event === 'StatusChange' || event === 'Distributed') return 'bg-orange-500'; 
    if (event === 'AssetFaultReported') return 'bg-red-500';
    return 'bg-blue-500'; 
  };

  const filteredAssets = assets.filter(asset => {
    const matchLocation = viewLocation === 'All' || asset.location === viewLocation;
    const matchDepartment = viewDepartment === 'All' || asset.department === viewDepartment;
    return matchLocation && matchDepartment;
  });

  if (loading) return <div className="p-6">Loading inventory system...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">University Inventory</h1>
          <p className="text-gray-500 text-sm">Manage assets across Buildings & Departments</p>
        </div>
        
        {/* FILTERS & CREATE BUTTON */}
        <div className="flex flex-wrap gap-3">
          <select 
            className="border border-gray-300 p-2 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white" 
            value={viewLocation} onChange={(e) => setViewLocation(e.target.value)}
          >
            <option value="All">📍 All Buildings</option>
            {config.buildings.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select 
            className="border border-gray-300 p-2 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white" 
            value={viewDepartment} onChange={(e) => setViewDepartment(e.target.value)}
          >
            <option value="All">🎓 All Departments</option>
            {config.departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition shadow-sm text-sm font-bold"
          >
            {showCreateForm ? 'Cancel' : '+ Receive Order'}
          </button>
        </div>
      </div>

      {/* CREATE FORM */}
      {showCreateForm && (
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-blue-900">Receive New Order (Central Warehouse)</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-blue-800 mb-1">Asset ID</label>
              <input placeholder="e.g. PC-101" className="w-full border p-2 rounded" 
                value={newAsset.customId} onChange={e => setNewAsset({...newAsset, customId: e.target.value})} />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-blue-800 mb-1">Device Name</label>
              <input placeholder="Name" className="w-full border p-2 rounded" 
                value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-blue-800 mb-1">Type</label>
              <select className="w-full border p-2 rounded" value={newAsset.type} onChange={e => setNewAsset({...newAsset, type: e.target.value})}>
                {renderAssetTypeOptions()}
              </select>
            </div>
            <div className="md:col-span-1">
               <label className="block text-xs font-bold text-blue-800 mb-1">Quantity</label>
               <input type="number" min="1" className="w-full border p-2 rounded" 
                 value={newAsset.quantity} onChange={e => setNewAsset({...newAsset, quantity: parseInt(e.target.value) || 1})} />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-blue-800 mb-1">Department</label>
              <select className="w-full border p-2 rounded" value={newAsset.department} onChange={e => setNewAsset({...newAsset, department: e.target.value as DepartmentType})}>
                {config.departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium shadow-sm h-10">Receive</button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Dept</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssets.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400 italic">No assets found in this view.</td></tr>
            ) : filteredAssets.map((asset) => (
              <tr key={asset.customId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{asset.name}</div>
                  <div className="text-xs text-indigo-600 font-mono">{asset.customId}</div>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1 rounded border mt-1 inline-block">{asset.type}</span>
                </td>
                <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold text-gray-800">{asset.quantity || 1}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className={`w-fit px-2 py-1 text-xs rounded-full border ${
                      asset.location === 'Central Warehouse' ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {asset.location}
                    </span>
                    {asset.assignedUser && (
                      <span className="mt-1 text-xs text-blue-600 font-semibold">👤 {asset.assignedUser}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">{asset.department}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                    {asset.status ? asset.status.toUpperCase() : 'UNKNOWN'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                    <button onClick={() => openEditModal(asset)} className="text-blue-600 hover:text-blue-900 hover:underline">Edit</button>
                    <button onClick={() => setAssetToTransfer(asset)} className="text-orange-600 hover:text-orange-900 font-bold hover:underline">Transfer</button>
                    <button onClick={() => setSelectedAssetHistory(asset)} className="text-gray-600 hover:text-black hover:underline">History</button>
                  {asset.status === 'assigned' ? (
                    <button onClick={() => handleReturn(asset)} className="text-amber-600 hover:text-amber-900 hover:underline">Return</button>
                  ) : (
                    <button onClick={() => openAssignModal(asset)} className="text-indigo-600 hover:text-indigo-900 hover:underline">Assign</button>
                  )}
                  <button onClick={() => openDeleteModal(asset)} className="text-red-600 hover:text-red-900 hover:underline">Retire</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================================================================
          MODALS SECTION
      ========================================================================= */}

      {/* 1. DELETE / RETIRE MODAL (RED) */}
      {deleteModal.isOpen && deleteModal.asset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
             <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-10 sm:w-10 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
             </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Retire {deleteModal.asset.name}?</h3>
            <p className="text-sm text-gray-500 mb-6">Current Quantity: <span className="font-bold text-gray-900">{deleteModal.asset.quantity || 1}</span></p>
            <div className="flex flex-col gap-3">
              {(deleteModal.asset.quantity || 1) > 1 && (
                <button onClick={confirmRetireOne} className="w-full bg-blue-50 text-blue-700 py-2 rounded-md hover:bg-blue-100 font-semibold border border-blue-200">
                  Retire 1 Unit Only
                </button>
              )}
              <button onClick={confirmDeleteAll} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 font-bold shadow-sm">
                ⚠️ Permanently Delete Asset
              </button>
              <button onClick={() => setDeleteModal({ isOpen: false, asset: null })} className="w-full text-gray-500 py-2 hover:text-gray-700 text-sm mt-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. EDIT MODAL (BLUE) */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Edit Details</h3>
                <p className="text-xs text-gray-500">Updating ID: {editModal.assetId}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
                <input className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={editModal.name} onChange={(e) => setEditModal({...editModal, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                  value={editModal.type} onChange={(e) => setEditModal({...editModal, type: e.target.value})}>
                  {renderAssetTypeOptions()}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Owner</label>
                <select className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                  value={editModal.department} onChange={(e) => setEditModal({...editModal, department: e.target.value as DepartmentType})}>
                  {config.departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditModal({...editModal, isOpen: false})} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition text-sm font-medium">Cancel</button>
              <button onClick={handleEditSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm text-sm font-bold">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. ASSIGN USER MODAL (INDIGO) */}
      {assignModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Assign Asset</h3>
                <p className="text-xs text-gray-500">Checkout: <span className="font-semibold">{assignModal.assetName}</span></p>
              </div>
            </div>
            
            <form onSubmit={handleAssignSubmit}>
              {assignModal.maxQuantity > 1 && (
                <div className="mb-4 p-3 bg-indigo-50 border border-indigo-100 rounded-md">
                  <label className="block text-xs font-bold text-indigo-800 mb-1">Quantity to Assign (Available: {assignModal.maxQuantity})</label>
                  <div className="flex items-center gap-2">
                    <input type="number" min="1" max={assignModal.maxQuantity} 
                      className="w-20 border border-gray-300 p-1 rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
                      value={assignModal.assignQuantity} onChange={(e) => setAssignModal({...assignModal, assignQuantity: parseInt(e.target.value) || 1})} />
                    <span className="text-xs text-indigo-700 font-medium">{assignModal.assignQuantity < assignModal.maxQuantity ? "(Will split row)" : "(Assigning all)"}</span>
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign to User / Student</label>
                <input type="text" autoFocus placeholder="Enter full name or ID..." 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                  value={assignModal.currentUser} onChange={(e) => setAssignModal({...assignModal, currentUser: e.target.value})} />
              </div>
              
              <p className="text-xs text-gray-400 mt-2 mb-6">This action will log the checkout time and user.</p>
              
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setAssignModal({...assignModal, isOpen: false})} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition text-sm font-medium">Cancel</button>
                <button type="submit" disabled={!assignModal.currentUser.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition shadow-sm text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">Confirm Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. HISTORY MODAL (GRAY/SLATE) */}
      {selectedAssetHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                 <div className="bg-slate-100 p-2 rounded-full">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-gray-900">Audit History</h3>
                    <p className="text-xs text-gray-500">Logs for: {selectedAssetHistory.name}</p>
                 </div>
              </div>
              <button onClick={() => setSelectedAssetHistory(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            
            <div className="border-t border-gray-100 mt-2 pt-4 max-h-96 overflow-y-auto pr-2">
              {!selectedAssetHistory.history || selectedAssetHistory.history.length === 0 ? (
                <p className="text-gray-400 italic text-center py-4">No history recorded yet.</p>
              ) : (
                <ul className="space-y-4">
                  {selectedAssetHistory.history.slice().reverse().map((log, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-24 text-xs text-gray-500 text-right pt-1">
                        {new Date(log.date).toLocaleDateString()}<br/>
                        {new Date(log.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                      <div className="relative pb-4 border-l-2 border-gray-200 pl-4 last:border-0 last:pb-0">
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${getHistoryColor(log.event as string)}`} />
                        <p className="text-sm font-bold text-gray-900">{log.event}</p>
                        <p className="text-xs text-gray-600 mt-1">{log.details}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
             <div className="mt-6 text-right">
                <button onClick={() => setSelectedAssetHistory(null)} className="text-xs text-gray-500 hover:text-gray-800 underline">Close Log</button>
             </div>
          </div>
        </div>
      )}

      {/* 5. TRANSFER MODAL (ORANGE) */}
      <TransferAssetModal 
        isOpen={!!assetToTransfer} asset={assetToTransfer} locations={config.buildings}
        onClose={() => setAssetToTransfer(null)} onConfirm={handleTransferSubmit}
      />
    </div>
  );
}