"use client";

import React from "react";
import { Search, Calendar, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarPrimitive } from "react-day-picker";

interface ReviewFilterBarProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

interface FilterOptions {
  dateRange: string;
  source: string;
  sentiment: string;
  theme: string;
  searchQuery: string;
}

const ReviewFilterBar = ({ onFilterChange }: ReviewFilterBarProps = {}) => {
  const [filters, setFilters] = React.useState<FilterOptions>({
    dateRange: "last-30-days",
    source: "all",
    sentiment: "all",
    theme: "all",
    searchQuery: "",
  });

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange("searchQuery", e.target.value);
  };

  return (
    <div className="w-full h-60 bg-background border-b flex items-center justify-between px-4 py-2 space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reviews by keyword..."
          className="pl-9 w-full"
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="p-3">
            <Select
              value={filters.dateRange}
              onValueChange={(value) => handleFilterChange("dateRange", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>

      <Select
        value={filters.source}
        onValueChange={(value) => handleFilterChange("source", value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="google">Google</SelectItem>
          <SelectItem value="yelp">Yelp</SelectItem>
          <SelectItem value="facebook">Facebook</SelectItem>
          <SelectItem value="trustpilot">Trustpilot</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.sentiment}
        onValueChange={(value) => handleFilterChange("sentiment", value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sentiment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sentiment</SelectItem>
          <SelectItem value="positive">Positive</SelectItem>
          <SelectItem value="neutral">Neutral</SelectItem>
          <SelectItem value="negative">Negative</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.theme}
        onValueChange={(value) => handleFilterChange("theme", value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Themes</SelectItem>
          <SelectItem value="service">Service</SelectItem>
          <SelectItem value="quality">Quality</SelectItem>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="delivery">Delivery</SelectItem>
          <SelectItem value="support">Support</SelectItem>
        </SelectContent>
      </Select>

      <Button size="sm" variant="ghost">
        <Filter className="h-4 w-4 mr-1" />
        Reset
      </Button>
    </div>
  );
};

export default ReviewFilterBar;
