import { Route, Routes } from "react-router";
import DashboardLayout from "./features/dashboard/layouts/DashboardLayout";
import RolePage from "./features/dashboard/features/roles/pages/RolePage";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="users" element={<h1>Users</h1>} />
        <Route path="categories" element={<h1>categories</h1>} />
        <Route path="demandes" element={<h1>Demandes</h1>} />
        <Route path="roles" element={<RolePage />} />
        <Route path="evaluations" element={<h1>Evaluations</h1>} />
        <Route path="Reclamations" element={<h1>Reclamations</h1>} />
        <Route path="services" element={<h1>Services</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
