// TableLoading.tsx
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { Spinner } from "@/shared/components/ui/spinner";

interface TableLoadingProps {
  colSpan?: number; // par défaut 4
  size?: number; // taille du spinner
  paddingY?: string; // padding vertical, ex: "py-10"
}

export function TableLoading({
  colSpan = 4,
  size = 8,
  paddingY = "py-10",
}: TableLoadingProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={paddingY}>
        <Spinner className={`size-${size} mx-auto`} />
      </TableCell>
    </TableRow>
  );
}
