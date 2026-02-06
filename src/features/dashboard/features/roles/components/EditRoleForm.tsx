import type { EditRoleFormValues, Role } from "../types/roleTypes";
import { editRoleSchemas } from "../schemas/roleSchemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditRole } from "../hooks/mutations/useEditRole";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import LoadingButton from "@/shared/components/LoagingButton";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupTextarea,
} from "@/shared/components/ui/input-group";
import { Input } from "@/shared/components/ui/input";

type EditRoleFormProps = {
  role?: Role;
  onClose?: () => void;
};

export default function EditRoleForm({ role, onClose }: EditRoleFormProps) {
  const form = useForm<EditRoleFormValues>({
    resolver: zodResolver(editRoleSchemas),
    defaultValues: {
      oldName: role?.name ? role.name : "",
      newName: "",
      description: role?.description ? role.description : "",
    },
  });
  const {
    reset,
    formState: { isValid, isDirty },
  } = form;
  const queryClient = useQueryClient();
  const { mutateAsync: updateRole, isPending: isUpdating } = useEditRole();
  const isLoading = isUpdating;
  console.log(role?.name);
  const onEdit = async (data: EditRoleFormValues) => {
    if (!role) return;
    console.log(data);

    try {
      await updateRole({
        newName: data.newName,
        oldName: data.oldName,
        description: data.description,
      });
      queryClient.setQueryData<Role[]>(["roles"], (oldRoles) =>
        oldRoles?.map((r) =>
          r.id === role.id
            ? { ...role, name: data.newName, description: data.description }
            : r,
        ),
      );
      toast.success("Rôle mis à jour avec succès", { position: "top-center" });
      reset({
        oldName: data.oldName,
        newName: data.newName,
        description: data.description || "",
      });
      onClose?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onEdit)}>
      <FieldGroup>
        <Controller
          name="oldName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Nom actuel</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                disabled={true}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="newName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Nouveau Nom</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-description">
                Description
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="form-rhf-demo-description"
                  placeholder="Une petite description"
                  rows={6}
                  className="min-h-24 resize-none placeholder:text-gray-500"
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
            </Field>
          )}
        />
      </FieldGroup>
      <Field orientation="horizontal" className="justify-end mt-3">
        <LoadingButton
          isLoading={isLoading}
          disabled={!isValid || !isDirty}
          type="submit"
          form="form-rhf-demo"
          size="full"
        >
          Modifier
        </LoadingButton>
      </Field>
    </form>
  );
}
