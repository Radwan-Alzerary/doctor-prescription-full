import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const TextScaleSelector = () => {
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    // Load the scale factor from cookies
    const savedScale = Cookies.get('textScale');
    if (savedScale) {
      setScaleFactor(parseFloat(savedScale));
      applyTextScale(parseFloat(savedScale));
    }
  }, []);

  const applyTextScale = (scaleFactor) => {
    const root = document.documentElement;
    root.style.setProperty('--text-scale', scaleFactor);
    root.style.fontSize = `${16 * scaleFactor}px`; // 16px is the base size
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScaleFactor(newScale);
    Cookies.set('textScale', newScale, { expires: 365 });
    applyTextScale(newScale);
  };

  return (
    <select value={scaleFactor} onChange={handleScaleChange}>
      <option value="1">100%</option>
      <option value="1.25">125%</option>
      <option value="1.5">150%</option>
      <option value="1.75">175%</option>
      <option value="2">200%</option>
    </select>
  );
};

export default TextScaleSelector;
