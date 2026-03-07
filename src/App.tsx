import React, { useState } from 'react';
import {
  Menu,
  User,
  Heart,
  Copy,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  MessageCircle,
  AlertCircle,
  Users,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Share2,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Mock Data ---
const CAMPAIGN = {
  title: "TRATAMENTO DA ENXAQUECA GRAVE",
  author: "Samara Silva",
  category: "Saúde",
  image: "https://i.postimg.cc/rFPKXKPj/IMG-20260302-014029-925.jpg",
  raised: 923.12,
  goal: 7600.0,
  donorsCount: 0,
  pixKey: "samysilvalestosa@gmail.com",
  documents: [
    "https://i.postimg.cc/SRyV9YgL/IMG-20260304-WA0006.jpg",
    "https://i.postimg.cc/4nRfwZh7/IMG-20260304-WA0005.jpg"
  ],
  description: `A dor que a Samara enfrenta todos os dias não é apenas uma dor de cabeça comum, é uma enxaqueca de risco, intensa, cruel e incapacitante. Existem dias em que a luz machuca, o som dói, e até as tarefas mais simples se tornam impossíveis. A dor não avisa quando chega, apenas toma conta.
Ela luta em silêncio, tentando ser forte, tentando seguir em frente, mas o tratamento que pode aliviar esse sofrimento depende de medicamentos de alto custo, infelizmente não é fornecido pelo SUS. Sem ele, a dor volta mais forte, mais longa, mais devastadora.
Ninguém deveria ter que escolher entre sentir dor ou não conseguir pagar pelo tratamento. Hoje, a Samara precisa de ajuda para continuar lutando, para ter esperança de dias com menos sofrimento, para poder viver — não apenas suportar a dor.
✨ Qualquer contribuição, por menor que pareça, fará uma diferença imensa na vida dela. Se você não puder ajudar financeiramente, compartilhe esta mensagem. Às vezes, um simples compartilhamento pode alcançar o coração de alguém que pode ajudar.
Agradecemos de todo o coração a cada pessoa que estender a mão, que dedicar um minuto para ler, compartilhar ou contribuir. Que Deus abençoe grandemente cada gesto de solidariedade. Sua ajuda é mais do que uma doação — é esperança, é alívio, é a chance de devolver à Samara dias com mais luz e menos dor. 💛`
};

// --- Header ---
const Header = () => (
  <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-slate-950/60 border-b border-white/5">
    <div className="flex items-center gap-3">
      <div className="bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/20">
        <Heart size={20} fill="currentColor" />
      </div>
      <span className="font-display font-bold text-xl tracking-tight text-white">Ação Solidária</span>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
        <Menu size={24} />
      </button>
    </div>
  </header>
);

// --- Donation Modal ---
const DonationModal = ({ isOpen, onClose, onComplete }: { isOpen: boolean, onClose: () => void, onComplete: (amount: number) => void }) => {
  const [amount, setAmount] = useState('50');
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(CAMPAIGN.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinish = () => {
    onComplete(parseFloat(amount) || 0);
    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-display font-bold text-white">Fazer Doação</h3>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-3">
                {['5', '10', '20', '50', '100'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-4 rounded-2xl border-2 transition-all font-bold text-lg ${amount === val ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10' : 'border-white/5 bg-white/5 text-white/60 hover:border-white/20'}`}
                  >
                    R$ {val}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Ou doe qualquer outro valor</p>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary font-bold text-xl">R$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Outro valor"
                    className="w-full pl-14 pr-6 py-5 bg-white/5 rounded-2xl border border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/20 font-bold text-xl text-white outline-none transition-all"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Continuar para PIX <ArrowRight size={20} />
              </button>
            </div>
          ) : (
            <div className="text-center space-y-8 py-4">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-white">Quase lá!</h4>
                <p className="text-white/50 mt-2 text-lg">Você está doando <span className="text-white font-bold">R$ {amount}</span> para esta causa.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-left space-y-3">
                <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Chave PIX (E-mail)</p>
                <div className="flex items-center justify-between gap-3 bg-slate-950/50 p-4 rounded-xl border border-white/5">
                  <code className="text-sm font-mono break-all text-primary-light font-medium">{CAMPAIGN.pixKey}</code>
                  <button
                    onClick={handleCopyPix}
                    className={`p-2.5 rounded-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <p className="text-[10px] text-white/30 text-center italic">Copie a chave acima e cole no seu aplicativo do banco.</p>
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all"
              >
                Concluir
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Sobre');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<{name: string, text: string, time: string}[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');

  const [raised, setRaised] = useState(CAMPAIGN.raised);
  const [donorsCount, setDonorsCount] = useState(CAMPAIGN.donorsCount);
  const [donorsList, setDonorsList] = useState<{name: string, amount: number, time: string, initial: string}[]>([]);

  const handleDonationComplete = (amount: number) => {
    setRaised(prev => prev + amount);
    setDonorsCount(prev => prev + 1);

    const newDonor = {
      name: 'Doador Solidário',
      amount: amount,
      time: 'Agora mesmo',
      initial: 'S'
    };
    setDonorsList([newDonor, ...donorsList]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const msg = {
        name: userName.trim() || 'Apoiador Anônimo',
        text: newMessage.trim(),
        time: 'Agora mesmo'
      };
      setMessages([msg, ...messages]);
      setNewMessage('');
      setUserName('');
    }
  };

  const progress = Math.min((raised / CAMPAIGN.goal) * 100, 100);
  const shareUrl = "https://velozo07.github.io/vaquinha-samara-2026/";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Ajude a ${CAMPAIGN.author} em sua campanha: ${CAMPAIGN.title}\n\nDoe agora: ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vaquinha Samara Silva',
          text: 'Ajude a Samara Silva em sua jornada solidária. Cada contribuição conta!',
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      handleCopy(); // Fallback to copy link
    }
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-primary selection:text-white pb-20">
      <Header />
      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onComplete={handleDonationComplete} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image & Info */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/20 text-primary-light px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">
                    {CAMPAIGN.category}
                  </span>
                  <span className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                    <ShieldCheck size={12} /> Verificado
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-black text-white leading-tight">
                  {CAMPAIGN.title}
                </h1>
              </div>

              <div className="rounded-[40px] overflow-hidden shadow-2xl border border-white/5 bg-slate-900">
                <img
                  src={CAMPAIGN.image}
                  alt={CAMPAIGN.title}
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-white/5">
              {['Sobre', 'Laudos e Receitas', 'Mural'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-sm font-bold uppercase tracking-widest transition-all relative",
                    activeTab === tab ? "text-primary" : "text-white/40 hover:text-white"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'Sobre' && (
                  <motion.div
                    key="sobre"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="prose prose-invert max-w-none"
                  >
                    <div className="whitespace-pre-wrap text-slate-300 leading-relaxed text-lg">
                      {CAMPAIGN.description}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Laudos e Receitas' && (
                  <motion.div
                    key="laudos"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] mb-8">
                      <div className="flex items-center gap-3 mb-4 text-primary">
                        <ShieldCheck size={24} />
                        <h3 className="text-xl font-display font-bold text-white">Documentação Médica</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Para garantir a total transparência desta campanha, disponibilizamos abaixo o laudo médico e a receita atualizada da Samara. Você pode clicar nas imagens para visualizá-las em tamanho real.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="rounded-[32px] overflow-hidden border border-white/10 bg-slate-900 group cursor-pointer relative">
                          <img 
                            src="https://i.postimg.cc/SRyV9YgL/IMG-20260304-WA0006.jpg" 
                            alt="Laudo Médico" 
                            className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            onClick={() => window.open("https://i.postimg.cc/SRyV9YgL/IMG-20260304-WA0006.jpg", "_blank")}
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Ver em tela cheia</span>
                          </div>
                        </div>
                        <p className="text-center text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Laudo Médico Oficial</p>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-[32px] overflow-hidden border border-white/10 bg-slate-900 group cursor-pointer relative">
                          <img 
                            src="https://i.postimg.cc/4nRfwZh7/IMG-20260304-WA0005.jpg" 
                            alt="Receita Médica" 
                            className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            onClick={() => window.open("https://i.postimg.cc/4nRfwZh7/IMG-20260304-WA0005.jpg", "_blank")}
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Ver em tela cheia</span>
                          </div>
                        </div>
                        <p className="text-center text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Receita Médica Atualizada</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Mural' && (
                  <motion.div
                    key="mural"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <form onSubmit={handleSendMessage} className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="Seu nome"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-medium"
                        />
                      </div>
                      <textarea 
                        placeholder="Deixe uma mensagem de apoio..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-medium min-h-[120px]"
                      />
                      <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2">
                        Enviar Mensagem <MessageCircle size={18} />
                      </button>
                    </form>

                    <div className="space-y-4">
                      {messages.map((msg, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-3xl">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-white">{msg.name}</h4>
                            <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{msg.time}</span>
                          </div>
                          <p className="text-slate-400">{msg.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Stats & Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-white/10 rounded-[40px] p-8 sticky top-28 shadow-2xl">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-4xl font-black text-white">R$ {raised.toLocaleString('pt-BR')}</span>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Arrecadados</p>
                  </div>
                  <div className="text-right">
                    <span className="text-white/60 font-bold">R$ {CAMPAIGN.goal.toLocaleString('pt-BR')}</span>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Meta</p>
                  </div>
                </div>

                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-primary-light shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Users size={16} />
                      <span className="text-xl font-black text-white">{donorsCount}</span>
                    </div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Apoiadores</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <TrendingUp size={16} />
                      <span className="text-xl font-black text-white">{progress.toFixed(0)}%</span>
                    </div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Concluído</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-6 bg-primary text-white rounded-[24px] font-black text-xl shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  DOAR AGORA <Heart size={24} fill="currentColor" />
                </button>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <p className="text-center text-xs font-bold text-white/30 uppercase tracking-widest">Compartilhe e ajude</p>
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={shareWhatsApp}
                      className="flex-1 py-4 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center gap-2 hover:bg-[#25D366] hover:text-white transition-all border border-[#25D366]/20 font-bold text-sm"
                    >
                      <MessageCircle size={20} /> WhatsApp
                    </button>
                    <button 
                      onClick={handleShare}
                      className="flex-1 py-4 rounded-2xl bg-white/5 text-white/60 flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all border border-white/10 font-bold text-sm"
                    >
                      <Share2 size={20} /> Redes Sociais
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[32px] p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Doação Segura</h4>
                <p className="text-xs text-white/40">Seus dados estão protegidos e o valor vai direto para a Samara.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 bg-slate-950">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-primary/20 text-primary p-2 rounded-xl">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">Ação Solidária</span>
          </div>
          <p className="text-white/30 text-sm max-w-md mx-auto">
            Esta é uma iniciativa voluntária para apoiar o tratamento de saúde da Samara Silva. 
            Toda contribuição é destinada integralmente à causa.
          </p>
          <div className="flex justify-center gap-6">
            <Instagram size={20} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
            <Twitter size={20} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
            <Facebook size={20} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
          </div>
          <p className="text-[10px] text-white/20 uppercase font-bold tracking-[0.2em] pt-8">
            © 2024 • Feito com amor por amigos e familiares
          </p>
        </div>
      </footer>
    </div>
  );
}
