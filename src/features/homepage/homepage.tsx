import { SongSearch } from "@/features/songs/song-search/song-search";
import Container from "@components/layout/container";
import { Footer } from "@f-homepage/footer/footer";
import { Welcome } from "@f-homepage/welcome/welcome";

export const Homepage: FC = () => {
  return (
    <div className="min-h-full flex flex-col justify-between gap-8">
      {/* Welcome */}
      <div>
        <Welcome />
      </div>
      <Container className="grow flex flex-col gap-4">
        <SongSearch />
      </Container>
      <Footer />
    </div>
  );
};
