import { useEffect, useRef, useState } from "react";
import HeroSection from "./components/HeroSection";
import ResultsSection from "./components/ResultsSection";
import { AnalysisResults } from "./components/HeroSection";
const App = () => {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [detectedLanguage, setDetectedLanguage] = useState<string>("en");
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null);
  const [translatedText, setTranslatedText] = useState<string>("");
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
  const handleAnalysis = (
    text: string,
    language: string,
    results: AnalysisResults
  ) => {
    setInputText(text);
    setDetectedLanguage(language);
    setAnalysisResults(results);
    if (resultRef.current) {
      console.log("Scrolling to results section", resultRef.current); // Debug log
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleTranslate = (text: string, language: string) => {
    setTranslatedText(text);
    setDetectedLanguage(language);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };
  return (
    <div>
      <HeroSection onAnalyze={handleAnalysis} onTranslate={handleTranslate} />{" "}
      {analysisResults && (
        <ResultsSection
          detectedLanguage={detectedLanguage}
          inputText={inputText}
          analysisResults={analysisResults}
          translatedText={translatedText}
          ref={resultRef}
        />
      )}
    </div>
  );
};

export default App;
