import React from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ScrollButton from "../components/scrollTop/ScrollBtn";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div>
      <Header />
      {children}
      <ScrollButton/>
      <Footer />
    </div>
  );
}
