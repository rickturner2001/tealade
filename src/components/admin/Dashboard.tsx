import { useState } from "react";
import { Language } from "../../types";
import Main from "./Main";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function Dashboard() {
  const [language, setLanguage] = useState<Language>("english");

  return (
    <section>
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="flex">
        <SideMenu language={language} />
        <Main language={language} />
      </div>
    </section>
  );
}
