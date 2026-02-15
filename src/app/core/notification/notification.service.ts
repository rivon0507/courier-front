import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface NotificationPayload {
  kind: "success" | "error" | "info" | "warning";
  code: string;
}

const NOTIFICATION_DURATION: Record<NotificationPayload["kind"], number> = {
  error: 6000,
  info: 3000,
  success: 2000,
  warning: 4000,
};

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  notify (payload: NotificationPayload): void {
    this.snackBar.open(payload.code, "Close", {
      duration: NOTIFICATION_DURATION[payload.kind],
    });
  }
}
