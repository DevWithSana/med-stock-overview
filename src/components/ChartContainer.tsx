
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChartContainerProps {
  title: string;
  description?: string;
  chart: React.ReactNode;
  period?: string;
  onPeriodChange?: (value: string) => void;
  className?: string;
  downloadable?: boolean;
}

export function ChartContainer({ 
  title, 
  description, 
  chart, 
  period, 
  onPeriodChange, 
  className,
  downloadable = false
}: ChartContainerProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex space-x-2">
          {period && onPeriodChange && (
            <Select value={period} onValueChange={onPeriodChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          )}
          {downloadable && (
            <Button variant="outline" size="sm">
              <ArrowDown className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>{chart}</CardContent>
    </Card>
  );
}
