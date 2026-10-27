"use client";
import { useUIStore } from "@/stores/ui.store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import { logoutAction } from "@/actions/auth";

const LogoutDialog = () => {
  const key = "logout";
  const modal = useUIStore((store) => store.modalType);
  const isOpen = modal === key;
  const closeModal = useUIStore((store) => store.closeModal);
  const [loading, setLoading] = useState(false);
  const handleLogout = async (e: React.MouseEvent) => {
    try {
      setLoading(true);
      await logoutAction();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Akkauntan şığasız ba?</AlertDialogTitle>
          <AlertDialogDescription>
            Qayta kiru üşin logın men paroldi qaytadan engizuiñiz kerek bolady.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={() => closeModal()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out ..." : "Log out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
