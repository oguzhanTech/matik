import React, { useState, useEffect, useCallback, useRef } from "react";
import './i18n';
import ZikirButton from "./ZikirButton";
import ZikirSelector from "./ZikirSelector";
import AyetBox from "./AyetBox";
import { zikirs, defaultZikir } from "./zikirs";
import { sureler } from "./ayetler";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';

function getRandomSure() {
  // Tüm surelerden rastgele bir sure seç
  return sureler[Math.floor(Math.random() * sureler.length)];
}

const App = () => {
  const { t } = useTranslation();
  const [selectedZikir, setSelectedZikir] = useState(defaultZikir);
  const [counts, setCounts] = useState({});
  const [sure, setSure] = useState(getRandomSure());
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);
  // Otomatik zikir için state'ler
  const [isAutoZikirActive, setIsAutoZikirActive] = useState(false);
  const [autoZikirTarget, setAutoZikirTarget] = useState(10);
  const [autoZikirCurrent, setAutoZikirCurrent] = useState(0);
  const [autoZikirIntervalId, setAutoZikirIntervalId] = useState(null);

  const playZikirSound = useCallback((zikir) => {
    if (zikir.sound && !isPlaying) {
      setIsPlaying(true);
      const audio = new Audio(zikir.sound);
      // LocalStorage'a kaydet
      try {
        const played = JSON.parse(localStorage.getItem('playedZikirs') || '[]');
        if (!played.includes(zikir.id)) {
          played.push(zikir.id);
          localStorage.setItem('playedZikirs', JSON.stringify(played));
        }
      } catch (e) { /* ignore */ }
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      audio.addEventListener('error', () => {
        console.log("Ses çalınamadı");
        setIsPlaying(false);
        // Ses çalınamazsa eski beep sesini çal
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, ctx.currentTime);
        oscillator.connect(ctx.destination);
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          ctx.close();
        }, 100);
      });
      
      audio.play().catch(error => {
        console.log("Ses çalınamadı:", error);
        setIsPlaying(false);
        // Ses çalınamazsa eski beep sesini çal
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, ctx.currentTime);
        oscillator.connect(ctx.destination);
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          ctx.close();
        }, 100);
      });
    }
  }, [isPlaying]);

  const handleZikir = useCallback(() => {
    if (!isPlaying) {
      setCounts(prevCounts => ({
        ...prevCounts,
        [selectedZikir.id]: (prevCounts[selectedZikir.id] || 0) + 1
      }));
      playZikirSound(selectedZikir);
    }
  }, [selectedZikir, isPlaying, playZikirSound]);

  // Otomatik zikir başlatma (her ses bitince yenisi başlar)
  const autoZikirStoppedRef = useRef(false);
  const autoZikirAudioRef = useRef(null);
  const [isAutoZikirBusy, setIsAutoZikirBusy] = useState(false);

  const handleStartAutoZikir = useCallback(() => {
    if (isAutoZikirActive || isPlaying || isAutoZikirBusy) return;
    if (!autoZikirTarget || isNaN(autoZikirTarget) || autoZikirTarget < 1 || autoZikirTarget > 500) return;
    setIsAutoZikirActive(true);
    setIsAutoZikirBusy(true);
    setAutoZikirCurrent(0);
    autoZikirStoppedRef.current = false;
    function playNext(current) {
      if (autoZikirStoppedRef.current || current > autoZikirTarget) {
        setIsAutoZikirActive(false);
        setIsAutoZikirBusy(false);
        autoZikirAudioRef.current = null;
        return;
      }
      if (current <= autoZikirTarget) {
        setAutoZikirCurrent(current);
        setCounts(prevCounts => ({
          ...prevCounts,
          [selectedZikir.id]: (prevCounts[selectedZikir.id] || 0) + 1
        }));
        if (selectedZikir.sound) {
          const audio = new Audio(selectedZikir.sound);
          autoZikirAudioRef.current = audio;
          audio.addEventListener('ended', () => {
            setTimeout(() => playNext(current + 1), 100); // 100ms ara
          });
          audio.addEventListener('error', () => {
            setTimeout(() => playNext(current + 1), 100);
          });
          audio.play().catch(() => {
            setTimeout(() => playNext(current + 1), 100);
          });
        } else {
          setTimeout(() => playNext(current + 1), 500);
        }
      }
    }
    playNext(1);
    setAutoZikirIntervalId({ stop: () => { autoZikirStoppedRef.current = true; if (autoZikirAudioRef.current) { autoZikirAudioRef.current.pause(); autoZikirAudioRef.current.currentTime = 0; } } });
  }, [isAutoZikirActive, isPlaying, isAutoZikirBusy, autoZikirTarget, selectedZikir]);

  // Otomatik zikir durdurma
  const handleStopAutoZikir = useCallback(() => {
    if (autoZikirIntervalId && typeof autoZikirIntervalId.stop === 'function') {
      autoZikirIntervalId.stop();
    }
    setAutoZikirIntervalId(null);
    setIsAutoZikirActive(false);
    setIsAutoZikirBusy(false);
    if (autoZikirAudioRef.current) {
      autoZikirAudioRef.current.pause();
      autoZikirAudioRef.current.currentTime = 0;
      autoZikirAudioRef.current = null;
    }
  }, [autoZikirIntervalId]);

  // Zikir veya zikir seçimi değişirse otomatik zikir sıfırlansın
  useEffect(() => {
    handleStopAutoZikir();
    setAutoZikirCurrent(0);
    setIsAutoZikirBusy(false);
  }, [selectedZikir]);

  useEffect(() => {
    const onSpace = e => {
      if (e.code === "Space") {
        e.preventDefault();
        handleZikir();
      }
    };
    window.addEventListener("keydown", onSpace);
    return () => window.removeEventListener("keydown", onSpace);
  }, [handleZikir]);

  useEffect(() => {
    if (selectedZikir.image) {
      // Önce opacity'yi 0 yap
      setImageOpacity(0);
      
      // Kısa bir süre sonra yeni resmi göster
      setTimeout(() => {
        setShowImage(true);
        setImageOpacity(1);
      }, 150);
    }
  }, [selectedZikir]);

  const handleAyetChange = () => {
    setSure(getRandomSure());
  };

  const handleResetCount = () => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [selectedZikir.id]: 0
    }));
  };

  const handleResetAllCounts = () => {
    setCounts({});
  };

  const currentCount = counts[selectedZikir.id] || 0;

  return (
    <div className="app-container" style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
      {/* Dil seçici sol üstte */}
      <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
        <LanguageSwitcher />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          marginBottom: "30px",
          width: "400px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {showImage && selectedZikir.image && (
            <img 
              src={selectedZikir.image} 
              alt={selectedZikir.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                transition: "opacity 0.3s ease-in-out",
                opacity: imageOpacity
              }}
            />
          )}
        </div>
        <ZikirSelector selected={selectedZikir} onSelect={setSelectedZikir} counts={counts} />
        <ZikirButton 
          count={currentCount} 
          onZikir={handleZikir} 
          onReset={handleResetCount} 
          onResetAll={handleResetAllCounts} 
          disabled={isPlaying || isAutoZikirActive || isAutoZikirBusy}
          isAutoZikirActive={isAutoZikirActive}
          autoZikirTarget={autoZikirTarget}
          setAutoZikirTarget={setAutoZikirTarget}
          autoZikirCurrent={autoZikirCurrent}
          onStartAutoZikir={handleStartAutoZikir}
          onStopAutoZikir={handleStopAutoZikir}
        />
      </div>
      <div style={{ width: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(255, 255, 255, 0.8)", boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.1)" }}>
        <AyetBox ayet={sure} />
        <button 
          className="new-ayet-button"
          onClick={handleAyetChange}
        >
          {t('new_sure')}
        </button>
      </div>
      {showInfoBox && (
        <div style={{ 
          position: "fixed", 
          bottom: "5px", 
          left: "50%", 
          transform: "translateX(-50%)", 
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
          color: "white", 
          padding: "10px 20px", 
          borderRadius: "25px", 
          fontSize: "14px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span>{t('info_spacebar')}</span>
          <button
            onClick={() => setShowInfoBox(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              padding: "0",
              marginLeft: "5px",
              fontWeight: "bold"
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
