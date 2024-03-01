import {
  getAllUserCount,
  getCountAccess,
  getPeraturanLength,
} from "@/utils/apis/peraturan/api";
import { FileText, Gavel, Scale, UserSearch, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<Number>(0);
  const [count, setCount] = useState<Number>(0);
  const [peraturanBupatiCount, setPeraturanBupatiCount] = useState<number>(0);
  const [peraturanDaerahCount, setPeraturanDaerahCount] = useState<number>(0);
  const [keputsanBupatiCount, setKeputsanBupatiCount] = useState<number>(0);
  const [suratEdaranCount, setSuratEdaranCount] = useState<number>(0);

  const getData = async () => {
    try {
      const response = await getAllUserCount();
      setUser(response.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async () => {
    try {
      const response = await getCountAccess();
      setCount(response.hitCount);
    } catch (error) {
      console.log(error);
    }
  };

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
    getData();
    getCount();
    getRegulationCount();
  }, []);

  const data = [
    {
      title: "Total Akses Peraturan",
      value: `${count.toLocaleString()}`,
      unit: "Akses",
      color: "bg-gray-500",
      icon: UserSearch,
      path: "/",
    },
    {
      title: "Total User",
      value: `${user.toLocaleString()}`,
      unit: "User",
      color: "bg-green-500",
      icon: Users,
      path: "/admin/registeruser",
    },
    {
      title: "Total Surat Edaran",
      value: `${suratEdaranCount.toLocaleString()}`,
      unit: "Surat",
      color: "bg-yellow-500",
      icon: FileText,
      path: "/admin/peraturan/jenis_peraturan/surat%20edaran",
    },
    {
      title: "Total Peraturan Daerah",
      value: `${peraturanDaerahCount.toLocaleString()}`,
      unit: "Peraturan",
      color: "bg-red-500",
      icon: Scale,
      path: "/admin/peraturan/jenis_peraturan/peraturan%20daerah",
    },
    {
      title: "Total Peraturan Bupati",
      value: `${peraturanBupatiCount.toLocaleString()}`,
      unit: "Peraturan",
      color: "bg-blue-500",
      icon: Scale,
      path: "/admin/peraturan/jenis_peraturan/peraturan%20bupati",
    },
    {
      title: "Total Keputusan Bupati",
      value: `${keputsanBupatiCount.toLocaleString()}`,
      unit: "Keputusan",
      color: "bg-purple-500",
      icon: Gavel,
      path: "/admin/peraturan/jenis_peraturan/keputusan%20bupati",
    },
  ];
  return (
    <div className="grid grid-cols-3 w-full gap-10 p-10">
      {data.map((item, index) => (
        <Link to={item.path} key={index}>
          <div
            className={`flex flex-col ${item.color} rounded-xl p-10 space-y-5 transition-transform transform hover:rotate-[-5deg] hover:scale-105 cursor-pointer`}
          >
            <p className="font-semibold text-xl text-white">{item.title}</p>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-2">
                <p className="text-3xl font-semibold text-white">
                  {item.value}
                </p>
                <p className="text-white">{item.unit}</p>
              </div>
              <item.icon className="w-16 h-16 text-white" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
