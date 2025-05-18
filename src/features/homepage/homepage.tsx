import { SongSearch } from "@/features/songs/song-search/song-search";
import Container from "@components/layout/container";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Footer } from "@f-homepage/footer/footer";
import { Welcome } from "@f-homepage/welcome/welcome";
import { useTranslation } from "@i18n/use-translation";

export const Homepage: FC = () => {
  return (
    <div className="min-h-full flex flex-col justify-between gap-8">
      {/* Welcome */}
      <div>
        <Welcome />
      </div>
      <Container className="grow flex flex-col gap-4">
        <Actions />
        <SongSearch />
      </Container>
      <Footer />
    </div>
  );
};

/* Internal */

const Actions: FC = () => {
  const { t } = useTranslation("homepage");
  const { t: commonT } = useTranslation("common");

  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row gap-x-2 gap-y-4">
        <div className="relative inline-block">
          <Button size="lg" variant="outline" disabled>
            {t().main.actions["song-editor"].Title}
          </Button>
          <Badge className="absolute -top-2 -right-2">
            {commonT().sentences["Coming-soon"]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
