import Navigation from "@/components/shared/Navigation";
import "./globals.css";
import { OrderProvider } from "@/context/OrderProvider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/shared/Footer";
import Layout from "@/components/shared/Layout";

export const metadata = {
  title:
    "Natural Spring Water | Bulk Water Delivery Auckland | Blakes Quality Water",
  description:
    "We offer both premium quality, highly alkaline water from a natural spring source; and treated water sourced from the Auckland City network.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <OrderProvider>
          <Layout>{children}</Layout>
          <Toaster richColors />
        </OrderProvider>
      </body>
    </html>
  );
}
