
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusType = 
  | "pending" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "canceled"
  | "low"
  | "medium"
  | "high"
  | "critical"
  | "normal"
  | "warning"
  | "danger"
  | "success";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = (status: StatusType | string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "canceled":
      case "danger":
        return "bg-red-100 text-red-800 border-red-200";
      case "low":
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
      case "warning":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "high":
      case "normal":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: StatusType | string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "processing":
        return "En cours";
      case "shipped":
        return "Expédié";
      case "delivered":
        return "Livré";
      case "canceled":
        return "Annulé";
      case "low":
        return "Faible";
      case "medium":
        return "Moyen";
      case "high":
        return "Bon";
      case "critical":
        return "Critique";
      case "normal":
        return "Normal";
      case "warning":
        return "Attention";
      case "danger":
        return "Alerte";
      case "success":
        return "Succès";
      default:
        return status;
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium capitalize border",
        getStatusStyles(status),
        className
      )}
    >
      {getStatusLabel(status)}
    </Badge>
  );
}
