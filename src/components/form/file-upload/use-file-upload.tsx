import { useState } from "react";

type Options = {
  acceptedFormats?: string[];
  maxFiles?: number;
};

export const useFileUpload = ({
  acceptedFormats = [],
  maxFiles = 1,
}: Options) => {
  const [files, setFiles] = useState<File[]>([]);

  const addFile = (file: File) => {
    setFiles([...files, file]);
  };

  const clear = () => setFiles([]);

  return {
    acceptedFormats,
    addFile,
    files,
    setFiles,
    clear,
    maxFiles,
  };
};

export type UseFileUpload = ReturnType<typeof useFileUpload>;
