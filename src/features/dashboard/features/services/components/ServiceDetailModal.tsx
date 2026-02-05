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
import { AlertTriangle, Eye } from "lucide-react";

import { truncate } from "@/shared/utils/tuncate";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import type { Service } from "../types/serviceType";
import { useService } from "../hooks/queries/useService";
import { Spinner } from "@/shared/components/ui/spinner";

type ServiceDetailModalProps = {
  service: Service;
};

export function ServiceDetailModal({ service: s }: ServiceDetailModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: service,
    isLoading,
    error,
  } = useService({ serviceId: s.id, enabled: isOpen });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="gray">
          <Eye size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[90%] max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Détails du servive
          </DialogTitle>
          <DialogDescription className="text-center">
            Informations complètes sur le service sélectionnée
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-destructive">
            <AlertTriangle className="w-12 h-12 text-destructive/80" />
            <p className="text-sm text-destructive/70">
              Impossible de charger le service pour le moment.
            </p>
          </div>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          service && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">ID</td>
                    <td className="px-2 py-1 text-sm"># {service.id}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Libellé</td>
                    <td className="px-2 py-1  text-sm">{service.libelle}</td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Statut</td>
                    <td className="px-2 py-1  text-sm">
                      <StatusBadge status={service.statut} />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Categorie</td>
                    <td className="px-2 py-1  text-sm">
                      <td className="px-2 py-1  text-sm">
                        {service.categorieLibelle}
                      </td>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Créé le</td>
                    <td className="px-2 py-1  text-sm">{service.createdAt}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Mis à jour le</td>
                    <td className="px-2 py-1  text-sm">{service.updateAt}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Créé par</td>
                    <td className="px-2 py-1  text-sm">
                      {service.createdById || "Non défini"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Mis à jour par</td>
                    <td className="px-2 py-1">
                      {service.updateById || "Non défini"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">
                      Nom utilisateur courant
                    </td>
                    <td className="px-2 py-1  text-sm">
                      {service.currentUserfullName || "Non défini"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-1 font-semibold">
                      Email utilisateur courant
                    </td>
                    <td className="px-2 py-1  text-sm">
                      {service.currentUserEmail || "Non défini"}
                    </td>
                  </tr>
                  <tr className=" border-gray-200">
                    <td className="px-2 py-1 font-semibold">Description</td>
                    <td className="px-2 py-1  text-sm">
                      {service.description
                        ? truncate(service.description, 100)
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        )}

        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
