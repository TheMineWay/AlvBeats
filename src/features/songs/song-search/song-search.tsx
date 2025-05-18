import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useTranslation } from "@i18n/use-translation";
import { SearchIcon } from "lucide-react";

export const SongSearch = () => {
  const { t } = useTranslation("song-search");
  return (
    <div className="flex gap-2">
      <Input placeholder={t().forms.search.fields.query.Placeholder} />
      <Button size="icon">
        <SearchIcon />
      </Button>
    </div>
  );
};
