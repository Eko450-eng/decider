"use client"
import { ENoLogon } from "@/app/api/messages";
import { showNotification } from "@mantine/notifications";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export function displayMessage(
  res: any,
  router: AppRouterInstance,
  push?: boolean
) {
  if (res.notification) {
    showNotification(res.notification);
    if (!push) router.refresh();
    if (push) router.push("/");
  }
}

export function noLogin(router: AppRouterInstance) {
  router.push("/Signin");
  return showNotification(ENoLogon.notification);
}
