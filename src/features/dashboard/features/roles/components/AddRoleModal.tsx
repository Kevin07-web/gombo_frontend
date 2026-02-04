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
import { Plus } from "lucide-react";
import { RoleForm } from "./RoleForm";
import { useState } from "react";

export function AddRoleModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus size={16} />
            Nouveau rôles
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Créer un rôle</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <RoleForm onClose={() => setIsOpen(false)} />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
