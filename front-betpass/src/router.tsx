import { createBrowserRouter } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Deals from "./pages/Deals/Deals";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/deals",
    element: <Deals />,
  },
]);
