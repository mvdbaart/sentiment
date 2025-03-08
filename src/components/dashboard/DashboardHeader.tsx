"use client";

import React from "react";
import { Bell, Settings, HelpCircle, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onSearch?: (query: string) => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
  notificationCount?: number;
}

const DashboardHeader = ({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar = "",
  onSearch = () => {},
  onSettingsClick = () => {},
  onHelpClick = () => {},
  onNotificationsClick = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
  notificationCount = 3,
}: DashboardHeaderProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <div className="mr-8">
          <h1 className="text-xl font-bold">Sentiment Analysis</h1>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reviews, themes, sources..."
            className="pl-10 w-[300px] bg-background"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onHelpClick}
          className="relative"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationsClick}
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {notificationCount}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
              aria-label="User menu"
            >
              <Avatar className="h-8 w-8">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-primary/10">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
