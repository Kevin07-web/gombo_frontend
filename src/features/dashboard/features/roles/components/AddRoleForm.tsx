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
    mode: "onTouched",
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
    <form
      id="form-add-role"
      onSubmit={form.handleSubmit(onCreate)}
      className="space-y-6"
    >
      <FieldGroup className="space-y-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nom du rôle</FieldLabel>
              <Input
                {...field}
                placeholder="Ex: Administrateur"
                autoComplete="off"
                className="h-11"
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
              <FieldLabel>Description</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  rows={5}
                  className="resize-none placeholder:text-muted-foreground"
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Footer actions */}
      <div className="flex justify-end pt-2">
        <LoadingButton
          isLoading={isCreating}
          disabled={!isValid}
          type="submit"
          size="lg"
          className="gap-2"
        >
          Créer
        </LoadingButton>
      </div>
    </form>
  );
}
