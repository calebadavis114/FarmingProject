import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AnimalsPage from "./pages/AnimalsPage";
import CropsPage from "./pages/CropsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AnAnimal from "./pages/AnAnimalPage";
import ACrop from './pages/ACropsPage'
import FarmsPage from "./pages/FarmsPage";
import RegisterPage from "./pages/RegisterPage";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "home",

          element: <HomePage />,
        },
        {
          path: "animals",
          element: <AnimalsPage />,
        },
        {
            path: "animals/:name",
            element: <AnAnimal />,
         },
        {
          path: "crops",
          element: <CropsPage />
        },
          {
            path: "crops/:id",
            element: <ACrop />,
          },
        {
          path: 'farms',
          element: <FarmsPage />,
        },
      ],
      errorElement: <NotFoundPage />,
    },
  ]);

export default router;