import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavigationCtx, navigationContext } from "@/context/navigationContext";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  navigation?: NavigationCtx;
  isAuthenticated?: boolean;
}>) {
  const navigation = pageProps.navigation || [];
  const isAuthenticated = pageProps.isAuthenticated || false;

  return (
    <navigationContext.Provider value={navigation}>
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} />
        <main className="flex flex-grow flex-col">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </navigationContext.Provider>
  );
}
