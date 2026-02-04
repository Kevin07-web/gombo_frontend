import { Spinner } from "@/shared/components/ui/spinner";
import { TableCell, TableRow } from "@/shared/components/ui/table";

import { Button } from "@/shared/components/ui/button";
import { Eye } from "lucide-react";
import { useProvinces } from "../hooks/queries/useProvinces";
import { ProvinceModal } from "./ProvinceModal";
import DeleteProvinceButton from "./DeleteProvinceButton";

export default function ProvinceList() {
  const { data: provinces, isLoading, error } = useProvinces();

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
      {provinces?.map((p) => (
        <TableRow key={p.id} className="font-heading">
          <TableCell className="font-medium">{p.id}</TableCell>
          <TableCell>{p.libelle}</TableCell>
          <TableCell>{p.longitude || "Inconnu"}</TableCell>
          <TableCell>{p.latitude || "Inconnu"}</TableCell>
          <TableCell>{p.regionLibelle || "Inconnu"}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-3">
              <Button variant="gray">
                <Eye size={16} />
              </Button>
              <ProvinceModal province={p} isEdit={true} />
              <DeleteProvinceButton provinceId={p.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
