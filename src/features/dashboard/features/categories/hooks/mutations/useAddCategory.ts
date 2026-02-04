import { useMutation } from "@tanstack/react-query";
import { CategoryAPI } from "../../api/categoryService";
import type { CtgFormValues } from "../../types/CategoryTypes";

export function useAddCategory() {
  return useMutation({
    mutationFn: (data: CtgFormValues) => CategoryAPI.create(data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
