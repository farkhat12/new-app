interface UploadProgressOverlayProps {
  uploadProgress: number;
}

export function UploadProgressOverlay({
  uploadProgress,
}: UploadProgressOverlayProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-[18px] bg-white/80 backdrop-blur-[2px]">
      <div className="w-[80%] max-w-md space-y-3 rounded-xl border bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Uploading apartment...</span>
          <span className="text-sm font-semibold text-blue-500">
            {uploadProgress}%
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${uploadProgress}%`,
            }}
          />
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Please wait, your apartment is being uploaded.
        </p>
      </div>
    </div>
  );
}
