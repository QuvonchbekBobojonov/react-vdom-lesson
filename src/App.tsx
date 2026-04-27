/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Search, 
  Box, 
  Cpu, 
  CheckCircle2, 
  Layout, 
  Home, 
  FileText,
  RefreshCw,
  HelpCircle,
  Terminal,
  Code
} from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  analogy?: {
    icon: ReactNode;
    label: string;
    description: string;
  }[];
  accentColor: string;
  codeSnippet?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "React-ning \"Sehrli Ko'zgusi\": Virtual DOM",
    subtitle: "Darsga kirish",
    content: [
      "Nega ba'zi saytlar juda tez, ba'zilari esa sekin ishlaydi?",
      "Bugun React texnologiyasining eng asosiy \"yuragi\" — Virtual DOM va uning qanday ishlashini o'rganamiz.",
      "Maqsad: Saytni aqlli va tezkor qilish sirlarini bilish."
    ],
    accentColor: "from-blue-500 to-indigo-600",
    codeSnippet: "// React render jarayoni\nconst element = <h1>Salom Dunyo</h1>;\nconst root = ReactDOM.createRoot(container);\nroot.render(element);"
  },
  {
    id: 2,
    title: "Haqiqiy DOM va uning \"dangasaligi\"",
    subtitle: "Muammo nimada?",
    content: [
      "DOM — bu saytdagi barcha tugma va matnlarning ro'yxati.",
      "Muammo: Saytda bittagina harf o'zgarsa ham, brauzer butun ro'yxatni boshidan o'qib chiqadi.",
      "Misol: Xonadagi bitta rasmni to'g'rilash uchun butun uyni buzib, qaytadan qurishga o'xshaydi. Bu juda ko'p vaqt va quvvat sarflaydi."
    ],
    analogy: [
      {
        icon: <Home className="w-12 h-12 text-red-500" />,
        label: "Haqiqiy DOM",
        description: "G'ishtli bino. Uni o'zgartirish qiyin."
      },
      {
        icon: <RefreshCw className="w-12 h-12 text-red-400" />,
        label: "Muammo",
        description: "Bitta rasm uchun uyni buzish kerak."
      }
    ],
    accentColor: "from-red-500 to-orange-600",
    codeSnippet: "// Haqiqiy DOM manipulyatsiyasi (Sekin)\ndocument.getElementById('app').innerHTML = 'Yangi Matn';"
  },
  {
    id: 3,
    title: "Virtual DOM — Bu nima?",
    subtitle: "Yechim topildi!",
    content: [
      "React haqiqiy DOM-ning xotiradagi engil \"nusxasi\"ni (Virtual DOM) yaratadi.",
      "Analogiya: Haqiqiy DOM — g'ishtli bino, Virtual DOM — uning qog'ozdagi chizmasi.",
      "Chizmada o'zgarish qilish (devorni boshqa joydan chizish) haqiqiy binoni buzishdan million marta oson va tezroqdir!"
    ],
    analogy: [
      {
        icon: <FileText className="w-12 h-12 text-teal-500" />,
        label: "Virtual DOM",
        description: "Qog'ozdagi chizma. O'zgartirish juda oson."
      },
      {
        icon: <Zap className="w-12 h-12 text-yellow-500" />,
        label: "Tezlik",
        description: "Million marta tezroq ishlash."
      }
    ],
    accentColor: "from-teal-500 to-emerald-600",
    codeSnippet: "// Virtual DOM obyekti (JavaScript obyekti)\nconst vnode = {\n  type: 'h1',\n  props: { children: 'Hello' },\n  key: null\n};"
  },
  {
    id: 4,
    title: "Diffing algoritmi — \"Faqat farqni find!\"",
    subtitle: "Qanday ishlaydi?",
    content: [
      "React-da ikkita chizma bo'ladi: Eski va Yangi.",
      "Diffing algoritmi — bu ikki chizmani solishtirib, faqat o'zgargan joyni topuvchi \"detektiv\".",
      "U butun binoni emas, faqat o'sha o'zgargan \"g'isht\"ni topadi va brauzerga: \"Faqat shu qismni yangila!\" deb buyruq beradi."
    ],
    analogy: [
      {
        icon: <Search className="w-12 h-12 text-purple-500" />,
        label: "Detektiv",
        description: "Faqatgina farqlarni qidiradi."
      },
      {
        icon: <Box className="w-12 h-12 text-blue-500" />,
        label: "Natija",
        description: "Faqat o'zgargan g'isht yangilanadi."
      }
    ],
    accentColor: "from-purple-500 to-blue-600",
    codeSnippet: "// Diffing logic\nif (oldNode.type !== newNode.type) {\n  replaceNode(oldNode, newNode);\n} else {\n  updateProps(oldNode, newNode);\n}"
  },
  {
    id: 5,
    title: "Nega bu bizga kerak?",
    subtitle: "Natija va Xulosa",
    content: [
      "Tezlik: Foydalanuvchi hech qanday kechikishni sezmaydi.",
      "Tejamkorlik: Kompyuter yoki telefon quvvati kamroq sarflanadi.",
      "Xulosa: Virtual DOM — bu \"avval o'ylab, keyin bajarish\" prinsipi. React avval chizmada hammasini hisoblab oladi, keyin eng qisqa yo'l bilan saytni yangilaydi."
    ],
    accentColor: "from-indigo-600 to-purple-700"
  }
];

function DiffingSimulator() {
  const [items, setItems] = useState(["Uy", "Mashina", "Velosiped"]);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [isVirtual, setIsVirtual] = useState(true);

  const updateItem = (index: number) => {
    const newItems = [...items];
    newItems[index] = newItems[index] + " (Yangilandi)";
    setItems(newItems);
    setHighlighted(index);
    setTimeout(() => setHighlighted(null), 1000);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 shadow-2xl font-mono">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Terminal className="w-4 h-4" />
          <span>Interactive_Simulator.tsx</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsVirtual(true)}
            className={`px-3 py-1 rounded text-xs transition-colors ${isVirtual ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Virtual DOM
          </button>
          <button 
            onClick={() => setIsVirtual(false)}
            className={`px-3 py-1 rounded text-xs transition-colors ${!isVirtual ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            Haqiqiy DOM
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{ 
              backgroundColor: highlighted === idx ? (isVirtual ? "rgba(79, 70, 229, 0.2)" : "rgba(239, 68, 68, 0.4)") : "rgba(30, 41, 59, 1)",
              borderColor: highlighted === idx ? (isVirtual ? "#6366f1" : "#ef4444") : "#334155",
              scale: highlighted === idx ? 1.02 : 1
            }}
            className={`p-3 rounded-lg border flex justify-between items-center transition-all duration-300`}
          >
            <span className="text-slate-300 text-sm">{item}</span>
            <button 
              onClick={() => updateItem(idx)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px] rounded border border-slate-700 transition-colors"
            >
              Update
            </button>
          </motion.div>
        ))}
      </div>

      <div className="text-[10px] text-slate-500 leading-tight">
        {isVirtual ? (
          <p>ℹ️ Virtual DOM faqatgina o'zgargan elementni (moviy rang) yangilaydi.</p>
        ) : (
          <p>⚠️ Haqiqiy DOM bitta o'zgarish uchun butun ro'yxatni (qizil rang) qayta chizadi.</p>
        )}
      </div>
    </div>
  );
}

function TechBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        className="absolute inset-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:32px_32px]"
        style={{ maskImage: "radial-gradient(circle, black, transparent 80%)" }}
      />
      
      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0.1 + Math.random() * 0.2,
            scale: 0.5 + Math.random()
          }}
          animate={{ 
            y: [null, (Math.random() * 100) + "%"],
            x: [null, (Math.random() * 100) + "%"],
          }}
          transition={{ 
            duration: 20 + Math.random() * 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-1 h-1 bg-indigo-500 rounded-full blur-[1px]"
        />
      ))}

      {/* Pulsing Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600 blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600 blur-[120px]"
      />
    </div>
  );
}

function CodeHighlight({ code }: { code: string }) {
  // Simple regex-based syntax highlighting for demo purposes
  const tokens = code.split(/(\/\/.*|\bconst\b|\blet\b|\bvar\b|\bfunction\b|\bif\b|\belse\b|\breturn\b|\bnew\b|\bimport\b|\bfrom\b|'.*?'|".*?"|`.*?`|\b\d+\b)/g);

  return (
    <code>
      {tokens.map((token, i) => {
        if (!token) return null;
        if (token.startsWith('//')) return <span key={i} className="text-slate-500 italic">{token}</span>;
        if (['const', 'let', 'var', 'function', 'if', 'else', 'return', 'new', 'import', 'from'].includes(token)) 
          return <span key={i} className="text-pink-400 font-bold">{token}</span>;
        if ((token.startsWith("'") && token.endsWith("'")) || (token.startsWith('"') && token.endsWith('"')) || (token.startsWith('`') && token.endsWith('`')))
          return <span key={i} className="text-emerald-400">{token}</span>;
        if (/^\d+$/.test(token)) return <span key={i} className="text-orange-400">{token}</span>;
        return <span key={i}>{token}</span>;
      })}
    </code>
  );
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Virtual DOM nima?",
    options: [
      "Haqiqiy binoning g'ishti",
      "Brauzerdagi barcha matnlar ro'yxati",
      "DOM-ning xotiradagi engil nusxasi",
      "Kompyuterning protsessori"
    ],
    correctAnswer: 2
  },
  {
    question: "Haqiqiy DOM nima uchun sekin ishlaydi?",
    options: [
      "U juda kichik bo'lgani uchun",
      "Bittagina o'zgarish bo'lsa ham butun ro'yxatni qayta o'qigani uchun",
      "Ranglari yo'qligi uchun",
      "Uni React yaratmagani uchun"
    ],
    correctAnswer: 1
  },
  {
    question: "Diffing algoritmining asosiy vazifasi nima?",
    options: [
      "Saytni o'chirib yoqish",
      "Matnlarni tarjima qilish",
      "Faqat o'zgargan qismlarni (farqlarni) topish",
      "Rasm chizish"
    ],
    correctAnswer: 2
  },
  {
    question: "Virtual DOM-ni qaysi narsaga qiyoslash mumkin?",
    options: [
      "Tayyor bino g'ishtiga",
      "Binoning chizmasiga",
      "Mashina g'ildiragiga",
      "Kompyuter sichqonchasiga"
    ],
    correctAnswer: 1
  },
  {
    question: "Virtual DOM-dan foydalanishning asosiy foydasi nima?",
    options: [
      "Sayt chiroyli bo'ladi",
      "Internet kerak bo'lmaydi",
      "Faqat 8-sinflar ishlata oladi",
      "Sayt tezroq ishlaydi va quvvat tejaladi"
    ],
    correctAnswer: 3
  }
];

function QuizSection({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    if (idx === quizQuestions[currentQ].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  };

  const q = quizQuestions[currentQ];

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">
            Bilimingni sina // 0{currentQ + 1}
          </span>
          <div className="flex gap-1">
            {quizQuestions.map((_, i) => (
              <div key={i} className={`w-8 h-1 rounded-full ${i <= currentQ ? 'bg-indigo-500' : 'bg-slate-800'}`} />
            ))}
          </div>
        </div>
        
        <h3 className="text-2xl md:text-4xl font-black text-white mb-10 leading-tight">
          {q.question}
        </h3>

        <div className="grid gap-4">
          {q.options.map((option, idx) => {
            let stateClass = "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600";
            if (isAnswered) {
              if (idx === q.correctAnswer) stateClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
              else if (idx === selected) stateClass = "bg-red-500/20 border-red-500/50 text-red-100";
              else stateClass = "bg-slate-800/20 border-slate-700/20 opacity-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-6 text-left rounded-2xl border transition-all duration-300 font-medium ${stateClass} ${!isAnswered ? 'hover:-translate-y-1' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs border ${
                    isAnswered && idx === q.correctAnswer ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-slate-900 border-slate-700'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  {option}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={!isAnswered}
          className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-black font-mono tracking-tighter transition-all ${
            !isAnswered ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-500/20'
          }`}
        >
          {currentQ === quizQuestions.length - 1 ? "NATIJANI KO'RISH" : "KEYINGI SAVOL"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const slide = slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(s => s + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(s => s - 1);
    }
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizScore(null);
  };

  const resetAll = () => {
    setShowQuiz(false);
    setQuizScore(null);
    setCurrentSlide(0);
  };

  const slideVariants = {
    initial: (direction: number) => ({
      scale: 0.95,
      opacity: 0,
    }),
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      }
    },
    exit: (direction: number) => ({
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#0f172a] font-sans text-slate-100 selection:bg-indigo-500/30 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      <TechBackground />

      <div id="presentation-container" className="w-full max-w-6xl relative z-10 flex flex-col gap-6">
        
        {/* Header & Progress */}
        <header id="presentation-header" className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                <Code className="text-white w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white font-mono">
                  &lt;VirtualDOM /&gt;
                </h1>
                <p className="text-xs text-slate-500 font-medium whitespace-nowrap overflow-hidden">8-Sinf Dasturlash Kursi</p>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur px-4 py-2 rounded-xl border border-slate-700/50 text-sm font-mono text-slate-400">
              SLIDE_0{currentSlide + 1} // 0{slides.length}
            </div>
          </div>
          
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
            <motion.div 
              id="progress-bar"
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </header>

        {/* Main Stage */}
        <main 
          id="slide-stage"
          className="relative min-h-[600px] md:min-h-[650px] bg-slate-900/40 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col"
        >
          <AnimatePresence mode="wait" custom={direction}>
            {showQuiz ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 p-8 md:p-14 flex flex-col"
              >
                {quizScore !== null ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
                    >
                      <Zap className="text-white w-16 h-16" />
                    </motion.div>
                    <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">TABRIKLAYMIZ!</h2>
                    <p className="text-2xl text-slate-400 mb-10">
                      Siz 5 tadan <span className="text-emerald-400 font-bold">{quizScore}</span> tasiga to'g'ri javob berdingiz!
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={resetAll}
                        className="px-10 py-5 rounded-2xl bg-indigo-600 text-white font-black font-mono hover:bg-indigo-500 transition-all shadow-xl"
                      >
                        DARSNI QAYTADAN BOSHLASH
                      </button>
                    </div>
                  </div>
                ) : (
                  <QuizSection onComplete={(s) => setQuizScore(s)} />
                )}
              </motion.div>
            ) : (
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="active"
                exit="exit"
                className="flex-1 p-8 md:p-14 flex flex-col"
              >
              <div className="mb-10">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-500 text-xs font-mono font-bold tracking-widest uppercase">
                    {slide.subtitle}
                  </span>
                </motion.div>
                <h2 className={`text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent leading-[1.1]`}>
                  {slide.title}
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-start h-full">
                <div className="space-y-8">
                  {slide.content.map((text, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex gap-5 items-start group"
                    >
                      <div className="mt-2 text-indigo-500 flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <p className="text-xl text-slate-300 leading-relaxed font-medium">
                        {text}
                      </p>
                    </motion.div>
                  ))}

                  {slide.codeSnippet && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-8 rounded-xl bg-slate-950 p-6 border border-slate-800 shadow-inner overflow-x-auto"
                    >
                      <pre className="font-mono text-sm text-indigo-100 leading-6">
                        <CodeHighlight code={slide.codeSnippet} />
                      </pre>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-8">
                  {slide.analogy && (
                    <div className="grid gap-6">
                      {slide.analogy.map((item, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + (idx * 0.2) }}
                          className="bg-slate-800/40 backdrop-blur p-8 rounded-3xl border border-slate-700/50 flex flex-col md:flex-row items-center gap-8 shadow-xl"
                        >
                          <div className="p-5 bg-slate-900 rounded-2xl shadow-inner border border-slate-800">
                            {item.icon}
                          </div>
                          <div className="text-center md:text-left">
                            <h4 className="font-black text-white text-xl mb-2">{item.label}</h4>
                            <p className="text-slate-400 leading-relaxed">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {currentSlide === 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <DiffingSimulator />
                    </motion.div>
                  )}

                  {currentSlide === 4 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-indigo-600/10 rounded-[2rem] p-10 border border-indigo-500/30 text-center relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <HelpCircle className="w-32 h-32" />
                      </div>
                      <h3 className="text-3xl font-black text-indigo-400 mb-4">Savollar bormi?</h3>
                      <p className="text-slate-300 text-lg mb-8">Darsni mustahkamlash uchun interaktiv savol-javobni boshlaymiz!</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

          {/* Navigation Controls */}
          <footer className={`px-8 py-8 border-t border-slate-700/30 bg-slate-900/50 backdrop-blur flex items-center justify-between ${showQuiz ? 'hidden' : 'flex'}`}>
            <button
              id="prev-button"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black font-mono tracking-tighter transition-all shadow-xl group ${
                currentSlide === 0 
                ? "text-slate-700 cursor-not-allowed" 
                : "text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white active:scale-95 border border-slate-700"
              }`}
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              BACK
            </button>

            <button
              id="next-button"
              onClick={() => currentSlide === slides.length - 1 ? startQuiz() : nextSlide()}
              className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black font-mono tracking-tighter transition-all shadow-2xl group ${
                "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] active:scale-95"
              }`}
            >
              {currentSlide === slides.length - 1 ? "QUIZNI BOSHLASH" : "NEXT"}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </footer>
        </main>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-slate-500/60 text-[10px] font-mono tracking-[0.3em] uppercase py-2">
          <span className="flex items-center gap-2">
            <Layout className="w-3 h-3" />
            Educational_Module_v2.0
          </span>
          <span className="flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            Environment: React_Vite_Framer
          </span>
        </div>
      </div>
    </div>
  );
}
