import { RxDashboard } from "react-icons/rx";
import { Button } from "./ui/button";
import { RiBox3Line } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";

const SideBar = () => {
  return (
    <>
      <div className="w-64 bg-white">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-[#00A180]">STOCKLY</h1>
        </div>

        <div className="ml-6 flex flex-col gap-4">
          <Button className="text-muted-foreground justify-start">
            <RxDashboard />
            Dashboard
          </Button>
          <Button className="text-muted-foreground justify-start">
            <RiBox3Line />
            Produtos
          </Button>
          <Button className="text-muted-foreground justify-start">
            <GiShoppingCart />
            Vendas
          </Button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
