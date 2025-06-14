import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { SongImport } from "@features/song/components/import/song-import";
import { useTranslation } from "@i18n/use-translation";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

export const SongSearch: FC<Props> = ({ search, setSearch }) => {
  const { t } = useTranslation("song-search");
  const [isImportOpen, setIsImportOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t().forms.search.fields.query.Placeholder}
        />
        <Button size="icon" onClick={() => setIsImportOpen(true)}>
          <Plus />
        </Button>
      </div>

      {/* Dialogs */}
      <SongImport open={isImportOpen} />
    </>
  );
};
