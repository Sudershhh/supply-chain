import Dropzone from "@/components/Dropzone";

import TableWrapper from "@/components/table/TableWrapper";
import UploadModal from "@/components/ui/UploadModal";
function page() {
  return (
    <main>
      <UploadModal />
      <Dropzone />
      <section className="container space-y-5 p-8">
        <h2 className="font-bold text-center text-xl">All Files</h2>
        <div>
          <TableWrapper />
        </div>
      </section>
    </main>
  );
}

export default page;
