// src/context/lang.jsx
import { createContext, useState } from "react";

const LANG = {
  kr: {
    mode: 'kr',
    title: '언어 컨텍스트',
  }, 
  en: {
    mode: 'en',
    title: 'language context',
  }
}

export const langContext = createContext("kr");

const LangProvider = ({children}) => {
  const [lang, setLang] = useState("kr");

  const toggleLang = () => {
    setLang(lang === "kr" ? "en" : "kr");
  };

  return (
    <langContext.Provider value={{...LANG[lang], onChange: toggleLang}}>
      {children}
    </langContext.Provider>
  )
}

export default LangProvider;