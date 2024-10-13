// src/lib/useUserStore.js
import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    console.log("Fetching user info for UID:", uid);
    if (!uid) {
      console.log("No UID provided, setting currentUser to null");
      return set({ currentUser: null, isLoading: false });
    }
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("User document found:", docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.log("User document not found");
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      set({ currentUser: null, isLoading: false });
    }
  }
}));

export default useUserStore;
