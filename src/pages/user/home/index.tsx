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
        <img src={logo} className="h-52" />
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
      </Carousel>
      <div className="container flex flex-col gap-5 mt-10">
        <h1 className="text-2xl">Semua Artikel</h1>
        <div className="grid grid-cols-2 gap-4">
          {articles.map((item) => (
            <Card key={item.id} className="">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <p className="font-semibold text-sm">{item.date}</p>
                    <p className="font-semibold text-sm">{item.location}</p>
                  </div>
                  <p>
                    {item.description.length > 80
                      ? item.description.slice(0, 80) + "..."
                      : item.description}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={item.image}
                  className="w-full h-[50vh] object-cover"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Home;
