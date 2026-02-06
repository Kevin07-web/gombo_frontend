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
import type { Province } from "../types/ProvinceType";
import { ProvinceForm } from "./ProvinceForm";
import { ModalDefaultTrigger } from "@/features/dashboard/components/ModalDefaultTrigger";

type ProvinceModalProps = {
  isEdit?: boolean;
  province?: Province;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function ProvinceModal({
  isEdit = false,
  province,
  trigger,
}: ProvinceModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <ModalDefaultTrigger isEdit={isEdit} />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {isEdit ? "Modifier une province" : "Créer une province"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ProvinceForm
          isEdit={isEdit}
          province={province}
          onClose={() => setIsOpen(false)}
        />
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
