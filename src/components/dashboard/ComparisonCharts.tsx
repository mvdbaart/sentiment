import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Activity, TrendingUp, Clock } from "lucide-react";

interface ComparisonChartsProps {
  competitors?: {
    name: string;
    sentimentScore: number;
    responseTime: number;
    positiveThemes: { theme: string; percentage: number }[];
    negativeThemes: { theme: string; percentage: number }[];
  }[];
  businessData?: {
    name: string;
    sentimentScore: number;
    responseTime: number;
    positiveThemes: { theme: string; percentage: number }[];
    negativeThemes: { theme: string; percentage: number }[];
  };
}

const ComparisonCharts = ({
  competitors = [
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
  ],
  businessData = {
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
  },
}: ComparisonChartsProps) => {
  return (
    <div className="w-full h-full bg-background">
      <Tabs defaultValue="sentiment" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="sentiment" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Sentiment</span>
          </TabsTrigger>
          <TabsTrigger value="themes" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Themes</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trends</span>
          </TabsTrigger>
          <TabsTrigger value="response" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Response Time</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sentiment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Score Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sentiment score bars */}
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        {businessData.name}
                      </span>
                      <span className="text-sm font-medium">
                        {businessData.sentimentScore}/10
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{
                          width: `${(businessData.sentimentScore / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {competitors.map((competitor, index) => (
                    <div className="flex flex-col" key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {competitor.name}
                        </span>
                        <span className="text-sm font-medium">
                          {competitor.sentimentScore}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full"
                          style={{
                            width: `${(competitor.sentimentScore / 10) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="themes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Positive Themes Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Positive themes comparison */}
                {businessData.positiveThemes.map((theme, themeIndex) => (
                  <div key={themeIndex} className="space-y-3">
                    <h4 className="text-sm font-medium">{theme.theme}</h4>
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">{businessData.name}</span>
                          <span className="text-xs">{theme.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${theme.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {competitors.map((competitor, index) => {
                        const compTheme = competitor.positiveThemes.find(
                          (t) => t.theme === theme.theme,
                        );
                        return compTheme ? (
                          <div className="flex flex-col" key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs">{competitor.name}</span>
                              <span className="text-xs">
                                {compTheme.percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${compTheme.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Negative Themes Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Negative themes comparison */}
                {businessData.negativeThemes.map((theme, themeIndex) => (
                  <div key={themeIndex} className="space-y-3">
                    <h4 className="text-sm font-medium">{theme.theme}</h4>
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">{businessData.name}</span>
                          <span className="text-xs">{theme.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${theme.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {competitors.map((competitor, index) => {
                        const compTheme = competitor.negativeThemes.find(
                          (t) => t.theme === theme.theme,
                        );
                        return compTheme ? (
                          <div className="flex flex-col" key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs">{competitor.name}</span>
                              <span className="text-xs">
                                {compTheme.percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${compTheme.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center border border-dashed rounded-md p-4">
                <p className="text-muted-foreground text-center">
                  Line chart visualization showing sentiment trends over time
                  for your business vs competitors
                  <br />
                  (Actual chart implementation would use a charting library like
                  Recharts)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Average Response Time (hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Response time bars */}
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        {businessData.name}
                      </span>
                      <span className="text-sm font-medium">
                        {businessData.responseTime} hrs
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{
                          width: `${(businessData.responseTime / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {competitors.map((competitor, index) => (
                    <div className="flex flex-col" key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {competitor.name}
                        </span>
                        <span className="text-sm font-medium">
                          {competitor.responseTime} hrs
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full"
                          style={{
                            width: `${(competitor.responseTime / 10) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComparisonCharts;
