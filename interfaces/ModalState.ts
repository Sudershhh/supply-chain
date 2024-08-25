export interface ModalState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (open: boolean) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isReadModalOpen: boolean;
  setIsReadModalOpen: (open: boolean) => void;
}
