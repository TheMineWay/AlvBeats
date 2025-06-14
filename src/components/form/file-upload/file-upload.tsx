import { cn } from "@/lib/utils";
import { useTranslation } from "@i18n/use-translation";
import { File } from "lucide-react";
import { InputHTMLAttributes } from "react";

export type FileUploadProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "accept"
> & {
  onFileChange?: (file: File | null) => void;
  acceptedFormats?: string[];
};

export const FileUpload: FC<FileUploadProps> = ({
  onFileChange,
  className,
  acceptedFormats = [],
  ...props
}) => {
  const { t, interpolated } = useTranslation("common");

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
      </div>
      <input
        {...props}
        accept={
          acceptedFormats.length > 0
            ? acceptedFormats.map((f) => `.${f}`).join(",")
            : undefined
        }
        type="file"
        className={cn(className, "hidden")}
      />
    </label>
  );
};
