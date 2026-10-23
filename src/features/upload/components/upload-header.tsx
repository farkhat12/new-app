import { CardHeader } from "@/shared/ui/card";
import { apartmentSteps } from "../constants/upload-apartment-steps";
import { UploadStepId } from "../types/upload.types";

const UploadCardHeader = ({ currentStep }: { currentStep: UploadStepId }) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between gap-1 p-2 pb-1 px-1 md:p-2">
      <div className="space-y-1">
        <h2 className="md:text-lg text-[15px] font-semibold tracking-tight">
          Upload your files
        </h2>
        <p className="text-[13px] md:text-sm text-muted-foreground">
          Select the files you want to upload
        </p>
      </div>
      <div className="rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium">
        <span className="text-foreground">
          {apartmentSteps.findIndex((step: any) => step.id === currentStep) + 1}
        </span>
        <span className="mx-1 text-muted-foreground">/</span>
        <span className="text-muted-foreground">{apartmentSteps.length}</span>
      </div>
    </CardHeader>
  );
};

export default UploadCardHeader;
