import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => changeLanguage('tr')}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        aria-label="Türkçe"
      >
        <img src="/icons/turkey.png" alt="Türkçe" style={{ width: 37, height: 37, objectFit: 'contain' }} />
      </button>
      <button
        onClick={() => changeLanguage('en')}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        aria-label="English"
      >
        <img src="/icons/united_kingdom.png" alt="English" style={{ width: 28, height: 28, objectFit: 'contain' }} />
      </button>
    </div>
  );
};

export default LanguageSwitcher; 