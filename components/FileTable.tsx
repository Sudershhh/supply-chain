"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import Skeleton from "@/components/Skeleton";

interface FileType {
  id: string;
  filename: string;
  timestamp?: Date;
  fullName: string;
  downloadUrl: string;
  type: string;
  size: number;
}

function FileTable() {
  const { user } = useUser();
  const [files, setFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  console.log(docs);

  useEffect(() => {
    if (!docs) return;

    const fetchedFiles: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      downloadUrl: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
    }));

    setFiles(fetchedFiles);
  }, [docs]);

  if (loading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(files);

  return (
    <div>
      <button
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
        className="m-4 px-4 py-2 bg-black text-white rounded-xl"
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Filename
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Upload Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Download
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {files.map((file) => (
            <tr key={file.id}>
              <td className="px-6 py-4 whitespace-nowrap">{file.filename}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {file.timestamp?.toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{file.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {(file.size / 1024).toFixed(2)} KB
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={file.downloadUrl}
                  className="text-blue-600 hover:underline"
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
  );
}

export default FileTable;
