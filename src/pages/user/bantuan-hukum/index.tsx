import { FileText, Gavel, Scale } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPeraturanLength } from "@/utils/apis/peraturan/api";
import image1 from "@/assets/tingey-injury-law-firm-veNb0DDegzE-unsplash.jpg";
import image2 from "@/assets/tingey-injury-law-firm-yCdPU73kGSc-unsplash.jpg";

const BantuanHukumPage = () => {
  const [peraturanBupatiCount, setPeraturanBupatiCount] = useState<number>(0);
  const [peraturanDaerahCount, setPeraturanDaerahCount] = useState<number>(0);
  const [keputsanBupatiCount, setKeputsanBupatiCount] = useState<number>(0);
  const [suratEdaranCount, setSuratEdaranCount] = useState<number>(0);

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
  return (
    <div className="flex flex-col">
      <img
        src={image1}
        className="w-full h-[50vh] object-cover"
        alt="destination"
      />
      <section className="px-24 py-10">
        <div className="text-center mb-6 space-y-2">
          <div className="text-2xl font-bold">
            Pelajari Produk Hukum yang Sesuai untuk Anda
          </div>
          <p>
            Bantuan Hukum ini disediakan bagi Anda untuk mengajukan permasalahan
            hukum yang Anda hadapi.
          </p>
        </div>

        <div className="flex flex-row gap-10 items-center mt-20">
          <div className="flex flex-1">
            <img
              src={image2}
              className="object-cover rounded-sm"
              alt="destination"
            />
          </div>

          <div className="flex-col flex-1">
            <div className="text-base text-red-500">Bantuan Hukum</div>
            <div className="text-2xl text-justify uppercase">
              Bantuan Hukum ini disediakan bagi Anda untuk mengajukan
              permasalahan hukum yang Anda hadapi.
            </div>
            <p className="mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
              itaque sit at asperiores ex dolorem autem, illo cupiditate
              corrupti nihil quibusdam corporis nulla quo beatae quidem deserunt
              placeat quae eum.
            </p>

            <Button className=" bg-red-600 hover:bg-red-500 mt-10">
              Chat untuk info selengkapnya
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="grid grid-cols-4 w-full gap-5 px-24">
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
    </div>
  );
};

export default BantuanHukumPage;
