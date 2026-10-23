"use client";
import { Controller, useController, useFormContext } from "react-hook-form";
import FileUpload from "../fields/ImageUploader";
import FileUploadPreview from "../fields/ImageUploadPreview";

const ImageStep = () => {
  const name = "images";
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <div className="mt-3 flex flex-col gap-2">
      {field.value.length < 6 && (
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <FileUpload
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
      )}

      {field.value.length > 0 && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <FileUploadPreview
              files={field.value}
              onRemove={(index) => {
                const files = field.value.filter(
                  (_: any, i: number) => i !== index,
                );
                field.onChange?.(files);
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export default ImageStep;
