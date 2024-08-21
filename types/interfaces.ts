export interface FileType {
  id: string;
  filename: string;
  timestamp: Date | undefined;
  fullName: string;
  downloadUrl: string;
  type: string;
  size: number;
}
