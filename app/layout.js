import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'TrainerABC',
  description:
    'Your language companion. We aim to enhances your conversations and help you reach your leanrning goals!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <Providers> {children}  </Providers>
        
        </body>
    </html>
  );
}
