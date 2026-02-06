import { TableCell, TableRow } from "@/shared/components/ui/table";
import { useServices } from "../hooks/queries/useServices";
import { ServiceModal } from "./ServiceModal";
import DeleteServiceButton from "./DeleteServiceButton";
import { TableLoading } from "@/features/dashboard/components/TableLoading";
import { TableError } from "@/features/dashboard/components/TableError";
import TableFetching from "@/features/dashboard/components/TableFetching";
import { truncate } from "@/shared/utils/tuncate";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import { ServiceDetailModal } from "./ServiceDetailModal";

export default function ServiceList() {
  const { data: services, isLoading, isFetching, error } = useServices();

  if (isLoading) {
    return <TableLoading />;
  }
  if (error) {
    return (
      <TableError
        description="Impossible de charger les services pour le moment."
        buttonLabel="Réessayer"
        onButtonClick={() => window.location.reload()}
      />
    );
  }
  if (!services?.length) {
    return (
      <TableRow>
        <TableCell
          colSpan={4}
          className="text-center py-6 text-muted-foreground"
        >
          Aucune service disponible
        </TableCell>
      </TableRow>
    );
  }
  return (
    <>
      {isFetching && !isLoading && <TableFetching />}
      {services?.map((s) => (
        <TableRow
          key={s.id}
          className={`transition ${isFetching && "opacity-60 pointer-events-none"}`}
        >
          <TableCell>
            <span className="font-medium">#</span> {truncate(s.id)}
          </TableCell>

          <TableCell className="font-semibold">{s.libelle}</TableCell>

          <TableCell className="text-muted-foreground">
            {s.description ? truncate(s.description, 10) : ""}
          </TableCell>
          <TableCell>
            <StatusBadge status={s.statut} />
          </TableCell>

          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <ServiceDetailModal service={s} />
              <ServiceModal service={s} isEdit={true} />
              <DeleteServiceButton serviceId={s.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
