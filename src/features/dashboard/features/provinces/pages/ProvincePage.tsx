import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { ProvinceModal } from "../components/ProvinceModal";
import ProvinceList from "../components/ProvinceList";
import RefreshButton from "@/features/dashboard/components/RefresButton";

export default function ProvincePage() {
  return (
    <div className="mx-auto max-w-5xl mt-10 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Provinces</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <ProvinceModal />
          <RefreshButton queryKey={["provinces"]} />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-15">#</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <ProvinceList />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
