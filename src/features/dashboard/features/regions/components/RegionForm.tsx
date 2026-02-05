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
import { useQueryClient } from "@tanstack/react-query";
import LoadingButton from "@/shared/components/LoagingButton";
import type { Region, regionFormValues } from "../types/regionType";
import { regionSchemas } from "../schemas/regionSchemas";
import { useAddRegion } from "../hooks/queries/useAddRegion";
import { useEditRegion } from "../hooks/queries/useEditRegion";

type RegionFormProps = {
  isEdit?: boolean;
  region?: Region;
  onClose?: () => void;
};

export function RegionForm({
  isEdit = false,
  region,
  onClose,
}: RegionFormProps) {
  const form = useForm<regionFormValues>({
    resolver: zodResolver(regionSchemas),
    defaultValues: {
      libelle: region?.libelle ?? "",
      longitude: region?.longitude?.toString() ?? "0",
      latitude: region?.latitude?.toString() ?? "0",
    },
  });
  const {
    formState: { isValid, isDirty },
  } = form;
  const queryClient = useQueryClient();
  const { mutateAsync, isPending: isCreating } = useAddRegion();
  const { mutateAsync: updateRole, isPending: isUpdating } = useEditRegion();
  const isLoading = isCreating || isUpdating;

  async function onSubmit(data: regionFormValues) {
    let newRegion: Region;
    if (isEdit && region) {
      newRegion = { ...region, ...data };
      await updateRole({ regionId: region.id, data: newRegion });
      queryClient.setQueryData<Region[]>(["regions"], (oldRegions) =>
        oldRegions?.map((r) => (r.id === newRegion.id ? newRegion : r)),
      );

      toast.success("Region mis à jour avec succès", {
        position: "top-center",
      });
    } else {
      newRegion = await mutateAsync(data);
      queryClient.setQueryData<Region[]>(["regions"], (oldRegions) => [
        ...(oldRegions || []),
        newRegion,
      ]);

      toast.success("Region créé avec succès", { position: "top-center" });
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
          name="longitude"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-long">Longitude</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-long"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
            </Field>
          )}
        />
        <Controller
          name="latitude"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-lat">Latitude</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-lat"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
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
