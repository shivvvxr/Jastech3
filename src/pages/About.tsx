import { motion, useScroll, useTransform } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router";
import { 
  Cloud, 
  Brain, 
  Network, 
  Cpu, 
  Shield, 
  Zap,
  Target,
  Eye,
  Award,
  Users,
  Globe,
  TrendingUp
} from "lucide-react";
import { useRef } from "react";

export default function About() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const expertise = [
    { icon: Cloud, title: "Cloud Computing", description: "Innovative solutions tailored for next-gen enterprises" },
    { icon: Brain, title: "AI Solutions", description: "Intelligent systems that drive business transformation" },
    { icon: Network, title: "IoT Systems", description: "Connected devices for smarter operations" },
    { icon: Cpu, title: "Product Engineering", description: "End-to-end product development excellence" },
    { icon: Shield, title: "Network Infrastructure", description: "Robust and secure network architectures" },
    { icon: Zap, title: "Testing & Automation", description: "Quality assurance at every stage" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf7ff] via-white to-[#a2e3ff]" ref={containerRef}>
      <Navbar />

      {/* Hero Section - Morphing Identity */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#6ad0ff]/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Glass overlay */}
        <motion.div
          className="absolute inset-0 backdrop-blur-sm bg-white/5"
          style={{ opacity, scale }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <GooeyText
              texts={["ABOUT US", "JASTECH INFOSYSTEMS", "INNOVATION", "EXCELLENCE", "TECHNOLOGY"]}
              morphTime={1}
              cooldownTime={0.25}
              className="text-[#0d1b2a] drop-shadow-lg"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl text-[#0d1b2a]/80 max-w-3xl mx-auto font-light"
            style={{
              textShadow: "0 0 20px rgba(106, 208, 255, 0.3), 0 0 40px rgba(162, 227, 255, 0.2)"
            }}
          >
            Empowering Innovation Through Cloud & Engineering Excellence
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-32 px-8 bg-gradient-to-b from-transparent to-[#a2e3ff]/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#0d1b2a] mb-6">
              Our Story
            </h2>
            <p className="text-xl text-[#0d1b2a]/70 max-w-4xl mx-auto leading-relaxed">
              Jastech Infosystems Pvt. Ltd. was founded with a vision to bridge the gap between cutting-edge technology 
              and business needs. From our humble beginnings to becoming a trusted partner for enterprises worldwide, 
              our journey has been defined by innovation, dedication, and an unwavering commitment to excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/40 border-2 border-[#b4dcff] rounded-3xl p-12 shadow-2xl"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <Award className="w-16 h-16 mx-auto mb-4 text-[#6ad0ff]" />
                </motion.div>
                <h3 className="text-4xl font-bold text-[#0d1b2a] mb-2">10+</h3>
                <p className="text-[#0d1b2a]/70">Years Experience</p>
              </div>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <Users className="w-16 h-16 mx-auto mb-4 text-[#6ad0ff]" />
                </motion.div>
                <h3 className="text-4xl font-bold text-[#0d1b2a] mb-2">100+</h3>
                <p className="text-[#0d1b2a]/70">Partners</p>
              </div>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  <Globe className="w-16 h-16 mx-auto mb-4 text-[#6ad0ff]" />
                </motion.div>
                <h3 className="text-4xl font-bold text-[#0d1b2a] mb-2">1000+</h3>
                <p className="text-[#0d1b2a]/70">Clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission-vision" className="py-32 px-8 bg-gradient-to-b from-[#a2e3ff]/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-center text-[#0d1b2a] mb-20"
          >
            Mission & Vision
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="backdrop-blur-xl bg-white/40 border-2 border-[#b4dcff] rounded-3xl p-10 max-w-md text-center shadow-2xl"
            >
              <Target className="w-20 h-20 mx-auto mb-6 text-[#6ad0ff]" />
              <h3 className="text-3xl font-bold text-[#0d1b2a] mb-6">Our Mission</h3>
              <p className="text-lg text-[#0d1b2a]/70 leading-relaxed">
                To design, develop, and implement datacenter and IT solutions that maximize results, 
                minimize costs, and empower client success through innovation and excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="backdrop-blur-xl bg-white/40 border-2 border-[#b4dcff] rounded-3xl p-10 max-w-md text-center shadow-2xl"
            >
              <Eye className="w-20 h-20 mx-auto mb-6 text-[#6ad0ff]" />
              <h3 className="text-3xl font-bold text-[#0d1b2a] mb-6">Our Vision</h3>
              <p className="text-lg text-[#0d1b2a]/70 leading-relaxed">
                To be the global leader in delivering intelligent, lasting IT solutions that create 
                measurable business value and inspire innovation across industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#0d1b2a] mb-6">
              Our Expertise
            </h2>
            <p className="text-xl text-[#0d1b2a]/70 max-w-3xl mx-auto">
              Comprehensive technology solutions across multiple domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="backdrop-blur-xl bg-white/40 border-2 border-[#b4dcff] rounded-2xl p-8 shadow-lg cursor-pointer group"
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a2e3ff] to-[#6ad0ff] flex items-center justify-center mb-6 group-hover:shadow-xl transition-shadow"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Icon className="w-8 h-8 text-[#0d1b2a]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#0d1b2a] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#0d1b2a]/60">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-32 px-8 bg-gradient-to-t from-white via-[#b4dcff]/20 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#0d1b2a] mb-8">
              Why Choose Us?
            </h2>
            <p className="text-xl text-[#0d1b2a]/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              Because we blend innovation with human insight — offering holistic understanding, 
              reliable partnerships, and world-class delivery that transforms businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: TrendingUp, title: "Proven Track Record", description: "Consistent delivery of high-impact solutions" },
              { icon: Shield, title: "Security First", description: "Enterprise-grade security in every solution" },
              { icon: Users, title: "Client-Centric", description: "Your success is our priority" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="backdrop-blur-xl bg-white/30 border-2 border-[#b4dcff] rounded-2xl p-8"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-[#6ad0ff]" />
                  <h3 className="text-xl font-bold text-[#0d1b2a] mb-3">{item.title}</h3>
                  <p className="text-[#0d1b2a]/70">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <LiquidButton onClick={() => navigate("/ask-ai")}>
              Experience Jastech AI
            </LiquidButton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
