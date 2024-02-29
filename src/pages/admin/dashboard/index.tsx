import { FileText, Gavel, Scale, UserSearch, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const data = [
    {
      title: "Total Akses Peraturan",
      value: "11,000",
      unit: "Akses",
      color: "gray",
      icon: UserSearch,
      path: "",
    },
    {
      title: "Total User",
      value: "11,000",
      unit: "User",
      color: "green",
      icon: Users,
      path: "/admin/registeruser",
    },
    {
      title: "Total Surat Edaran",
      value: "12,000",
      unit: "Surat",
      color: "yellow",
      icon: FileText,
      path: "/admin/peraturan/jenis_peraturan/surat%20edaran",
    },
    {
      title: "Total Peraturan Daerah",
      value: "13,000",
      unit: "Peraturan",
      color: "red",
      icon: Scale,
      path: "/admin/peraturan/jenis_peraturan/peraturan%20daerah",
    },
    {
      title: "Total Peraturan Bupati",
      value: "14,000",
      unit: "Peraturan",
      color: "blue",
      icon: Scale,
      path: "/admin/peraturan/jenis_peraturan/peraturan%20bupati",
    },
    {
      title: "Total Keputusan Bupati",
      value: "15,000",
      unit: "Keputusan",
      color: "purple",
      icon: Gavel,
      path: "/admin/peraturan/jenis_peraturan/keputusan%20bupati",
    },
  ];
  return (
    <div className="grid grid-cols-3 w-full gap-10 p-10">
      {data.map((item, index) => (
        <Link to={item.path}>
          <div
            key={index}
            className={`flex flex-col bg-${item.color}-500 rounded-xl p-10 space-y-5 transition-transform transform hover:rotate-[-5deg] hover:scale-105 cursor-pointer`}
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
