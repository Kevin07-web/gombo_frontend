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

import { useQueryClient } from "@tanstack/react-query";
import LoadingButton from "@/shared/components/LoagingButton";
import type { Service, ServiceFormValues } from "../types/serviceType";
import { serviceSchemas } from "../schemas/servicesSchemas";
import { useAddService } from "../hooks/mutations/useAddService";
import { useEditService } from "../hooks/mutations/useEditService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useCategories } from "../../categories/hooks/queries/useCategories";

type ServiceFormProps = {
  isEdit?: boolean;
  service?: Service;
  onClose?: () => void;
};

export function ServiceForm({
  isEdit = false,
  service,
  onClose,
}: ServiceFormProps) {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchemas),
    defaultValues: {
      libelle: isEdit && service?.libelle ? service?.libelle : "",
      description: isEdit && service?.description ? service.description : "",
      statut: isEdit && service?.statut ? service.statut : "INACTIF",
      categorieId: isEdit && service?.categorieId ? service.categorieId : "",
    },
  });
  const {
    formState: { isValid, isDirty },
  } = form;
  const queryClient = useQueryClient();
  const { mutateAsync, isPending: isCreating } = useAddService();
  const { mutateAsync: updateRole, isPending: isUpdating } = useEditService();
  const isLoading = isCreating || isUpdating;
  const { data: categories } = useCategories();

  async function onSubmit(data: ServiceFormValues) {
    let newService: Service;
    if (isEdit && service) {
      newService = { ...service, ...data };
      await updateRole({ serviceId: service.id, data: newService });
      queryClient.setQueryData<Service[]>(["services"], (oldServices) =>
        oldServices?.map((s) => (s.id === newService.id ? newService : s)),
      );

      toast.success("Service mis à jour avec succès", {
        position: "top-center",
      });
    } else {
      newService = await mutateAsync(data);
      console.log(newService);
      queryClient.setQueryData<Service[]>(["services"], (oldServices) => [
        ...(oldServices || []),
        newService,
      ]);

      toast.success("Service créé avec succès", { position: "top-center" });
      form.reset();
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
          name="categorieId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Catégorie</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.libelle}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
