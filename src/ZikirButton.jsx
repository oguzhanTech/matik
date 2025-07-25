import React from "react";

const ZikirButton = ({ count, onZikir, onReset, onResetAll, disabled = false, isAutoZikirActive, autoZikirTarget, setAutoZikirTarget, autoZikirCurrent, onStartAutoZikir, onStopAutoZikir }) => {
  const hasAnyCount = count > 0;
  // input için local state
  const [inputValue, setInputValue] = React.useState(autoZikirTarget?.toString() || "10");
  React.useEffect(() => {
    if (autoZikirTarget === null || autoZikirTarget === undefined || autoZikirTarget === "") {
      setInputValue("");
    } else {
      setInputValue(autoZikirTarget.toString());
    }
  }, [autoZikirTarget]);
  const handleInputChange = (e) => {
    const val = e.target.value;
    // Boş bırakılabiliyor
    if (val === "") {
      setInputValue("");
      setAutoZikirTarget(null);
      return;
    }
    // Sadece rakam
    const num = Number(val);
    if (!isNaN(num)) {
      setInputValue(val);
      setAutoZikirTarget(num);
    }
  };
  const isAutoZikirInputInvalid = inputValue === "" || Number(inputValue) < 1 || Number(inputValue) > 500;
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
        {disabled && isAutoZikirActive ? "Otomatik Zikir Aktif" : disabled ? "Ses Çalıyor..." : "Zikir Çek"}
      </button>
      <div className="counter">Zikir Sayacı: {count}</div>
      {/* Otomatik zikir alanı */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", width: "100%" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="number"
            min={1}
            max={500}
            value={inputValue}
            disabled={isAutoZikirActive}
            onChange={handleInputChange}
            style={{ width: 60, padding: "4px 6px", borderRadius: 4, border: "1px solid #ccc", fontSize: 14 }}
          />
          <span>adet</span>
          {!isAutoZikirActive ? (
            <button
              onClick={onStartAutoZikir}
              disabled={disabled || isAutoZikirInputInvalid}
              style={{
                padding: "5px 12px",
                fontSize: "12px",
                backgroundColor: isAutoZikirInputInvalid ? "#aaa" : "#2ecc40",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: disabled || isAutoZikirInputInvalid ? "not-allowed" : "pointer"
              }}
            >
              Otomatik Zikir Çek
            </button>
          ) : (
            <button
              onClick={onStopAutoZikir}
              style={{
                padding: "5px 12px",
                fontSize: "12px",
                backgroundColor: "#ffb347",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Durdur
            </button>
          )}
        </div>
        {isAutoZikirActive && (
          <div style={{ fontSize: 13, color: "#2d5a27", marginTop: 2 }}>
            Otomatik zikir: {autoZikirCurrent} / {autoZikirTarget}
          </div>
        )}
      </div>
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