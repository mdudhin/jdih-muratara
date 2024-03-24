import { FileText, Gavel, Scale } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NewPeraturan, getPeraturan } from "@/utils/apis/peraturan";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/shared/Combobox";
import { Input } from "@/components/ui/input";
import { getPeraturanLength } from "@/utils/apis/peraturan/api";
import image1 from "@/assets/image1.jpeg";
import { toast } from "@/components/ui/use-toast";

const filters = [
  { label: "Title Peraturan", value: "judul" },
  { label: "Type Peraturan", value: "jenis_peraturan" },
  { label: "Tahun", value: "tahun" },
  { label: "Status Peraturan", value: "status" },
];

const Home = () => {
  const navigate = useNavigate();
  const [peraturanBupatiCount, setPeraturanBupatiCount] = useState<number>(0);
  const [peraturanDaerahCount, setPeraturanDaerahCount] = useState<number>(0);
  const [keputsanBupatiCount, setKeputsanBupatiCount] = useState<number>(0);
  const [suratEdaranCount, setSuratEdaranCount] = useState<number>(0);
  const [data, setData] = useState<NewPeraturan[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>("Select Filter");
  const [selectedFilter, setSelectedFilter] = useState<string>("judul");
  const [search, setSearch] = useState<string>("");

  const getRegulationCount = async () => {
    try {
      const bupatiCount = await getPeraturanLength(
        "jenis_peraturan",
        "peraturan bupati"
      );
      const daerahCount = await getPeraturanLength(
        "jenis_peraturan",
        "peraturan daerah"
      );
      const keputusanCount = await getPeraturanLength(
        "jenis_peraturan",
        "keputusan bupati"
      );
      const suratCount = await getPeraturanLength(
        "jenis_peraturan",
        "surat edaran"
      );
      setKeputsanBupatiCount(keputusanCount);
      setPeraturanDaerahCount(daerahCount);
      setPeraturanBupatiCount(bupatiCount);
      setSuratEdaranCount(suratCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegulationCount();
  }, []);

  const cards = [
    {
      title: "Total Surat Edaran",
      value: `${suratEdaranCount.toLocaleString()}`,
      unit: "Surat Edaran",
      color: "bg-yellow-500",
      icon: FileText,
      path: "peraturan/jenis_peraturan/surat%20edaran",
    },
    {
      title: "Total Peraturan Daerah",
      value: `${peraturanDaerahCount.toLocaleString()}`,
      unit: "Peraturan Daerah",
      color: "bg-red-500",
      icon: Scale,
      path: "peraturan/jenis_peraturan/peraturan%20daerah",
    },
    {
      title: "Total Peraturan Bupati",
      value: `${peraturanBupatiCount.toLocaleString()}`,
      unit: "Peraturan Bupati",
      color: "bg-blue-500",
      icon: Scale,
      path: "peraturan/jenis_peraturan/peraturan%20bupati",
    },
    {
      title: "Total Keputusan Bupati",
      value: `${keputsanBupatiCount.toLocaleString()}`,
      unit: "Keputusan Bupati",
      color: "bg-purple-500",
      icon: Gavel,
      path: "peraturan/jenis_peraturan/keputusan%20bupati",
    },
  ];

  const getData = async () => {
    // setLoading(true);
    try {
      const response = await getPeraturan();
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
  }, []);

  const searchPeraturan = () => {
    navigate(`/peraturan/${selectedFilter}/${search}`);
  };
  return (
    <div className="flex flex-col">
      <img src={image1} className="w-full h-[90vh] object-cover" />

      <section className="flex flex-col items-center px-24 py-10">
        <div className="text-2xl font-bold mb-16">Cari Berdasarkan</div>

        <div className="grid grid-cols-2 w-full gap-10">
          {cards.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className="bg-white shadow-md rounded-md flex flex-row p-8 justify-between items-center"
            >
              <div className="flex flex-col gap-2">
                <div className="text-2xl">{item.unit}</div>
                <div className="text-5xl font-semibold">{item.value}</div>
                <div className="text-xs">{item.title}</div>
              </div>
              <item.icon className="w-16 h-16 text-red-600" />
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col  px-24 py-10">
        <div className="text-2xl font-bold mb-6 text-center">
          Silahkan Cari Produk Hukum dan Informasi Hukum
        </div>

        <div className="shadow-md p-10 rounded-md">
          <div className="flex flex-row">
            <Input
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14"
            />
            <div className="w-2" />
            <Combobox
              items={filters}
              onChange={(item: any) => {
                setSelectedFilter(item.value);
                const selectedFilterLabel =
                  filters?.find((f) => f.value === item.value)?.label ||
                  "Select Filter";
                setPlaceholder(selectedFilterLabel);
              }}
              placeHolder={selectedFilter ? placeholder : "Select Filter"}
              className="h-14"
            />
            <div className="w-2" />
            <Button
              className="w-80 h-14 bg-red-600 hover:bg-red-500"
              onClick={searchPeraturan}
            >
              Cari
            </Button>
          </div>

          <div className="text-2xl font-semibold mt-10">
            Produk Hukum Terbaru
          </div>
          <div className="grid grid-cols-2 w-full gap-10 mt-10">
            {data.map((item) => (
              <div
                className="flex flex-col cursor-pointer"
                key={item.id}
                onClick={() => window.open(item.file, "_blank")}
              >
                <div className="border border-red-600 text-red-600 px-2 py-1 rounded-sm text-xs w-fit">
                  {item.jenis_peraturan}
                </div>
                <div className=" text-justify font-semibold text-lg uppercase mt-3 mb-1">
                  {item.judul}
                </div>
                <div className="text-sm">
                  Nomor {item.no_peraturan} Tahun {item.tahun}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
