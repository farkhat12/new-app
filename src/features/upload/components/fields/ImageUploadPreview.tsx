"use client";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";

interface IFileUploadPreview {
  files: File[];
  onRemove: (index: number) => void;
}

const FileUploadPreview = ({ files, onRemove }: IFileUploadPreview) => {
  const { control } = useFormContext();
  const { field } = useController({ name: "images", control });
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-[12px] ml-2 md:text-sm font-bold">
          Uploaded <span className="text-gray-500">{`(4 / 6)`}</span>
        </p>
        <Button
          variant="ghost"
          onClick={() => {
            field.onChange([]);
          }}
          className="text-blue-500"
        >
          Clear all
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-1 md:gap-2 sm:grid-cols-3 md:grid-cols-4">
        {files.map((file, index) => {
          return (
            <PreviewItem
              key={`${file.name}-${file.lastModified}`}
              file={file}
              onRemove={() => onRemove(index)}
            />
          );
        })}
      </div>
    </>
  );
};

function PreviewItem({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [preview, setPreview] = useState<string>();
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);
  if (!preview) return null;
  return (
    <div className="group cursor-pointer relative aspect-9/7 md:aspect-square overflow-hidden rounded-xl border">
      <img
        src={preview}
        alt={file.name}
        className="h-full w-full object-cover"
      />
      <Button
        type="button"
        onClick={onRemove}
        className={
          "absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white md:opacity-0 transition md:group-hover:opacity-100"
        }
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}

export default FileUploadPreview;
