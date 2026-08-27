import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { WeatherProvider } from "@/context/WeatherContext";
import { SideDrawer } from "@/components/SideDrawer";
import { LocationSearchModal } from "@/components/LocationSearchModal";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "IMD Mausam - Weather Forecast & Radar",
  description: "Official India Meteorological Department (IMD) Mausam Weather Application Baseline",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0055A6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="bg-[#00386e] text-white min-h-screen flex justify-center items-start antialiased selection:bg-[#FFBE00] selection:text-black">
        {/* Mobile Viewport Container (360-430px width centered) */}
        <div className="mobile-viewport-container relative shadow-2xl overflow-x-hidden min-h-screen">
          <WeatherProvider>
            <SideDrawer />
            <LocationSearchModal />
            {children}
          </WeatherProvider>
        </div>
      </body>
    </html>
  );
}
