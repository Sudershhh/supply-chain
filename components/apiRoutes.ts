import axios from "axios";
const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64File = reader.result?.toString().split(",")[1];
      resolve(base64File || "");
    };
    reader.onerror = reject;
  });
};

const parseDocument = async (base64File: string) => {
  try {
    const response = await axios.post("/api/parse-pdf", {
      documentBytes: base64File,
      s3Bucket: null,
      s3Key: null,
    });
    return response.data.text;
  } catch (error) {
    console.error("Error parsing document:", error);
    throw error;
  }
};

const extractInvoiceInfo = async (extractedText: string) => {
  try {
    const response = await axios.post("/api/openai-invoice-data", {
      extractedText,
    });
    return response.data;
  } catch (error) {
    console.error("Error extracting invoice info:", error);
    throw error;
  }
};

export { readFileAsBase64, parseDocument, extractInvoiceInfo };
