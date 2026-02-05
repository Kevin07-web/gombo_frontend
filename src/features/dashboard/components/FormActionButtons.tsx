import LoadingButton from "@/shared/components/LoagingButton";
import { Button } from "@/shared/components/ui/button";
import type { UseFormReset } from "react-hook-form";
import type { RoleFormValues } from "../features/roles/types/roleTypes";

type FormActionButtonsProps = {
  isEdit: boolean;
  isLoading: boolean;
  isValid: boolean;
  isDirty: boolean;
  reset: UseFormReset<RoleFormValues>;
};

export default function FormActionButtons({
  isEdit,
  isLoading,
  isValid,
  isDirty,
  reset,
}: FormActionButtonsProps) {
  return (
    <>
      {isEdit && (
        <Button
          type="button"
          disabled={!isDirty}
          variant="outline"
          onClick={() => reset()}
        >
          {isEdit ? "Réinitialiser" : "Effacer"}
        </Button>
      )}
      <LoadingButton
        isLoading={isLoading}
        disabled={!isValid || !isDirty}
        type="submit"
        form="form-rhf-demo"
        size={!isEdit ? "full" : "default"}
      >
        {isEdit ? "Modifier" : "Créer"}
      </LoadingButton>
    </>
  );
}
