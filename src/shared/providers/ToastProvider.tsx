import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";

type props = PropsWithChildren;

export default function ToastProvider({ children }: props) {
  return (
    <>
      <Toaster
        position="top-center"
        duration={2000}
        richColors
        toastOptions={{
          style: {
            width: "fit-content",
            maxWidth: "100%",
            marginInline: "auto",
            borderRadius: "15px",
            fontSize: "15px",
            fontFamily: "poppins",
          },
        }}
      />
      {children}
    </>
  );
}
