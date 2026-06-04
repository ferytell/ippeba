import { atom } from "jotai";
import { authAtom } from "./atoms";

// Derived atom for checking if user is authenticated
export const isAuthenticatedAtom = atom((get) => get(authAtom).isAuthenticated);

// Derived atom for user info
export const userAtom = atom((get) => get(authAtom).user);

// Action atoms (for updating state)
export const loginAtom = atom(null, (get, set, { user, token }) => {
  set(authAtom, {
    isAuthenticated: true,
    user,
    token,
  });
  set(notificationAtom, {
    open: true,
    message: "Login successful!",
    severity: "success",
  });
});

export const logoutAtom = atom(null, (get, set) => {
  set(authAtom, {
    isAuthenticated: false,
    user: null,
    token: null,
  });
  set(notificationAtom, {
    open: true,
    message: "Logged out successfully",
    severity: "info",
  });
});

export const showNotificationAtom = atom(
  null,
  (get, set, { message, severity = "info" }) => {
    set(notificationAtom, {
      open: true,
      message,
      severity,
    });
  }
);
