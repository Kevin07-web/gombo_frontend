import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import RoleList from "../components/RoleList";
import { RoleModal } from "../components/RoleModal";
import RefreshButton from "@/features/dashboard/components/RefresButton";

export default function RolePage() {
  return (
    <div className="mx-auto max-w-5xl mt-10 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Rôles</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <RoleModal />
          <RefreshButton queryKey={["roles"]} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-12">#</TableHead>
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
