"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MessageSquare, Filter, ArrowUpDown, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import ReviewFilterBar from "./ReviewFilterBar";
import ReviewCard from "./ReviewCard";

interface ReviewFeedProps {
  reviews?: Review[];
  isLoading?: boolean;
  onFilterChange?: (filters: any) => void;
  onSortChange?: (sortBy: string) => void;
}

interface Review {
  id: string;
  reviewText: string;
  source: string;
  date: string;
  rating: number;
  customerName: string;
  themes: {
    name: string;
    sentiment: "positive" | "negative" | "neutral";
  }[];
}

const ReviewFeed = ({
  reviews = [],

  isLoading = false,
  onFilterChange = () => {},
  onSortChange = () => {},
}: ReviewFeedProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // Filter reviews based on active tab
  const filteredReviews = reviews.filter((review) => {
    if (activeTab === "all") return true;
    if (activeTab === "positive") return review.rating >= 4;
    if (activeTab === "neutral") return review.rating === 3;
    if (activeTab === "negative") return review.rating <= 2;
    return true;
  });

  // If no reviews are provided, show a message
  const noReviews = reviews.length === 0;

  // Sort reviews based on sortBy state
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === "rating-high") {
      return b.rating - a.rating;
    }
    if (sortBy === "rating-low") {
      return a.rating - b.rating;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview,
  );
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    onSortChange(newSortBy);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="mb-4">
        <ReviewFilterBar onFilterChange={onFilterChange} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="all" className="px-4">
              All Reviews
            </TabsTrigger>
            <TabsTrigger value="positive" className="px-4">
              Positive
            </TabsTrigger>
            <TabsTrigger value="neutral" className="px-4">
              Neutral
            </TabsTrigger>
            <TabsTrigger value="negative" className="px-4">
              Negative
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              sortBy === "date" && "bg-muted",
            )}
            onClick={() => handleSortChange("date")}
          >
            <ArrowUpDown className="h-4 w-4" />
            Date
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              sortBy === "rating-high" && "bg-muted",
            )}
            onClick={() => handleSortChange("rating-high")}
          >
            <ArrowUpDown className="h-4 w-4" />
            Highest Rating
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              sortBy === "rating-low" && "bg-muted",
            )}
            onClick={() => handleSortChange("rating-low")}
          >
            <ArrowUpDown className="h-4 w-4" />
            Lowest Rating
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <Card className="flex-1 border border-border">
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="h-8 w-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <span className="ml-2">Loading reviews...</span>
            </div>
          ) : noReviews ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-2" />
              <h3 className="text-lg font-medium">No reviews available</h3>
              <p className="text-sm">Enter a domain above to analyze reviews</p>
            </div>
          ) : currentReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-2" />
              <h3 className="text-lg font-medium">No reviews found</h3>
              <p className="text-sm">
                Try adjusting your filters to see more reviews
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  reviewText={review.reviewText}
                  source={review.source}
                  date={review.date}
                  rating={review.rating}
                  customerName={review.customerName}
                  themes={review.themes}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />

                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationLink
                      key={index}
                      href="#"
                      isActive={currentPage === index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(index + 1);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  ))}

                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-4 text-sm text-muted-foreground">
        <p>
          Showing {indexOfFirstReview + 1}-
          {Math.min(indexOfLastReview, sortedReviews.length)} of{" "}
          {sortedReviews.length} reviews
        </p>
      </div>
    </div>
  );
};

export default ReviewFeed;
