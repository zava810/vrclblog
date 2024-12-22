"use client";
import styles from "./switch.module.css";
import { memo, useEffect, useState } from "react";
declare global { var updateDOM: () => void; }
type ColorSchemePreference = "system" | "dark" | "light";
const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes: ColorSchemePreference[] = ["system", "dark", "light"];
export const NoFOUCScript = (storageKey: string) => {
  const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];
  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);
    return () => {
      getComputedStyle(document.body);
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };
  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);
  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    const systemMode = media.matches ? DARK : LIGHT;
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const classList = document.documentElement.classList;
    if (resolvedMode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute("data-mode", mode);
    restoreTransitions();
  };
  window.updateDOM();
  media.addEventListener("change", window.updateDOM);
};

let updateDOM: () => void;
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(
     () => (
      (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY)) ?? "system"
  ) as ColorSchemePreference, );

  useEffect(() => {
    updateDOM = window.updateDOM;
    addEventListener("storage", (e: StorageEvent): void => {
      e.key === STORAGE_KEY && setMode(e.newValue as ColorSchemePreference);
    });
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, mode); updateDOM(); }, [mode]);

  /** toggle mode */
  const handleModeSwitch = () => { const index = modes.indexOf(mode); setMode(modes[(index + 1) % modes.length]); };
  return ( <button suppressHydrationWarning className={styles.switch} onClick={handleModeSwitch} /> );
};
const Script = memo(() => (
  <script dangerouslySetInnerHTML={{ __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`, }} />
));
export const ThemeSwitcher = () => {
  return ( <> <Script /> <Switch /> </> );
};
