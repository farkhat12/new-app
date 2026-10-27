"use server";
import { AuthGuard } from "@/components/layout/auth-guard";

const BookmarksPage = () => {
  return (
    <AuthGuard>
      <div>BookmarksPage</div>
    </AuthGuard>
  );
};

export default BookmarksPage;
