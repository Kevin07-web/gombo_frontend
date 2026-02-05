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
import type { Commune } from "../types/CommuneType";
import { CommuneForm } from "./CommuneForm";

type ProvinceModalProps = {
  isEdit?: boolean;
  commune?: Commune;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function CommuneModal({
  isEdit = false,
  commune,
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
            {isEdit ? "Modifier une commune" : "Créer une commune"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <CommuneForm
          isEdit={isEdit}
          commune={commune}
          onClose={() => setIsOpen(false)}
        />
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
