import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";
import { useDeleteProvince } from "../hooks/mutations/useDeleteProvince";
import type { Province } from "../types/ProvinceType";

type DeleteServiceButtonProps = {
  provinceId: string;
};

export default function DeleteProvinceButton({
  provinceId,
}: DeleteServiceButtonProps) {
  const { mutateAsync, isPending } = useDeleteProvince();
  const queryClient = useQueryClient();

  async function handleDelete() {
    await mutateAsync({ provinceId });
    queryClient.setQueryData<Province[]>(["provinces"], (oldProvinces) =>
      oldProvinces?.filter((p) => p.id !== provinceId),
    );

    toast.success("Region supprimé avec succès", {
      position: "top-center",
    });
  }
  return <ConfirmDeleteModal isRemoving={isPending} onConfirm={handleDelete} />;
}
