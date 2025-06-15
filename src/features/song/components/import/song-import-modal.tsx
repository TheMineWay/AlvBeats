import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { SongImport } from "@features/song/components/import/song-import";
import { useTranslation } from "@i18n/use-translation";

type Props = {
  open?: boolean;
  setOpen: (open: boolean) => void;
};

export const SongImportModal: FC<Props> = ({ open = false, setOpen }) => {
  const { t } = useTranslation("song-import");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t().importer.Title}</DialogTitle>
          <DialogDescription>{t().importer.Description}</DialogDescription>
          <div className="pt-2">
            <SongImport onImported={() => setOpen(false)} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
