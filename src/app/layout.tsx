"use client";
import Appbar from "../components/appbar/Appbar";
import Sidepanel from "../components/sidepanel/Sidepanel";
import { ProcessVisualizationContextProvider } from "../context/ProcessVisualizationContext";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProcessVisualizationContextProvider>
          <>
            <Appbar />
            <Allotment className="w-screen h-screen">
              <Allotment.Pane className="h-full w-full">{children}</Allotment.Pane>
              <Allotment.Pane minSize={20} className="h-full w-full">
                <Sidepanel />
              </Allotment.Pane>
            </Allotment>
          </>
        </ProcessVisualizationContextProvider>
      </body>
    </html>
  );
}
