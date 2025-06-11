import { Navigation } from "@components/layout/navigation/navigation";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <header className="h-12 w-full fixed top-0 left-0 right-0 z-10">
        <Navigation />
      </header>
      <main className="pt-12 h-full">
        <Outlet />
      </main>
    </>
  );
}
