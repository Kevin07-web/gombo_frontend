import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Plus, Pencil } from "lucide-react";
import type { Province } from "../types/ProvinceType";
import { ProvinceForm } from "./ProvinceForm";

type ProvinceModalProps = {
  isEdit?: boolean;
  province?: Province;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function ProvinceModal({
  isEdit = false,
  province,
  trigger,
}: ProvinceModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Bouton par défaut selon le type de modal
  const defaultTrigger = isEdit ? (
    <Button variant="secondary" size="icon">
      <Pencil size={16} />
    </Button>
  ) : (
    <Button>
      <Plus size={16} />
      Ajouter
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier une province" : "Créer une province"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ProvinceForm
          isEdit={isEdit}
          province={province}
          onClose={() => setIsOpen(false)}
        />
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
