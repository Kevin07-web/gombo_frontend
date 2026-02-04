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
import { RoleForm } from "./RoleForm";
import type { Role } from "../types/roleTypes";

type RoleModalProps = {
  isEdit?: boolean;
  role?: Role;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function RoleModal({ isEdit = false, role, trigger }: RoleModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Bouton par défaut selon le type de modal
  const defaultTrigger = isEdit ? (
    <Button variant="secondary" size="icon">
      <Pencil size={16} />
    </Button>
  ) : (
    <Button>
      <Plus size={16} />
      Nouveau rôle
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier le rôle" : "Créer un rôle"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifiez les informations du rôle ci-dessous."
              : "Remplissez le formulaire ci-dessous pour créer un rôle."}
          </DialogDescription>
        </DialogHeader>

        <RoleForm
          onClose={() => setIsOpen(false)}
          isEdit={isEdit}
          role={role}
        />

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
