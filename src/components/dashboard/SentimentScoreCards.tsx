import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Star, MessageCircle, Clock } from "lucide-react";

interface ScoreCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  description?: string;
}

interface SentimentScoreCardsProps {
  cards?: ScoreCardProps[];
}

const ScoreCard = ({
  title = "Score",
  value = "0",
  change = 0,
  icon = <Star className="h-5 w-5" />,
  trend = "neutral",
  description = "Compared to last period",
}: ScoreCardProps) => {
  return (
    <Card className="bg-white border-gray-200 hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {trend === "up" && (
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>{Math.abs(change)}%</span>
            </div>
          )}
          {trend === "down" && (
            <div className="flex items-center text-red-600 text-sm">
              <ArrowDown className="h-4 w-4 mr-1" />
              <span>{Math.abs(change)}%</span>
            </div>
          )}
          {trend === "neutral" && (
            <div className="text-gray-500 text-sm">No change</div>
          )}
          <span className="text-gray-500 text-xs ml-2">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const SentimentScoreCards = ({ cards }: SentimentScoreCardsProps = {}) => {
  const defaultCards: ScoreCardProps[] = [
    {
      title: "Overall Sentiment",
      value: "8.4/10",
      change: 12,
      trend: "up",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      description: "Compared to last month",
    },
    {
      title: "Total Reviews",
      value: "1,248",
      change: 8,
      trend: "up",
      icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
      description: "Compared to last month",
    },
    {
      title: "Average Rating",
      value: "4.7/5",
      change: 5,
      trend: "up",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      description: "Compared to last month",
    },
    {
      title: "Response Rate",
      value: "92%",
      change: 3,
      trend: "down",
      icon: <Clock className="h-5 w-5 text-indigo-500" />,
      description: "Compared to last month",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="w-full bg-background py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayCards.map((card, index) => (
          <ScoreCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default SentimentScoreCards;
