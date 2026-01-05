import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import "react-datepicker/dist/react-datepicker.css";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnReconnect: false, // Don't refetch on reconnect
      retry: 0, // Don't retry failed requests
      // TODO: stale time needs to be discussed how long should be also for the superuser
      staleTime: 0, // for testing
      // staleTime: 1000 * 60 * 60 * 24, // 24 hours - data stays fresh for 1 day - during this time queries won't automatically refetch
      // gcTime: 1000 * 60 * 60 * 24, // 24 hours - keep in cache for 1 day - how long unused query data says in cache
    },
    mutations: {
      retry: 0, // Don't retry failed mutations
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
