"use client";

import {
  Bell,
  ChevronRight,
  KeyRound,
  LogOut,
  Phone,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

interface AccountSettingsProps {
  onChangePassword?: () => void;
  onChangePhone?: () => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
}

export function AccountSettings({
  onChangePassword,
  onChangePhone,
  onLogout,
  onDeleteAccount,
}: AccountSettingsProps) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="px-4 pb-2 pt-4 sm:px-5">
        <CardTitle className="text-base font-semibold">
          Account Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-3 sm:px-5">
        <div className="space-y-1">
          {/* Change password */}
          <button
            type="button"
            onClick={onChangePassword}
            className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left transition-colors hover:bg-muted/60"
          >
            <div className="flex items-center gap-3">
              <KeyRound className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Change Password</span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>

          <Separator />

          {/* Change phone */}
          <button
            type="button"
            onClick={onChangePhone}
            className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left transition-colors hover:bg-muted/60"
          >
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Change Phone</span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>

          <Separator />

          {/* Notifications */}
          <div className="flex items-center justify-between rounded-lg px-2 py-3">
            <div className="flex items-center gap-3">
              <Bell className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Notifications</span>
            </div>

            <span className="text-xs text-green-600">Enabled</span>
          </div>

          <Separator />

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left transition-colors hover:bg-muted/60"
          >
            <div className="flex items-center gap-3">
              <LogOut className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Log Out</span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>

          <Separator />

          {/* Delete account */}
          <button
            type="button"
            onClick={onDeleteAccount}
            className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left transition-colors hover:bg-destructive/5"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="size-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">
                Delete Account
              </span>
            </div>
            <ChevronRight className="size-4 text-destructive" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
