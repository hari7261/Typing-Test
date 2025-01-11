import { ThemeProvider } from "@/providers/theme-provider";
import { LandingPage } from "@/components/landing-page";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ThemeToggle />
      <LandingPage />
      <Toaster />
    </ThemeProvider>
  );
}