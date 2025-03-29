import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import {
  DefaultLayout,
  DefaultMainLayout,
  DefaultLayoutAdmin,
} from "./components/bar/default_layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route: any, index: number) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.isAdmin ? (
                <DefaultLayoutAdmin>
                  <route.element />
                </DefaultLayoutAdmin>
              ) : route.isShowHeader ? (
                <DefaultLayout>
                  <route.element />
                </DefaultLayout>
              ) : (
                <DefaultMainLayout>
                  <route.element />
                </DefaultMainLayout>
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
