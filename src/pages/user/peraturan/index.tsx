import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Peraturan, getPeraturan } from "../../../utils/apis/peraturan";
import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Button } from "../../../components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { MyTable } from "../../../components/admin/table";
import image1 from "@/assets/image1.jpeg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem>
            <img src={image1} className="w-full h-[60vh] object-cover" />
          </CarouselItem>
          <CarouselItem>
            <img src={image2} className="w-full h-[60vh] object-cover" />
          </CarouselItem>
          <CarouselItem>
            <img src={image3} className="w-full h-[60vh] object-cover" />
          </CarouselItem>
          <CarouselItem>
            <img src={image4} className="w-full h-[60vh] object-cover" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="flex flex-col container gap-5 mt-10">
        <h1 className="text-2xl">Peraturan</h1>
        <MyTable
          columns={columns}
          data={data}
          filter={[
            { label: "Title Peraturan", value: "judul" },
            { label: "Type Peraturan", value: "jenis_peraturan" },
            { label: "Tahun", value: "tahun" },
          ]}
        />
      </div>
    </div>
  );
};

export default PeraturanPage;
