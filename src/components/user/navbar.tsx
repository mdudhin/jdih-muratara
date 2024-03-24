import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Link } from "react-router-dom";
import jdih from "@/assets/jdih.png";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <div className="px-56 sticky top-7 z-50">
      <div className="flex flex-row items-center py-4 px-8 rounded-lg justify-between shadow-lg bg-white">
        <Link to={"/"} className="flex flex-row gap-4 items-center ">
          <img src={logo} alt="logo" className=" h-10 object-cover" />
          <img src={jdih} alt="logo" className=" h-10 object-cover" />
          <div className="flex flex-col">
            <div className="text-sm font-bold">JDIH</div>
            <p className="text-xs">Musi Rawas Utara</p>
          </div>
        </Link>
        <div className="flex flex-row gap-8 items-center">
          <Link to={"/"} className="text-base cursor-pointer">
            Beranda
          </Link>
          <Link to={"/profil"} className="text-base cursor-pointer">
            Sejarah
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="text-base cursor-pointer">Produk Hukum</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
              <DropdownMenuItem>
                <Link to={"/peraturan/jenis_peraturan/peraturan%20daerah"}>
                  Peraturan Daerah
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={"/peraturan/jenis_peraturan/peraturan%20bupati"}>
                  Peraturan Bupati
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={"/peraturan/jenis_peraturan/keputusan%20bupati"}>
                  Keputusan Bupati
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={"/peraturan/jenis_peraturan/surat%20edaran"}>
                  Surat Edaran
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to={"/berita"} className="text-basecursor-pointer">
            Berita
          </Link>
          <Link to={"/bantuan-hukum"} className="text-basecursor-pointer">
            Bantuan Hukum
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
