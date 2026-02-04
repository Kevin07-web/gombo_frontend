import { Spinner } from "@/shared/components/ui/spinner";
import { useRoles } from "../hooks/queries/useRoles";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import DeleteRoleButton from "./DeleteRoleButton";
import { RoleModal } from "./RoleModal";
import { Button } from "@/shared/components/ui/button";
import { Eye } from "lucide-react";

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
              <Button variant="gray">
                <Eye size={16} />
              </Button>
              <RoleModal role={role} isEdit={true} />
              <DeleteRoleButton roleName={role.name} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
