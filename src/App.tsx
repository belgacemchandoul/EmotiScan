import { useState } from "react";
import HeroSection from "./components/HeroSection";
import ResultsSection from "./components/ResultsSection";
import { AnalysisResults } from "./components/HeroSection";
function App() {
  const [inputText, setInputText] = useState<string>("");
  const [detectedLanguage, setDetectedLanguage] = useState<string>("en"); // default to English
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null); // Placeholder for analysis results

  const handleAnalysis = (
    text: string,
    language: string,
    results: AnalysisResults
  ) => {
    setInputText(text);
    setDetectedLanguage(language);
    setAnalysisResults(results);
  };
  return (
    <div>
      <HeroSection onAnalyze={handleAnalysis} />{" "}
      {analysisResults && (
        <ResultsSection
          detectedLanguage={detectedLanguage}
          inputText={inputText}
          analysisResults={analysisResults}
        />
      )}
    </div>
  );
}

export default App;
