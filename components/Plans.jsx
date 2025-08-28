const PlanModal = () => {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "₹99",
      originalPrice: "₹199",
      discount: "50% OFF",
      duration: "for 1 month",
      features: [
        "Watch on Mobile & Tablet",
        "HD Quality",
        "Ads-free experience",
        "Download & watch offline",
      ],
      channels: [
        "hotstar",
        "netflix",
        "prime",
        "disney",
        "zee5",
        "sony",
        "voot",
        "alt",
        "eros",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹199",
      originalPrice: "₹399",
      discount: "50% OFF",
      duration: "for 3 months",
      features: [
        "Watch on TV, Mobile & Tablet",
        "4K Ultra HD Quality",
        "Ads-free experience",
        "Download & watch offline",
        "Multiple user profiles",
      ],
      channels: [
        "hotstar",
        "netflix",
        "prime",
        "disney",
        "zee5",
        "sony",
        "voot",
        "alt",
        "eros",
        "mx",
      ],
      popular: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹299",
      originalPrice: "₹599",
      discount: "50% OFF",
      duration: "for 6 months",
      features: [
        "Watch on TV, Mobile & Tablet",
        "4K Ultra HD Quality",
        "Ads-free experience",
        "Download & watch offline",
        "Multiple user profiles",
        "Early access to new releases",
      ],
      channels: [
        "hotstar",
        "netflix",
        "prime",
        "disney",
        "zee5",
        "sony",
        "voot",
        "alt",
        "eros",
        "mx",
        "jio",
      ],
    },
  ];

  const getChannelLogo = (channel) => {
    const logos = {
      hotstar: "🔥",
      netflix: "N",
      prime: "P",
      disney: "D",
      zee5: "Z",
      sony: "S",
      voot: "V",
      alt: "A",
      eros: "E",
      mx: "M",
      jio: "J",
    };
    return logos[channel] || channel.charAt(0).toUpperCase();
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-gray-900 rounded-lg w-full max-w-6xl p-6 relative my-8">
          {/* <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X size={24} />
          </button> */}

          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">M</span>
              </div>
              <span className="text-white text-xl font-bold">moonchill</span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">
              Select your subscription plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-gray-800 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? "ring-2 ring-purple-500 bg-gray-750"
                    : "hover:bg-gray-750"
                } ${plan.popular ? "border-2 border-green-500" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">$</span>
                      </span>
                      <span>MOST POPULAR</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-block">
                    {plan.discount}
                  </div>
                  <div className="text-white text-lg font-bold">
                    {plan.name}
                  </div>
                  <div className="text-gray-400 text-sm line-through">
                    {plan.originalPrice}
                  </div>
                  <div className="text-white text-2xl font-bold">
                    {plan.price}{" "}
                    <span className="text-sm font-normal">{plan.duration}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-300"
                    >
                      <Check
                        size={16}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {plan.channels.map((channel, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-white"
                    >
                      {getChannelLogo(channel)}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-2 rounded font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-600 text-white hover:bg-gray-500"
                  }`}
                >
                  Choose plan
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              onClick={() => {
                console.log("Selected plan:", selectedPlan);
                onClose();
              }}
            >
              Continue with {plans.find((p) => p.id === selectedPlan)?.name}{" "}
              Plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default PlanModal;
