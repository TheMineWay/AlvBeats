import { Footer } from "@f-homepage/footer/footer";
import { Welcome } from "@f-homepage/welcome/welcome";

export const Homepage: FC = () => {
  return (
    <div className="min-h-full flex flex-col justify-between">
      {/* Welcome */}
      <div>
        <Welcome />
      </div>
      <div>MAIN</div>
      <Footer />
    </div>
  );
};
