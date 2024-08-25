"use client";

import { useUser } from "@clerk/nextjs";
import { FileType } from "@/interfaces/File";
import { Button } from "../ui/button";
import { columns } from "./columns";
import { DataTable } from "./table";
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { Skeleton } from "@/components/ui/Skeleton";

function TableWrapper() {
  const { user } = useUser();

  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      downloadUrl: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
      extractedData: doc.data().extractedData,
    }));

    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full"></Skeleton>
        </Button>
        <div className="border rounded-lg">
          <div className="border-b h-12"></div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
        className="ml-auto w-fit"
        variant={"outline"}
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper;
