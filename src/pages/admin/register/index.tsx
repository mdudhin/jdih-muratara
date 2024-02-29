import { MyTable } from "@/components/admin/table";
import { Button } from "@/components/ui/button";
import { getAllUser } from "@/utils/apis/peraturan/api";
import { CREATE } from "@/utils/constants";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<[{ username: string }]>([{ username: "" }]);

  const columns: ColumnDef<string>[] = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => <div className="capitalize">{row.index + 1} </div>,
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("username")} </div>
      ),
    },
  ];

  const getData = async () => {
    try {
      const response = await getAllUser();
      setData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="m-10 flex flex-col space-y-3">
      <Button className="self-end" onClick={() => navigate(`detail/${CREATE}`)}>
        Add
      </Button>
      <MyTable columns={columns} data={data} />
    </div>
  );
};

export default Register;
