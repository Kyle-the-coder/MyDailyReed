import { createContext, useContext, useState } from "react";

const CategoryRefreshContext = createContext();

export function CategoryProvider({ children }) {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <CategoryRefreshContext.Provider value={{ refresh, triggerRefresh }}>
      {children}
    </CategoryRefreshContext.Provider>
  );
}

export const useCategoryRefresh = () => useContext(CategoryRefreshContext);
