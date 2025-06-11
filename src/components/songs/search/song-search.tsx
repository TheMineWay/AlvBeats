import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useTranslation } from "@i18n/use-translation";
import { SearchIcon } from "lucide-react";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

export const SongSearch: FC<Props> = ({ search, setSearch }) => {
  const { t } = useTranslation("song-search");

  return (
    <div className="flex gap-2">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t().forms.search.fields.query.Placeholder}
      />
      <Button size="icon">
        <SearchIcon />
      </Button>
    </div>
  );
};
