import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { Button } from "@/shared/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { CategoryModal } from "../components/CategoryModal";
import CategoryList from "../components/CategoryList";

export default function CategoryPage() {
  return (
    <div className="mx-auto max-w-5xl mt-10">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Liste des categories</h2>
          <div className="flex gap-2">
            <CategoryModal />
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
              <TableHead>Libelle</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <CategoryList />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
