import { MyTable } from "@/components/admin/table";
import { Button } from "@/components/ui/button";
import { Username } from "@/utils/apis/peraturan";
import { getAllUser } from "@/utils/apis/peraturan/api";
import { CREATE } from "@/utils/constants";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Username[]>([]);

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
        <div className="capitalize w-96">{row.getValue("username")} </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="capitalize">
          {moment(row.getValue("createdAt")).format("DD MMM YYYY")}
        </div>
      ),
    },
  ];

  const getData = async () => {
    try {
      const response = await getAllUser();
      setData(response);
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
