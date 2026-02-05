import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";
import type { Quartier } from "../types/quartierType";
import { useDeleteQuartier } from "../hooks/mutations/useDeleteQuartier";

type DeleteQuartierButtonProps = {
  quartierId: string;
};

export default function DeleteQuartierButton({
  quartierId,
}: DeleteQuartierButtonProps) {
  const { mutateAsync, isPending } = useDeleteQuartier();
  const queryClient = useQueryClient();

  async function handleDelete() {
    await mutateAsync({ quartierId });
    queryClient.setQueryData<Quartier[]>(["quartiers"], (oldQuartiers) =>
      oldQuartiers?.filter((q) => q.id !== quartierId),
    );

    toast.success("quartier supprimé avec succès", {
      position: "top-center",
    });
  }
  return <ConfirmDeleteModal isRemoving={isPending} onConfirm={handleDelete} />;
}
