import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { RegionModal } from "../components/RegionModal";
import RegionList from "../components/RegionList";
import RefreshButton from "@/features/dashboard/components/RefresButton";

export default function RegionPage() {
  return (
    <div className="mx-auto max-w-5xl mt-10 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Régions</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <RegionModal />
          <RefreshButton queryKey={["regions"]} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm relative">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <RegionList />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
