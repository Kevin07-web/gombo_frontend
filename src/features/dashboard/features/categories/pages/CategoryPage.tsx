import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { CategoryModal } from "../components/CategoryModal";
import CategoryList from "../components/CategoryList";
import RefreshButton from "@/features/dashboard/components/RefresButton";

export default function CategoryPage() {
  return (
    <div className="mx-auto max-w-5xl mt-10 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <CategoryModal />
          <RefreshButton queryKey={["categories"]} />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Libellé</TableHead>
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
