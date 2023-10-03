import React from "react";
import banner1 from "@/assets/images/image1.png";

const LeftSide: React.FC = () => {
  return (
    <div className="text-center shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink lg:w-6/12 xl:w-6/12">
      <img src={banner1} className="w-full" alt="Banner 1" />
    </div>
  );
};

export default LeftSide;
