import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { useTranslation } from "@i18n/use-translation";

type Props = {
  open?: boolean;
};

export const SongImportModal: FC<Props> = ({ open = false }) => {
  const { t } = useTranslation("song-import");

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t().importer.Title}</DialogTitle>
          <DialogDescription>{t().importer.Description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
