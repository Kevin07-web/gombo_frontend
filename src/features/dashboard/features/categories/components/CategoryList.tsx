import { Spinner } from "@/shared/components/ui/spinner";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { useCategories } from "../hooks/queries/useCategories";
import { CategoryModal } from "./CategoryModal";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { CategoryDetailModal } from "./CategoryDetailModal";

export default function CategoryList() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading)
    return (
      <TableRow>
        <TableCell colSpan={4}>
          <Spinner className="size-10 relative left-1/2 -translate-x-1/2" />
        </TableCell>
      </TableRow>
    );
  if (error) return <p>Erreur chargement</p>;

  return (
    <>
      {categories?.map((ctg) => (
        <TableRow key={ctg.id}>
          <TableCell className="font-medium">{ctg.id}</TableCell>
          <TableCell>{ctg.libelle}</TableCell>
          <TableCell>{ctg.description}</TableCell>
          <TableCell>{ctg.status || "Inconnu"}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-3">
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
