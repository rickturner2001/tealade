import { NextPage } from "next";
import { Head } from "next/document";
import React, { useState } from "react";
import Dashboard from "../../components/admin/Dashboard";
import { Language } from "../../types";

const admin: NextPage = () => {
  const [language, setLanguage] = useState<Language>("english");
  return <Dashboard language={language} setLanguage={setLanguage} />;
};

export default admin;
