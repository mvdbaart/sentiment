"use client";

import React, { useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SentimentScoreCards from "@/components/dashboard/SentimentScoreCards";
import TrendGraphs from "@/components/dashboard/TrendGraphs";
import ReviewSourceDistribution from "@/components/dashboard/ReviewSourceDistribution";
import ReviewFeed from "@/components/dashboard/ReviewFeed";
import CompetitorBenchmarking from "@/components/dashboard/CompetitorBenchmarking";
import PredictiveInsights from "@/components/dashboard/PredictiveInsights";
import DashboardActions from "@/components/dashboard/DashboardActions";
import DomainInput from "@/components/dashboard/DomainInput";
import { Star, MessageCircle, Clock } from "lucide-react";
// Import the Supabase database functions
import {
  saveDomainAnalysisToDatabase,
  getPreviousDomainAnalyses,
} from "@/lib/supabase";
// Import the API functions for fetching real review data
import {
  processAllReviews,
  lookupGooglePlaceId,
  lookupTrustpilotUrl,
} from "@/lib/api";

export default function Home() {
  // Mock user ID - in a real app, this would come from authentication
  const userId = "user-123";
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analyzedDomain, setAnalyzedDomain] = React.useState("");
  const [previousDomains, setPreviousDomains] = React.useState<
    { domain: string; date: string }[]
  >([
    // Sample data - in a real app, this would be loaded from the database
    {
      domain: "example.com",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      domain: "acme.org",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      domain: "test-site.net",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);
  const [error, setError] = React.useState("");
  const [dashboardData, setDashboardData] = React.useState({
    sentimentScore: 7.8,
    totalReviews: 1248,
    averageRating: 4.2,
    responseRate: 92,
    sentimentData: [
      { name: "Jan", sentiment: 7.2, reviewCount: 120 },
      { name: "Feb", sentiment: 7.5, reviewCount: 132 },
      { name: "Mar", sentiment: 7.1, reviewCount: 125 },
      { name: "Apr", sentiment: 7.8, reviewCount: 145 },
      { name: "May", sentiment: 8.0, reviewCount: 165 },
      { name: "Jun", sentiment: 8.2, reviewCount: 170 },
      { name: "Jul", sentiment: 7.9, reviewCount: 158 },
      { name: "Aug", sentiment: 8.3, reviewCount: 175 },
      { name: "Sep", sentiment: 8.5, reviewCount: 190 },
      { name: "Oct", sentiment: 8.7, reviewCount: 210 },
      { name: "Nov", sentiment: 8.6, reviewCount: 205 },
      { name: "Dec", sentiment: 8.8, reviewCount: 220 },
    ],
    reviewSources: [
      { name: "Google", count: 245, percentage: 42, color: "#4285F4" },
      { name: "Yelp", count: 132, percentage: 23, color: "#D32323" },
      { name: "Facebook", count: 98, percentage: 17, color: "#1877F2" },
      { name: "TripAdvisor", count: 67, percentage: 12, color: "#00AF87" },
      { name: "Trustpilot", count: 35, percentage: 6, color: "#00B67A" },
    ],
  });

  // Load previous domains from database on component mount
  useEffect(() => {
    async function loadPreviousDomains() {
      try {
        const analyses = await getPreviousDomainAnalyses(userId);
        setPreviousDomains(
          analyses.map((a) => ({ domain: a.domain, date: a.date })),
        );
      } catch (error) {
        console.error("Error loading previous domains:", error);
        // If there's an error loading from Supabase, keep the sample data
      }
    }

    loadPreviousDomains();
  }, [userId]);

  const handleDomainAnalysis = (
    domain: string,
    googlePlaceId?: string,
    trustpilotUrl?: string,
    customUrl?: string,
  ) => {
    setIsAnalyzing(true);
    // Use the API to fetch real review data
    const fetchReviewData = async () => {
      try {
        // Process reviews from all sources
        const reviewData = await processAllReviews(
          googlePlaceId,
          trustpilotUrl,
          customUrl || domain, // Use domain as custom URL if no custom URL provided
        );

        // Create new dashboard data from the API response
        const newDashboardData = {
          sentimentScore: reviewData.metrics.sentimentScore,
          totalReviews: reviewData.metrics.totalReviews,
          averageRating: reviewData.metrics.averageRating,
          responseRate: Math.floor(85 + Math.random() * 10), // Random response rate between 85-95%
          sentimentData: reviewData.sentimentData,
          reviewSources: reviewData.sources,
          reviews: reviewData.combinedReviews,
        };

        // Update dashboard data
        setDashboardData(newDashboardData);

        // Save to previous domains if not already there
        if (!previousDomains.some((item) => item.domain === domain)) {
          const newDomainEntry = {
            domain: domain,
            date: new Date().toISOString(),
          };
          setPreviousDomains((prev) => [newDomainEntry, ...prev]);

          // Save to Supabase database
          try {
            await saveDomainAnalysisToDatabase(
              domain,
              newDashboardData,
              userId,
            );
          } catch (dbError) {
            console.error("Error saving to database:", dbError);
            // Continue even if database save fails
          }
        }

        setAnalyzedDomain(domain);
        setIsAnalyzing(false);
      } catch (error) {
        console.error("Error analyzing domain:", error);
        setError("Failed to analyze domain. Please try again.");
        setIsAnalyzing(false);
      }
    };

    fetchReviewData();
  };

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Domain Input at the top */}
        <DomainInput
          onAnalyze={handleDomainAnalysis}
          isAnalyzing={isAnalyzing}
          previousDomains={previousDomains}
          onSelectPreviousDomain={handleDomainAnalysis}
        />

        {analyzedDomain && !error && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              Analysis complete for:{" "}
              <span className="font-bold">{analyzedDomain}</span>
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        <SentimentScoreCards
          cards={[
            {
              title: "Overall Sentiment",
              value: `${dashboardData.sentimentScore}/10`,
              change: 12,
              trend: "up",
              icon: <Star className="h-5 w-5 text-yellow-500" />,
              description: "Compared to last month",
            },
            {
              title: "Total Reviews",
              value: dashboardData.totalReviews.toLocaleString(),
              change: 8,
              trend: "up",
              icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
              description: "Compared to last month",
            },
            {
              title: "Average Rating",
              value: `${dashboardData.averageRating}/5`,
              change: 5,
              trend: "up",
              icon: <Star className="h-5 w-5 text-yellow-500" />,
              description: "Compared to last month",
            },
            {
              title: "Response Rate",
              value: `${dashboardData.responseRate}%`,
              change: 3,
              trend: "down",
              icon: <Clock className="h-5 w-5 text-indigo-500" />,
              description: "Compared to last month",
            },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <TrendGraphs sentimentData={dashboardData.sentimentData} />
          <ReviewSourceDistribution sources={dashboardData.reviewSources} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div>
            <ReviewFeed reviews={dashboardData.reviews || []} />
          </div>
          <div className="space-y-6">
            <CompetitorBenchmarking />
            <PredictiveInsights />
          </div>
        </div>
      </div>
      <DashboardActions />
    </main>
  );
}
