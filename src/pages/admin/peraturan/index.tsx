import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Peraturan, getPeraturan } from "@/utils/apis/peraturan";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CREATE } from "@/utils/constants";
import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { MyTable } from "@/components/admin/table";
import { useNavigate } from "react-router-dom";

const PeraturanPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Peraturan[]>([]);

  const columns: ColumnDef<Peraturan>[] = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => <div className="capitalize">{row.index + 1} </div>,
    },
    {
      accessorKey: "jenis_peraturan",
      header: "Jenis Peraturan",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("jenis_peraturan")} </div>
      ),
    },
    {
      accessorKey: "no_peraturan",
      header: "Nomor",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("no_peraturan")} </div>
      ),
    },
    {
      accessorKey: "tahun",
      header: "Tahun",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("tahun")} </div>
      ),
    },
    {
      accessorKey: "judul",
      header: "Title Peraturan",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("judul")} </div>
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
      cell: () =>
        // { row }
        {
          // const payment = row.original;

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

  const getData = async () => {
    try {
      const response = await getPeraturan();
      setData(response);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

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

export default PeraturanPage;
