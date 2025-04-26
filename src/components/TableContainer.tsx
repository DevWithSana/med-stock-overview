
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TableContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  showSearch?: boolean;
  showFilter?: boolean;
  showExport?: boolean;
}

export function TableContainer({
  title,
  description,
  children,
  showSearch = true,
  showFilter = true,
  showExport = true,
}: TableContainerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {showSearch && (
              <div className="relative w-full sm:w-[200px]">
                <Input placeholder="Rechercher..." className="w-full" />
              </div>
            )}
            <div className="flex gap-2">
              {showFilter && (
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              )}
              {showExport && (
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
