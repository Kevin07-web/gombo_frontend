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
import type { Region } from "../types/regionType";
import { RegionForm } from "./RegionForm";
import { ModalDefaultTrigger } from "@/features/dashboard/components/ModalDefaultTrigger";

type RegionModalProps = {
  isEdit?: boolean;
  region?: Region;
  trigger?: React.ReactNode; // bouton custom ou icône
};

export function RegionModal({
  isEdit = false,
  region,
  trigger,
}: RegionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <ModalDefaultTrigger isEdit={isEdit} />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {isEdit ? "Modifier une region" : "Créer une region"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <RegionForm
          isEdit={isEdit}
          region={region}
          onClose={() => setIsOpen(false)}
        />
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
