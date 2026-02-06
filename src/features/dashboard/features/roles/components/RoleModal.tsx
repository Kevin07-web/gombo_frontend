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
import type { Role } from "../types/roleTypes";
import { ModalDefaultTrigger } from "@/features/dashboard/components/ModalDefaultTrigger";
import { AddRoleForm } from "./AddRoleForm";
import EditRoleForm from "./EditRoleForm";

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
          <DialogTitle className="text-2xl text-center">
            {isEdit ? "Modifier le rôle" : "Créer un rôle"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="px-3">
          {isEdit ? (
            <EditRoleForm onClose={() => setIsOpen(false)} role={role} />
          ) : (
            <AddRoleForm onClose={() => setIsOpen(false)} />
          )}
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
