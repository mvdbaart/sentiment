"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart2,
  LineChart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";

interface TrendGraphsProps {
  timeRange?: string;
  sentimentData?: any[];
  reviewCountData?: any[];
  onTimeRangeChange?: (range: string) => void;
}

const TrendGraphs = ({
  timeRange = "monthly",
  onTimeRangeChange = () => {},
  sentimentData = [
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
  reviewCountData = [
    { name: "Google", count: 450, percentage: 45 },
    { name: "Yelp", count: 250, percentage: 25 },
    { name: "Facebook", count: 150, percentage: 15 },
    { name: "TrustPilot", count: 100, percentage: 10 },
    { name: "Other", count: 50, percentage: 5 },
  ],
}: TrendGraphsProps) => {
  const [activeTab, setActiveTab] = useState("sentiment");
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  const handleTimeRangeChange = (value: string) => {
    setSelectedTimeRange(value);
    onTimeRangeChange(value);
  };

  // Calculate sentiment change
  const currentSentiment = sentimentData[sentimentData.length - 1].sentiment;
  const previousSentiment = sentimentData[sentimentData.length - 2].sentiment;
  const sentimentChange =
    ((currentSentiment - previousSentiment) / previousSentiment) * 100;
  const isSentimentPositive = sentimentChange >= 0;

  // Calculate review count change
  const currentReviewCount =
    sentimentData[sentimentData.length - 1].reviewCount;
  const previousReviewCount =
    sentimentData[sentimentData.length - 2].reviewCount;
  const reviewCountChange =
    ((currentReviewCount - previousReviewCount) / previousReviewCount) * 100;
  const isReviewCountPositive = reviewCountChange >= 0;

  return (
    <div className="w-full h-full bg-background rounded-lg border border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Sentiment & Review Trends</h2>
          <div className="flex items-center space-x-2">
            <Select
              value={selectedTimeRange}
              onValueChange={handleTimeRangeChange}
            >
              <SelectTrigger className="w-[150px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="sentiment" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Sentiment Trend</span>
            </TabsTrigger>
            <TabsTrigger value="volume" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Review Volume</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Sentiment Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">
                        {currentSentiment.toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">out of 10</p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center text-sm",
                        isSentimentPositive ? "text-green-600" : "text-red-600",
                      )}
                    >
                      {isSentimentPositive ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      )}
                      <span>{Math.abs(sentimentChange).toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">{currentReviewCount}</p>
                      <p className="text-xs text-muted-foreground">
                        this {selectedTimeRange}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center text-sm",
                        isReviewCountPositive
                          ? "text-green-600"
                          : "text-red-600",
                      )}
                    >
                      {isReviewCountPositive ? (
                        <TrendingUp className="mr-1 h-4 w-4" />
                      ) : (
                        <TrendingDown className="mr-1 h-4 w-4" />
                      )}
                      <span>{Math.abs(reviewCountChange).toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Score Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={sentimentData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip
                        formatter={(value) => [`${value}`, "Sentiment Score"]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sentiment"
                        stroke="#10b981"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Sentiment Score"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volume" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review Volume Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={sentimentData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value}`, "Reviews"]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Legend />
                      <Bar
                        dataKey="reviewCount"
                        fill="#6366f1"
                        name="Review Count"
                        radius={[4, 4, 0, 0]}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Source Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={reviewCountData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip
                        formatter={(value) => [
                          `${value} reviews (${reviewCountData.find((item) => item.count === value)?.percentage}%)`,
                          "Count",
                        ]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Legend />
                      <Bar
                        dataKey="count"
                        fill="#8884d8"
                        name="Review Count"
                        radius={[0, 4, 4, 0]}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrendGraphs;
