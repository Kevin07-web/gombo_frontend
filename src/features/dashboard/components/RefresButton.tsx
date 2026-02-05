import { Button } from "@/shared/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface RefreshButtonProps {
  queryKey: string | Array<string>; // la clé de la query à rafraîchir
}

export default function RefreshButton({ queryKey }: RefreshButtonProps) {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    });
  };

  return (
    <Button onClick={handleRefresh} variant="outline" className="gap-2">
      <RefreshCcw className="h-4 w-4" />
      Actualiser
    </Button>
  );
}
