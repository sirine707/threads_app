import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { dark } from '@clerk/themes'
import { Inter } from "next/font/google";


 import "../globals.css"
 const inter = Inter({ subsets: ["latin"] });

export const metadata:Metadata = {
  title: "Threads",
  description:'Next.js 13 with Clerk'
};
 
export default function RootLayout({
  children}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>
        <div className='flex w-full justify-center items-center
        min-h-screen'>{children}</div>
        
      </body>
      </html>
    </ClerkProvider>
  )
}