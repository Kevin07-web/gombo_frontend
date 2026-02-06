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
import { Spinner } from "@/shared/components/ui/spinner";
import { useProvince } from "../hooks/queries/useProvince";
import type { Province } from "../types/ProvinceType";

type ServiceDetailModalProps = {
  province: Province;
};

export function ProvinceDetailModal({ province: p }: ServiceDetailModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: province,
    isLoading,
    error,
  } = useProvince({ provinceId: p.id, enabled: isOpen });

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
            Détails de la province
          </DialogTitle>
          <DialogDescription className="text-center">
            Informations complètes sur la province sélectionnée
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
          province &&
          !error && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">ID</td>
                    <td className="px-2 py-1 text-sm"># {province.id}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Libellé</td>
                    <td className="px-2 py-1  text-sm">{province.libelle}</td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Longitude</td>
                    <td className="px-2 py-1  text-sm">{province.longitude}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Latitude</td>
                    <td className="px-2 py-1  text-sm">{province.latitude}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Région</td>
                    <td className="px-2 py-1  text-sm">
                      {province.regionLibelle}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Créé le</td>
                    <td className="px-2 py-1  text-sm">{province.createdAt}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Mis à jour le</td>
                    <td className="px-2 py-1  text-sm">{province.updateAt}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Créé par</td>
                    <td className="px-2 py-1  text-sm">
                      {province.createdById || "Non défini"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">Mis à jour par</td>
                    <td className="px-2 py-1">
                      {province.updateById || "Non défini"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-1 font-semibold">
                      Nom utilisateur courant
                    </td>
                    <td className="px-2 py-1  text-sm">
                      {province.currentUserfullName || "Non défini"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-1 font-semibold">
                      Email utilisateur courant
                    </td>
                    <td className="px-2 py-1  text-sm">
                      {province.currentUserEmail || "Non défini"}
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
