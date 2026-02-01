import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { deleteArtikel, getArtikel } from "../../../utils/apis/artikel";
import { useEffect, useState } from "react";

import AlertDelete from "../../../components/shared/AlertDialog";
import { Button } from "../../../components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { MyTable } from "../../../components/admin/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/ui/use-toast";

const ArtikelPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const { toast } = useToast();
  const [isAlertOpen, setAlertOpen] = useState(false);

  const showAlertDelete = () => {
    setAlertOpen(true);
  };

  const closeAlertDelete = () => {
    setAlertOpen(false);
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => <div className="capitalize">{row.index + 1} </div>,
    },
    {
      accessorKey: "judul",
      header: "Judul",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("judul")} </div>
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
                  onClick={() => navigate(`/admin/artikel/detail/${data.id}`)}
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
                onAction={() => handleDeleteArtikel(data.id)}
              />
            )}
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      const response = await getArtikel();

      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteArtikel = async (id: string) => {
    closeAlertDelete();
    try {
      await deleteArtikel(id);
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
      <Button
        className="self-end"
        onClick={() => navigate(`/admin/artikel/detail`)}
      >
        Add
      </Button>
      <MyTable
        columns={columns}
        data={data}
        filter={[{ label: "Judul Artikel", value: "judul" }]}
        path="/admin/artikel/"
      />
    </div>
  );
};

export default ArtikelPage;
