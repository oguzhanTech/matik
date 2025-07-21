export const zikirs = [
  { id: 1, name: "Subhanallah", default: true, sound: "/sounds/Subhanallah.wav", image: "/images/subhanallah.png", meal: "Allah'ı her türlü eksiklikten tenzih ederim." },
  { id: 2, name: "Elhamdülillah", sound: "/sounds/Elhamdülillah.wav", image: "/images/elhamdulillah.png", meal: "Hamd, övgü Allah'a mahsustur." },
  { id: 3, name: "Allahu Ekber", sound: "/sounds/Allahu Ekber.wav", image: "/images/allahu-ekber.png", meal: "Allah en büyüktür." },
  { id: 4, name: "La ilahe illallah", sound: "/sounds/La ilahe illallah.wav", image: "/images/la-ilahe-illallah.png", meal: "Allah'tan başka ilah yoktur." },
  { id: 5, name: "Estağfirullah", sound: "/sounds/Estağfirullah.wav", image: "/images/estagfirullah.png", meal: "Allah'tan bağışlanma dilerim." },
  { id: 6, name: "Sübhânallâhi ve bihamdihî", sound: "/sounds/Sübhânallâhi ve bihamdihî.wav", image: "/images/suphanallahi-ve-bihamdihi.png", meal: "Allah'ı her türlü eksiklikten tenzih eder ve O'na hamd ederim." },
  { id: 7, name: "Sübhânallâhil azîm", sound: "/sounds/Sübhânallâhil azîm.wav", image: "/images/suphanallahil-azim.png", meal: "Yüce olan Allah'ı her türlü eksiklikten tenzih ederim." },
  { id: 8, name: "Lâ havle ve lâ kuvvete illâ billâh", sound: "/sounds/La havle.wav", image: "/images/la-havle.png", meal: "Güç ve kuvvet ancak Allah'ın yardımıyladır." },
  { id: 9, name: "Bismillahirrahmanirrahim", sound: "/sounds/Bismillahirrahmanirrahim.wav", image: "/images/bismillah.png", meal: "Rahman ve Rahim olan Allah'ın adıyla." },
  { id: 10, name: "Hasbiyallahu la ilahe illa hu", sound: "/sounds/Hasbiyallahu.wav", image: "/images/hasbiyallahu.png", meal: "Allah bana yeter, O'ndan başka ilah yoktur." },
  { id: 11, name: "Rabbi yessir ve la tuassir", sound: "/sounds/Rabbi yessir.wav", image: "/images/rabbi-yessir.png", meal: "Rabbim! Kolaylaştır, zorlaştırma." },
  { id: 12, name: "Allahümme salli ala Muhammed", sound: "/sounds/Salavat.wav", image: "/images/salavat.png", meal: "Allah'ım! Muhammed'e salat eyle." },
  { id: 13, name: "Ya Fettah", sound: "/sounds/Ya Fettah.wav", image: "/images/ya-fettah.png", meal: "Ey her türlü kapıyı açan Allah!" },
];

export const defaultZikir = zikirs.find(z => z.default) || zikirs[0]; 