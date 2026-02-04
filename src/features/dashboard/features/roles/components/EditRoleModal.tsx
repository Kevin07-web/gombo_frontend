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
import type { Roles } from "../types/roleTypes";

type EditRoleModalProps = {
  role: Roles;
};

export function EditRoleModal({ role }: EditRoleModalProps) {
  return (
    <Dialog>
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
          <RoleForm isEdit={true} role={role} />
          <DialogFooter />
        </DialogContent>
      </form>
    </Dialog>
  );
}
