"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "../../store/store";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
function UploadModal() {
  const { user } = useUser();
  const [
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadProgress,
    extractedData,
    fileToUpload,
    isUploading,
    setIsUploading,
  ] = useAppStore((state) => [
    state.isUploadModalOpen,
    state.setIsUploadModalOpen,
    state.uploadProgress,
    state.extractedData,
    state.fileToUpload,
    state.isUploading,
    state.setIsUploading,
  ]);

  async function uploadInvoice() {
    if (!user || !extractedData || !fileToUpload) return;

    if (!user) {
      toast.error("You must be signed in to upload files.");
      return;
    }

    const toastId = toast.loading("Uploading...");
    setIsUploading(true);
    try {
      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        filename: fileToUpload.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        timestamp: serverTimestamp(),
        type: fileToUpload.type,
        size: fileToUpload.size,
        extractedData: extractedData,
      });

      const fileRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
      await uploadBytes(fileRef, fileToUpload);

      const downloadURL = await getDownloadURL(fileRef);
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });

      toast.success("Uploaded Successfully", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Upload failed", {
        id: toastId,
      });
    } finally {
      setIsUploadModalOpen(false);
      setIsUploading(false);
    }
  }

  return (
    <Dialog
      open={isUploadModalOpen}
      onOpenChange={(isOpen) => {
        setIsUploadModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Progress</DialogTitle>
          <DialogDescription>
            {uploadProgress < 100
              ? "Processing your document..."
              : "Document processed successfully. Review the extracted information below."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Progress value={uploadProgress} className="w-full" />
        </div>

        {uploadProgress === 100 && (
          <div className="mt-4 max-h-60 overflow-y-auto">
            <h3 className="font-semibold mb-2">Extracted Information:</h3>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(extractedData, null, 2)}
            </pre>
          </div>
        )}

        <div className="flex space-x-2 py-3">
          <Button
            size={"sm"}
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={() => setIsUploadModalOpen(false)}
            aria-label="Cancel upload"
          >
            Cancel
          </Button>

          {uploadProgress === 100 && (
            <Button
              type="submit"
              size={"sm"}
              className="px-3 flex-1"
              onClick={uploadInvoice}
              aria-label="Upload file"
              disabled={isUploading}
            >
              Upload
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UploadModal;
