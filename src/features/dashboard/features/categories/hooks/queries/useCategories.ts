import { useQuery } from "@tanstack/react-query";
import type { Category } from "../../types/CategoryTypes";
import { CategoryAPI } from "../../api/categoryService";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: CategoryAPI.getAll,
  });
}
