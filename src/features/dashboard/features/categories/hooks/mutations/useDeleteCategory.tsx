import { useMutation } from "@tanstack/react-query";
import { CategoryAPI } from "../../api/categoryService";

export function useDeleteCategory() {
  return useMutation({
    mutationFn: ({ ctgId }: { ctgId: string }) => CategoryAPI.delete(ctgId),
    retry: 0,

    onError: (error) => {
      console.log(error);
    },
  });
}
