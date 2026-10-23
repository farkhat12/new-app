"use client";
import React, { useCallback } from "react";
import { Image as ImageIcon, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface IFileUpload {
  value?: File[];
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  error?: string;
}

const FileUpload = ({
  value = [],
  onChange,
  maxFiles = 6,
  maxSize = 5 * 1024 * 1024,
}: IFileUpload) => {
  const onDrop = useCallback(
    (accesptedFiles: File[]) => {
      const files = [...value, ...accesptedFiles];
      onChange?.(files);
    },
    [value, onChange, maxFiles],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
    },
    maxFiles: maxFiles - value.length,
    maxSize,
  });
  return (
    <div>
      <div
        {...getRootProps()}
        className="flex min-h-40 max-w-100 mx-auto cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-2 transition hover:bg-muted/50"
      >
        <input {...getInputProps()} />
        <div className="mb-3 rounded-2xl p-3">
          {isDragActive ? (
            <Upload className="size-6 mx-auto mb-3" />
          ) : (
            <ImageIcon className="size-6 mx-auto mb-3" />
          )}
          <p className="text-sm font-medium">
            {isDragActive ? "Drop image here" : "Drag & drop images here"}
          </p>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            or click to select
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            JPG, PNG, WebP, AVIF max 6 MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
