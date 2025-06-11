import Container from "@components/layout/container";
import { Footer } from "@features/homepage/footer/footer";
import { Welcome } from "@features/homepage/welcome/welcome";
import { StoredSongSearch } from "@features/song/components/stored-song-search/stored-song-search";

export const Homepage: FC = () => {
  return (
    <div className="min-h-full flex flex-col justify-between gap-8">
      {/* Welcome */}
      <div>
        <Welcome />
      </div>
      <Container className="grow flex flex-col gap-4">
        <Body />
      </Container>
      <Footer />
    </div>
  );
};

/* Internal */

const Body: FC = () => {
  return <StoredSongSearch />;
};
