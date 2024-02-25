import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Article } from "@/utils/types";
import Autoplay from "embla-carousel-autoplay";
import article1 from "@/assets/article1.jpg";
import article2 from "@/assets/article2.webp";
import article3 from "@/assets/article3.jpg";
import article4 from "@/assets/article4.jpg";
import article5 from "@/assets/article5.jpg";
import image1 from "@/assets/image1.jpeg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";

const articles: Article[] = [
  {
    id: 1,
    title: "Article 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: article1,
    date: "5 January 2024",
    location: "Palembang",
  },
  {
    id: 2,
    title: "Article 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus veritatis, aliquam ipsum aut nihil iure assumenda possimus ipsa fuga hic reprehenderit molestiae quas modi illo corrupti minima, animi, incidunt ut.",
    image: article2,
    date: "15 January 2024",
    location: "Palembang",
  },
  {
    id: 3,
    title: "Article 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: article3,
    date: "25 January 2024",
    location: "Palembang",
  },
  {
    id: 4,
    title: "Article 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: article4,
    date: "5 February 2024",
    location: "Palembang",
  },
  {
    id: 5,
    title: "Article 5",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: article5,
    date: "15 February 2024",
    location: "Palembang",
  },
];

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <Carousel
        plugins={[
          Autoplay({
            delay: 10000,
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
      </div>
    </div>
  );
};

export default Home;
