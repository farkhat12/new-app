"use server";
import { AuthGuard } from "@/components/layout/auth-guard";
import UploadForm from "@/features/upload/components/upload-form";

export default async function UploadPage() {
  return (
    <AuthGuard>
      <UploadForm />
    </AuthGuard>
  );
}
