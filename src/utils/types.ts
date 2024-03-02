import { LucideIcon } from "lucide-react";

type Article = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
};

type Menu = {
  icon: LucideIcon;
  title: string;
  color: string;
  path: string;
};

export type { Article, Menu };
