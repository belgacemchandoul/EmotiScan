import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import InputModeButton from "./InputModeButton";
function HeroSection() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedInputMode, setSelectedInputMode] = useState<string>("text");
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <section className="relative bg-black text-white min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-black to-gray-800 opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.5 }}
      />

      <div className="absolute -top-10 -left-20 w-96 h-96 bg-cyan-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 text-center max-w-3xl px-4">
        <motion.h1
          className="text-6xl font-extrabold tracking-tight mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          EmotiScan
        </motion.h1>

        <motion.p
          className="text-gray-300 text-xl mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Uncover Sentiments and Emotions in Text & Comments. Enter your text or
          a URL to get started.
        </motion.p>

        <motion.div
          className="flex justify-center items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <InputModeButton
            text="text"
            onClick={() => setSelectedInputMode("text")}
            selectedInputMode={selectedInputMode}
          />
          <InputModeButton
            text="URL"
            onClick={() => setSelectedInputMode("URL")}
            selectedInputMode={selectedInputMode}
          />
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <input
            type="text"
            className="w-full max-w-xl mx-auto py-4 px-6 bg-gray-800 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition transform hover:scale-105 shadow-lg duration-200"
            placeholder={`Type or paste your ${selectedInputMode} here...`}
            ref={inputRef}
          />
          <button className="w-full max-w-xl mt-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg focus:outline-none duration-200">
            Analyze
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
