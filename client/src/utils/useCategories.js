// src/hooks/useCategories.js
import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";

export function useCategories() {
  const categories = useContext(CategoriesContext);
  if (!categories) {
    throw new Error(
      "useCategories must be used within a CategoriesContext.Provider"
    );
  }
  return categories;
}
