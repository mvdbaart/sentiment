import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface ReviewTheme {
  name: string;
  sentiment: "positive" | "negative" | "neutral";
}

interface ReviewCardProps {
  reviewText: string;
  source: string;
  sourceIcon?: React.ReactNode;
  date: string;
  rating: number;
  maxRating?: number;
  customerName?: string;
  themes?: ReviewTheme[];
}

const highlightSentiment = (text: string): React.ReactNode => {
  // Simple regex to identify positive and negative words
  const positiveWords =
    /\b(good|great|excellent|amazing|love|best|fantastic|awesome|happy|satisfied)\b/gi;
  const negativeWords =
    /\b(bad|poor|terrible|awful|hate|worst|disappointing|horrible|unhappy|dissatisfied)\b/gi;

  // Split text by positive and negative words and wrap them in spans with appropriate colors
  let result = text;
  let parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Function to process matches
  const processMatches = (regex: RegExp, className: string) => {
    const matches = [...result.matchAll(new RegExp(regex, "gi"))];
    if (matches.length === 0) return;

    let newParts: React.ReactNode[] = [];
    let currentIndex = 0;

    matches.forEach((match) => {
      if (match.index !== undefined) {
        // Add text before the match
        if (match.index > currentIndex) {
          newParts.push(result.substring(currentIndex, match.index));
        }
        // Add the highlighted match
        newParts.push(
          <span key={`${match[0]}-${match.index}`} className={className}>
            {match[0]}
          </span>,
        );
        currentIndex = match.index + match[0].length;
      }
    });

    // Add any remaining text
    if (currentIndex < result.length) {
      newParts.push(result.substring(currentIndex));
    }

    return newParts;
  };

  // Process positive words first
  const withPositive = processMatches(
    positiveWords,
    "text-green-600 font-medium",
  );
  if (withPositive) {
    // Then process negative words in the result
    const withBoth = [];
    for (const part of withPositive) {
      if (typeof part === "string") {
        const negativeProcessed = processMatches(
          negativeWords,
          "text-red-600 font-medium",
        );
        if (negativeProcessed) {
          withBoth.push(...negativeProcessed);
        } else {
          withBoth.push(part);
        }
      } else {
        withBoth.push(part);
      }
    }
    return withBoth;
  }

  // If no positive words, just process negative
  const withNegative = processMatches(
    negativeWords,
    "text-red-600 font-medium",
  );
  return withNegative || text;
};

const ReviewCard = ({
  reviewText = "This product is amazing! The customer service was excellent, though the delivery was a bit slow. Overall, I'm very satisfied with my purchase.",
  source = "Google",
  sourceIcon = source === "Google" ? (
    <Star className="h-4 w-4" />
  ) : source === "Trustpilot" ? (
    <Star className="h-4 w-4 text-green-500" />
  ) : (
    <Star className="h-4 w-4" />
  ),

  date = "2023-05-15",
  rating = 4,
  maxRating = 5,
  customerName = "John Doe",
  themes = [
    { name: "Customer Service", sentiment: "positive" },
    { name: "Delivery", sentiment: "negative" },
    { name: "Product Quality", sentiment: "positive" },
  ],
}: ReviewCardProps) => {
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="w-full bg-white border-gray-200 hover:border-gray-300 transition-all">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {sourceIcon}
            <span className="text-sm font-medium text-gray-700">{source}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          {Array.from({ length: maxRating }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300",
              )}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <p className="text-sm font-medium text-gray-700">{customerName}</p>
        </div>
        <p className="text-gray-700">{highlightSentiment(reviewText)}</p>
      </CardContent>
      <CardFooter className="pt-2 flex flex-wrap gap-2">
        {themes.map((theme, index) => (
          <Badge
            key={index}
            variant={
              theme.sentiment === "positive"
                ? "default"
                : theme.sentiment === "negative"
                  ? "destructive"
                  : "secondary"
            }
            className={cn(
              theme.sentiment === "positive" &&
                "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
              theme.sentiment === "negative" &&
                "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
              theme.sentiment === "neutral" &&
                "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200",
            )}
          >
            {theme.sentiment === "positive" && (
              <ThumbsUp className="mr-1 h-3 w-3" />
            )}
            {theme.sentiment === "negative" && (
              <ThumbsDown className="mr-1 h-3 w-3" />
            )}
            {theme.name}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
