import { useEffect, useRef, useState } from "react";
import HeroSection from "./components/HeroSection";
import ResultsSection from "./components/ResultsSection";
import { AnalysisResults } from "./components/HeroSection";
const App = () => {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null);

  useEffect(() => {
    if (analysisResults && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [analysisResults]);
  const handleAnalysis = (text: string, results: AnalysisResults) => {
    setInputText(text);
    setAnalysisResults(results);
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <HeroSection onAnalyze={handleAnalysis} />{" "}
      {analysisResults && (
        <ResultsSection
          inputText={inputText}
          analysisResults={analysisResults}
          ref={resultRef}
        />
      )}
    </div>
  );
};

export default App;
