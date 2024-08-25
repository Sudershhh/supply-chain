import { ModalState } from "./ModalState";
import { FileState, UploadState, DeletionState } from "./FileState";
import { ExtractedDataState } from "./ExtractedDataState";

export interface AppState
  extends ModalState,
    FileState,
    UploadState,
    ExtractedDataState,
    DeletionState {}
