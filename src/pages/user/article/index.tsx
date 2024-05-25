import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

import { getArtikel } from "@/utils/apis/artikel";

const ArticlePage = () => {
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await getArtikel();

      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container flex flex-col gap-5 py-20">
      <h1 className="text-2xl">Semua Berita</h1>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <Card key={item.id} className="">
            <CardHeader>
              <CardTitle>{item.judul}</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <p className="font-semibold text-sm">{item.createdAt}</p>
                  {/* <p className="font-semibold text-sm">{item.location}</p> */}
                </div>
                <p>
                  {item.deskripsi.length > 80
                    ? item.deskripsi.slice(0, 80) + "..."
                    : item.deskripsi}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img src={item.file} className="w-full h-[50vh] object-cover" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;
