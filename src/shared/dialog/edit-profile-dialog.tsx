"use client";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { User } from "@/features/auth/types/register.types";
import { useUIStore } from "@/stores/ui.store";
import { Pencil } from "lucide-react";

export function EditProfileDialog({ user }: { user: User }) {
  const modal = useUIStore((store) => store.modalType);
  const openModal = useUIStore((store) => store.openModal);
  const closeModal = useUIStore((store) => store.closeModal);

  return (
    <Dialog
      open={modal === "edit-profile"}
      onOpenChange={() => openModal("edit-profile")}
    >
      <DialogTrigger
        className="inline-flex items-center justify-center rounded-md border px-4 py-1.5 text-sm font-medium hover:bg-accent"
        onClick={() => openModal("edit-profile")}
      >
        <Pencil size={16} />
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your name and phone number.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="firstName" label="First name">
              <Input id="firstName" autoComplete="off" />
            </Field>
            <Field id="lastName" label="Last name">
              <Input id="lastName" autoComplete="off" />
            </Field>
          </div>
          <Field id="phone" label="Phone number">
            <Input id="phone" type="tel" inputMode="tel" autoComplete="off" />
          </Field>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
            <Button type="button">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
