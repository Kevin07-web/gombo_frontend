import { Route, Routes } from "react-router";
import DashboardLayout from "./features/dashboard/layouts/DashboardLayout";
import RolePage from "./features/dashboard/features/roles/pages/RolePage";
import CategoryPage from "./features/dashboard/features/categories/pages/CategoryPage";
import ServicePage from "./features/dashboard/features/services/pages/ServicePage";
import RegionPage from "./features/dashboard/features/regions/pages/RegionPage";
import ProvincePage from "./features/dashboard/features/provinces/pages/ProvincePage";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="users" element={<h1>Users</h1>} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="demandes" element={<h1>Demandes</h1>} />
        <Route path="roles" element={<RolePage />} />
        <Route path="evaluations" element={<h1>Evaluations</h1>} />
        <Route path="Reclamations" element={<h1>Reclamations</h1>} />
        <Route path="services" element={<ServicePage />} />
        <Route path="regions" element={<RegionPage />} />
        <Route path="provinces" element={<ProvincePage />} />
      </Route>
    </Routes>
  );
}

export default App;
