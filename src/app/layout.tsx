"use client";
import Footer from "@/app/_components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
//import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import cn from "classnames";
//import { ThemeSwitcher } from "./_components/theme-switcher";
////binaryhoriontal115.woff2  hex115.woff2 binaryvertical115.woff2
import React, { useState } from 'react';
import {
		hin115_font, ing115_font, bangla115_font, telugu115_font,
		mlyalm115_font, tmil115_font, kannada115_font, odia115_font,
		sinhala115_font, pnzabi115_font, guzrati115_font
} from '@/fonts';
import "./globals.css";

//const inter = Inter({ subsets: ["latin"] });

/*
export const metadata: Metadata = {
  title: `Next.js Blog Example with ${CMS_NAME}`,
  description: `A statically generated blog example using Next.js and ${CMS_NAME}.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};
*/
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const [selectedFont, setSelectedFont] = useState(ing115_font);
  const handleFontChange = (font: any) => { setSelectedFont(font); };
  const getFontClass = (sval:string) => {
    switch (sval) {
      case '0': return ing115_font ;
      case '1': return hin115_font ;
      case '2': return bangla115_font ;
      case '3': return telugu115_font ;
      case '4': return mlyalm115_font ;
      case '5': return tmil115_font ;      
      case '6': return kannada115_font ;
      case '7': return odia115_font ;
      case '8': return sinhala115_font ;
      case '9': return pnzabi115_font ;
      case 'L': return guzrati115_font ;
      default: return ing115_font ;
    }
  }
  return (
    <html lang="en">
      <head>
		<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
		<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
		<meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
	  <body className={cn(selectedFont.className, "dark:bg-slate-900 dark:text-slate-400")} >        
        <div>
          <select onChange={(e) => handleFontChange(getFontClass(e.target.value))}>
            <option value="0">iNg115_font</option>
            <option value="1">hin115_font</option>
            <option value="2">bangla115_font</option>
            <option value="3">telugu115_font</option>
            <option value="4">mlyalm115_font</option>
            <option value="5">tmil115_font</option>
            <option value="6">kannada115_font</option>
            <option value="7">odia115_font</option>
            <option value="8">sinhala115_font</option>
            <option value="9">pnzabi115_font</option>
            <option value="L">guzrati115_font</option>
          </select>
          {/* <ThemeSwitcher /> */}
        </div>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
