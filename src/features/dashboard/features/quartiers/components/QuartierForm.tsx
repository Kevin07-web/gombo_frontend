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
import type { Quartier, QuartierFormValues } from "../types/quartierType";
import { useAddQuartier } from "../hooks/mutations/useAddQuartier";
import { useEditQuartier } from "../hooks/mutations/useEditQuartier";
import { quartierSchemas } from "../schemas/quartierSchemas";
import { useCommunes } from "../../communes/hooks/queries/useCommunes";

type QuartierFormProps = {
  isEdit?: boolean;
  quartier?: Quartier;
  onClose?: () => void;
};

export function QuartierForm({
  isEdit = false,
  quartier,
  onClose,
}: QuartierFormProps) {
  const form = useForm<QuartierFormValues>({
    resolver: zodResolver(quartierSchemas),
    defaultValues: {
      libelle: quartier?.libelle ?? "",
      longitude: quartier?.longitude?.toString() ?? "",
      latitude: quartier?.latitude?.toString() ?? "",
      communeId: quartier?.communeId ?? "",
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isPaused: isCreating } = useAddQuartier();
  const { mutateAsync: updateQuartier, isPending: isUpdating } =
    useEditQuartier();
  const isLoading = isCreating || isUpdating;
  const { data: communes } = useCommunes();

  async function onSubmit(data: QuartierFormValues) {
    let newQuartier: Quartier;

    if (isEdit && quartier) {
      newQuartier = { ...quartier, ...data };
      await updateQuartier({
        quartierId: quartier?.id,
        data: newQuartier,
      });
      queryClient.setQueryData<Quartier[]>(["quartiers"], (oldQuartiers) =>
        oldQuartiers?.map((q) => (q.id === newQuartier.id ? newQuartier : q)),
      );

      toast.success("Quartier mis à jour avec succès", {
        position: "top-center",
      });
    } else {
      newQuartier = await mutateAsync(data);
      queryClient.setQueryData<Quartier[]>(["quartiers"], (oldQuartiers) => [
        ...(oldQuartiers || []),
        newQuartier,
      ]);

      toast.success("Quartier créé avec succès", { position: "top-center" });
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
          name="communeId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Commune</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Sélectionner une commune" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {communes?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.libelle}
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
