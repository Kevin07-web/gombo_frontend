import { Spinner } from "@/shared/components/ui/spinner";
import { useRoles } from "../hooks/queries/useRoles";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import DeleteRoleButton from "./DeleteRoleButton";
import { RoleModal } from "./RoleModal";

export default function RoleList() {
  const { data: roles, isLoading, error } = useRoles();

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
      {roles?.map((role) => (
        <TableRow key={role.id}>
          <TableCell className="font-medium">{role.id}</TableCell>
          <TableCell>{role.name}</TableCell>
          <TableCell>{role.description}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-3">
              <RoleModal role={role} isEdit={true} />
              <DeleteRoleButton roleName={role.name} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
