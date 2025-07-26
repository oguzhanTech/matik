export const zikirs = [
  { id: 1, name: "Subhanallah", default: true, sound: "/sounds/Subhanallah.wav", image: "/images/subhanallah.png", meal: { tr: "Allah'ı her türlü eksiklikten tenzih ederim.", en: "I declare Allah free from all imperfections." } },
  { id: 2, name: "Elhamdülillah", sound: "/sounds/Elhamdülillah.wav", image: "/images/elhamdulillah.png", meal: { tr: "Hamd, övgü Allah'a mahsustur.", en: "All praise and thanks are due to Allah." } },
  { id: 3, name: "Allahu Ekber", sound: "/sounds/Allahu Ekber.wav", image: "/images/allahu-ekber.png", meal: { tr: "Allah en büyüktür.", en: "Allah is the Greatest." } },
  { id: 4, name: "La ilahe illallah", sound: "/sounds/La ilahe illallah.wav", image: "/images/la-ilahe-illallah.png", meal: { tr: "Allah'tan başka ilah yoktur.", en: "There is no god but Allah." } },
  { id: 5, name: "Estağfirullah", sound: "/sounds/Estağfirullah.wav", image: "/images/estagfirullah.png", meal: { tr: "Allah'tan bağışlanma dilerim.", en: "I seek forgiveness from Allah." } },
  { id: 6, name: "Sübhânallâhi ve bihamdihî", sound: "/sounds/Sübhânallâhi ve bihamdihî.wav", image: "/images/suphanallahi-ve-bihamdihi.png", meal: { tr: "Allah'ı her türlü eksiklikten tenzih eder ve O'na hamd ederim.", en: "Glory is to Allah and all praise is to Him." } },
  { id: 7, name: "Sübhânallâhil azîm", sound: "/sounds/Sübhânallâhil azîm.wav", image: "/images/suphanallahil-azim.png", meal: { tr: "Yüce olan Allah'ı her türlü eksiklikten tenzih ederim.", en: "Glory is to Allah, the Magnificent." } },
  { id: 8, name: "Lâ havle ve lâ kuvvete illâ billâh", sound: "/sounds/La havle.wav", image: "/images/la-havle.png", meal: { tr: "Güç ve kuvvet ancak Allah'ın yardımıyladır.", en: "There is no power nor strength except with Allah." } },
  { id: 9, name: "Bismillahirrahmanirrahim", sound: "/sounds/Bismillahirrahmanirrahim.wav", image: "/images/bismillah.png", meal: { tr: "Rahman ve Rahim olan Allah'ın adıyla.", en: "In the name of Allah, the Most Gracious, the Most Merciful." } },
  { id: 10, name: "Hasbiyallahu la ilahe illa hu", sound: "/sounds/Hasbiyallahu.wav", image: "/images/hasbiyallahu.png", meal: { tr: "Allah bana yeter, O'ndan başka ilah yoktur.", en: "Allah is sufficient for me; there is no god but Him." } },
  { id: 11, name: "Rabbi yessir ve la tuassir", sound: "/sounds/Rabbi yessir.wav", image: "/images/rabbi-yessir.png", meal: { tr: "Rabbim! Kolaylaştır, zorlaştırma.", en: "My Lord! Make it easy, do not make it difficult." } },
  { id: 12, name: "Allahümme salli ala Muhammed", sound: "/sounds/Salavat.wav", image: "/images/salavat.png", meal: { tr: "Allah'ım! Muhammed'e salat eyle.", en: "O Allah! Send blessings upon Muhammad." } },
  { id: 13, name: "Ya Fettah", sound: "/sounds/Ya Fettah.wav", image: "/images/ya-fettah.png", meal: { tr: "Ey her türlü kapıyı açan Allah!", en: "O Allah, the Opener of all doors!" } },
];

export const defaultZikir = zikirs.find(z => z.default) || zikirs[0]; 