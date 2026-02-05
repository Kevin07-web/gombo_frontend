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
import { truncate } from "@/shared/utils/tuncate";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";

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

      <DialogContent className="max-w-[90%] max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Détails de la catégorie
          </DialogTitle>
          <DialogDescription className="text-center">
            Informations complètes sur la catégorie sélectionnée
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-2 py-1 font-semibold">ID</td>
                <td className="px-2 py-1 text-sm"># {ctg.id}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-2 py-1 font-semibold">Libellé</td>
                <td className="px-2 py-1  text-sm">{ctg.libelle}</td>
              </tr>

              <tr className="border-b border-gray-200">
                <td className="px-2 py-1 font-semibold">Statut</td>
                <td className="px-2 py-1  text-sm">
                  <StatusBadge status={ctg.statut} />
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-2 py-1 font-semibold">Créé le</td>
                <td className="px-2 py-1  text-sm">{ctg.createdAt}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-2 py-1 font-semibold">Mis à jour le</td>
                <td className="px-2 py-1  text-sm">{ctg.updateAt}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-2 py-1 font-semibold">Créé par</td>
                <td className="px-2 py-1  text-sm">
                  {ctg.createdById || "Non défini"}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-2 py-1 font-semibold">Mis à jour par</td>
                <td className="px-2 py-1">{ctg.updateById || "Non défini"}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-2 py-1 font-semibold">
                  Nom utilisateur courant
                </td>
                <td className="px-2 py-1  text-sm">
                  {ctg.currentUserfullName || "Non défini"}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-1 font-semibold">
                  Email utilisateur courant
                </td>
                <td className="px-2 py-1  text-sm">
                  {ctg.currentUserEmail || "Non défini"}
                </td>
              </tr>
              <tr className=" border-gray-200">
                <td className="px-2 py-1 font-semibold">Description</td>
                <td className="px-2 py-1  text-sm">
                  {ctg.description ? truncate(ctg.description, 100) : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
