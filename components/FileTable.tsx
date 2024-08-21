// components/FileTable.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, query, orderBy, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust the path as needed
import { FileType } from "@/types/interfaces"; // Adjust the path as needed

const FileTable: React.FC = () => {
  const { user } = useUser();
  const [files, setFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!user) return;

    const fetchFiles = async () => {
      setLoading(true);
      try {
        const filesQuery = query(
          collection(db, "users", user.id, "files"),
          orderBy("timestamp", sort)
        );
        const querySnapshot = await getDocs(filesQuery);
        const fileList: FileType[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          filename: doc.data().filename || doc.id,
          timestamp:
            new Date(doc.data().timestamp?.seconds * 1000) || undefined,
          fullName: doc.data().fullName,
          downloadUrl: doc.data().downloadURL,
          type: doc.data().type,
          size: doc.data().size,
        }));
        setFiles(fileList);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [user, sort]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="border rounded-lg">
          <div className="border-b h-12">
            {/* Skeleton loader */}
            <div className="flex items-center space-x-4 p-5 w-full">
              <div className="h-12 w-12 bg-gray-200 rounded"></div>
              <div className="h-12 w-full bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center space-x-4 p-5 w-full">
              <div className="h-12 w-12 bg-gray-200 rounded"></div>
              <div className="h-12 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <button
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-gray-600">Filename</th>
              <th className="px-4 py-2 text-left text-gray-600">Type</th>
              <th className="px-4 py-2 text-left text-gray-600">Size</th>
              <th className="px-4 py-2 text-left text-gray-600">Timestamp</th>
              <th className="px-4 py-2 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{file.filename}</td>
                <td className="px-4 py-2">{file.type}</td>
                <td className="px-4 py-2">
                  {(file.size / 1024).toFixed(2)} KB
                </td>
                <td className="px-4 py-2">
                  {file.timestamp?.toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <a
                    href={file.downloadUrl}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileTable;
