import { ColumnDef } from "@tanstack/react-table";
import { FileType } from "@/interfaces/File";
import prettyBytes from "pretty-bytes";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "filename",
    header: "Invoice",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue, ...props }) => (
      <a
        href={renderValue() as string}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-500 hover:text-blue-600 cursor-pointer"
      >
        Download
      </a>
    ),
  },
  {
    accessorKey: "summary",
    header: "Summary",
  },
];
