export interface FileState {
  fileId: string | null;
  setFileId: (fileId: string) => void;
  filename: string;
  setFilename: (filename: string) => void;
  fileToUpload: File | null;
  setFileToUpload: (file: File | null) => void;
}

export interface DeletionState {
  isDeleting: boolean;
  setIsDeleting: (deleting: boolean) => void;
}

export interface UploadState {
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
}
