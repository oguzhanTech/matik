import React from "react";

const ZikirButton = ({ count, onZikir, onReset, onResetAll, disabled = false }) => {
  const hasAnyCount = count > 0;
  
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      gap: "10px",
      minHeight: "120px", // Sabit yükseklik
      justifyContent: "center"
    }}>
      <button
        onClick={onZikir}
        className="zikir-button"
        tabIndex={0}
        disabled={disabled}
        style={{
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "pointer"
        }}
      >
        {disabled ? "Ses Çalıyor..." : "Zikir Çek"}
      </button>
      <div className="counter">Zikirmatik: {count}</div>
      <div style={{ 
        display: "flex", 
        gap: "10px",
        minHeight: "30px", // Butonlar için sabit yükseklik
        alignItems: "center"
      }}>
        {hasAnyCount && (
          <button
            onClick={onReset}
            className="reset-button"
            style={{
              padding: "5px 15px",
              fontSize: "12px",
              backgroundColor: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Bu Sayacı Sıfırla
          </button>
        )}
        {hasAnyCount && (
          <button
            onClick={onResetAll}
            className="reset-all-button"
            style={{
              padding: "5px 15px",
              fontSize: "12px",
              backgroundColor: "#ff4757",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Tüm Sayaçları Sıfırla
          </button>
        )}
      </div>
    </div>
  );
};

export default ZikirButton; 