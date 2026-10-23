import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

interface OptionCardProps {
  name: string;
  option: {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color?: string;
  };
}

const colorClasses: Record<
  string,
  {
    border: string;
    selectedBorder: string;
    iconBg: string;
    selectedBg: string;
    text: string;
  }
> = {
  blue: {
    border: "border-blue-100",
    selectedBorder: "border-blue-400",
    iconBg: "bg-blue-100",
    selectedBg: "bg-blue-300",
    text: "text-blue-500",
  },
  green: {
    border: "border-green-100",
    selectedBorder: "border-green-400",
    iconBg: "bg-green-100",
    selectedBg: "bg-green-300",
    text: "text-green-500",
  },
  red: {
    border: "border-red-100",
    selectedBorder: "border-red-400",
    iconBg: "bg-red-100",
    selectedBg: "bg-red-300",
    text: "text-red-500",
  },
  yellow: {
    border: "border-yellow-100",
    selectedBorder: "border-yellow-400",
    iconBg: "bg-yellow-100",
    selectedBg: "bg-yellow-300",
    text: "text-yellow-500",
  },
};

export function OptionCard({ name, option }: OptionCardProps) {
  const { control, setValue } = useFormContext();
  const selectedValue = useWatch({
    name,
    control,
  });

  const isSelected = selectedValue === option.id;
  const Icon = option.icon;

  const colors = option.color ? colorClasses[option.color] : null;

  return (
    <div
      className={cn(
        "flex flex-1 cursor-pointer select-none items-center gap-1 rounded-2xl border bg-background p-2 transition-colors md:p-2.5",
        colors
          ? isSelected
            ? colors.selectedBorder
            : colors.border
          : isSelected
            ? "border-[#5989f0]"
            : "border-gray-100",
      )}
      onClick={() =>
        setValue(name, option.id, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        })
      }
    >
      {/* Icon */}
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
          colors
            ? isSelected
              ? `${colors.selectedBg}`
              : colors.iconBg
            : isSelected
              ? "bg-[#5989f0] text-white"
              : "bg-gray-50",
        )}
      >
        <Icon className="size-5" />
      </div>

      {/* Content */}
      <div className="ml-1.5 flex flex-1 flex-col justify-center gap-0 md:m-0">
        <p className="text-[14px] font-semibold text-foreground">
          {option.title}
        </p>

        <p className="text-[13px] text-muted-foreground">
          {option.description}
        </p>
      </div>
      <div
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full border transition-all",
          colors
            ? isSelected
              ? `${colors.selectedBg} ${colors.text} border-transparent`
              : colors.border
            : isSelected
              ? "border-[#5989f0] bg-[#5989f0] text-white"
              : "border-primary/50",
        )}
      >
        {isSelected && <Check className="size-3.5 stroke-3" />}
      </div>
    </div>
  );
}
