import "./globals.css";import type { Metadata } from "next";
export const metadata:Metadata={title:"BantuPelajar — Belajar lebih mudah.",description:"Teman belajar digital untuk pelajar SMP, SMA, dan mahasiswa."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body>{children}</body></html>}
