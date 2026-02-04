import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  itemName?: string; // Nom de l'élément à supprimer (optionnel)
}

export function ConfirmDeleteModal({
  onConfirm,
  itemName,
}: ConfirmDeleteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmation de suppression</DialogTitle>
          <DialogDescription>
            {itemName
              ? `Êtes-vous sûr de vouloir supprimer "${itemName}" ? Cette action est irréversible.`
              : "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
            }}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
