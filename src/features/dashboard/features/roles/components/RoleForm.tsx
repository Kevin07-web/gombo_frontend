"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  InputGroup,
  InputGroupTextarea,
} from "@/shared/components/ui/input-group";
import { editRoleSchemas, roleSchemas } from "../schemas/roleSchemas";
import type {
  RoleFormValues,
  Role,
  EditRoleFormValues,
} from "../types/roleTypes";
import { useAddRole } from "../hooks/mutations/useAddRole";
import { useEditRole } from "../hooks/mutations/useEditRole";
import { useQueryClient } from "@tanstack/react-query";
import LoadingButton from "@/shared/components/LoagingButton";

type RoleFormProps = {
  isEdit?: boolean;
  role?: Role;
  onClose?: () => void;
};

export function RoleForm({ isEdit = false, role, onClose }: RoleFormProps) {
  const defaultValues = isEdit
    ? {
        oldName: role?.name ? role.name : "",
        newName: "",
        description: role?.description ? role.description : "",
      }
    : {
        name: "",
        description: "",
      };
  type FormValues = RoleFormValues | EditRoleFormValues;
  const schemas = isEdit ? editRoleSchemas : roleSchemas;

  const form = useForm({
    resolver: zodResolver(schemas),
    defaultValues,
  });
  const {
    reset,
    formState: { isValid, isDirty },
  } = form;
  const queryClient = useQueryClient();
  const { mutateAsync, isPending: isCreating } = useAddRole();
  const { mutateAsync: updateRole, isPending: isUpdating } = useEditRole();
  const isLoading = isCreating || isUpdating;

  const onCreate = async (data: RoleFormValues) => {
    const newRole: Role = await mutateAsync(data);
    queryClient.setQueryData<Role[]>(["roles"], (oldRoles) => [
      ...(oldRoles || []),
      newRole,
    ]);

    toast.success("Rôle créé avec succès", { position: "top-center" });
    reset();
    onClose?.();
  };
  const onEdit = async (data: EditRoleFormValues) => {
    if (!role) return;
    const newRole: EditRoleFormValues = {
      ...role,
      newName: data.newName,
      oldName: data.oldName,
      description: data.description,
    };
    await updateRole(newRole);
    queryClient.setQueryData<Role[]>(["roles"], (oldRoles) =>
      oldRoles?.map((r) =>
        r.id === role.id ? { ...role, name: newRole.newName } : r,
      ),
    );

    toast.success("Rôle mis à jour avec succès", { position: "top-center" });
    reset({
      name: newRole.name,
      description: newRole.description || "",
    });
    onClose?.();
  };

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(isEdit ? onEdit : onCreate)}
    >
      <FieldGroup>
        <Controller
          name={isEdit ? "oldName" : "name"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">
                {isEdit ? "Nom actuel" : "Nom"}
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                disabled={isEdit}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {isEdit && (
          <Controller
            name="newName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Nouveau Nom
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}
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
          {isEdit ? "Modifier" : "Créer"}
        </LoadingButton>
      </Field>
    </form>
  );
}
