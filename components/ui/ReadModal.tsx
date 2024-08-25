"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "../../store/store";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { doc, DocumentReference } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

function ReadModal() {
  const { user } = useUser();
  const [extractedData, setExtractedData] = useState<Record<
    string,
    any
  > | null>(null);

  const [isReadModalOpen, setIsReadModalOpen, fileId] = useAppStore((state) => [
    state.isReadModalOpen,
    state.setIsReadModalOpen,
    state.fileId,
  ]);

  const docRef: DocumentReference | null =
    fileId && user ? doc(db, "users", user.id, "files", fileId) : null;

  const [document] = useDocument(docRef);

  useEffect(() => {
    if (document?.exists()) {
      setExtractedData(document.data()?.extractedData || null);
    } else {
      setExtractedData(null);
    }
  }, [document]);

  const formatExtractedInformationFields = (key: string, value: any) => {
    if (key === "Product Description" && Array.isArray(value)) {
      return (
        <div>
          {value.map((item: any, index: number) => (
            <div key={index} className="mb-2 ml-4">
              <h4 className="font-semibold">Item {index + 1}:</h4>
              {Object.entries(item).map(([subKey, subValue]) => (
                <div key={subKey} className="ml-2">
                  <span className="font-medium">{subKey}: </span>
                  <span>{subValue?.toString()}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
    return <span>{value?.toString()}</span>;
  };

  return (
    <Dialog
      open={isReadModalOpen}
      onOpenChange={(isOpen) => {
        setIsReadModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Extracted Information</DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-96 overflow-y-auto">
          {extractedData ? (
            <div className="text-sm bg-gray-100 p-4 rounded">
              {Object.entries(extractedData).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <span className="font-semibold">{key}: </span>
                  {formatExtractedInformationFields(key, value)}
                </div>
              ))}
            </div>
          ) : (
            <p>No extracted data available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReadModal;
