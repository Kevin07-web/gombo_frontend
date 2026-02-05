import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";
import { useDeleteCommune } from "../hooks/mutations/useDeleteCommune";
import type { Commune } from "../types/CommuneType";

type DeleteCommuneButtonProps = {
  communeId: string;
};

export default function DeleteCommuneButton({
  communeId,
}: DeleteCommuneButtonProps) {
  const { mutateAsync, isPending } = useDeleteCommune();
  const queryClient = useQueryClient();

  async function handleDelete() {
    await mutateAsync({ communeId });
    queryClient.setQueryData<Commune[]>(["communes"], (oldCommunes) =>
      oldCommunes?.filter((c) => c.id !== communeId),
    );

    toast.success("commune supprimé avec succès", {
      position: "top-center",
    });
  }
  return <ConfirmDeleteModal isRemoving={isPending} onConfirm={handleDelete} />;
}
