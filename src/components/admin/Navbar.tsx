import { Dispatch, SetStateAction } from "react";
import { Language } from "../../types";
import usFlag from "../../../public/media/images/us-flag.png";
import itaFlag from "../../../public/media/images/ita-flag.png";
import { ArrowsRightLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import { signIn, useSession } from "next-auth/react";

export default function Navbar({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}) {
  const { status, data: sessionData } = useSession();

  return (
    <nav className="sticky top-0 z-40 flex justify-between border-b bg-gray-50 p-6 shadow-md">
      {/* LOGO */}
      <div>
        <p className="text-2xl">Tealade</p>
      </div>
      <div className=" flex items-center space-x-4">
        <LanguageSelection language={language} setLanguage={setLanguage} />
        <div className="h-full border-l border-gray-300" />
        {status === "authenticated" ? (
          <div className="flex space-x-1">
            <UserIcon className="h-5 w-5" />
            <p>{sessionData.user?.name}</p>
          </div>
        ) : (
          <button
            onClick={() => {
              signIn("google").catch((error) => console.error(error));
            }}
            type="button"
            className="mr-2  rounded-lg bg-gray-800 px-5 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 "
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

const LanguageSelection = ({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}) => {
  const flagsData = getFlag(language);

  return (
    <div className="flex items-center space-x-2">
      <div>
        <img className="h-4 " src={flagsData.active[0]} />
      </div>
      <span className="text-sm font-semibold">{flagsData.active[1]}</span>
      <button
        onClick={() =>
          setLanguage(language === "english" ? "italian" : "english")
        }
      >
        <ArrowsRightLeftIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

const getFlag = (language: Language) => {
  if (language == "english") {
    return {
      active: [usFlag.src, "English"],
    } as const;
  }
  return {
    active: [itaFlag.src, "Italiano"],
  } as const;
};
