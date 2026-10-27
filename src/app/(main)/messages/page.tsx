"use server";
import { AuthGuard } from "@/components/layout/auth-guard";

const Messages = async () => {
  return (
    <AuthGuard>
      <div>Messages</div>
    </AuthGuard>
  );
};

export default Messages;
