import { Spinner } from "@/shared/components/ui/spinner";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { useCategories } from "../hooks/queries/useCategories";
import { CategoryModal } from "./CategoryModal";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { CategoryDetailModal } from "./CategoryDetailModal";
import { TableLoading } from "@/features/dashboard/components/TableLoading";
import { TableError } from "@/features/dashboard/components/TableError";
import { truncate } from "@/shared/utils/tuncate";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";

export default function CategoryList() {
  const { data: categories, isLoading, isFetching, error } = useCategories();

  if (isLoading) {
    return <TableLoading />;
  }
  if (error) {
    return (
      <TableError
        description="Impossible de charger les categories pour le moment."
        buttonLabel="Réessayer"
        onButtonClick={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      {isFetching && !isLoading && (
        <TableRow className="absolute pointer-events-none inset-0 flex justify-center items-center">
          <TableCell colSpan={4} className="py-2 text-center">
            <Spinner className="size-12 mx-auto" />
          </TableCell>
        </TableRow>
      )}
      {categories?.map((ctg) => (
        <TableRow
          key={ctg.id}
          className={`transition ${isFetching && "opacity-60 pointer-events-none"}`}
        >
          <TableCell>
            <span className="font-medium">#</span> {truncate(ctg.id)}
          </TableCell>

          <TableCell className="font-semibold">{ctg.libelle}</TableCell>

          <TableCell className="text-muted-foreground">
            {ctg.description ? truncate(ctg.description, 10) : ""}
          </TableCell>
          <TableCell>
            <StatusBadge status={ctg.statut} />
          </TableCell>

          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <CategoryDetailModal ctg={ctg} />
              <CategoryModal ctg={ctg} isEdit={true} />
              <DeleteCategoryButton ctgId={ctg.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
