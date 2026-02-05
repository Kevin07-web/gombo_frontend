import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { Button } from "@/shared/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { QuartierModal } from "../components/QuartierModal";
import QuartierList from "../components/QuartierList";

export default function QuartierPage() {
  return (
    <div className="mx-auto max-w-5xl mt-10">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Liste des Quartiers</h2>
          <div className="flex gap-2">
            <QuartierModal />
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
              <TableHead>Commune</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <QuartierList />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
