import { Spinner } from "@/shared/components/ui/spinner";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Eye } from "lucide-react";
import { useQuartiers } from "../hooks/queries/useQuartiers";
import { QuartierModal } from "./QuartierModal";
import DeleteQuartierButton from "./DeleteQuartierButton";

export default function QuartierList() {
  const { data: quartiers, isLoading, error } = useQuartiers();

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
      {quartiers?.map((q) => (
        <TableRow key={q.id} className="font-heading">
          <TableCell className="font-medium">{q.id}</TableCell>
          <TableCell>{q.libelle}</TableCell>
          <TableCell>{q.longitude || "Inconnu"}</TableCell>
          <TableCell>{q.latitude || "Inconnu"}</TableCell>
          <TableCell>{q.communeLibelle || "Inconnu"}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-3">
              <Button variant="gray">
                <Eye size={16} />
              </Button>
              <QuartierModal quartier={q} isEdit={true} />
              <DeleteQuartierButton quartierId={q.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
