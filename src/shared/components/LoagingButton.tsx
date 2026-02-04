import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@ui/button";
import { Spinner } from "./ui/spinner";

type LoadingButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading: boolean;
  };

export default function LoadingButton({
  isLoading,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className="rounded-lg py-3"
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </Button>
  );
}
