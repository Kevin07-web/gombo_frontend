import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { Button } from "@/shared/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { ProvinceModal } from "../components/ProvinceModal";
import ProvinceList from "../components/ProvinceList";

export default function RegionPage() {
  return (
    <div className="mx-auto max-w-5xl mt-10">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Liste des Provinces</h2>
          <div className="flex gap-2">
            <ProvinceModal />
            <Button variant="outline">
              <RefreshCcw />
              Refresh
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-15">#</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Région</TableHead>
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
