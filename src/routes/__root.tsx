import Container from "@components/layout/container";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
