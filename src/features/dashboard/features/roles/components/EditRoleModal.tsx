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
import { Pencil } from "lucide-react";
import { RoleForm } from "./RoleForm";
import type { Role } from "../types/roleTypes";
import { useState } from "react";

type EditRoleModalProps = {
  role: Role;
};

export function EditRoleModal({ role }: EditRoleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary" size="icon">
            <Pencil size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Modifier le role</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <RoleForm
            onClose={() => setIsOpen(false)}
            isEdit={true}
            role={role}
          />
          <DialogFooter />
        </DialogContent>
      </form>
    </Dialog>
  );
}
