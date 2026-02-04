import { useDeleteRole } from "../hooks/mutations/useDeleteRole";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { Role } from "../types/roleTypes";
import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";

type DeleteRoleButtonProps = {
  roleName: string;
};

export default function DeleteRoleButton({ roleName }: DeleteRoleButtonProps) {
  const { mutateAsync, isPending } = useDeleteRole();
  const queryClient = useQueryClient();

  async function handleDelete() {
    await mutateAsync({ roleName });
    queryClient.setQueryData<Role[]>(["roles"], (oldRoles) =>
      oldRoles?.filter((role) => role.name !== roleName),
    );

    toast.success("Rôle supprimé avec succès", {
      position: "top-center",
    });
  }
  return <ConfirmDeleteModal isRemoving={isPending} onConfirm={handleDelete} />;
}
