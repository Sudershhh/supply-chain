import Dropzone from "@/components/Dropzone";
import FileTable from "@/components/FileTable";
import React from "react";

function page() {
  return (
    <main>
      <Dropzone />
      <section className="container">
        <h2 className="font-semibold text-center text-xl">All Files</h2>

        <FileTable />
      </section>
    </main>
  );
}

export default page;
