// src/components/common/SplashLoader.jsx
import React from "react";
import QuantumPulseLoader from "../ui/quantum-pulse-loade";

const SplashLoader = () => (
  <div className="flex justify-center items-center min-h-screen bg-white">
    <QuantumPulseLoader />
  </div>
);

export default SplashLoader;
