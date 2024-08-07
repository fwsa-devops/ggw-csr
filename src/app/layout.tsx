import AppLayout from "@/components/layout/app-layout";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Giving",
  description:
    "A platform for hosting and finding Freshworks community events.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>
          <AppLayout>{children}</AppLayout>
        </body>
      </html>
    </ViewTransitions>
  );
}
