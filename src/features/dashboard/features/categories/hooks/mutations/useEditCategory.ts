import { useMutation } from "@tanstack/react-query";
import { CategoryAPI } from "../../api/categoryService";
import type { Category } from "../../types/CategoryTypes";

export function useEditCategory() {
  return useMutation({
    mutationFn: ({ ctgId, data }: { ctgId: string; data: Category }) =>
      CategoryAPI.update(ctgId, data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
