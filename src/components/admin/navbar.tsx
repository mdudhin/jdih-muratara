import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToken } from "@/utils/context/token";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { changeToken } = useToken();
  const handleLogout = () => {
    changeToken();
    toast({
      description: "Logout successfully",
    });
    navigate("/");
  };
  return (
    <div className="bg-red-500 flex flex-row justify-between items-center py-2 px-5 sticky top-0 z-50">
      <div className="text-white">JDIH Musi Rawas Utara</div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLogout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
