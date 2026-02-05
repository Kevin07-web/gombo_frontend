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
import { RoleForm } from "./RoleForm";
import type { Role } from "../types/roleTypes";
import { ModalDefaultTrigger } from "@/features/dashboard/components/ModalDefaultTrigger";

type RoleModalProps = {
  isEdit?: boolean;
  role?: Role;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function RoleModal({ isEdit = false, role, trigger }: RoleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <ModalDefaultTrigger isEdit={isEdit} />}
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm pt-10">
        <DialogHeader>
          <DialogTitle>
            <h3 className="text-2xl text-center">
              {isEdit ? "Modifier le rôle" : "Créer un rôle"}
            </h3>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="px-3">
          <RoleForm
            onClose={() => setIsOpen(false)}
            isEdit={isEdit}
            role={role}
          />
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
