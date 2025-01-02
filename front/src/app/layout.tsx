import type { Metadata } from "next";
import "@/styles/globals.scss";
// import Sidebar from "./components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Turtle List",
  description: "Turtle List",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="page">
        {/* <Sidebar /> */}
        {children}
      </body>
    </html>
  );
}
