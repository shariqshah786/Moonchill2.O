const ProductionHouse = () => {
  const productionHouseList = [
    {
      id: 1,
      image: "/amazonprime.png",
    },
    {
      id: 2,
      image: "/ott_logos/Hotstar_Logo_NEW colour.png",
    },
    {
      id: 3,
      image: "/ott_logos/sonyliv_logo.png",
    },
    {
      id: 4,
      image: "/ott_logos/Zee5 premium logo final-01.png",
    },
    {
      id: 5,
      image: "/nextflixM.png",
    },
  ];
  return (
    <div className="flex gap-2 md:gap-5 p-2 px-5 md:px-16 ">
      {productionHouseList.map((item) => (
        <div
          key={item.id}
          className="border-[2px] border-gray-600
            rounded-lg hover:scale-110 transition-all duration-300
            ease-in-out cursor-pointer relative shadow-xl 
            shadow-gray-800"
        >
          <img
            src={item.image}
            alt={item.id}
            className="w-35 object-contain z-[1] opacity-100"
          ></img>
        </div>
      ))}
    </div>
  );
};

export default ProductionHouse;
