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
import type { Region } from "../types/regionType";
import { RegionForm } from "./RegionForm";

type RegionModalProps = {
  isEdit?: boolean;
  region?: Region;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function RegionModal({
  isEdit = false,
  region,
  trigger,
}: RegionModalProps) {
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
            {isEdit ? "Modifier une region" : "Créer une region"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <RegionForm
          isEdit={isEdit}
          region={region}
          onClose={() => setIsOpen(false)}
        />
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
