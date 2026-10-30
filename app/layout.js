import "./styles.css";
import {ThemePicker,ThemeDecor} from "./components";
export const metadata={title:"Buzzword Bingo",description:"Create a room and play buzzword bingo."};
export default function Layout({children}){return <html lang="en" suppressHydrationWarning><body><ThemeDecor/><div className="themeDock"><ThemePicker/></div>{children}</body></html>}
