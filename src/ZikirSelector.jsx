import React from "react";
import { zikirs } from "./zikirs";
import { useTranslation } from 'react-i18next';

const ZikirSelector = ({ selected, onSelect, counts = {} }) => {
  const { t, i18n } = useTranslation();
  const meal = selected.meal && typeof selected.meal === 'object' ? selected.meal[i18n.language] || selected.meal.tr : selected.meal;
  return (
    <div className="zikir-selector">
      {meal && (
        <div className="zikir-meal" style={{
          marginBottom: '1rem',
          background: 'linear-gradient(90deg, #f4e4bc 0%, #fffbe6 100%)',
          borderRadius: '10px',
          padding: '0.8rem 1.2rem',
          color: '#2d5a27',
          fontWeight: 500,
          fontSize: '1.05rem',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(45,90,39,0.07)'
        }}>{meal}</div>
      )}
      <label htmlFor="zikir-select">{t('zikir_select')}</label>
      <select
        id="zikir-select"
        value={selected.id}
        onChange={e => onSelect(zikirs.find(z => z.id === Number(e.target.value)))}
      >
        {zikirs.map(zikir => {
          const count = counts[zikir.id] || 0;
          return (
            <option key={zikir.id} value={zikir.id}>
              {zikir.name} ({count})
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ZikirSelector; 