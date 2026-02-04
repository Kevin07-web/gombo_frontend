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
import type { Service } from "../types/serviceType";
import { ServiceForm } from "./ServiceForm";

type RoleModalProps = {
  isEdit?: boolean;
  service?: Service;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function ServiceModal({
  isEdit = false,
  service,
  trigger,
}: RoleModalProps) {
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
            {isEdit ? "Modifier un Service" : "Créer un service"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <ServiceForm
          onClose={() => setIsOpen(false)}
          isEdit={isEdit}
          service={service}
        />

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
