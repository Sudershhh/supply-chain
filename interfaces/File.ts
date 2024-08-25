export interface FileType {
  id: string;
  filename: string;
  timestamp: Date | undefined;
  fullName: string;
  downloadUrl: string;
  type: string;
  size: number;
  extractedData: ExtractedFileContent;
}

export interface ExtractedFileContent {
  "Invoice Number": string;
  "Customer Name": string;
  "Invoice Date": string;
  "Seller Name": string;
  "Total Amount": string;
  Quantity: number | number[];
  "Unit Price": string;
  Subtotal: string | number[] | string[];
  "Product Description": string | ProductDescription[];
}

export interface ProductDescription {
  name?: string;
  DESCRITION?: string;
  "Unit Price": string;
  Subtotal?: string;
  Quantity?: string;
  "ART NO."?: string;
  Description: string;
}
