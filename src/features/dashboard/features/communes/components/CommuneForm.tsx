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
import type { Commune, CommuneFormValues } from "../types/CommuneType";
import { communeSchemas } from "../schemas/CommuneSchemas";
import { useAddCommune } from "../hooks/mutations/useAddCommune";
import { useEditCommune } from "../hooks/mutations/useEditCommune";
import { useProvinces } from "../../provinces/hooks/queries/useProvinces";

type ProvinceFormProps = {
  isEdit?: boolean;
  commune?: Commune;
  onClose?: () => void;
};

export function CommuneForm({
  isEdit = false,
  commune,
  onClose,
}: ProvinceFormProps) {
  const form = useForm<CommuneFormValues>({
    resolver: zodResolver(communeSchemas),
    defaultValues: {
      libelle: commune?.libelle ?? "",
      longitude: commune?.longitude?.toString() ?? "",
      latitude: commune?.latitude?.toString() ?? "",
      provinceId: commune?.provinceId ?? "",
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isPaused: isCreating } = useAddCommune();
  const { mutateAsync: updateCommune, isPending: isUpdating } =
    useEditCommune();
  const isLoading = isCreating || isUpdating;
  const { data: provinces } = useProvinces();

  async function onSubmit(data: CommuneFormValues) {
    let newCommune: Commune;
    if (isEdit && commune) {
      newCommune = { ...commune, ...data };
      await updateCommune({
        communeId: commune?.id,
        data: newCommune,
      });
      queryClient.setQueryData<Commune[]>(["communes"], (oldProvinces) =>
        oldProvinces?.map((c) => (c.id === newCommune.id ? newCommune : c)),
      );

      toast.success("Commune mis à jour avec succès", {
        position: "top-center",
      });
    } else {
      newCommune = await mutateAsync(data);
      queryClient.setQueryData<Commune[]>(["communes"], (oldProvinces) => [
        ...(oldProvinces || []),
        newCommune,
      ]);

      toast.success("Commune créé avec succès", { position: "top-center" });
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
          name="provinceId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Province</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Sélectionner une province" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {provinces?.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.libelle}
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
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Effacer
        </Button>
        <LoadingButton isLoading={isLoading} type="submit" form="form-rhf-demo">
          {isEdit ? "Modifier" : "Créer"}
        </LoadingButton>
      </Field>
    </form>
  );
}
