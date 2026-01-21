import { api } from './api';
import type { Asset, AssetStatus } from '../types/contracts';

export const AssetService = {
    // 1. Get All Assets
    getAll: async (): Promise<Asset[]> => {
        try {
            const response = await api.get<Asset[]>('/assets');
            return response.data;
        } catch (err) {
            console.error("Backend unreachable. Is the server running?", err);
            return [];
        }
    },

    // 2. Create Asset
    createAsset: async (assetData: Partial<Asset>) => {
        const response = await api.post<Asset>('/assets', assetData);
        return response.data;
    },

    // 3. Delete Asset (Permanently)
    // Note: 'id' here must be the MongoDB _id, NOT the customId
    deleteAsset: async (id: string) => {
        await api.delete(`/assets/${id}`);
        return true;
    },

    // 4. Report Fault (Link Ticket)
    linkToTicket: async (assetId: string, ticketId: string, reason: string) => {
        await api.post(`/assets/${assetId}/tickets`, { ticketId, reason });
        return true;
    },

    // 5. Assign User
    assignToUser: async (assetId: string, userId: string) => {
        await api.post(`/assets/${assetId}/assign`, { userId });
        return true;
    },

    // 6. Update Status
    updateStatus: async (assetId: string, newStatus: AssetStatus) => {
        await api.patch(`/assets/${assetId}/status`, { status: newStatus });
        return true;
    },

    // 7. Transfer Asset
    transferAsset: async (id: string, newLocation: string, quantityToMove: number) => {
        const response = await api.patch(`/assets/${id}/transfer`, { 
            newLocation, 
            quantityToMove 
        });
        return response.data;
    },

    // 8. Update Asset Details (✅ UPDATED TYPE)
    // Changed to Partial<Asset> so it accepts the full object during 'Retire One'
    updateAssetDetails: async (id: string, details: Partial<Asset>) => {
        const response = await api.patch(`/assets/${id}/details`, details);
        return response.data;
    },

    // 9. Return Asset (✅ UPDATED LOGIC)
    // We manually clear the user and set status to 'active'
    unassignAsset: async (id: string) => {
        const response = await api.patch(`/assets/${id}/details`, { 
            assignedUser: null, 
            status: 'active' 
        });
        return response.data;
    }
};