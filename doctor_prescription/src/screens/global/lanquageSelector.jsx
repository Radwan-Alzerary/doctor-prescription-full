import Cookies from "js-cookie";
import { useEffect } from "react";

function LanguageSelector({ onLanguageChange }) {
  // Retrieve the previously selected language from cookies
  const selectedLocale = Cookies.get("locale") || "ar";

  useEffect(() => {
    // Call the parent component's onLanguageChange function with the selected locale
    onLanguageChange(selectedLocale);
  }, []); // Use an empty dependency array to ensure this effect runs once

  const handleLanguageSelect = (e) => {
    const selectedLocale = e.target.value;
    onLanguageChange(selectedLocale);
    // Store the selected locale in cookies when the user changes the language
    Cookies.set("locale", selectedLocale);
  };

  return (
    <select onChange={handleLanguageSelect} value={selectedLocale}>
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}
export default LanguageSelector;
