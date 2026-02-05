"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { useQueryClient } from "@tanstack/react-query";
import { CtgSchemas } from "../schemas/CategorySchemas";
import type { Category, CtgFormValues } from "../types/CategoryTypes";
import { useAddCategory } from "../hooks/mutations/useAddCategory";
import { useEditCategory } from "../hooks/mutations/useEditCategory";
import { toast } from "sonner";
import LoadingButton from "@/shared/components/LoagingButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

type RoleFormProps = {
  isEdit?: boolean;
  ctg?: Category;
  onClose?: () => void;
};

export function CategoryForm({ isEdit = false, ctg, onClose }: RoleFormProps) {
  const form = useForm<CtgFormValues>({
    resolver: zodResolver(CtgSchemas),
    defaultValues: {
      libelle: isEdit && ctg?.libelle ? ctg.libelle : "",
      description: isEdit && ctg?.description ? ctg.description : "",
      statut: isEdit && ctg?.statut ? ctg.statut : "INACTIF",
    },
  });
  const {
    reset,
    formState: { isValid, isDirty },
  } = form;
  const queryClient = useQueryClient();
  const { mutateAsync, isPending: isCreating } = useAddCategory();
  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useEditCategory();
  const isLoading = isCreating || isUpdating;

  async function onSubmit(data: CtgFormValues) {
    let newCtg: Category;
    if (isEdit && ctg) {
      newCtg = { ...ctg, ...data };
      await updateCategory({ ctgId: ctg.id, data: newCtg });
      queryClient.setQueryData<Category[]>(["categories"], (oldCtgs) =>
        oldCtgs?.map((c) => (c.id === newCtg.id ? newCtg : c)),
      );

      toast.success("Categorie mis à jour avec succès", {
        position: "top-center",
      });
    } else {
      newCtg = await mutateAsync(data);
      queryClient.setQueryData<Category[]>(["categories"], (oldCtgs) => [
        ...(oldCtgs || []),
        newCtg,
      ]);

      toast.success("Categorie créé avec succès", { position: "top-center" });
      reset();
    }
    onClose?.();
  }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="libelle"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Libellé</FieldLabel>
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

        <Controller
          name="statut"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Statut</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ACTIF">Actif</SelectItem>
                    <SelectItem value="INACTIF">Inactif</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
