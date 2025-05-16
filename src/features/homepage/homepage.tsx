import { Navigation } from "@components/layout/navigation/navigation";
import { Header } from "@f-homepage/header/header";

export const Homepage: FC = () => {
  return (
    <div>
      <div className="h-12 w-full fixed top-0 left-0 right-0 z-10">
        <Navigation />
      </div>
      <div className="h-12" />
      <Header />
    </div>
  );
};
