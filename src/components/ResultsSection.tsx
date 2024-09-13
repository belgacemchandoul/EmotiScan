import { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { AnalysisResults } from "./HeroSection"; // Import the type

// Register chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface ResultProps {
  inputText: string;
  detectedLanguage: string;
  analysisResults: AnalysisResults;
  translatedText: string;
}

const ResultsSection = forwardRef<HTMLDivElement, ResultProps>(
  ({ detectedLanguage, analysisResults, translatedText }, ref) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      if (analysisResults) {
        setLoading(false);
      }
    }, [analysisResults]);

    const pieData = {
      labels: analysisResults?.emotions.map((data) => data.label),
      datasets: [
        {
          data: analysisResults?.emotions.map((data) => data.score),
          backgroundColor: [
            "#FFC107",
            "#00BCD4",
            "#FF5722",
            "#9C27B0",
            "#8BC34A",
          ],
          hoverBackgroundColor: [
            "#FFEB3B",
            "#00E5FF",
            "#FF7043",
            "#D1C4E9",
            "#C5E1A5",
          ],
        },
      ],
    };

    const barData = {
      labels: ["Positive", "Negative", "Neutral"],
      datasets: [
        {
          label: "Sentiment",
          data: [
            analysisResults?.sentiment.positive,
            analysisResults?.sentiment.negative,
            analysisResults?.sentiment.neutral,
          ],
          backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
        },
      ],
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center h-64" ref={ref}>
          <p className="text-xl text-gray-500 animate-pulse">
            Loading analysis...
          </p>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 px-6 md:px-12 py-8 bg-white shadow-md rounded-lg "
        ref={ref}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-900">
          Analysis Results
        </h2>

        <p className="text-lg mb-8 text-center">
          Overall Sentiment:{" "}
          <span
            className={`font-semibold ${
              analysisResults.sentiment.positive >
              analysisResults.sentiment.negative
                ? "text-green-600"
                : analysisResults.sentiment.negative >
                  analysisResults.sentiment.positive
                ? "text-red-600"
                : "text-yellow-500"
            }`}
          >
            {analysisResults?.sentiment.positive >
            analysisResults?.sentiment.negative
              ? "Positive"
              : analysisResults?.sentiment.negative >
                analysisResults?.sentiment.positive
              ? "Negative"
              : "Neutral"}
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-800">
              Emotion Distribution
            </h3>
            <Pie data={pieData} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-800">
              Sentiment Breakdown
            </h3>
            <Bar data={barData} />
          </div>
        </div>
        {translatedText && (
          <div className=" text-center mt-10 bg-gray-100 p-6 rounded-lg shadow-md overflow-hidden break-words">
            <p className="text-xl font-semibold mb-4 text-blue-800 ">
              Translation Language:{" "}
              <span className="text-lg text-gray-800">{detectedLanguage}</span>
            </p>
            <h3 className="text-xl font-semibold mb-4 text-blue-800 ">
              Translated Text
            </h3>
            <p className="text-lg text-gray-800">{translatedText}</p>
          </div>
        )}
      </motion.div>
    );
  }
);

export default ResultsSection;
