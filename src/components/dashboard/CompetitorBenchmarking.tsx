"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Activity,
  TrendingUp,
  Clock,
  ChevronDown,
} from "lucide-react";
import CompetitorUrlInput from "./CompetitorUrlInput";
import ComparisonCharts from "./ComparisonCharts";

interface CompetitorBenchmarkingProps {
  initialCompetitors?: string[];
  onCompetitorAnalysis?: (competitors: string[]) => void;
}

const CompetitorBenchmarking = ({
  initialCompetitors = ["www.competitor1.com", "www.competitor2.com"],
  onCompetitorAnalysis = () => {},
}: CompetitorBenchmarkingProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [analyzedCompetitors, setAnalyzedCompetitors] =
    useState<string[]>(initialCompetitors);

  // Mock data for business and competitors
  const businessData = {
    name: "Your Business",
    sentimentScore: 8.2,
    responseTime: 3.5,
    positiveThemes: [
      { theme: "Quality", percentage: 72 },
      { theme: "Service", percentage: 68 },
      { theme: "Value", percentage: 54 },
    ],
    negativeThemes: [
      { theme: "Delivery", percentage: 18 },
      { theme: "Price", percentage: 15 },
    ],
  };

  const competitors = [
    {
      name: "Competitor A",
      sentimentScore: 7.8,
      responseTime: 4.2,
      positiveThemes: [
        { theme: "Quality", percentage: 65 },
        { theme: "Service", percentage: 58 },
        { theme: "Value", percentage: 42 },
      ],
      negativeThemes: [
        { theme: "Delivery", percentage: 28 },
        { theme: "Price", percentage: 22 },
      ],
    },
    {
      name: "Competitor B",
      sentimentScore: 6.9,
      responseTime: 6.8,
      positiveThemes: [
        { theme: "Quality", percentage: 59 },
        { theme: "Innovation", percentage: 62 },
        { theme: "Support", percentage: 48 },
      ],
      negativeThemes: [
        { theme: "Usability", percentage: 32 },
        { theme: "Price", percentage: 29 },
      ],
    },
  ];

  const handleAnalyzeCompetitors = (urls: string[]) => {
    setIsAnalyzing(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      setAnalyzedCompetitors(urls);
      setIsAnalyzing(false);
      onCompetitorAnalysis(urls);
    }, 2000);
  };

  return (
    <Card className="w-full bg-background border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">
          Competitor Benchmarking
        </CardTitle>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-muted rounded-full"
        >
          <ChevronDown
            className={`h-5 w-5 transition-transform ${isExpanded ? "" : "rotate-180"}`}
          />
        </button>
      </CardHeader>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-6">
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-medium mb-3">
              Add Competitors to Analyze
            </h3>
            <CompetitorUrlInput
              previousCompetitors={analyzedCompetitors}
              onAnalyze={handleAnalyzeCompetitors}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {analyzedCompetitors.length > 0 && (
            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-medium mb-3">Benchmarking Results</h3>
              <ComparisonCharts
                businessData={businessData}
                competitors={competitors}
              />
            </div>
          )}

          {analyzedCompetitors.length === 0 && (
            <div className="flex items-center justify-center p-8 border border-dashed rounded-md">
              <p className="text-muted-foreground text-center">
                Add competitor URLs above to see benchmarking visualizations
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default CompetitorBenchmarking;
