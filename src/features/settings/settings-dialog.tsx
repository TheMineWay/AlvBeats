import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Settings } from "@features/settings/settings";
import { useTranslation } from "@i18n/use-translation";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const SettingsDialog: FC<Props> = ({ open, setOpen }) => {
  const { t } = useTranslation("settings");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t().dialog.Title}</DialogTitle>
        </DialogHeader>
        <Settings onConfigApply={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
