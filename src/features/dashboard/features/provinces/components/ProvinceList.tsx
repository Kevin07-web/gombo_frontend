import { TableCell, TableRow } from "@/shared/components/ui/table";
import { useProvinces } from "../hooks/queries/useProvinces";
import { ProvinceModal } from "./ProvinceModal";
import DeleteProvinceButton from "./DeleteProvinceButton";
import { TableLoading } from "@/features/dashboard/components/TableLoading";
import { TableError } from "@/features/dashboard/components/TableError";
import TableFetching from "@/features/dashboard/components/TableFetching";
import { truncate } from "@/shared/utils/tuncate";
import { ProvinceDetailModal } from "./ProvinceDetailModal";

export default function ProvinceList() {
  const { data: provinces, isLoading, isFetching, error } = useProvinces();

  if (isLoading) {
    return <TableLoading />;
  }
  if (error) {
    return (
      <TableError
        description="Impossible de charger les provinces pour le moment."
        buttonLabel="Réessayer"
        onButtonClick={() => window.location.reload()}
      />
    );
  }
  if (!provinces?.length) {
    return (
      <TableRow>
        <TableCell
          colSpan={4}
          className="text-center py-6 text-muted-foreground"
        >
          Aucune province disponible
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {isFetching && !isLoading && <TableFetching />}
      {provinces?.map((p) => (
        <TableRow
          key={p.id}
          className={`transition ${isFetching && "opacity-60 pointer-events-none"}`}
        >
          <TableCell>
            <span className="font-medium">#</span> {truncate(p.id)}
          </TableCell>
          <TableCell className="font-semibold">{p.libelle}</TableCell>
          <TableCell>{p.longitude}</TableCell>
          <TableCell>{p.latitude}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-3">
              <ProvinceDetailModal province={p} />
              <ProvinceModal province={p} isEdit={true} />
              <DeleteProvinceButton provinceId={p.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
