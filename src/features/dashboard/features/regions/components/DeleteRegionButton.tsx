import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";
import type { Region } from "../types/regionType";
import { useDeleteRegion } from "../hooks/queries/useDeleteRegion";

type DeleteServiceButtonProps = {
  regionId: string;
};

export default function DeleteRegionButton({
  regionId,
}: DeleteServiceButtonProps) {
  const { mutateAsync, isPending } = useDeleteRegion();
  const queryClient = useQueryClient();

  async function handleDelete() {
    await mutateAsync({ regionId });
    queryClient.setQueryData<Region[]>(["regions"], (oldRegions) =>
      oldRegions?.filter((r) => r.id !== regionId),
    );

    toast.success("Region supprimé avec succès", {
      position: "top-center",
    });
  }
  return <ConfirmDeleteModal isRemoving={isPending} onConfirm={handleDelete} />;
}
