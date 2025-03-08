"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Globe, Check, X } from "lucide-react";
import { lookupGooglePlaceId, lookupTrustpilotUrl } from "@/lib/api";

interface DomainInputProps {
  onAnalyze?: (
    domain: string,
    googlePlaceId?: string,
    trustpilotUrl?: string,
    customUrl?: string,
  ) => void;
  isAnalyzing?: boolean;
  previousDomains?: { domain: string; date: string }[];
  onSelectPreviousDomain?: (domain: string) => void;
}

const DomainInput = ({
  onAnalyze = () => {},
  isAnalyzing = false,
  previousDomains = [],
  onSelectPreviousDomain = () => {},
}: DomainInputProps) => {
  const [domain, setDomain] = useState("");
  const [googlePlaceId, setGooglePlaceId] = useState("");
  const [trustpilotUrl, setTrustpilotUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupStatus, setLookupStatus] = useState<{
    google: boolean;
    trustpilot: boolean;
  }>({ google: false, trustpilot: false });

  const validateDomain = (domain: string) => {
    // Basic domain validation
    const domainPattern =
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainPattern.test(domain);
  };

  // Auto-lookup Google Place ID and Trustpilot URL when domain changes
  useEffect(() => {
    const lookupExternalIds = async () => {
      if (domain && validateDomain(domain)) {
        setIsLookingUp(true);
        setLookupStatus({ google: false, trustpilot: false });

        try {
          // Lookup Google Place ID
          const placeId = await lookupGooglePlaceId(domain);
          if (placeId) {
            setGooglePlaceId(placeId);
            setLookupStatus((prev) => ({ ...prev, google: true }));
          }

          // Lookup Trustpilot URL
          const trustpilotUrlResult = await lookupTrustpilotUrl(domain);
          if (trustpilotUrlResult) {
            setTrustpilotUrl(trustpilotUrlResult);
            setLookupStatus((prev) => ({ ...prev, trustpilot: true }));
          }
        } catch (error) {
          console.error("Error looking up external IDs:", error);
        } finally {
          setIsLookingUp(false);
        }
      }
    };

    // Debounce the lookup to avoid too many API calls
    const timeoutId = setTimeout(() => {
      if (domain && validateDomain(domain)) {
        lookupExternalIds();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [domain]);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();

    if (!domain.trim()) {
      setError("Please enter a domain");
      return;
    }

    if (!validateDomain(domain)) {
      setError("Please enter a valid domain");
      return;
    }

    setError("");
    onAnalyze(domain, googlePlaceId, trustpilotUrl, customUrl);
  };

  return (
    <div className="w-full bg-muted/30 rounded-lg p-4 mb-6">
      {previousDomains.length > 0 && (
        <div className="mb-4">
          <label className="text-sm font-medium mb-1 block">
            Previously Analyzed Domains
          </label>
          <select
            className="w-full p-2 border rounded-md bg-background"
            onChange={(e) => onSelectPreviousDomain(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select a previously analyzed domain
            </option>
            {previousDomains.map((item, index) => (
              <option key={index} value={item.domain}>
                {item.domain} - {new Date(item.date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      )}
      <form onSubmit={handleAnalyze} className="flex flex-col space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">
              Enter Domain to Analyze
            </label>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="example.com"
                value={domain}
                onChange={(e) => {
                  const newDomain = e.target.value;
                  setDomain(newDomain);
                  setError("");

                  // Clear previous lookup results if domain changes significantly
                  if (
                    !newDomain.includes(domain) &&
                    !domain.includes(newDomain)
                  ) {
                    setGooglePlaceId("");
                    setTrustpilotUrl("");
                    setLookupStatus({ google: false, trustpilot: false });
                  }
                }}
                className={`pl-10 ${error ? "border-destructive" : ""}`}
              />
            </div>
            <Button
              type="submit"
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze Domain
                </>
              )}
            </Button>
          </div>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="mb-2"
          >
            {showAdvanced ? "Hide" : "Show"} Advanced Options
          </Button>

          {showAdvanced && (
            <div className="space-y-3 p-3 border rounded-md bg-muted/20">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">
                    Google Place ID (auto-detected)
                  </label>
                  {isLookingUp ? (
                    <span className="text-xs text-muted-foreground">
                      Looking up...
                    </span>
                  ) : lookupStatus.google ? (
                    <span className="text-xs text-green-600 flex items-center">
                      <Check className="h-3 w-3 mr-1" /> Found
                    </span>
                  ) : domain && validateDomain(domain) ? (
                    <span className="text-xs text-amber-600 flex items-center">
                      <X className="h-3 w-3 mr-1" /> Not found
                    </span>
                  ) : null}
                </div>
                <Input
                  type="text"
                  placeholder="Auto-detected from domain"
                  value={googlePlaceId}
                  onChange={(e) => setGooglePlaceId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  For frissestart.nl use: ChIJNw9t0Xsnx0cROeYmuzxPx3c
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">
                    Trustpilot Business URL (auto-detected)
                  </label>
                  {isLookingUp ? (
                    <span className="text-xs text-muted-foreground">
                      Looking up...
                    </span>
                  ) : lookupStatus.trustpilot ? (
                    <span className="text-xs text-green-600 flex items-center">
                      <Check className="h-3 w-3 mr-1" /> Found
                    </span>
                  ) : domain && validateDomain(domain) ? (
                    <span className="text-xs text-amber-600 flex items-center">
                      <X className="h-3 w-3 mr-1" /> Not found
                    </span>
                  ) : null}
                </div>
                <Input
                  type="text"
                  placeholder="Auto-detected from domain"
                  value={trustpilotUrl}
                  onChange={(e) => setTrustpilotUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically detected if available on Trustpilot
                </p>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Custom Review URL (optional)
                </label>
                <Input
                  type="text"
                  placeholder="https://example.com/reviews"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter any URL with reviews to be scraped and analyzed
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default DomainInput;
