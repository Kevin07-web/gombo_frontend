// TableError.tsx
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface TableErrorProps {
  colSpan?: number; // par défaut 4
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function TableError({
  colSpan = 4,
  description = "Une erreur est survenue lors du chargement des données.",
  buttonLabel = "Réessayer",
  onButtonClick,
}: TableErrorProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center text-destructive">
          <AlertTriangle className="w-12 h-12 text-destructive/80" />
          <p className="text-sm text-destructive/70">{description}</p>
          {buttonLabel && onButtonClick && (
            <Button size="sm" variant="destructive" onClick={onButtonClick}>
              {buttonLabel}
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
