import { TableCell, TableRow } from "@/shared/components/ui/table";
import { useRegions } from "../hooks/queries/useRegions";
import { RegionModal } from "./RegionModal";
import DeleteRegionButton from "./DeleteRegionButton";
import { TableLoading } from "@/features/dashboard/components/TableLoading";
import { TableError } from "@/features/dashboard/components/TableError";
import TableFetching from "@/features/dashboard/components/TableFetching";
import { truncate } from "@/shared/utils/tuncate";
import { RegionDetailModal } from "./RegionDetailModal";

export default function RegionList() {
  const { data: regions, isLoading, isFetching, error } = useRegions();

  if (isLoading) {
    return <TableLoading />;
  }
  if (error) {
    return (
      <TableError
        description="Impossible de charger les régions pour le moment."
        buttonLabel="Réessayer"
        onButtonClick={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      {isFetching && !isLoading && <TableFetching />}
      {regions?.map((r) => (
        <TableRow
          key={r.id}
          className={`transition ${isFetching && "opacity-60 pointer-events-none"}`}
        >
          <TableCell>
            <span className="font-medium">#</span> {truncate(r.id)}
          </TableCell>

          <TableCell className="font-semibold">{r.libelle}</TableCell>
          <TableCell className="font-semibold">{r.longitude}</TableCell>
          <TableCell className="font-semibold">{r.latitude}</TableCell>

          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <RegionDetailModal region={r} />
              <RegionModal region={r} isEdit={true} />
              <DeleteRegionButton regionId={r.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
