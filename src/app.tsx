import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./app.css";

// Import the generated route tree
import Providers from "@/providers/providers";
import { useTheme } from "@components/layout/navigation/actions/use-theme";
import { useEffect } from "react";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree, basepath: "/AlvBeats" });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  const { applyTheme, theme } = useTheme();

  useEffect(() => applyTheme(), [theme, applyTheme]);

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
