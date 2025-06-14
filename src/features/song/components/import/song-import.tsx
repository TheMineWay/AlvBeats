import { FileUpload } from "@components/form/file-upload/file-upload";

const ACCEPTED_FORMATS: string[] = ["ab-song"];

export const SongImport: FC = () => {
  return <FileUpload acceptedFormats={ACCEPTED_FORMATS} />;
};
