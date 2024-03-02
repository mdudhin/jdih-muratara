import { Gavel, Newspaper, Users2 } from "lucide-react";

import { Link } from "react-router-dom";
import { Menu } from "@/utils/types";
import image1 from "@/assets/image1.jpeg";
import logo from "@/assets/logo.png";

const menu: Menu[] = [
  {
    icon: Users2,
    title: "Profil",
    color: "bg-yellow-500",
    path: "/profil",
  },
  {
    icon: Gavel,
    title: "Peraturan",
    color: "bg-yellow-500",
    path: "/peraturan",
  },
  {
    icon: Newspaper,
    title: "Article",
    color: "bg-yellow-500",
    path: "/article",
  },
];

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={image1}
        alt="Blurred Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center h-screen gap-10">
        <img
          src={logo}
          className="h-52 transition-transform transform hover:scale-110 cursor-pointer"
        />
        <div className="flex flex-row gap-10">
          {menu.map((item: Menu, index: number) => (
            <Link to={item.path} className="flex flex-col gap-3 items-center">
              <div
                key={index}
                className={`${item.color} w-28 h-28 rounded-full flex justify-center items-center transition-transform transform hover:rotate-[-5deg] hover:scale-105 cursor-pointer`}
              >
                <item.icon className="w-16 h-16 text-white" />
              </div>
              <div className="text-white text-md w-32 text-center">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
