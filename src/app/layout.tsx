"use client";
import { Allotment } from "allotment";
import { MwAppBar, MwAppBarTitle, MwIcon } from "@maibornwolff/mwui-react";
import Sidepanel from "../components/sidepanel/Sidepanel";
import { ProcessVisualizationContextProvider } from "../context/ProcessVisualizationContext";

import "allotment/dist/style.css";
import "./globals.css";
import "@maibornwolff/mwui-stencil/dist/mwui-stencil/mwui-stencil.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProcessVisualizationContextProvider>
          <>
            <Allotment className="w-screen h-screen">
              <Allotment.Pane className="h-full w-full flex flex-col">
                <MwAppBar>
                  <div slot="start">
                    <MwIcon slot="start" icon="shopping_bag" size="medium"></MwIcon>

                    <MwAppBarTitle>AI Shop</MwAppBarTitle>
                  </div>
                  <div slot="end">
                    <button
                      onClick={() => document.body.classList.toggle("dark")}
                      className="h-8 w-8 rounded-xl p-1 text-gray-500"
                    >
                      <svg
                        className="fill-blue-500 block dark:hidden"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                      </svg>
                      <svg
                        className="fill-yellow-500 hidden dark:block"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </MwAppBar>
                {children}
              </Allotment.Pane>
              <Allotment.Pane
                preferredSize="25%"
                minSize={20}
                className="h-full w-full"
              >
                <Sidepanel />
              </Allotment.Pane>
            </Allotment>
          </>
        </ProcessVisualizationContextProvider>
      </body>
    </html>
  );
}
