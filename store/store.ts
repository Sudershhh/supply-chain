import { create } from "zustand";
import { AppState } from "@/interfaces/AppState";

export const useAppStore = create<AppState>()((set) => ({
  fileId: null,
  setFileId: (fileId: string) => set((state) => ({ fileId })),

  filename: "",
  setFilename: (filename: string) => set((state) => ({ filename })),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (open) => set((state) => ({ isRenameModalOpen: open })),

  isUploadModalOpen: false,
  setIsUploadModalOpen: (open) => set({ isUploadModalOpen: open }),

  uploadProgress: 0,
  setUploadProgress: (progress) => set({ uploadProgress: progress }),

  extractedData: null,
  setExtractedData: (data) => set({ extractedData: data }),

  fileToUpload: null,
  setFileToUpload: (file) => set({ fileToUpload: file }),

  isReadModalOpen: false,
  setIsReadModalOpen: (open) => set({ isReadModalOpen: open }),

  isDeleting: false,
  setIsDeleting: (open) => set({ isDeleting: open }),

  isUploading: false,
  setIsUploading: (open) => set({ isUploading: open }),
}));
