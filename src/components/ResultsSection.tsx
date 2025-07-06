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
  ChartOptions,
} from "chart.js";
import { AnalysisResults } from "./HeroSection";

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
  analysisResults: AnalysisResults;
}

const ResultsSection = forwardRef<HTMLDivElement, ResultProps>(
  ({ analysisResults }, ref) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      if (analysisResults) {
        setLoading(false);
      }
    }, [analysisResults]);

    const pieData = analysisResults && {
      labels: analysisResults?.emotions.map(
        (data) => data.label.charAt(0).toUpperCase() + data.label.slice(1)
      ),
      datasets: [
        {
          data: analysisResults?.emotions.map(
            (data) => Math.round(data.score * 100) / 100
          ),
          backgroundColor: [
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
            "#DDA0DD",
          ],
          hoverBackgroundColor: [
            "#FF8E8E",
            "#6EDCD4",
            "#67C3D1",
            "#A8D8C4",
            "#FFE4B7",
            "#E8B0E8",
          ],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    };

    const barData = {
      labels: ["Positive", "Negative", "Neutral"],
      datasets: [
        {
          label: "Sentiment Score",
          data: [
            Math.round((analysisResults?.sentiment.positive || 0) * 100) / 100,
            Math.round((analysisResults?.sentiment.negative || 0) * 100) / 100,
            Math.round((analysisResults?.sentiment.neutral || 0) * 100) / 100,
          ],
          backgroundColor: [
            "rgba(76, 175, 80, 0.8)",
            "rgba(244, 67, 54, 0.8)",
            "rgba(255, 193, 7, 0.8)",
          ],
          borderColor: [
            "rgba(76, 175, 80, 1)",
            "rgba(244, 67, 54, 1)",
            "rgba(255, 193, 7, 1)",
          ],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };

    const pieOptions: ChartOptions<"pie"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw as number;
              const percentage = (
                (value /
                  context.dataset.data.reduce(
                    (a: number, b: number) => a + b,
                    0
                  )) *
                100
              ).toFixed(1);
              return `${label}: ${value.toFixed(3)} (${percentage}%)`;
            },
          },
        },
      },
    };

    const barOptions: ChartOptions<"bar"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.raw as number;
              return `Score: ${value.toFixed(3)}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            callback: function (value) {
              return (value as number).toFixed(1);
            },
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center h-64" ref={ref}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-500">Loading analysis...</p>
          </div>
        </div>
      );
    }

    const getSentimentInfo = () => {
      const { positive, negative, neutral } = analysisResults.sentiment;
      if (positive > negative && positive > neutral) {
        return { label: "Positive", color: "text-green-600", emoji: "😊" };
      } else if (negative > positive && negative > neutral) {
        return { label: "Negative", color: "text-red-600", emoji: "😔" };
      } else {
        return { label: "Neutral", color: "text-yellow-600", emoji: "😐" };
      }
    };

    const sentimentInfo = getSentimentInfo();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 px-6 md:px-12 py-8 bg-white shadow-xl rounded-2xl border border-gray-100"
        ref={ref}
      >
        <motion.h2
          className="text-4xl font-extrabold mb-6 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          📊 Analysis Results
        </motion.h2>

        <motion.div
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 text-center border border-blue-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg mb-2 text-gray-700">Overall Sentiment</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-3xl">{sentimentInfo.emoji}</span>
            <span className={`text-2xl font-bold ${sentimentInfo.color}`}>
              {sentimentInfo.label}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Confidence:{" "}
            {Math.max(
              analysisResults.sentiment.positive,
              analysisResults.sentiment.negative,
              analysisResults.sentiment.neutral
            ).toFixed(3)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-gray-50 rounded-xl p-6 border border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
              🎭 Emotion Distribution
            </h3>
            <div className="h-80">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-xl p-6 border border-gray-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
              📈 Sentiment Breakdown
            </h3>
            <div className="h-80">
              <Bar data={barData} options={barOptions} />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-3 text-gray-800">
            🔍 Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Dominant Emotion:</p>
              <p className="font-semibold text-gray-800">
                {analysisResults.emotions
                  .reduce((prev, current) =>
                    prev.score > current.score ? prev : current
                  )
                  .label.charAt(0)
                  .toUpperCase() +
                  analysisResults.emotions
                    .reduce((prev, current) =>
                      prev.score > current.score ? prev : current
                    )
                    .label.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Emotion Intensity:</p>
              <p className="font-semibold text-gray-800">
                {(
                  analysisResults.emotions.reduce((prev, current) =>
                    prev.score > current.score ? prev : current
                  ).score * 100
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

ResultsSection.displayName = "ResultsSection";

export default ResultsSection;
