import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

interface HeroSectionProps {
  onAnalyze: (text: string, results: AnalysisResults) => void;
}

interface EmotionResult {
  label: string;
  score: number;
}

interface SentimentResult {
  label: string;
  score: number;
}

interface SentimentAnalysis {
  positive: number;
  negative: number;
  neutral: number;
}

export interface AnalysisResults {
  emotions: EmotionResult[];
  sentiment: SentimentAnalysis;
}

const HeroSection = ({ onAnalyze }: HeroSectionProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAnalyze = async () => {
    if (!inputText) return;
    setIsAnalyzing(true);
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion",
        { inputs: inputText },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
          },
        }
      );

      const emotions = response.data[0].map((result: EmotionResult) => ({
        label: result.label,
        score: result.score,
      }));
      const sentimentResponse = await axios.post(
        "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
        { inputs: inputText },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
          },
        }
      );

      const sentimentResults = sentimentResponse.data[0];
      let dominantSentiment = sentimentResults[0];

      sentimentResults.forEach((result: SentimentResult) => {
        if (result.score > dominantSentiment.score) {
          dominantSentiment = result;
        }
      });

      const sentimentData: SentimentAnalysis = {
        positive:
          dominantSentiment.label === "positive" ? dominantSentiment.score : 0,
        negative:
          dominantSentiment.label === "negative" ? dominantSentiment.score : 0,
        neutral:
          dominantSentiment.label === "neutral" ? dominantSentiment.score : 0,
      };

      const results = { emotions, sentiment: sentimentData };
      onAnalyze(inputText, results);
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      setErrorMessage("Failed to analyze the text. Please try again.");
      console.error("Error analyzing text:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
          🧠 EmotiScan
        </motion.h1>

        <motion.p
          className="text-gray-300 text-xl "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          🔍 Discover the Emotions and Sentiments Behind Your Words. Enter Text
          to Begin Your Analysis!
        </motion.p>

        <motion.div
          className="flex justify-center items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        ></motion.div>

        <motion.div
          className="mt-8 flex flex-col items-center "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <input
            type="text"
            className="w-full max-w-xl mx-auto py-4 px-6 bg-gray-800 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition transform hover:scale-105 shadow-lg duration-200"
            placeholder={`Type or paste your Text here...`}
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            className={`w-full max-w-xl mt-4 py-3 mb-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg focus:outline-none duration-200 ${
              isAnalyzing || inputText.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={isAnalyzing || inputText.length === 0}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </button>
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
          <motion.p
            className="p-4 mb-4 mt-10 font-thin text-xs text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            *We’re currently experiencing issues with the AI’s API. Please bear
            with us while we work to resolve it. We also disabled translation
            features due to this problem. Thank you for your patience!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
