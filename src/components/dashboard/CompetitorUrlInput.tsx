"use client";

import React, { useState } from "react";
import { PlusCircle, X, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface CompetitorUrlInputProps {
  onAnalyze?: (urls: string[]) => void;
  previousCompetitors?: string[];
  isAnalyzing?: boolean;
}

const CompetitorUrlInput = ({
  onAnalyze = () => {},
  previousCompetitors = [
    "www.competitor1.com",
    "www.competitor2.com",
    "www.competitor3.com",
  ],
  isAnalyzing = false,
}: CompetitorUrlInputProps) => {
  const [url, setUrl] = useState("");
  const [competitors, setCompetitors] = useState<string[]>(previousCompetitors);
  const [error, setError] = useState("");

  const validateUrl = (url: string) => {
    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
    return urlPattern.test(url);
  };

  const handleAddCompetitor = () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    if (competitors.includes(url)) {
      setError("This competitor is already in the list");
      return;
    }

    setCompetitors([...competitors, url]);
    setUrl("");
    setError("");
  };

  const handleRemoveCompetitor = (competitorUrl: string) => {
    setCompetitors(competitors.filter((c) => c !== competitorUrl));
  };

  const handleAnalyze = () => {
    onAnalyze(competitors);
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg border border-border">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter competitor URL (e.g., www.competitor.com)"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              className={cn(error && "border-destructive")}
            />
            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
          </div>
          <Button
            onClick={handleAddCompetitor}
            size="sm"
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Add
          </Button>
        </div>

        {competitors.length > 0 && (
          <Card className="bg-muted/40">
            <CardContent className="p-3">
              <div className="text-sm font-medium mb-2">
                Competitors to analyze:
              </div>
              <div className="flex flex-wrap gap-2">
                {competitors.map((competitor, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-background rounded-md px-3 py-1 text-sm border border-border"
                  >
                    {competitor}
                    <button
                      onClick={() => handleRemoveCompetitor(competitor)}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleAnalyze}
            disabled={competitors.length === 0 || isAnalyzing}
            className="flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Analyze Competitors
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompetitorUrlInput;
