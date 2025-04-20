const SideBar = () => {
  return (
    <>
      <div className="w-64 bg-white">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-[#00A180]">STOCKLY</h1>
        </div>

        <div className="flex flex-col gap-8">
          <button>Dashboard</button>
          <button>Produtos</button>
          <button>Vendas</button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
