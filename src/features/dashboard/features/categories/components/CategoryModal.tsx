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
import type { Category } from "../types/CategoryTypes";
import { CategoryForm } from "./CategoryForm";

type RoleModalProps = {
  isEdit?: boolean;
  ctg?: Category;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function CategoryModal({
  isEdit = false,
  ctg,
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
            {isEdit ? "Modifier une categorie" : "Créer une categorie"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifiez les informations de la categorie ci-dessous."
              : "Remplissez le formulaire ci-dessous pour créer une categorie."}
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          onClose={() => setIsOpen(false)}
          isEdit={isEdit}
          ctg={ctg}
        />

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
