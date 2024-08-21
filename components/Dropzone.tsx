"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import DropzoneComponent from "react-dropzone";
import toast from "react-hot-toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "@/firebase"; // Adjust the path as needed

const MAX_SIZE = 34000000;

function Dropzone() {
  const [loading, setLoading] = useState(false);
  const { isSignedIn, user } = useUser();

  const onDrop = async (acceptedFiles: File[]) => {
    if (!isSignedIn || !user) {
      toast.error("You must be signed in to upload files.");
      return;
    }

    acceptedFiles.forEach(async (file) => {
      try {
        setLoading(true);

        // Create a storage reference and upload the file
        const storageRef = ref(storage, `users/${user.id}/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error(error);
            toast.error("Error uploading file");
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              // Store file metadata in Firestore
              const fileDocRef = doc(db, `users/${user.id}/files/${file.name}`);
              await setDoc(fileDocRef, {
                fileName: file.name,
                fileURL: downloadURL,
              });

              toast.success("File uploaded successfully!");
            } catch (error) {
              console.error(error);
              toast.error("Error saving file metadata");
            }
          }
        );
      } catch (error) {
        console.error(error);
        toast.error("Error processing file");
      } finally {
        setLoading(false);
      }
    });
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
                    : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
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
