"use client";
import PlansModal from "components/RazorpayPayment/RazorpayButton";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-20">
        {/* <RazorpayButton /> */}

        <PlansModal />
      </div>
    </>
  );
};

export default page;
