import { atom } from "jotai";

// Authentication state
export const authAtom = atom({
  isAuthenticated: false,
  user: null,
  token: null,
});

// Theme state (light/dark mode)
export const themeModeAtom = atom("light");

// Global loading state
export const loadingAtom = atom(false);

// Global notification/snackbar
export const notificationAtom = atom({
  open: false,
  message: "",
  severity: "info", // 'success', 'error', 'warning', 'info'
});

// Current page title
export const pageTitleAtom = atom("IPPEBA");

// Projects data
export const projectsAtom = atom([]);

// Events data
export const eventsAtom = atom([]);
