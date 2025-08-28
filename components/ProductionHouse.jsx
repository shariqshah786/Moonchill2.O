import Link from "next/link";
const ProductionHouse = () => {
  const productionHouseList = [
    {
      id: 1,
      image: "/amazonprime.png",
    },
    {
      id: 2,
      image: "/ott_logos/JIOHOTSTAR_LOGO (1).jpg",
    },
    {
      id: 3,
      image: "/ott_logos/sonyliv_logo.png",
    },
    {
      id: 4,
      image: "/ott_logos/zee5logo.jpeg",
    },
    {
      id: 5,
      image: "/ott_logos/Shemaroo_NEW_Logo.png",
    },
  ];
  return (
    <div className="flex gap-2 mt-5 justify-center md:gap-5 p-2 px-5 md:px-16 ">
      {productionHouseList.map((item) => (
        <div key={item.id} className="flex  gap-2">
          <Link href="/mainplans">
            <img
              src={item.image}
              alt={item.id}
              className="w-18 md:w-30 pacity-100 object-contain rounded bg-gray-50 border hover:scale-110 transition-all duration-300
            ease-in-out"
            ></img>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductionHouse;
// border-[2px] border-gray-600
//                 rounded-lg hover:scale-110 transition-all duration-300
//                 ease-in-out cursor-pointer relative shadow-xl
//                 shadow-gray-800
