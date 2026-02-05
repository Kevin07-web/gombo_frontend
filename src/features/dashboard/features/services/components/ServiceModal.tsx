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
import type { Service } from "../types/serviceType";
import { ServiceForm } from "./ServiceForm";
import { ModalDefaultTrigger } from "@/features/dashboard/components/ModalDefaultTrigger";

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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <ModalDefaultTrigger isEdit={isEdit} />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
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
