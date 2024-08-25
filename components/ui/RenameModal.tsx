"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "../../store/store";
import { useUser } from "@clerk/nextjs";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Input } from "./input";
import toast from "react-hot-toast";

function RenameModal() {
  const { user } = useUser();
  const [
    isRenameModalOpen,
    setIsRenameModalOpen,
    fileId,
    filename,
    setFilename,
  ] = useAppStore((state) => [
    state.isRenameModalOpen,
    state.setIsRenameModalOpen,
    state.fileId,
    state.filename,
    state.setFilename,
  ]);

  const renameFile = async () => {
    if (!user || !fileId) return;

    const toastId = toast.loading("Renaming...");

    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename,
    });

    toast.success("Renamed Successfully", {
      id: toastId,
    });

    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the File</DialogTitle>

          <Input
            id="link"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />

          <div className="flex space-x-2 py-3">
            <Button
              size={"sm"}
              className="px-3 flex-1"
              variant={"destructive"}
              onClick={() => setIsRenameModalOpen(false)}
              aria-label="Cancel renaming file"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size={"sm"}
              className="px-3 flex-1"
              onClick={() => renameFile()}
              aria-label="Rename file"
            >
              Rename
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
