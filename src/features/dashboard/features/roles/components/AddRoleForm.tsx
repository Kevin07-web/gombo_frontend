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
import { roleSchemas } from "../schemas/roleSchemas";
import type { RoleFormValues, Role } from "../types/roleTypes";
import { useAddRole } from "../hooks/mutations/useAddRole";
import { useQueryClient } from "@tanstack/react-query";
import LoadingButton from "@/shared/components/LoagingButton";

type RoleFormProps = {
  onClose?: () => void;
};

export function AddRoleForm({ onClose }: RoleFormProps) {
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchemas),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const {
    reset,
    formState: { isValid },
  } = form;
  const queryClient = useQueryClient();
  const { mutateAsync, isPending: isCreating } = useAddRole();
  const isLoading = isCreating;

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

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onCreate)}>
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
        <LoadingButton
          isLoading={isLoading}
          disabled={!isValid}
          type="submit"
          form="form-rhf-demo"
          size="full"
        >
          Créer
        </LoadingButton>
      </Field>
    </form>
  );
}
