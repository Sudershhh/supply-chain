"use client";
import { useUser } from "@clerk/nextjs";
import DropzoneComponent from "react-dropzone";
import toast from "react-hot-toast";

import { useAppStore } from "@/store/store";
import {
  readFileAsBase64,
  parseDocument,
  extractInvoiceInfo,
} from "./apiRoutes";

const MAX_SIZE = 34000000;

function Dropzone() {
  const { isSignedIn, user } = useUser();
  const [
    setIsUploadModalOpen,
    setUploadProgress,
    setExtractedData,
    setFileToUpload,
  ] = useAppStore((state) => [
    state.setIsUploadModalOpen,
    state.setUploadProgress,
    state.setExtractedData,
    state.setFileToUpload,
  ]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!isSignedIn || !user) {
      toast.error("You must be signed in to upload files.");
      return;
    }
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setFileToUpload(file);

    setIsUploadModalOpen(true);
    setUploadProgress(0);

    try {
      const base64File = await readFileAsBase64(file);
      setUploadProgress(25);

      const parsedPdf = await parseDocument(base64File);
      setUploadProgress(50);

      const invoiceInfo = await extractInvoiceInfo(parsedPdf);
      setUploadProgress(75);

      setExtractedData(invoiceInfo);

      setUploadProgress(100);
    } catch (error) {
      toast.error("Error processing file");
      setIsUploadModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      <DropzoneComponent minSize={0} maxSize={MAX_SIZE} onDrop={onDrop}>
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          fileRejections,
        }) => {
          const isFileTooLarge =
            fileRejections.length > 0 && fileRejections[0].file.size > MAX_SIZE;

          return (
            <section className="m-4 cursor-pointer">
              <div
                {...getRootProps()}
                className={`w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center ${
                  isDragActive
                    ? "bg-[#035FFE] text-white animate-pulse"
                    : "bg-slate-300/50 dark:bg-slate-800/80 text-slate-400"
                } ${isFileTooLarge ? "border-red-500" : ""}`}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drop a file to upload!"}
                {isDragActive && !isDragReject && "Drop to upload this file!"}
                {isDragReject && "File type not accepted, sorry!"}
                {isFileTooLarge && (
                  <div className="text-red-500 mt-2">File is too large.</div>
                )}
              </div>
            </section>
          );
        }}
      </DropzoneComponent>
    </div>
  );
}

export default Dropzone;
