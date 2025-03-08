import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, BarChart, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewSourceData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface ReviewSourceDistributionProps {
  sources?: ReviewSourceData[];
  totalReviews?: number;
  period?: string;
}

const ReviewSourceDistribution = ({
  sources = [
    { name: "Google", count: 245, percentage: 42, color: "#4285F4" },
    { name: "Yelp", count: 132, percentage: 23, color: "#D32323" },
    { name: "Facebook", count: 98, percentage: 17, color: "#1877F2" },
    { name: "TripAdvisor", count: 67, percentage: 12, color: "#00AF87" },
    { name: "Trustpilot", count: 35, percentage: 6, color: "#00B67A" },
  ],
  totalReviews = 577,
  period = "Last 30 days",
}: ReviewSourceDistributionProps) => {
  return (
    <div className="w-full h-full bg-background border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Review Source Distribution</h2>
        <div className="text-sm text-muted-foreground">{period}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Distribution by Source
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[220px] w-full flex items-center justify-center">
              {/* Placeholder for actual pie chart - would use Recharts in real implementation */}
              <div className="relative h-[180px] w-[180px] rounded-full border-8 border-gray-100 flex items-center justify-center">
                {sources.map((source, index) => {
                  // Create pie segments with CSS conic-gradient
                  const previousSegments = sources
                    .slice(0, index)
                    .reduce((acc, curr) => acc + curr.percentage, 0);

                  return (
                    <div
                      key={source.name}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(${source.color} ${previousSegments}% ${previousSegments + source.percentage}%, transparent ${previousSegments + source.percentage}% 100%)`,
                      }}
                    />
                  );
                })}
                <div className="bg-white h-[120px] w-[120px] rounded-full flex flex-col items-center justify-center z-10">
                  <span className="text-2xl font-bold">{totalReviews}</span>
                  <span className="text-xs text-muted-foreground">
                    Total Reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {sources.map((source) => (
                <div key={source.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm">{source.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {source.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Reviews by Source
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sources.map((source) => (
                <div key={source.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-sm font-medium">{source.name}</span>
                    </div>
                    <span className="text-sm">{source.count} reviews</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${source.percentage}%`,
                        backgroundColor: source.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Total Reviews</span>
                </div>
                <span className="font-bold">{totalReviews}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewSourceDistribution;
