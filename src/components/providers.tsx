"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider} from "next-themes";
import { ReactNode } from "react";
//import { Toaster } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { AlertDialogProvider } from "./ui/alert-dialog-provider";
import { toast } from "sonner";

type ProviderProps = {
    children:ReactNode
}

//const queryClient = new QueryClient();
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        if (e.message === "NEXT_REDIRECT") return;
        toast.error(e.message);
      },
      onSuccess: () => {
        toast.error("Operation was successful.");
      },
    },
  },
});

const Providers = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster/>
      <AlertDialogProvider/>
        {children}
      
      
      
    </NextThemesProvider>
    </QueryClientProvider>
  );
};

export {Providers}