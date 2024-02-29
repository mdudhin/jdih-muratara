import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewPeraturan, getPeraturan } from "@/utils/apis/peraturan";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CREATE, EDIT } from "@/utils/constants";
import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { MyTable } from "@/components/admin/table";
import AlertDelete from "@/components/shared/AlertDialog";
import { useNavigate } from "react-router-dom";
import { deletePeraturan } from "@/utils/apis/peraturan/api";
import { useToast } from "@/components/ui/use-toast";

const PeraturanPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<NewPeraturan[]>([]);
  const { toast } = useToast();
  const [isAlertOpen, setAlertOpen] = useState(false);

  const showAlertDelete = () => {
    setAlertOpen(true);
  };

  const closeAlertDelete = () => {
    setAlertOpen(false);
  };

  const columns: ColumnDef<NewPeraturan>[] = [
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
      header: "Nomor Peraturan",
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
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div>
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
                <DropdownMenuItem
                  onClick={() => window.open(data.file, "_blank")}
                >
                  View
                </DropdownMenuItem>
                {data.isNewRecord && (
                  <DropdownMenuItem
                    onClick={() => window.open(data.file, "_blank")}
                  >
                    Previous Peraturan
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => navigate(`detail/${EDIT}/${data.id}`)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation;
                    showAlertDelete();
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isAlertOpen && (
              <AlertDelete
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your
                data and remove your data from our servers."
                onCancel={closeAlertDelete}
                onAction={() => handleDeletePeraturan(data.id)}
              />
            )}
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      const response = await getPeraturan();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePeraturan = async (id: string) => {
    closeAlertDelete();
    try {
      await deletePeraturan(id);
      getData();
      toast({
        description: "Delete successfully",
      });
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
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
          { label: "Title Peraturan", value: "judul" },
          { label: "Type Peraturan", value: "jenis_peraturan" },
          { label: "Tahun", value: "tahun" },
          { label: "Status Peraturan", value: "status" },
        ]}
      />
    </div>
  );
};

export default PeraturanPage;
