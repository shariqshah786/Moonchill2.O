"use client";
import React from "react";
import { motion } from "framer-motion"; // Use 'framer-motion', not 'motion/react'

export const TestimonialsColumn = ({
  testimonials = [],
  duration = 15,
  className = "",
}) => {
  return (
    <div className={` mt-4 relative h-[500px] overflow-hidden ${className}`}>
      <motion.div
        animate={{
          y: ["0%", "-50%"], // animate from top to halfway
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className=" grid grid-cols-3 gap-4"
      >
        {/* Repeat testimonials to give a smooth loop */}
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-6  rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full bg-white text-black"
                key={`${index}-${i}`}
              >
                <div>{text}</div>
                <div className=" flex flex-row items-center gap-2 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="leading-5 opacity-60 tracking-tight">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
