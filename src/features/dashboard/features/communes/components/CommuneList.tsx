import { Spinner } from "@/shared/components/ui/spinner";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Eye } from "lucide-react";
import { useCommunes } from "../hooks/queries/useCommunes";
import DeleteCommuneButton from "./DeleteCommuneButton";
import { CommuneModal } from "./communeModal";

export default function CommuneList() {
  const { data: communes, isLoading, error } = useCommunes();

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
      {communes?.map((c) => (
        <TableRow key={c.id} className="font-heading">
          <TableCell className="font-medium">{c.id}</TableCell>
          <TableCell>{c.libelle}</TableCell>
          <TableCell>{c.longitude || "Inconnu"}</TableCell>
          <TableCell>{c.latitude || "Inconnu"}</TableCell>
          <TableCell>{c.provinceLibelle || "Inconnu"}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-3">
              <Button variant="gray">
                <Eye size={16} />
              </Button>
              <CommuneModal commune={c} isEdit={true} />
              <DeleteCommuneButton communeId={c.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
