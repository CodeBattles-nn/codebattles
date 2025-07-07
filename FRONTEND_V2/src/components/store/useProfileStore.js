// store/useProfileStore.js
import { create } from 'zustand'
import {axiosInstance} from "../../utils/settings.js";

export const useProfileStore = create((set, get) => ({
    profile: {},

    setProfile: (profile) => set({ profile }),

    clearProfile: () => set({ profile: {} }),
    updateFromServer: async () => {
        const data = (await axiosInstance.get("/api/users/me")).data
        set({profile: data})
    },

    isAdmin: () => {
        const profile = get().profile
        return profile?.roles?.includes('ADMIN') || false
    },
}))
