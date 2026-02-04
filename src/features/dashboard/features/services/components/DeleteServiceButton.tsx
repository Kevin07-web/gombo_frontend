import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";
import { useDeleteService } from "../hooks/mutations/useDeleteService";
import type { Service } from "../types/serviceType";

type DeleteServiceButtonProps = {
  serviceId: string;
};

export default function DeleteServiceButton({
  serviceId,
}: DeleteServiceButtonProps) {
  const { mutateAsync, isPending } = useDeleteService();
  const queryClient = useQueryClient();

  async function handleDelete() {
    await mutateAsync({ serviceId });
    queryClient.setQueryData<Service[]>(["services"], (oldServices) =>
      oldServices?.filter((s) => s.id !== serviceId),
    );

    toast.success("Service supprimé avec succès", {
      position: "top-center",
    });
  }
  return <ConfirmDeleteModal isRemoving={isPending} onConfirm={handleDelete} />;
}
