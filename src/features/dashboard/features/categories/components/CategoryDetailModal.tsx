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
import { Eye } from "lucide-react";
import type { Category } from "../types/CategoryTypes";

type CategoryDetailModalProps = {
  ctg: Category;
};

export function CategoryDetailModal({ ctg }: CategoryDetailModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="gray">
          <Eye size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div>
          <h1>Detail de {ctg?.libelle}</h1>
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
