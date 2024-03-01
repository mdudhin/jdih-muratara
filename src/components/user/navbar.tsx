import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Link } from "react-router-dom";
import { useToken } from "@/utils/context/token";

const Navbar = () => {
  const { token } = useToken();
  return (
    <div className="bg-red-500 flex flex-row justify-between items-center py-4 px-5 sticky top-0 z-50">
      <div className="text-white">JDIH Musi Rawas Utara</div>
      <div className="flex flex-row gap-5">
        <Link
          to={"/"}
          className="text-base text-white cursor-pointer hover:text-gray-300"
        >
          Home
        </Link>
        <Link
          to={"/profil"}
          className="text-base text-white cursor-pointer hover:text-gray-300"
        >
          Profil
        </Link>
        <Link
          to={"/peraturan"}
          className="text-base text-white cursor-pointer hover:text-gray-300"
        >
          Peraturan
        </Link>
      </div>
      {token ? (
        <Link
          to={"/admin"}
          className="text-base text-white cursor-pointer hover:text-gray-300"
        >
          Admin
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="text-base text-white cursor-pointer hover:text-gray-300">
              Admin
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuItem>
              <Link to={"/login"}>Masuk</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Navbar;
