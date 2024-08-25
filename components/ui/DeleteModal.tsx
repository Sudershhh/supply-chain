"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "../../store/store";
import { useUser } from "@clerk/nextjs";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

function DeleteModal() {
  const { user } = useUser();

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    fileId,
    isDeleting,
    setIsDeleting,
  ] = useAppStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileId,
    state.isDeleting,
    state.setIsDeleting,
  ]);

  async function deleteInvoice() {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    const toastId = toast.loading("Deleting...");

    setIsDeleting(true);
    try {
      deleteObject(fileRef).then(async () => {
        deleteDoc(doc(db, "users", user.id, "files", fileId))
          .then(() => {
            toast.success("Deleted Successfully", {
              id: toastId,
            });
          })
          .finally(() => {
            setIsDeleteModalOpen(false);
          });
      });
    } catch (error) {
      setIsDeleteModalOpen(false);

      toast.error("Error deleting document", {
        id: toastId,
      });
    } finally {
      setIsDeleting(false);
    }
  }
  console.log(isDeleting);

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        if (!isDeleting) {
          setIsDeleteModalOpen(isOpen);
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            size={"sm"}
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
            aria-label="Cancel file deletion"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            size={"sm"}
            variant={"destructive"}
            className="px-3 flex-1"
            onClick={() => deleteInvoice()}
            aria-label={isDeleting ? "Deleting Invoice" : "Delete Invoice"}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;
