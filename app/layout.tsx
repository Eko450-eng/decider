import "./styles/globals.scss";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import { lazy } from "react";

const Navigation = lazy(() => import("./(navigation)"));
const RootStyleRegistry = lazy(() => import("./emotion"));

export const metadata = {
  title: "Decider",
  description: "Let others decide for you",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  other: {
    HandheldFriendly: "true",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <RootStyleRegistry>
            {children}
            <Navigation />
          </RootStyleRegistry>
        </ClerkProvider>
      </body>
    </html>
  );
}
