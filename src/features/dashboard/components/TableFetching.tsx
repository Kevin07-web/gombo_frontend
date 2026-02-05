import { Spinner } from "@/shared/components/ui/spinner";
import { TableCell, TableRow } from "@/shared/components/ui/table";

export default function TableFetching() {
  return (
    <TableRow className="absolute pointer-events-none inset-0 flex justify-center items-center">
      <TableCell colSpan={4} className="py-2 text-center">
        <Spinner className="size-12 mx-auto" />
      </TableCell>
    </TableRow>
  );
}
