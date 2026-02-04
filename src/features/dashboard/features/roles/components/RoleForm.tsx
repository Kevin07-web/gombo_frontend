"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
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
import { roleSchemas } from "../schemas/roleSchemas";
import type { RoleFormValues, Role } from "../types/roleTypes";
import { useAddRole } from "../hooks/mutations/useAddRole";
import { useEditRole } from "../hooks/mutations/useEditRole";
import { useQueryClient } from "@tanstack/react-query";

type RoleFormProps = {
  isEdit?: boolean;
  role?: Role;
  onClose: () => void;
};

export function RoleForm({ isEdit = false, role, onClose }: RoleFormProps) {
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchemas),
    defaultValues: {
      name: isEdit && role?.name ? role.name : "",
      description: isEdit && role?.description ? role.description : "",
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync } = useAddRole();
  const { mutateAsync: updateRole } = useEditRole();
  async function onSubmit(data: RoleFormValues) {
    if (isEdit && role) {
      const newRole = { ...role, ...data };
      await updateRole(newRole);
      queryClient.setQueryData<Role[]>(["roles"], (oldRoles) =>
        oldRoles?.map((r) => (r.id === newRole.id ? newRole : r)),
      );
      toast.success("Rôle mis à jour avec succès", { position: "top-center" });
      form.reset({ name: newRole.name, description: newRole.description });
      return;
    }

    const newRole = await mutateAsync(data);
    queryClient.setQueryData<Role[]>(["roles"], (oldRoles) => [
      ...(oldRoles || []),
      newRole,
    ]);
    onClose();
    toast.success("Rôle créé avec succès", { position: "top-center" });
    form.reset();
  }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Nom</FieldLabel>
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
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Effacer
        </Button>
        <Button type="submit" form="form-rhf-demo">
          {isEdit ? "Modifier" : "Créer"}
        </Button>
      </Field>
    </form>
  );
}
