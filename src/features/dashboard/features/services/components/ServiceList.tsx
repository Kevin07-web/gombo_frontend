import { Spinner } from "@/shared/components/ui/spinner";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { useServices } from "../hooks/queries/useServices";
import { ServiceModal } from "./ServiceModal";
import DeleteServiceButton from "./DeleteServiceButton";

export default function ServiceList() {
  const { data: services, isLoading, error } = useServices();

  if (isLoading)
    return (
      <TableRow>
        <TableCell colSpan={4}>
          <Spinner className="size-10 relative left-1/2 -translate-x-1/2" />
        </TableCell>
      </TableRow>
    );
  if (error) return <p>Erreur chargement</p>;
  console.log(services);
  return (
    <>
      {services?.map((s) => (
        <TableRow key={s.id} className="font-heading">
          <TableCell className="font-medium">{s.id}</TableCell>
          <TableCell>{s.libelle}</TableCell>
          <TableCell>{s.description}</TableCell>
          <TableCell>{s.statut || "Inconnu"}</TableCell>
          <TableCell>{s.categorieLibelle || "Inconnu"}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-3">
              <ServiceModal service={s} isEdit={true} />
              <DeleteServiceButton serviceId={s.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
