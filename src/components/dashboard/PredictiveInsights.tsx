import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Download,
} from "lucide-react";

interface PredictiveInsightsProps {
  sentimentForecast?: {
    currentScore: number;
    predictedScore: number;
    trend: "up" | "down" | "stable";
    timeframe: string;
  };
  businessImpact?: {
    revenue: {
      value: string;
      trend: "up" | "down" | "stable";
    };
    customerRetention: {
      value: string;
      trend: "up" | "down" | "stable";
    };
    marketShare: {
      value: string;
      trend: "up" | "down" | "stable";
    };
  };
  recommendations?: {
    priority: "high" | "medium" | "low";
    title: string;
    description: string;
    potentialImpact: string;
  }[];
}

const PredictiveInsights = ({
  sentimentForecast = {
    currentScore: 7.8,
    predictedScore: 8.2,
    trend: "up",
    timeframe: "next 30 days",
  },
  businessImpact = {
    revenue: {
      value: "+5.2%",
      trend: "up",
    },
    customerRetention: {
      value: "+3.8%",
      trend: "up",
    },
    marketShare: {
      value: "+2.1%",
      trend: "up",
    },
  },
  recommendations = [
    {
      priority: "high",
      title: "Improve delivery times",
      description:
        "Customer feedback indicates delivery speed is a key pain point. Consider optimizing logistics or partnering with additional delivery services.",
      potentialImpact: "Could increase sentiment score by 0.5 points",
    },
    {
      priority: "medium",
      title: "Address pricing concerns",
      description:
        "Reviews frequently mention pricing as an issue. Consider a pricing strategy review or better communicate value proposition.",
      potentialImpact: "Could increase sentiment score by 0.3 points",
    },
    {
      priority: "low",
      title: "Enhance product documentation",
      description:
        "Some customers report confusion about product features. Improving documentation could reduce support inquiries.",
      potentialImpact: "Could increase sentiment score by 0.2 points",
    },
  ],
}: PredictiveInsightsProps) => {
  return (
    <div className="w-full h-full bg-background">
      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="forecast" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Sentiment Forecast</span>
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Business Impact</span>
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="flex items-center gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            <span>AI Recommendations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forecasted Sentiment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Sentiment Score
                    </p>
                    <p className="text-3xl font-bold">
                      {sentimentForecast.currentScore.toFixed(1)}
                    </p>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Predicted Score
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <p className="text-3xl font-bold">
                        {sentimentForecast.predictedScore.toFixed(1)}
                      </p>
                      <div
                        className={`flex items-center ${sentimentForecast.trend === "up" ? "text-green-500" : sentimentForecast.trend === "down" ? "text-red-500" : "text-yellow-500"}`}
                      >
                        {sentimentForecast.trend === "up" ? (
                          <ArrowUp className="h-5 w-5" />
                        ) : sentimentForecast.trend === "down" ? (
                          <ArrowDown className="h-5 w-5" />
                        ) : null}
                        <span className="text-sm font-medium">
                          {(
                            sentimentForecast.predictedScore -
                            sentimentForecast.currentScore
                          ).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[200px] flex items-center justify-center border border-dashed rounded-md p-4">
                  <p className="text-muted-foreground text-center">
                    Line chart visualization showing forecasted sentiment trends
                    over {sentimentForecast.timeframe}
                    <br />
                    (Actual chart implementation would use Recharts library)
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Forecast Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on current review trends and AI analysis, your
                    sentiment score is predicted to
                    {sentimentForecast.trend === "up"
                      ? " increase"
                      : sentimentForecast.trend === "down"
                        ? " decrease"
                        : " remain stable"}
                    over the {sentimentForecast.timeframe}. This forecast takes
                    into account seasonal patterns, recent business changes, and
                    industry benchmarks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Potential Business Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/30 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">
                    Projected Revenue Impact
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {businessImpact.revenue.value}
                    </p>
                    <div
                      className={`${businessImpact.revenue.trend === "up" ? "text-green-500" : businessImpact.revenue.trend === "down" ? "text-red-500" : "text-yellow-500"}`}
                    >
                      {businessImpact.revenue.trend === "up" ? (
                        <ArrowUp className="h-5 w-5" />
                      ) : businessImpact.revenue.trend === "down" ? (
                        <ArrowDown className="h-5 w-5" />
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">
                    Customer Retention
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {businessImpact.customerRetention.value}
                    </p>
                    <div
                      className={`${businessImpact.customerRetention.trend === "up" ? "text-green-500" : businessImpact.customerRetention.trend === "down" ? "text-red-500" : "text-yellow-500"}`}
                    >
                      {businessImpact.customerRetention.trend === "up" ? (
                        <ArrowUp className="h-5 w-5" />
                      ) : businessImpact.customerRetention.trend === "down" ? (
                        <ArrowDown className="h-5 w-5" />
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">
                    Market Share
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">
                      {businessImpact.marketShare.value}
                    </p>
                    <div
                      className={`${businessImpact.marketShare.trend === "up" ? "text-green-500" : businessImpact.marketShare.trend === "down" ? "text-red-500" : "text-yellow-500"}`}
                    >
                      {businessImpact.marketShare.trend === "up" ? (
                        <ArrowUp className="h-5 w-5" />
                      ) : businessImpact.marketShare.trend === "down" ? (
                        <ArrowDown className="h-5 w-5" />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[200px] flex items-center justify-center border border-dashed rounded-md p-4 mb-6">
                <p className="text-muted-foreground text-center">
                  Bar chart visualization showing correlation between sentiment
                  score and business metrics
                  <br />
                  (Actual chart implementation would use Recharts library)
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-md">
                <h4 className="font-medium mb-2">Impact Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI model predicts that the forecasted sentiment changes
                  will have a positive impact on key business metrics. The
                  projected increases in revenue, customer retention, and market
                  share are based on historical correlations between sentiment
                  scores and business performance in your industry.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="border rounded-md overflow-hidden"
                  >
                    <div
                      className={`px-4 py-3 flex items-center justify-between ${recommendation.priority === "high" ? "bg-red-50 border-b border-red-100" : recommendation.priority === "medium" ? "bg-yellow-50 border-b border-yellow-100" : "bg-blue-50 border-b border-blue-100"}`}
                    >
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            recommendation.priority === "high"
                              ? "destructive"
                              : recommendation.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className={`${recommendation.priority === "high" ? "bg-red-100 text-red-800 hover:bg-red-200 border-red-200" : recommendation.priority === "medium" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200" : "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200"}`}
                        >
                          {recommendation.priority.charAt(0).toUpperCase() +
                            recommendation.priority.slice(1)}{" "}
                          Priority
                        </Badge>
                        <h3 className="font-medium">{recommendation.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-sm text-gray-700 mb-3">
                        {recommendation.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {recommendation.potentialImpact}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Recommendations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveInsights;
