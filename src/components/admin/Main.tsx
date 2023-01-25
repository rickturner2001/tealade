import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Language } from "../../types";
import { api } from "../../utils/api";
import CategoryScrolldown from "./subComponents/dropdowns";
import ListProductDisplay from "./subComponents/ListProductDisplay";

export default function Main({
  language,
  children,
  isListedProducts,
  title,
}: {
  language: Language;
  children?: JSX.Element;
  isListedProducts?: boolean;
  title: string;
}) {
  return (
    <main className="flex h-full w-full flex-col bg-blue-50">
      <div className="flex w-full flex-col">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-12 px-6 md:px-24">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        </div>
        {children}
      </div>
    </main>
  );
}
