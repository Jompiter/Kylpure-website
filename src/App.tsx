import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  Truck, 
  Store, 
  RefreshCw, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Volume2, 
  VolumeX,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Award,
  FlaskConical,
  Zap,
  Target,
  Eye,
  ArrowLeft,
  ArrowRight,
  Quote
} from 'lucide-react';
import { BUSINESS_DETAILS, SERVICES, CERTIFICATIONS, REVIEWS } from './constants';

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 px-4 md:py-24 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
  >
    {children}
  </motion.div>
);

const ReviewSlider = ({ reviews }: { reviews: typeof REVIEWS }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full max-w-2xl px-4"
          >
            <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={80} className="text-red" />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex text-yellow-400 gap-1">
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-slate-800 text-xl md:text-2xl font-medium leading-relaxed italic">
                  "{reviews[currentIndex].text}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red to-red-dark flex items-center justify-center text-white font-display font-black text-xl shadow-lg">
                    {reviews[currentIndex].name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">{reviews[currentIndex].name}</div>
                    <div className="text-slate-500 text-sm flex items-center gap-1">
                      <MapPin size={14} className="text-red" />
                      {reviews[currentIndex].location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls at the Bottom */}
      <div className="flex items-center gap-8 mt-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-lg hover:bg-red hover:text-white transition-all"
          aria-label="Previous review"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'bg-red w-8' : 'bg-slate-300 w-2 hover:bg-slate-400'
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-lg hover:bg-red hover:text-white transition-all"
          aria-label="Next review"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
        audioRef.current.muted = false;
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  const ClickableImage = ({ src, alt, className = "", referrerPolicy = "no-referrer" as const }: { src: string | undefined, alt: string, className?: string, referrerPolicy?: "no-referrer" }) => (
    <div className="relative group/img overflow-hidden rounded-[inherit] w-full h-full">
      <img 
        src={src} 
        alt={alt} 
        className={`cursor-zoom-in transition-all duration-700 group-hover/img:scale-110 ${className}`} 
        referrerPolicy={referrerPolicy}
        onClick={() => src && setSelectedImage(src)}
      />
      <div 
        className="absolute inset-0 bg-sky/10 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-zoom-in flex items-center justify-center"
        onClick={() => src && setSelectedImage(src)}
      >
        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full scale-50 group-hover/img:scale-100 transition-transform duration-500">
          <Zap size={24} className="text-white fill-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans selection:bg-red selection:text-white">
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background Music */}
      <audio ref={audioRef} loop muted>
        <source src="/audio/KYLEPURE_MUSIC_ADS.mp3" type="audio/mpeg" />
      </audio>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-blue/95 backdrop-blur-lg border-b border-light-blue/20 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-center md:justify-between items-center">
          <div className="font-display font-black text-2xl flex items-center gap-1">
            <span className="text-red">Kyl</span>
            <span className="text-sky">pure</span>
            <sup className="text-sky text-xs font-bold">™</sup>
          </div>
          <a 
            href="#order" 
            className="hidden md:flex bg-gradient-to-r from-red to-red-dark text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-red/20 hover:scale-105 transition-transform items-center gap-2"
          >
            <Truck size={16} />
            Order Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden bg-dark-blue">
        <div className="absolute inset-0 z-0">
          <ClickableImage 
            src="https://picsum.photos/seed/mountain-spring/1920/1080" 
            alt="Fresh Mountain Spring Water - Natural and Pure" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/50 via-dark-blue/80 to-dark-blue"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-light-blue/10 border border-light-blue/20 px-4 py-1 rounded-full text-sky font-body font-bold text-sm uppercase tracking-wider">
                  <MapPin size={14} />
                  Calingcuan, Tarlac City
                </div>
                <h1 className="font-display font-black text-5xl md:text-7xl leading-tight">
                  <span className="text-red">Kyl</span>
                  <span className="text-sky">pure</span>
                  <span className="text-white">™</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 font-light max-w-xl">
                  Purified Drinking Water — <span className="text-white font-medium">Safe. Clean. Affordable.</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {['FDA Registered', 'DOH Tested', 'Reverse Osmosis', 'BIR Registered'].map((badge) => (
                    <span key={badge} className="bg-white/5 border border-white/10 px-3 py-1 rounded-md text-xs text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-sky" />
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="hidden sm:flex flex-col sm:flex-row gap-4 pt-4">
                  <a href="#order" className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red/30 transition-all text-center flex items-center justify-center gap-2 group">
                    📦 Order Delivery Now
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href={`tel:${BUSINESS_DETAILS.contact.globe}`} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all text-center flex items-center justify-center gap-2">
                    <Phone size={20} />
                    Call Us
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-sky font-display font-black text-2xl">≤10</div>
                    <div className="text-slate-400 text-xs uppercase tracking-tighter">PPM TDS</div>
                  </div>
                  <div>
                    <div className="text-sky font-display font-black text-2xl">2025</div>
                    <div className="text-slate-400 text-xs uppercase tracking-tighter">Established</div>
                  </div>
                  <div>
                    <div className="text-sky font-display font-black text-2xl">6+</div>
                    <div className="text-slate-400 text-xs uppercase tracking-tighter">Certifications</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <div className="aspect-[9/16] max-h-[600px] mx-auto rounded-3xl overflow-hidden border-2 border-light-blue/30 shadow-2xl shadow-light-blue/20">
                  <video 
                    src="/videos/hero-water.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                  >
                    File: videos/hero-water.mp4 | Size: 1080x1920px (Portrait) | Type: Video | Desc: Purified Water
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-2xl border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red flex items-center justify-center text-white shadow-lg shadow-red/20">
                      <Award size={20} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-glow">🏆 DOH Compliant</div>
                      <div className="text-slate-300 text-[10px] uppercase tracking-widest font-bold">Certified Safe for Your Family</div>
                    </div>
                  </div>
                </div>
                {/* Floating Stats */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 glass p-4 rounded-2xl border-light-blue/30 shadow-xl hidden md:block"
                >
                  <div className="flex items-center gap-2">
                    <FlaskConical size={20} className="text-sky" />
                    <span className="text-white font-bold">TDS ≤ 10 PPM</span>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,101.49,122.3,108.5,183.44,103.18,245.83,97.77,273.72,65.3,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <Section id="about" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-red font-display font-black text-4xl uppercase tracking-tight">Our Story</h2>
                <div className="w-20 h-1.5 bg-red rounded-full"></div>
              </div>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <div className="space-y-2">
                  <h3 className="text-dark-blue font-bold text-xl">Company Overview</h3>
                  <p className="text-base">
                    <span className="text-red font-bold">KYLPURE Purified Water Refilling Station</span> is a duly registered and fully compliant purified drinking water facility serving the community of Calingcuan, Tarlac City. Established in <span className="text-red font-bold">May 2025</span>, the company is committed to providing safe, clean, and affordable purified drinking water for households and commercial establishments.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 bg-sky/5 p-4 rounded-2xl border border-sky/10">
                    <h3 className="text-sky font-bold flex items-center gap-2">
                      <Target size={18} /> Mission
                    </h3>
                    <p className="text-sm leading-relaxed">
                      To provide safe, clean, and affordable purified drinking water while upholding the highest standards of quality, sanitation, safety, and regulatory compliance.
                    </p>
                  </div>
                  <div className="space-y-2 bg-red/5 p-4 rounded-2xl border border-red/10">
                    <h3 className="text-red font-bold flex items-center gap-2">
                      <Eye size={18} /> Vision
                    </h3>
                    <p className="text-sm leading-relaxed">
                      To be a trusted and reliable water refilling station in Tarlac City, recognized for excellence in water quality, customer service, and public health protection.
                    </p>
                  </div>
                </div>

                <div className="bg-off-white p-6 rounded-2xl border-l-4 border-red italic text-base">
                  "Every gallon we fill is a commitment to your family's health. We don't just sell water; we provide peace of mind."
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-dark-blue font-bold text-xl">Core Values</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: ShieldCheck, text: "Safety First" },
                    { icon: Star, text: "Quality Assurance" },
                    { icon: CheckCircle2, text: "Integrity & Compliance" },
                    { icon: MessageCircle, text: "Customer Trust" },
                    { icon: RefreshCw, text: "Continuous Improvement" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-off-white p-3 rounded-xl border border-slate-100">
                      <item.icon size={18} className="text-red shrink-0" />
                      <span className="font-body font-bold text-slate-800 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg relative group">
                  <ClickableImage src="/images/owner.jpg" alt="File: images/owner.jpg | Size: 1080x1080px | Type: Photo | Desc: Owner" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-dark-blue/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Owner
                  </div>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg relative group">
                  <ClickableImage src="/images/team.jpg" alt="File: images/team.jpg | Alt: Kylpure staff team working inside the purified water refilling facility in Tarlac City | Size: 1080x1080px | Type: Photo" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-dark-blue/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Team
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg relative group">
                  <ClickableImage src="/images/work.jpg" alt="File: images/work.jpg | Size: 1080x1080px | Type: Photo | Desc: Work" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-dark-blue/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Work
                  </div>
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg relative group">
                  <ClickableImage src="/images/store.jpg" alt="File: images/store.jpg | Size: 1080x1080px | Type: Photo | Desc: Station" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-dark-blue/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Station
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section id="process" className="bg-dark-blue text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-light-blue rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red rounded-full blur-[100px]"></div>
        </div>

        <div className="text-center mb-16 space-y-4">
          <Reveal>
            <h2 className="text-sky font-display font-black text-4xl uppercase tracking-tight">The Purification Process</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our multi-stage Reverse Osmosis system ensures every drop is ultra-pure.</p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Reveal>
              <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <ClickableImage src={undefined} alt="File: videos/process.mp4 | Size: 1080x1080px | Type: Video | Desc: Process" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="bg-red px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Live Process</div>
                  <h3 className="text-2xl font-bold">Advanced Reverse Osmosis</h3>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-6">
              <Reveal delay={0.1}>
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <ClickableImage src={undefined} alt="File: images/machine.jpg | Size: 1080x1080px | Type: Photo | Desc: Filtration" className="w-full h-full object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <ClickableImage src={undefined} alt="File: images/cleaning.jpg | Size: 1080x1080px | Type: Photo | Desc: Sanitation" className="w-full h-full object-cover" />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { step: 1, title: "Pre-Filtration", desc: "Sediment and carbon stages remove large particles." },
              { step: 2, title: "RO Membrane", desc: "99.9% removal of contaminants, TDS ≤ 10 ppm." },
              { step: 3, title: "Post-Carbon", desc: "Polishing for superior taste and zero odor." },
              { step: 4, title: "UV Sterilization", desc: "Elimination of all remaining microorganisms." },
              { step: 5, title: "Sanitation", desc: "Gallons are sterilized before being sealed." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass-dark p-5 rounded-2xl flex gap-4 items-start hover:border-sky/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-sky/20 flex items-center justify-center text-sky font-display font-black shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-sky">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Quality & Certs */}
      <Section id="quality" className="bg-off-white">
        <div className="text-center mb-16 space-y-4">
          <Reveal>
            <h2 className="text-red font-display font-black text-4xl uppercase tracking-tight">Quality & Certifications</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We operate with full transparency and government compliance.</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Reveal delay={0.1}>
            <div className="bg-white p-4 rounded-3xl shadow-xl space-y-4 group">
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <ClickableImage src={undefined} alt="File: images/permit1.jpg | Size: 1080x1080px | Type: Photo | Desc: Permit" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-dark-blue/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">Official Permit</div>
              </div>
              <h3 className="font-bold text-center">Business Permit</h3>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-white p-4 rounded-3xl shadow-xl space-y-4 group">
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <ClickableImage src={undefined} alt="File: images/lab.jpg | Size: 1080x1080px | Type: Photo | Desc: Lab Test" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-dark-blue/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">Lab Tested</div>
              </div>
              <h3 className="font-bold text-center">Hydrolab Certification</h3>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="bg-white p-4 rounded-3xl shadow-xl space-y-4 group">
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <ClickableImage src={undefined} alt="File: images/certificates.jpg | Size: 1080x1080px | Type: Photo | Desc: Certs" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-dark-blue/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">All Certs</div>
              </div>
              <h3 className="font-bold text-center">DOH & FDA Compliance</h3>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="bg-white/50 border border-slate-200 p-3 rounded-xl flex items-center gap-3 text-sm text-slate-700">
                <CheckCircle2 size={16} className="text-red shrink-0" />
                {cert}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-red font-display font-black text-4xl uppercase tracking-tight">Our Services</h2>
                <p className="text-slate-600 text-lg">We provide more than just water; we provide a service you can rely on every single day.</p>
              </div>
              <div className="grid gap-4">
                {SERVICES.map((service, i) => {
                  const Icon = { Droplets, RefreshCw, Truck, Store }[service.icon] || Droplets;
                  return (
                    <div key={i} className="bg-off-white p-6 rounded-2xl border border-slate-100 flex gap-6 hover:border-red/30 transition-all hover:shadow-lg group">
                      <div className="w-14 h-14 rounded-2xl bg-red/10 flex items-center justify-center text-red group-hover:bg-red group-hover:text-white transition-colors shrink-0">
                        <Icon size={28} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{service.title}</h4>
                        <p className="text-slate-600">{service.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-blue p-8 rounded-3xl text-white flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <Clock size={32} className="text-sky" />
                  <div>
                    <div className="font-bold text-lg">Operating Hours</div>
                    <div className="text-sky/80 text-sm">{BUSINESS_DETAILS.hours}</div>
                  </div>
                </div>
                <a href="#order" className="bg-white text-blue px-6 py-3 rounded-xl font-bold hover:bg-sky hover:text-white transition-all whitespace-nowrap">
                  Check Availability
                </a>
              </div>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.2}>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
                <ClickableImage src={undefined} alt="File: images/gallons.jpg | Size: 1080x1080px | Type: Photo | Desc: Gallons" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <div className="bg-sky px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">Premium Quality</div>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-6">
              <Reveal delay={0.3}>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <ClickableImage src={undefined} alt="File: images/refill.jpg | Size: 1080x1080px | Type: Photo | Desc: Refill" className="w-full h-full object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <ClickableImage src={undefined} alt="File: images/delivery.jpg | Size: 1080x1080px | Type: Photo | Desc: Delivery" className="w-full h-full object-cover" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Trust / Reviews Section */}
      <Section id="reviews" className="bg-off-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Droplets className="absolute top-10 left-10 text-blue w-32 h-32 rotate-12" />
          <Droplets className="absolute bottom-10 right-10 text-red w-32 h-32 -rotate-12" />
        </div>

        <div className="text-center mb-16 space-y-4">
          <Reveal>
            <h2 className="text-red font-display font-black text-4xl uppercase tracking-tight">What Our Customers Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Your trust is our inspiration in providing the cleanest and safest purified water in Tarlac City.</p>
          </Reveal>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <ReviewSlider reviews={REVIEWS} />
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-24 bg-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-8 border border-slate-100">
            <div className="w-full md:w-1/3 aspect-video rounded-2xl overflow-hidden">
              <ClickableImage src={undefined} alt="File: images/review.jpg | Size: 1080x1080px | Type: Photo | Desc: FB Review" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-blue">
                <Facebook size={24} />
                <span className="font-bold">Facebook Reviews</span>
              </div>
              <h3 className="text-2xl font-bold">Join Our Community</h3>
              <p className="text-slate-600">We maintain a 5-star rating on Facebook. Check out more feedback and updates on our official page.</p>
              <a href={BUSINESS_DETAILS.social.facebook} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-red font-bold hover:underline">
                Visit our Facebook Page <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Location Section */}
      <Section id="location" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-red font-display font-black text-4xl uppercase tracking-tight">Find Us</h2>
                <p className="text-slate-600 text-lg">Visit our station or contact us for direct delivery.</p>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red/10 flex items-center justify-center text-red shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Address</div>
                    <div className="text-slate-600">{BUSINESS_DETAILS.address}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Contact Numbers</div>
                    <div className="text-slate-600">Globe: {BUSINESS_DETAILS.contact.globe}</div>
                    <div className="text-slate-600">Smart: {BUSINESS_DETAILS.contact.smart}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky/10 flex items-center justify-center text-sky shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Operating Hours</div>
                    <div className="text-slate-600">{BUSINESS_DETAILS.hours}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href={BUSINESS_DETAILS.social.maps} target="_blank" rel="noopener" className="bg-dark-blue text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-blue transition-all">
                  <MapPin size={20} />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-6">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-off-white">
                <iframe 
                  src="https://maps.google.com/maps?q=Supan+Abano+Residence+Zone+4+Calingcuan+Tarlac+City&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                <ClickableImage src={undefined} alt="File: images/store.jpg | Size: 1080x1080px | Type: Photo | Desc: Storefront" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Order Section */}
      <Section id="order" className="bg-dark-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ClickableImage src={undefined} alt="File: images/cta.jpg | Size: 1920x1080px | Type: Photo | Desc: Order BG" className="w-full h-full object-cover opacity-10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
          <Reveal>
            <div className="space-y-4">
              <h2 className="text-5xl font-display font-black uppercase tracking-tight">Order Now</h2>
              <p className="text-sky text-xl">Fill the form or contact us directly — we confirm fast!</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-white rounded-3xl p-1 shadow-2xl overflow-hidden min-h-[600px]">
              <iframe 
                src="https://app.youform.com/forms/r4iuycfr" 
                className="w-full h-[700px] border-0"
                title="Order Form"
              ></iframe>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            <Reveal delay={0.3}>
              <a href={BUSINESS_DETAILS.social.facebook} target="_blank" rel="noopener" className="bg-white/5 hover:bg-blue/20 border border-white/10 p-6 rounded-2xl transition-all group">
                <Facebook size={32} className="mx-auto mb-4 text-sky group-hover:scale-110 transition-transform" />
                <div className="font-bold">Facebook</div>
                <div className="text-xs text-slate-400">Visit our page</div>
              </a>
            </Reveal>
            <Reveal delay={0.4}>
              <a href={BUSINESS_DETAILS.social.messenger} target="_blank" rel="noopener" className="bg-white/5 hover:bg-sky/20 border border-white/10 p-6 rounded-2xl transition-all group">
                <MessageCircle size={32} className="mx-auto mb-4 text-sky group-hover:scale-110 transition-transform" />
                <div className="font-bold">Messenger</div>
                <div className="text-xs text-slate-400">Message us</div>
              </a>
            </Reveal>
            <Reveal delay={0.5}>
              <a href={`tel:${BUSINESS_DETAILS.contact.globe}`} className="bg-white/5 hover:bg-red/20 border border-white/10 p-6 rounded-2xl transition-all group">
                <Phone size={32} className="mx-auto mb-4 text-red group-hover:scale-110 transition-transform" />
                <div className="font-bold">Call Us</div>
                <div className="text-xs text-slate-400">{BUSINESS_DETAILS.contact.globe}</div>
              </a>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="font-display font-black text-3xl flex items-center gap-1">
              <span className="text-red">Kyl</span>
              <span className="text-sky">pure</span>
              <sup className="text-sky text-sm font-bold">™</sup>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Providing safe, clean, and affordable purified drinking water to the community of Calingcuan, Tarlac City since May 2025.
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Powered By</div>
                <div className="text-sky font-bold text-sm">Watermax Enterprises</div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#about" className="hover:text-sky transition-colors">Our Story</a></li>
              <li><a href="#process" className="hover:text-sky transition-colors">Purification</a></li>
              <li><a href="#services" className="hover:text-sky transition-colors">Services</a></li>
              <li><a href="#location" className="hover:text-sky transition-colors">Location</a></li>
              <li><a href="#order" className="hover:text-sky transition-colors">Order Now</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex gap-2"><MapPin size={16} className="text-red shrink-0" /> {BUSINESS_DETAILS.address}</li>
              <li className="flex gap-2"><Phone size={16} className="text-red shrink-0" /> {BUSINESS_DETAILS.contact.globe}</li>
              <li className="flex gap-2"><Phone size={16} className="text-red shrink-0" /> {BUSINESS_DETAILS.contact.smart}</li>
              <li className="flex gap-2"><Clock size={16} className="text-red shrink-0" /> {BUSINESS_DETAILS.hours}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-slate-500 text-xs pb-24 md:pb-8">
          © {new Date().getFullYear()} KYLPURE Purified Water Refilling Station. All Rights Reserved.
        </div>
      </footer>

      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-dark-blue/80 backdrop-blur-md border border-light-blue/30 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-dark-blue to-blue border-t-2 border-light-blue/40 p-3 flex gap-3 md:hidden">
        <a 
          href="#order" 
          className="flex-1 bg-gradient-to-r from-red to-red-dark text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg animate-pulse"
        >
          📦 Order Water
        </a>
        <a 
          href={`tel:${BUSINESS_DETAILS.contact.globe}`} 
          className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2"
        >
          📞 Call Now
        </a>
      </div>
    </div>
  );
}
