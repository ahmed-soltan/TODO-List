import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import i18n from "i18next";

const Navbar = ({ t }: { t: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"secondary"}>{t("language")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button onClick={()=>i18n.changeLanguage("en")} variant={"ghost"}>{t("enLang")}</Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={()=>i18n.changeLanguage("ar")} variant={"ghost"}>{t("arLang")}</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
