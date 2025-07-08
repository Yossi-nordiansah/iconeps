"use client";
import AOSInitializer from "./AOSInitializer";

export default function AosLayoutWrapper({ children }) {
  return (
    <>
      <AOSInitializer />
      {children}
    </>
  );
}
