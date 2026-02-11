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
import { ModalDefaultTrigger } from "@/features/dashboard/components/ModalDefaultTrigger";
import { AddRoleForm } from "./AddRoleForm";
import EditRoleForm from "./EditRoleForm";
import { useRole } from "../hooks/queries/useRole";
import Error from "@/features/dashboard/components/Error";

type RoleModalProps = {
  isEdit?: boolean;
  roleName?: string;
  trigger?: React.ReactNode;
};

export function RoleModal({
  isEdit = false,
  roleName,
  trigger,
}: RoleModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: role,
    isLoading,
    isError,
    error,
  } = useRole({
    roleName: String(roleName!),
    enabled: isOpen && isEdit,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <ModalDefaultTrigger isEdit={isEdit} />}
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-8 py-6 bg-muted/40 border-b">
          <div className="flex flex-col items-center gap-3">
            <DialogTitle className="text-2xl font-semibold text-center">
              {isEdit ? "Modifier le rôle" : "Créer un rôle"}
            </DialogTitle>

            <DialogDescription />
          </div>
        </DialogHeader>

        <div className="px-8 py-6">
          {isEdit ? (
            isLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-10 bg-muted rounded" />
                <div className="h-10 bg-muted rounded" />
              </div>
            ) : !isError ? (
              <EditRoleForm onClose={() => setIsOpen(false)} role={role} />
            ) : (
              <Error status={error.status} />
            )
          ) : null}
          {!isEdit && <AddRoleForm onClose={() => setIsOpen(false)} />}
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
