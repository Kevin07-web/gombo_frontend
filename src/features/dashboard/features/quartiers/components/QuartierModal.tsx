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
import type { Quartier } from "../types/quartierType";
import { QuartierForm } from "./QuartierForm";

type QuartierModalProps = {
  isEdit?: boolean;
  quartier?: Quartier;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function QuartierModal({
  isEdit = false,
  quartier,
  trigger,
}: QuartierModalProps) {
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
            {isEdit ? "Modifier un quartier" : "Créer un quartier"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <QuartierForm
          isEdit={isEdit}
          quartier={quartier}
          onClose={() => setIsOpen(false)}
        />
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
