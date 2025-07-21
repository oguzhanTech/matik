import React, { useState, useCallback, useRef, useEffect } from "react";

const AyetBox = ({ ayet }) => {
  const [isPlayingAr, setIsPlayingAr] = useState(false);
  const [isPausedAr, setIsPausedAr] = useState(false);
  const audioArRef = useRef(null);

  const [isPlayingTr, setIsPlayingTr] = useState(false);
  const [isPausedTr, setIsPausedTr] = useState(false);
  const audioTrRef = useRef(null);

  // Ayet değiştiğinde tüm sesleri durdur ve sıfırla
  useEffect(() => {
    if (audioArRef.current) {
      audioArRef.current.pause();
      audioArRef.current.currentTime = 0;
      audioArRef.current = null;
    }
    if (audioTrRef.current) {
      audioTrRef.current.pause();
      audioTrRef.current.currentTime = 0;
      audioTrRef.current = null;
    }
    setIsPlayingAr(false);
    setIsPausedAr(false);
    setIsPlayingTr(false);
    setIsPausedTr(false);
  }, [ayet]);

  const playAyetSound = useCallback((soundPath, lang) => {
    if (lang === "ar") {
      if (audioArRef.current && isPausedAr) {
        audioArRef.current.play();
        setIsPausedAr(false);
        setIsPlayingAr(true);
        return;
      }
      if (soundPath && !isPlayingAr) {
        const audio = new Audio(soundPath);
        audioArRef.current = audio;
        setIsPlayingAr(true);
        setIsPausedAr(false);
        audio.addEventListener('ended', () => {
          setIsPlayingAr(false);
          setIsPausedAr(false);
          audioArRef.current = null;
        });
        audio.addEventListener('error', () => {
          setIsPlayingAr(false);
          setIsPausedAr(false);
          audioArRef.current = null;
        });
        audio.play();
      }
    } else if (lang === "tr") {
      if (audioTrRef.current && isPausedTr) {
        audioTrRef.current.play();
        setIsPausedTr(false);
        setIsPlayingTr(true);
        return;
      }
      if (soundPath && !isPlayingTr) {
        const audio = new Audio(soundPath);
        audioTrRef.current = audio;
        setIsPlayingTr(true);
        setIsPausedTr(false);
        audio.addEventListener('ended', () => {
          setIsPlayingTr(false);
          setIsPausedTr(false);
          audioTrRef.current = null;
        });
        audio.addEventListener('error', () => {
          setIsPlayingTr(false);
          setIsPausedTr(false);
          audioTrRef.current = null;
        });
        audio.play();
      }
    }
  }, [isPlayingAr, isPausedAr, isPlayingTr, isPausedTr]);

  const pauseAyetSound = (lang) => {
    if (lang === "ar" && audioArRef.current && isPlayingAr) {
      audioArRef.current.pause();
      setIsPausedAr(true);
      setIsPlayingAr(false);
    } else if (lang === "tr" && audioTrRef.current && isPlayingTr) {
      audioTrRef.current.pause();
      setIsPausedTr(true);
      setIsPlayingTr(false);
    }
  };

  const speak = (text, lang = "tr-TR") => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new window.speechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="ayet-box">
      <div className="ayet-title">{ayet.ad}</div>
      <div className="ayet-arabic" style={{ whiteSpace: 'pre-line', maxHeight: 220, overflowY: 'auto', padding: 12, border: '1px solid #eee', borderRadius: 8, marginBottom: 8 }}>{ayet.arapca}</div>
      <div className="ayet-meal" style={{ whiteSpace: 'pre-line', maxHeight: 220, overflowY: 'auto', padding: 12, border: '1px solid #eee', borderRadius: 8 }}>{ayet.meal}</div>
      <div className="audio-buttons" style={{ display: 'flex', gap: 8 }}>
        {ayet.sound_ar ? (
          <>
            <button
              className="audio-button"
              onClick={() => playAyetSound(ayet.sound_ar, "ar")}
              disabled={isPlayingAr || isPlayingTr}
              style={{
                opacity: isPlayingAr || isPlayingTr ? 0.6 : 1,
                cursor: isPlayingAr || isPlayingTr ? "not-allowed" : "pointer",
                minWidth: 120
              }}
            >
              {(isPlayingAr || isPausedAr) ? (isPausedAr ? "Devam Et (Arapça)" : "Ses Çalıyor (Arapça)...") : "Sure (Arapça) Ses"}
            </button>
            <button
              className="audio-button"
              onClick={() => pauseAyetSound("ar")}
              disabled={!isPlayingAr}
              style={{
                minWidth: 120,
                backgroundColor: isPausedAr ? '#ffe066' : undefined,
                border: isPausedAr ? '2px solid #ffae00' : undefined,
                boxShadow: isPausedAr ? '0 0 8px 2px #ffe066' : undefined
              }}
            >
              Duraklat (Arapça)
            </button>
          </>
        ) : (
          <button
            className="audio-button"
            onClick={() => speak(ayet.arapca, "ar-SA")}
            style={{ opacity: 1, cursor: "pointer", minWidth: 120 }}
          >
            Sure (Arapça) Oku
          </button>
        )}
        {ayet.sound_tr ? (
          <>
            <button
              className="audio-button"
              onClick={() => playAyetSound(ayet.sound_tr, "tr")}
              disabled={isPlayingTr || isPlayingAr}
              style={{
                opacity: isPlayingTr || isPlayingAr ? 0.6 : 1,
                cursor: isPlayingTr || isPlayingAr ? "not-allowed" : "pointer",
                minWidth: 120
              }}
            >
              {(isPlayingTr || isPausedTr) ? (isPausedTr ? "Devam Et (Türkçe)" : "Ses Çalıyor (Türkçe)...") : "Meal (Türkçe) Ses"}
            </button>
            <button
              className="audio-button"
              onClick={() => pauseAyetSound("tr")}
              disabled={!isPlayingTr}
              style={{
                minWidth: 120,
                backgroundColor: isPausedTr ? '#ffe066' : undefined,
                border: isPausedTr ? '2px solid #ffae00' : undefined,
                boxShadow: isPausedTr ? '0 0 8px 2px #ffe066' : undefined
              }}
            >
              Duraklat (Türkçe)
            </button>
          </>
        ) : (
          <button
            className="audio-button"
            onClick={() => speak(ayet.meal, "tr-TR")}
            style={{ opacity: 1, cursor: "pointer", minWidth: 120 }}
          >
            Meal (Türkçe) Oku
          </button>
        )}
      </div>
    </div>
  );
};

export default AyetBox; 