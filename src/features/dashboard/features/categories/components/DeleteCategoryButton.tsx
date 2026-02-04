import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";
import type { Category } from "../types/CategoryTypes";
import { useDeleteCategory } from "../hooks/mutations/useDeleteCategory";

type DeleteRoleButtonProps = {
  ctgId: string;
};

export default function DeleteCategoryButton({ ctgId }: DeleteRoleButtonProps) {
  const { mutateAsync, isPending } = useDeleteCategory();
  const queryClient = useQueryClient();

  async function handleDelete() {
    await mutateAsync({ ctgId });
    queryClient.setQueryData<Category[]>(["categories"], (oldCtgs) =>
      oldCtgs?.filter((c) => c.id !== ctgId),
    );

    toast.success("Categories supprimé avec succès", {
      position: "top-center",
    });
  }
  return <ConfirmDeleteModal isRemoving={isPending} onConfirm={handleDelete} />;
}
