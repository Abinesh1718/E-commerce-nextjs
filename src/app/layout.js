import { Inter } from "next/font/google";
import AuthProvider from "../components/admin-panel/Auth-Provider";
import App from "./App";
import { Toaster } from "react-hot-toast";
import './globals.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>
          {children}
        </App>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
