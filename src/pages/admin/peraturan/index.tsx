import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { CREATE } from "@/utils/constants";
import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { MyTable } from "@/components/admin/table";
import { useNavigate } from "react-router-dom";

const data: Peraturan[] = [
  {
    id: "m5gr84i9",
    typePeraturan: "Peraturan Bupati",
    number: 28,
    year: "2021",
    titlePeraturan: "aduh",
    status: "Berlaku",
  },
  {
    id: "3u1reuv4",
    typePeraturan: "Peraturan Gubernur",
    number: 10,
    year: "2022",
    titlePeraturan: "wow",
    status: "Berlaku",
  },
  {
    id: "derv1ws0",
    typePeraturan: "Peraturan Pusat",
    number: 12,
    year: "2023",
    titlePeraturan: "lof",
    status: "Tidak Berlaku",
  },
];

export type Peraturan = {
  id: string;
  typePeraturan: string;
  number: number;
  year: string;
  titlePeraturan: string;
  status: string;
};

export const columns: ColumnDef<Peraturan>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <div className="capitalize">{row.index + 1} </div>,
  },
  {
    accessorKey: "typePeraturan",
    header: "Jenis Peraturan",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("typePeraturan")} </div>
    ),
  },
  {
    accessorKey: "number",
    header: "Nomor",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("number")} </div>
    ),
  },
  {
    accessorKey: "year",
    header: "Tahun",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("year")} </div>
    ),
  },
  {
    accessorKey: "titlePeraturan",
    header: "Title Peraturan",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("titlePeraturan")} </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status Peraturan",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")} </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Peraturan = () => {
  const navigate = useNavigate();
  return (
    <div className="m-10 flex flex-col">
      <Button className="self-end" onClick={() => navigate(`detail/${CREATE}`)}>
        Add
      </Button>
      <MyTable
        columns={columns}
        data={data}
        filter={[
          { label: "Title Peraturan", value: "titlePeraturan" },
          { label: "Type Peraturan", value: "typePeraturan" },
          { label: "Tahun", value: "year" },
          { label: "Status Peraturan", value: "status" },
        ]}
      />
    </div>
  );
};

export default Peraturan;
