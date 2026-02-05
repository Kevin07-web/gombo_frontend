import { Button } from "@/shared/components/ui/button";
import useMediaQuery from "@/shared/hooks/useMediaQuery";
import { Pencil, Plus } from "lucide-react";
import { forwardRef } from "react";

type ModalDefaultTriggerProps = {
  isEdit?: boolean;
};

export const ModalDefaultTrigger = forwardRef<
  HTMLButtonElement,
  ModalDefaultTriggerProps & React.ComponentPropsWithoutRef<typeof Button>
>(({ isEdit, ...props }, ref) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isEdit) {
    return (
      <Button ref={ref} variant="secondary" size="icon" {...props}>
        <Pencil size={16} />
      </Button>
    );
  }

  return (
    <Button ref={ref} size={isMobile ? "icon" : "default"} {...props}>
      <Plus size={16} />
      {!isMobile && "Ajouter"}
    </Button>
  );
});

ModalDefaultTrigger.displayName = "ModalDefaultTrigger";
