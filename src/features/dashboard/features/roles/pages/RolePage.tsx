import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/shared/components/ui/table";
import RoleList from "../components/RoleList";
import { Button } from "@/shared/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { RoleModal } from "../components/RoleModal";

export default function RolePage() {
  return (
    <div className="mx-auto max-w-5xl mt-10">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Liste des rôles</h2>
          <div className="flex gap-2">
            <RoleModal />
            <Button variant="outline">
              <RefreshCcw />
              Refresh
            </Button>
          </div>
        </div>
        <Table>
          <TableCaption>Rôles disponibles dans le système</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-15">#</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <RoleList />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
