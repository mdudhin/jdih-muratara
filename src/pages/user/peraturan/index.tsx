// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
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

// import Autoplay from "embla-carousel-autoplay";
import { Button } from "../../../components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import Loading from "@/components/shared/Loading";
import { MyTable } from "../../../components/admin/table";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// import image1 from "@/assets/image1.jpeg";
// import image2 from "@/assets/image2.jpg";
// import image3 from "@/assets/image3.jpg";
// import image4 from "@/assets/image4.jpg";

// import { useNavigate } from "react-router-dom";

const PeraturanPage = () => {
  //   const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState<Peraturan[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const { searchBy, search } = useParams();

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
      cell: ({ row }) => {
        const data = row.original;

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
              <DropdownMenuItem
                onClick={() => window.open(data.file, "_blank")}
              >
                View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const getData = async () => {
    // setLoading(true);
    try {
      const response = await getPeraturan(searchBy as string, search as string);
      setData(response);
      // setLoading(false);
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
      // setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [searchBy, search]);

  return (
    <div className="flex flex-col py-20">
      {/* <Carousel
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
    </Carousel> */}
      <div className="flex flex-col container gap-5">
        <h1 className="text-2xl">Peraturan</h1>
        <MyTable
          columns={columns}
          data={data}
          filter={[
            { label: "Title Peraturan", value: "judul" },
            { label: "Type Peraturan", value: "jenis_peraturan" },
            { label: "Tahun", value: "tahun" },
            { label: "Status Peraturan", value: "status" },
          ]}
          searchBy={searchBy}
          search={search}
          path="/produk-hukum/"
        />
      </div>
    </div>
  );
};

export default PeraturanPage;
