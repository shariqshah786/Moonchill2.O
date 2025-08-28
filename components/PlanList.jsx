const PlanList = ({ priceType, setPriceType }) => (
  <div className="flex justify-center gap-6 bg-gray-800 rounded-lg p-1 w-max mx-auto">
    {["monthly", "yearly"].map((type) => (
      <button
        key={type}
        className={`px-6 py-2 rounded-lg font-semibold transition ${
          priceType === type
            ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-lg"
            : "text-gray-400 hover:text-white"
        }`}
        onClick={() => setPriceType(type)}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    ))}
  </div>
);

export default PlanList;
