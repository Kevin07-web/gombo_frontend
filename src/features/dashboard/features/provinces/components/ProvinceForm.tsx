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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import LoadingButton from "@/shared/components/LoagingButton";
import type { Province, ProvinceFormValues } from "../types/ProvinceType";
import { provinceSchemas } from "../schemas/ProvinceSchemas";
import { useAddProvince } from "../hooks/mutations/useAddProvince";
import { useEditProvince } from "../hooks/mutations/useEditProvince";
import { useRegions } from "../../regions/hooks/queries/useRegions";

type ProvinceFormProps = {
  isEdit?: boolean;
  province?: Province;
  onClose?: () => void;
};

export function ProvinceForm({
  isEdit = false,
  province,
  onClose,
}: ProvinceFormProps) {
  const form = useForm<ProvinceFormValues>({
    resolver: zodResolver(provinceSchemas),
    defaultValues: {
      libelle: province?.libelle ?? "",
      longitude: province?.longitude?.toString() ?? "0",
      latitude: province?.latitude?.toString() ?? "0",
      regionId: province?.regionId ?? "",
    },
  });
  const {
    formState: { isValid, isDirty },
  } = form;
  const queryClient = useQueryClient();
  const { mutateAsync, isPending: isCreating } = useAddProvince();
  const { mutateAsync: updateProvince, isPending: isUpdating } =
    useEditProvince();
  const isLoading = isCreating || isUpdating;
  const { data: regions } = useRegions();

  async function onSubmit(data: ProvinceFormValues) {
    let newProvince: Province;
    if (isEdit && province) {
      newProvince = { ...province, ...data };
      await updateProvince({
        provinceId: province.id,
        data: newProvince,
      });
      queryClient.setQueryData<Province[]>(["provinces"], (oldProvinces) =>
        oldProvinces?.map((r) => (r.id === newProvince.id ? newProvince : r)),
      );

      toast.success("Modification Enregistré", {
        position: "top-center",
      });
    } else {
      newProvince = await mutateAsync(data);
      queryClient.setQueryData<Province[]>(["provinces"], (oldProvinces) => [
        ...(oldProvinces || []),
        newProvince,
      ]);

      toast.success("Province créé avec succès", { position: "top-center" });
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
        <Controller
          name="regionId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Région</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Sélectionner une région" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {regions?.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.libelle}
                      </SelectItem>
                    ))}
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
