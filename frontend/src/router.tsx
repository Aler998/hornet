import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { navItems } from "./components/Menu/NavItems";
import { RequireAuth } from "./components/RequireAuth";
import Trip from "./pages/me/Trip";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {navItems.map((item) => (
        <Route
          path={item.link}
          element={<RequireAuth>{item.page}</RequireAuth>}
        />
      ))}
      <Route
        path="/me/trip/:slug"
        element={
          <RequireAuth>
            <Trip />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
