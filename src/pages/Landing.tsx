import { motion, useScroll, useTransform } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { 
  Server, 
  Network, 
  Globe, 
  Shield, 
  Cloud, 
  Lock, 
  Camera, 
  Fingerprint, 
  Zap, 
  Car, 
  Users, 
  Paintbrush,
  Flame
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollY } = useScroll();
  const submitContactForm = useAction(api.contactForm.submitContactForm);
  
  // Parallax transforms for different layers
  const heroParticlesY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, -50]);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      await submitContactForm({ name, email, message });
      
      toast.success("Message sent successfully!", {
        description: `Thank you ${name}, we'll get back to you soon.`,
        duration: 5000,
        style: {
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          border: "2px solid #b4dcff",
          color: "#0d1b2a",
        },
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later or contact us directly.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const products = [
    { icon: Server, title: "High-end Servers", description: "Enterprise-grade server solutions" },
    { icon: Server, title: "Racks", description: "Professional server rack systems" },
    { icon: Network, title: "Switches", description: "Network switching equipment" },
    { icon: Server, title: "Desktop/All-in-One", description: "Complete desktop computing solutions" },
    { icon: Paintbrush, title: "Printers", description: "Professional printing solutions" },
    { icon: Paintbrush, title: "Multifunctional Printers", description: "All-in-one printing devices" },
    { icon: Camera, title: "CCTVs", description: "Surveillance camera systems" },
    { icon: Zap, title: "Fencing", description: "Security fencing solutions" },
    { icon: Network, title: "LAN", description: "Local area network infrastructure" },
    { icon: Server, title: "IT Peripherals", description: "Complete IT accessories and peripherals" },
  ];

  const services = [
    { icon: Server, title: "Data Center Setup", description: "Complete data center infrastructure solutions" },
    { icon: Server, title: "Server Supply & Installation", description: "Enterprise-grade server deployment" },
    { icon: Network, title: "LAN Networking Services", description: "Comprehensive network infrastructure" },
    { icon: Globe, title: "Website Development", description: "Modern web solutions for your business" },
    { icon: Shield, title: "Antivirus Solutions", description: "Advanced threat protection systems" },
    { icon: Network, title: "Netscaler Solutions", description: "Application delivery and load balancing" },
    { icon: Cloud, title: "Citrix / VMware Solutions", description: "Virtualization and cloud infrastructure" },
    { icon: Lock, title: "Security Solutions", description: "Comprehensive security implementations" },
    { icon: Camera, title: "CCTV Installation Services", description: "Professional surveillance systems" },
    { icon: Fingerprint, title: "Biometric Solutions", description: "Advanced access control systems" },
    { icon: Zap, title: "Electric Fencing Solutions", description: "Perimeter security systems" },
    { icon: Car, title: "Vehicle Hiring Services", description: "Corporate transportation solutions" },
    { icon: Users, title: "Manpower Supply Services", description: "Skilled IT professionals on demand" },
    { icon: Paintbrush, title: "Interior Design", description: "Modern office space design" },
    { icon: Flame, title: "Fire Fighting Systems", description: "Safety and fire protection solutions" },
  ];

  const clientLogos = [
    { name: "Northern Frontier Railway", url: "https://harmless-tapir-303.convex.cloud/api/storage/9975f94f-062f-476d-9787-c6c4fb59a87a" },
    { name: "Punjab State Electricity Regulatory Commission", url: "https://harmless-tapir-303.convex.cloud/api/storage/e754004f-14d7-47d1-abff-182b51399888" },
    { name: "Ministry of Health and Family Welfare", url: "https://harmless-tapir-303.convex.cloud/api/storage/e0a69fa6-4b79-46ca-af7a-b74f6920173b" },
    { name: "National Rural Health Mission", url: "https://harmless-tapir-303.convex.cloud/api/storage/3e387a93-cbe4-4fd4-8f9e-7ab5b53e016e" },
    { name: "Government of India", url: "https://harmless-tapir-303.convex.cloud/api/storage/79916c9a-feea-4926-9d12-1485ac51b5c9" },
    { name: "Government of Uttar Pradesh", url: "https://harmless-tapir-303.convex.cloud/api/storage/28baa24f-df06-4b34-a604-5b4c439a3cdc" },
    { name: "Indian Ports Association", url: "https://harmless-tapir-303.convex.cloud/api/storage/b85a9727-646c-4089-9204-e3073d7da98a" },
    { name: "DRDO", url: "https://harmless-tapir-303.convex.cloud/api/storage/e1899604-2416-40fe-a012-22f0f99ea081" },
    { name: "National Medical Commission", url: "https://harmless-tapir-303.convex.cloud/api/storage/f49b2a7a-5bee-47d3-9f9c-3ffe10dd9beb" },
    { name: "Government e-Marketplace", url: "https://harmless-tapir-303.convex.cloud/api/storage/f5136285-0a16-4072-a8fb-a8ad3bc3e5e0" },
    { name: "SC & ST Welfare Department", url: "https://harmless-tapir-303.convex.cloud/api/storage/256fc20a-6e15-417d-9981-9796ddb68095" },
    { name: "IDAS", url: "https://harmless-tapir-303.convex.cloud/api/storage/0c4752e2-96cd-482d-b0cc-a3971af0a840" },
    { name: "Government of India - Official", url: "https://harmless-tapir-303.convex.cloud/api/storage/4930994c-b786-45f9-a113-b21f14d2afa3" },
    { name: "Border Security Force", url: "https://harmless-tapir-303.convex.cloud/api/storage/105269d5-8532-4d0e-b036-1c304c759f3c" },
    { name: "Punjab State Power Corporation", url: "https://harmless-tapir-303.convex.cloud/api/storage/867a8399-8e66-4090-8ad5-40fcec13b67d" },
    { name: "Defence R&D Organisation", url: "https://harmless-tapir-303.convex.cloud/api/storage/9d4fa0e2-d4a9-4ef9-b530-be7507cc2b05" },
    { name: "Defence R&D Organisation - Alt", url: "https://harmless-tapir-303.convex.cloud/api/storage/704cb346-47d6-43da-a856-0a6595a3f8f9" },
    { name: "Bureau of Indian Standards", url: "https://harmless-tapir-303.convex.cloud/api/storage/ef1f0b40-6e33-415c-8a0f-ca636f7f61e9" },
    { name: "Central Reserve Police Force", url: "https://harmless-tapir-303.convex.cloud/api/storage/4adaecf7-68df-491e-8cf3-b06a87075ead" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf7ff] via-white to-[#a2e3ff] relative">
      {/* Subtle tiled company logo background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: "url(/logo_bg.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "220px",
          backgroundPosition: "center",
        }}
      />
      <Navbar />

      {/* Hero Section with Gooey Text */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Floating particles background */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ y: heroParticlesY }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#6ad0ff]/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* Blended company logo background (blurred) */}
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0.18, scale: 1 }}
          animate={{ opacity: 0.25, scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ zIndex: 0 }}
        >
          <img
            src="https://harmless-tapir-303.convex.cloud/api/storage/d88e6e35-9b43-42e1-819a-a4e9465c9699"
            alt=""
            className="w-[70vmin] max-w-[620px] opacity-30 blur-3xl mix-blend-multiply select-none"
          />
        </motion.div>

        {/* Glass overlay */}
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Hero content */}
        <motion.div 
          className="relative z-10 text-center px-8"
          style={{ y: heroContentY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <GooeyText
              texts={["JASTECH INFOSYS PRIVATE LIMITED", "SOFTWARE DEVELOPMENT", "INTERIOR DESIGNING", "SERVICES", "WEBSITE DEVELOPMENT", "SECURITY"]}
              morphTime={1}
              cooldownTime={1}
              className="text-[#0d1b2a] drop-shadow-lg"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl text-[#0d1b2a]/80 max-w-2xl mx-auto font-light mb-8"
            style={{
              textShadow: "0 0 20px rgba(106, 208, 255, 0.3), 0 0 40px rgba(162, 227, 255, 0.2)"
            }}
          >
            Experience the future of technology with Jastech Infosys Private Limited
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 blur-3xl bg-gradient-to-r from-[#a2e3ff] to-[#6ad0ff] opacity-30"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
            <LiquidButton onClick={() => navigate("/ask-ai")}>
              Explore Jastech
            </LiquidButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/40 border-4 border-[#b4dcff] rounded-3xl p-12 shadow-2xl"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-[#0d1b2a] mb-8 text-center"
            >
              Why Choose Us
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-[#0d1b2a]/70 mb-6 text-center italic"
            >
              Founded by <span className="font-bold text-[#0d1b2a]">Jasmine Kaur</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-[#0d1b2a]/80 mb-10 text-center font-medium"
            >
              We stand apart because of our:
            </motion.p>

            <div className="space-y-4">
              {[
                "Holistic understanding of the information management ecosystem",
                "Efficient supply chain management and over 100+ channel partners across India",
                "Strong client relationships rooted in transparency and professionalism",
                "Adaptive team culture that blends seamlessly into client environments",
                "Proven credit and project management discipline"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="backdrop-blur-sm bg-white/30 border-2 border-[#b4dcff] rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#6ad0ff] to-[#a2e3ff] mt-2 flex-shrink-0" />
                    <p className="text-lg text-[#0d1b2a]/90 leading-relaxed">
                      {item}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Services Section */}
      <section className="py-32 px-8 bg-gradient-to-br from-[#a2e3ff]/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-[#0d1b2a] mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="text-xl text-[#0d1b2a]/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive technology solutions tailored to your business needs
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 20px 40px rgba(106, 208, 255, 0.3)"
                  }}
                  className="backdrop-blur-xl bg-white/40 border-2 border-[#b4dcff] rounded-xl p-6 shadow-lg cursor-pointer group hover:bg-white/60 hover:border-[#6ad0ff]"
                  onClick={() => navigate(`/ask-ai?query=Tell me about ${service.title}`)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a2e3ff] to-[#6ad0ff] flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow">
                      <Icon className="w-8 h-8 text-[#0d1b2a]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0d1b2a] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#0d1b2a]/60">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Alliances Section */}
      <section className="py-32 px-8 bg-gradient-to-br from-transparent to-[#a2e3ff]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-[#0d1b2a] mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Clients
            </motion.h2>
            <motion.p 
              className="text-xl text-[#0d1b2a]/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trusted by leading government organizations and institutions across India
            </motion.p>
          </motion.div>

          {/* Animated Logo Carousel */}
          <div className="relative overflow-hidden backdrop-blur-xl bg-white/30 border-2 border-[#b4dcff] rounded-3xl p-16 shadow-xl">
            <motion.div
              className="flex gap-16 items-center"
              animate={{
                x: [0, -4560],
              }}
              transition={{
                x: {
                  duration: 80,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* First set of client logos */}
              {[
                { name: "Northern Frontier Railway", url: "https://harmless-tapir-303.convex.cloud/api/storage/9975f94f-062f-476d-9787-c6c4fb59a87a" },
                { name: "Punjab State Electricity Regulatory Commission", url: "https://harmless-tapir-303.convex.cloud/api/storage/e754004f-14d7-47d1-abff-182b51399888" },
                { name: "Ministry of Health and Family Welfare", url: "https://harmless-tapir-303.convex.cloud/api/storage/e0a69fa6-4b79-46ca-af7a-b74f6920173b" },
                { name: "National Rural Health Mission", url: "https://harmless-tapir-303.convex.cloud/api/storage/3e387a93-cbe4-4fd4-8f9e-7ab5b53e016e" },
                { name: "Government of India", url: "https://harmless-tapir-303.convex.cloud/api/storage/79916c9a-feea-4926-9d12-1485ac51b5c9" },
                { name: "Government of Uttar Pradesh", url: "https://harmless-tapir-303.convex.cloud/api/storage/28baa24f-df06-4b34-a604-5b4c439a3cdc" },
                { name: "Indian Ports Association", url: "https://harmless-tapir-303.convex.cloud/api/storage/b85a9727-646c-4089-9204-e3073d7da98a" },
                { name: "DRDO", url: "https://harmless-tapir-303.convex.cloud/api/storage/e1899604-2416-40fe-a012-22f0f99ea081" },
                { name: "National Medical Commission", url: "https://harmless-tapir-303.convex.cloud/api/storage/f49b2a7a-5bee-47d3-9f9c-3ffe10dd9beb" },
                { name: "Government e-Marketplace", url: "https://harmless-tapir-303.convex.cloud/api/storage/f5136285-0a16-4072-a8fb-a8ad3bc3e5e0" },
                { name: "SC & ST Welfare Department", url: "https://harmless-tapir-303.convex.cloud/api/storage/256fc20a-6e15-417d-9981-9796ddb68095" },
                { name: "IDAS", url: "https://harmless-tapir-303.convex.cloud/api/storage/0c4752e2-96cd-482d-b0cc-a3971af0a840" },
                { name: "Government of India - Official", url: "https://harmless-tapir-303.convex.cloud/api/storage/4930994c-b786-45f9-a113-b21f14d2afa3" },
                { name: "Border Security Force", url: "https://harmless-tapir-303.convex.cloud/api/storage/105269d5-8532-4d0e-b036-1c304c759f3c" },
                { name: "Punjab State Power Corporation", url: "https://harmless-tapir-303.convex.cloud/api/storage/867a8399-8e66-4090-8ad5-40fcec13b67d" },
                { name: "Defence R&D Organisation", url: "https://harmless-tapir-303.convex.cloud/api/storage/9d4fa0e2-d4a9-4ef9-b530-be7507cc2b05" },
                { name: "Defence R&D Organisation - Alt", url: "https://harmless-tapir-303.convex.cloud/api/storage/704cb346-47d6-43da-a856-0a6595a3f8f9" },
                { name: "Bureau of Indian Standards", url: "https://harmless-tapir-303.convex.cloud/api/storage/ef1f0b40-6e33-415c-8a0f-ca636f7f61e9" },
                { name: "Central Reserve Police Force", url: "https://harmless-tapir-303.convex.cloud/api/storage/4adaecf7-68df-491e-8cf3-b06a87075ead" },
              ].map((client, index) => (
                <motion.div
                  key={`logo-1-${index}`}
                  className="flex-shrink-0 w-64 h-44 md:w-72 md:h-48 flex items-center justify-center backdrop-blur-sm bg-white/70 rounded-2xl p-8 border-2 border-[#b4dcff]/50"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={client.url}
                    alt={client.name}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain transition-all"
                  />
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { name: "Northern Frontier Railway", url: "https://harmless-tapir-303.convex.cloud/api/storage/9975f94f-062f-476d-9787-c6c4fb59a87a" },
                { name: "Punjab State Electricity Regulatory Commission", url: "https://harmless-tapir-303.convex.cloud/api/storage/e754004f-14d7-47d1-abff-182b51399888" },
                { name: "Ministry of Health and Family Welfare", url: "https://harmless-tapir-303.convex.cloud/api/storage/e0a69fa6-4b79-46ca-af7a-b74f6920173b" },
                { name: "National Rural Health Mission", url: "https://harmless-tapir-303.convex.cloud/api/storage/3e387a93-cbe4-4fd4-8f9e-7ab5b53e016e" },
                { name: "Government of India", url: "https://harmless-tapir-303.convex.cloud/api/storage/79916c9a-feea-4926-9d12-1485ac51b5c9" },
                { name: "Government of Uttar Pradesh", url: "https://harmless-tapir-303.convex.cloud/api/storage/28baa24f-df06-4b34-a604-5b4c439a3cdc" },
                { name: "Indian Ports Association", url: "https://harmless-tapir-303.convex.cloud/api/storage/b85a9727-646c-4089-9204-e3073d7da98a" },
                { name: "DRDO", url: "https://harmless-tapir-303.convex.cloud/api/storage/e1899604-2416-40fe-a012-22f0f99ea081" },
                { name: "National Medical Commission", url: "https://harmless-tapir-303.convex.cloud/api/storage/f49b2a7a-5bee-47d3-9f9c-3ffe10dd9beb" },
                { name: "Government e-Marketplace", url: "https://harmless-tapir-303.convex.cloud/api/storage/f5136285-0a16-4072-a8fb-a8ad3bc3e5e0" },
                { name: "SC & ST Welfare Department", url: "https://harmless-tapir-303.convex.cloud/api/storage/256fc20a-6e15-417d-9981-9796ddb68095" },
                { name: "IDAS", url: "https://harmless-tapir-303.convex.cloud/api/storage/0c4752e2-96cd-482d-b0cc-a3971af0a840" },
                { name: "Government of India - Official", url: "https://harmless-tapir-303.convex.cloud/api/storage/4930994c-b786-45f9-a113-b21f14d2afa3" },
                { name: "Border Security Force", url: "https://harmless-tapir-303.convex.cloud/api/storage/105269d5-8532-4d0e-b036-1c304c759f3c" },
                { name: "Punjab State Power Corporation", url: "https://harmless-tapir-303.convex.cloud/api/storage/867a8399-8e66-4090-8ad5-40fcec13b67d" },
                { name: "Defence R&D Organisation", url: "https://harmless-tapir-303.convex.cloud/api/storage/9d4fa0e2-d4a9-4ef9-b530-be7507cc2b05" },
                { name: "Defence R&D Organisation - Alt", url: "https://harmless-tapir-303.convex.cloud/api/storage/704cb346-47d6-43da-a856-0a6595a3f8f9" },
                { name: "Bureau of Indian Standards", url: "https://harmless-tapir-303.convex.cloud/api/storage/ef1f0b40-6e33-415c-8a0f-ca636f7f61e9" },
                { name: "Central Reserve Police Force", url: "https://harmless-tapir-303.convex.cloud/api/storage/4adaecf7-68df-491e-8cf3-b06a87075ead" },
              ].map((client, index) => (
                <motion.div
                  key={`logo-2-${index}`}
                  className="flex-shrink-0 w-64 h-44 md:w-72 md:h-48 flex items-center justify-center backdrop-blur-sm bg-white/70 rounded-2xl p-8 border-2 border-[#b4dcff]/50"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={client.url}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain transition-all"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Our Vision */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-center text-[#0d1b2a] mb-8"
          >
            Our Vision
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-center text-[#0d1b2a]/80 mb-16 max-w-5xl mx-auto leading-relaxed"
          >
            <span className="font-bold">Software. Design. Services.</span> At Jastech Infosys Pvt. Ltd., we transcend conventional boundaries crafting intelligent software, immersive designs, and reliable services that empower innovation and efficiency.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Software that Thinks",
                description: "Our solutions integrate AI and automation to revolutionize performance, streamline workflows, and amplify business intelligence.",
              },
              {
                title: "Designs that Inspire",
                description: "From fluid interfaces to futuristic aesthetics, our designs fuse elegance with usability — turning ideas into breathtaking digital experiences.",
              },
              {
                title: "Services that Deliver",
                description: "We believe in partnership over projects. With precision, passion, and professionalism, Jastech ensures every solution is built to last, scale, and shine.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="backdrop-blur-xl bg-white/30 border-2 border-[#b4dcff] rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-[#0d1b2a] mb-4">
                  {feature.title}
                </h3>
                <p className="text-[#0d1b2a]/70 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Liquid Button Section */}
      <section className="py-32 px-8 flex items-center justify-center">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-[#0d1b2a] mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Products
            </motion.h2>
            <motion.p 
              className="text-xl text-[#0d1b2a]/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium technology products for your business infrastructure
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="backdrop-blur-xl bg-white/40 border-2 border-[#b4dcff] rounded-xl p-6 shadow-lg cursor-pointer group"
                  onClick={() => navigate(`/ask-ai?query=Tell me about ${product.title}`)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a2e3ff] to-[#6ad0ff] flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow">
                      <Icon className="w-8 h-8 text-[#0d1b2a]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0d1b2a] mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-[#0d1b2a]/60">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-32 px-8 bg-gradient-to-br from-transparent to-[#a2e3ff]/10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-[#0d1b2a] mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Contact Us
            </motion.h2>
            <motion.p 
              className="text-xl text-[#0d1b2a]/70"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have a question or want to work together? Send us a message.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-white/40 border-2 border-[#b4dcff] rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#0d1b2a] mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="backdrop-blur-sm bg-white/50 border-[#b4dcff] focus:border-[#6ad0ff] transition-colors"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#0d1b2a] mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="backdrop-blur-sm bg-white/50 border-[#b4dcff] focus:border-[#6ad0ff] transition-colors"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#0d1b2a] mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us about your project or inquiry..."
                  rows={6}
                  className="backdrop-blur-sm bg-white/50 border-[#b4dcff] focus:border-[#6ad0ff] transition-colors resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#a2e3ff] to-[#6ad0ff] text-[#0d1b2a] font-semibold hover:from-[#6ad0ff] hover:to-[#a2e3ff] transition-all shadow-lg hover:shadow-xl text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}