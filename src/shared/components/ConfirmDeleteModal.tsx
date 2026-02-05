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
import { AlertTriangle, Trash2 } from "lucide-react";
import LoadingButton from "./LoagingButton";

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  itemName?: string;
  isRemoving: boolean;
  triggerVariant?: "icon" | "default";
}

export function ConfirmDeleteModal({
  onConfirm,
  itemName,
  isRemoving,
  triggerVariant = "icon",
}: ConfirmDeleteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerVariant === "icon" ? (
          <Button
            variant="destructive"
            size="icon"
            className="transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>

          <DialogTitle className="text-center">
            Confirmer la suppression
          </DialogTitle>

          <DialogDescription className="text-center">
            {itemName ? (
              <>
                Voulez-vous vraiment supprimer{" "}
                <span className="font-semibold text-foreground">
                  "{itemName}"
                </span>{" "}
                ?
              </>
            ) : (
              "Voulez-vous vraiment supprimer cet élément ?"
            )}
            <br />
            <span className="text-destructive">
              Cette action est irréversible.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 ">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              Annuler
            </Button>
          </DialogClose>

          <LoadingButton
            isLoading={isRemoving}
            variant="destructive"
            onClick={onConfirm}
            className="flex-1"
          >
            {isRemoving ? "Suppression..." : "Supprimer"}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
