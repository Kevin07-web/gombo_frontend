import { Spinner } from "@/shared/components/ui/spinner";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { useRegions } from "../hooks/queries/useRegions";
import { RegionModal } from "./RegionModal";
import DeleteRegionButton from "./DeleteRegionButton";
import { Button } from "@/shared/components/ui/button";
import { Eye } from "lucide-react";

export default function RegionList() {
  const { data: regions, isLoading, error } = useRegions();

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
      {regions?.map((r) => (
        <TableRow key={r.id} className="font-heading">
          <TableCell className="font-medium">{r.id}</TableCell>
          <TableCell>{r.libelle}</TableCell>
          <TableCell>{r.longitude || "Inconnu"}</TableCell>
          <TableCell>{r.latitude || "Inconnu"}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-3">
              <Button variant="gray">
                <Eye size={16} />
              </Button>
              <RegionModal region={r} isEdit={true} />
              <DeleteRegionButton regionId={r.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
