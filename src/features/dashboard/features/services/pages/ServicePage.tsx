import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { ServiceModal } from "../components/ServiceModal";
import ServiceList from "../components/ServiceList";
import RefreshButton from "@/features/dashboard/components/RefresButton";

export default function ServicePage() {
  return (
    <div className="mx-auto max-w-5xl mt-10 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <ServiceModal />
          <RefreshButton queryKey={["services"]} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm relative">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-12">#</TableHead>
              <TableHead>libelle</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <ServiceList />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
