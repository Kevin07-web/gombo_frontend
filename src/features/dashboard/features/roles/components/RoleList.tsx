import { useRoles } from "../hooks/queries/useRoles";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import DeleteRoleButton from "./DeleteRoleButton";
import { RoleModal } from "./RoleModal";
import { TableError } from "@/features/dashboard/components/TableError";
import { TableLoading } from "@/features/dashboard/components/TableLoading";
import { truncate } from "@/shared/utils/tuncate";
import TableFetching from "@/features/dashboard/components/TableFetching";

export default function RoleList() {
  const { data: roles, isLoading, isFetching, error } = useRoles();

  if (isLoading) {
    return <TableLoading />;
  }
  if (error) {
    return (
      <TableError
        description="Impossible de charger les rôles pour le moment."
        buttonLabel="Réessayer"
        onButtonClick={() => window.location.reload()}
      />
    );
  }

  if (!roles?.length) {
    return (
      <TableRow>
        <TableCell
          colSpan={4}
          className="text-center py-6 text-muted-foreground"
        >
          Aucun rôle disponible
        </TableCell>
      </TableRow>
    );
  }
  return (
    <>
      {isFetching && !isLoading && <TableFetching />}
      {roles?.map((role) => (
        <TableRow
          key={role.id}
          className={`transition ${isFetching && "opacity-60 pointer-events-none"}`}
        >
          <TableCell>
            <span className="font-medium">#</span> {truncate(role.id)}
          </TableCell>

          <TableCell className="font-semibold">{role.name}</TableCell>

          <TableCell className="text-muted-foreground">
            {role.description}
          </TableCell>

          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <RoleModal roleName={role.name} isEdit={true} />
              <DeleteRoleButton roleName={role.name} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
