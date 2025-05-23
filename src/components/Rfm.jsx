import React from 'react';
import image from "../assets/rfm_image1.jpg"

const Rfm = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700 uppercase">User Segmentation</h1>
      <div className="flex justify-center">
        <img src={image} alt="RFM Segmentation" className="w-full max-w-6xl rounded shadow-lg" />
      </div>
    </div>
  );
};

export default Rfm;
