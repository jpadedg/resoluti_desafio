import { Inter } from "next/font/google";
import Navbar from "@/component/Navbar";
import AuthChecker from "@/component/AuthChecker";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ResoluTI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="PT-br">
      <body className={inter.className}>   
        <AuthChecker>
          <Navbar/>
        </AuthChecker>  
        {children}
      </body>
    </html>
  );
}
