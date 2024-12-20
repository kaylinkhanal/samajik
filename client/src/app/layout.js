import localFont from "next/font/local";
import "./globals.css";
import TanStackProvider from "@/provider/TanStackProvider";
import ReduxProvider from "@/provider/ReduxProvider";
import { Toaster } from "@/components/ui/toaster";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Samajik",
  description: "A Nepali social media platform for networking and connecting with like-minded individuals in your industry and interests.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanStackProvider>
        <ReduxProvider>
          {children}
          <Toaster/>
        </ReduxProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
