import { FileUpload } from "@components/form/file-upload/file-upload";
import { useFileUpload } from "@components/form/file-upload/use-file-upload";

const ACCEPTED_FORMATS: string[] = ["ab-song"];

export const SongUploadImport: FC = () => {
  const fileManager = useFileUpload({ acceptedFormats: ACCEPTED_FORMATS });

  return <FileUpload manager={fileManager} />;
};
