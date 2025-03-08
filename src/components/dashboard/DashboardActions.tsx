"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Download,
  FileText,
  Share2,
  Clock,
  Settings,
  ChevronDown,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";

interface DashboardActionsProps {
  onExport?: (format: string) => void;
  onSchedule?: () => void;
  onShare?: () => void;
  onSettings?: () => void;
}

const DashboardActions = ({
  onExport = () => {},
  onSchedule = () => {},
  onShare = () => {},
  onSettings = () => {},
}: DashboardActionsProps) => {
  const [scheduleDialogOpen, setScheduleDialogOpen] = React.useState(true);
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);

  return (
    <div className="w-full h-60 bg-background border-t flex items-center justify-end px-6 py-3 space-x-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onExport("csv")}>
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Export as CSV</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport("pdf")}>
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Export as PDF Report</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            <p>Export dashboard data</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog
              open={scheduleDialogOpen}
              onOpenChange={setScheduleDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Schedule Reports</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Regular Reports</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Frequency</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Format</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>PDF Report</option>
                        <option>CSV Data</option>
                        <option>Excel Spreadsheet</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Recipients</label>
                      <input
                        type="text"
                        placeholder="Enter email addresses"
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setScheduleDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      onSchedule();
                      setScheduleDialogOpen(false);
                    }}
                  >
                    Schedule
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent>
            <p>Schedule regular reports</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Dashboard</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Dashboard Link
                      </label>
                      <div className="flex mt-1">
                        <input
                          type="text"
                          value="https://sentiment-analysis.example.com/dashboard/share/abc123"
                          readOnly
                          className="flex-1 p-2 border rounded-l-md bg-muted"
                        />
                        <Button className="rounded-l-none">Copy</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Permission Settings
                      </label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>View only</option>
                        <option>View and comment</option>
                        <option>Full access</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Share with specific users
                      </label>
                      <input
                        type="text"
                        placeholder="Enter email addresses"
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      onShare();
                      setShareDialogOpen(false);
                    }}
                  >
                    Share
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share dashboard link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onSettings}>
              <Settings className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Dashboard settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DashboardActions;
