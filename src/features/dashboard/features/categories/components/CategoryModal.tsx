import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import type { Category } from "../types/CategoryTypes";
import { CategoryForm } from "./CategoryForm";
import { ModalDefaultTrigger } from "@/features/dashboard/components/ModalDefaultTrigger";

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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <ModalDefaultTrigger isEdit={isEdit} />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm pt-10">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {isEdit ? "Modifier une categorie" : "Créer un Categorie"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="px-3">
          <CategoryForm
            onClose={() => setIsOpen(false)}
            isEdit={isEdit}
            ctg={ctg}
          />
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
