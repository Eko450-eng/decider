import { showNotification } from "@mantine/notifications";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

  export function displayMessage(res: any, router: AppRouterInstance) {
    if (res.notification) {
      showNotification(res.notification);
      router.refresh();
    }
  }
