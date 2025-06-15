import { cn } from "@/lib/utils";
import { UseFileUpload } from "@components/form/file-upload/use-file-upload";
import { useTranslation } from "@i18n/use-translation";
import { File } from "lucide-react";
import { InputHTMLAttributes, useRef } from "react";

export type FileUploadProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "accept" | "max"
> & {
  onFileChange?: (file: File | null) => void;
  manager: UseFileUpload;
  loading?: boolean;
};

export const FileUpload: FC<FileUploadProps> = ({
  onFileChange,
  className,
  manager,
  onChange,
  loading = false,
  ...props
}) => {
  const { t, interpolated } = useTranslation("common");
  const inputRef = useRef<HTMLInputElement>(null);

  const { acceptedFormats, files, setFiles, maxFiles } = manager;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 hover:border-primary rounded-2xl cursor-pointer bg-background transition-colors">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <File className="text-gray-400" />
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">
            {t().components["file-upload"]["click-to-upload"]}{" "}
          </span>
          {t().components["file-upload"]["drag-and-drop"]}
        </p>
        {acceptedFormats.length > 0 && (
          <p className="text-xs text-gray-400">
            {interpolated(
              (t) => t.components["file-upload"]["accepted-formats"],
              {
                formats: acceptedFormats
                  .map((format) => `.${format}`)
                  .join(", "),
              }
            )}
          </p>
        )}
        <div className="flex items-center justify-center gap-2 w-full px-4 py-2 mt-2 text-sm bg-background rounded-lg">
          {files.map((f) => (
            <span key={f.name}>{f.name}</span>
          ))}
        </div>
      </div>
      <input
        {...props}
        disabled={loading || props.disabled}
        max={maxFiles}
        ref={inputRef}
        accept={
          acceptedFormats.length > 0
            ? acceptedFormats.map((f) => `.${f}`).join(",")
            : undefined
        }
        type="file"
        className={cn(className, "hidden")}
        onChange={(e) => {
          onChange?.(e);
          handleChange(e);
        }}
      />
    </label>
  );
};
