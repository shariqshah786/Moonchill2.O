import { InteractiveCheckout } from "@/components/ui/interactive-checkout";
import React from "react";

const CheckoutPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <div className="flex flex-col items-center justify-center py-10">
          <InteractiveCheckout />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
