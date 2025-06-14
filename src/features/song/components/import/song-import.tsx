import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { useTranslation } from "@i18n/use-translation";

type Props = {
  open?: boolean;
};

export const SongImport: FC<Props> = ({ open = false }) => {
  const { t } = useTranslation("song-import");

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {t().Title}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
