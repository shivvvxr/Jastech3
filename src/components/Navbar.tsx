"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  Flame,
  Search,
  Menu
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );
  const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"]);

  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(productSearchQuery.toLowerCase())
  );

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(serviceSearchQuery.toLowerCase())
  );

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: blur,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#b4dcff]/20 sticky"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
          animate={{ 
            y: [0, -3, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            hover: {
              duration: 0.3
            }
          }}
          onClick={() => navigate("/")}
          role="link"
          aria-label="Jastech home"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate("/");
            }
          }}
        >
          <motion.img 
            src="https://harmless-tapir-303.convex.cloud/api/storage/65ce408f-7e83-4ee0-b6d0-a80698a32a36" 
            alt="Jastech Logo" 
            className="h-12 w-auto"
            whileHover={{ filter: "brightness(1.1)" }}
          />
        </motion.div>
        <div className="hidden md:flex items-center gap-8">
          <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
            <Button variant="ghost" className="text-[#0d1b2a] hover:text-[#6ad0ff] hover:bg-[#a2e3ff]/20 transition-colors" onClick={() => navigate("/")} aria-label="Navigate to home">
              Home
            </Button>
          </motion.div>
          
          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowProductsDropdown(true)}
            onMouseLeave={() => {
              setShowProductsDropdown(false);
              setProductSearchQuery("");
            }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
              <Button 
                variant="ghost" 
                className="text-[#0d1b2a] hover:text-[#6ad0ff] hover:bg-[#a2e3ff]/20 transition-colors"
                aria-expanded={showProductsDropdown}
                aria-haspopup="true"
                aria-controls="products-dropdown"
              >
                Products
              </Button>
            </motion.div>
            {showProductsDropdown && (
              <motion.div
                id="products-dropdown"
                role="region"
                aria-label="Products menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 top-full pt-2 backdrop-blur-xl bg-white/95 border-2 border-[#b4dcff] rounded-2xl shadow-2xl overflow-hidden"
                style={{ width: "calc(100vw - 4rem)", maxWidth: "1280px" }}
                onMouseEnter={() => setShowProductsDropdown(true)}
                onMouseLeave={() => {
                  setShowProductsDropdown(false);
                  setProductSearchQuery("");
                }}
              >
                <div className="p-4 border-b border-[#b4dcff]/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d1b2a]/60" aria-hidden="true" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={productSearchQuery}
                      onChange={(e) => setProductSearchQuery(e.target.value)}
                      className="pl-10 backdrop-blur-sm bg-white/50 border-[#b4dcff] focus:border-[#6ad0ff] transition-colors"
                      aria-label="Search products"
                    />
                  </div>
                </div>
                <div 
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 max-h-[400px] overflow-y-auto dropdown-scroll"
                  role="list"
                  aria-label="Product list"
                >
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => {
                      const Icon = product.icon;
                      return (
                        <motion.div
                          key={index}
                          role="listitem"
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-start p-4 rounded-xl hover:bg-[#a2e3ff]/20 transition-colors cursor-pointer"
                          tabIndex={0}
                          aria-label={`${product.title}: ${product.description}`}
                          onClick={() => {
                            navigate(`/ask-ai?preset=${encodeURIComponent(product.title)}`);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              navigate(`/ask-ai?preset=${encodeURIComponent(product.title)}`);
                            }
                          }}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a2e3ff] to-[#6ad0ff] flex items-center justify-center mb-3" aria-hidden="true">
                            <Icon className="w-5 h-5 text-[#0d1b2a]" />
                          </div>
                          <h4 className="text-sm font-bold text-[#0d1b2a] mb-1">
                            {product.title}
                          </h4>
                          <p className="text-xs text-[#0d1b2a]/60">
                            {product.description}
                          </p>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center py-8 text-[#0d1b2a]/60" role="status">
                      No products found
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowServicesDropdown(true)}
            onMouseLeave={() => {
              setShowServicesDropdown(false);
              setServiceSearchQuery("");
            }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
              <Button 
                variant="ghost" 
                className="text-[#0d1b2a] hover:text-[#6ad0ff] hover:bg-[#a2e3ff]/20 transition-colors"
                aria-expanded={showServicesDropdown}
                aria-haspopup="true"
                aria-controls="services-dropdown"
              >
                Services
              </Button>
            </motion.div>
            {showServicesDropdown && (
              <motion.div
                id="services-dropdown"
                role="region"
                aria-label="Services menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 top-full pt-2 backdrop-blur-xl bg-white/95 border-2 border-[#b4dcff] rounded-2xl shadow-2xl overflow-hidden"
                style={{ width: "calc(100vw - 4rem)", maxWidth: "1280px" }}
                onMouseEnter={() => setShowServicesDropdown(true)}
                onMouseLeave={() => {
                  setShowServicesDropdown(false);
                  setServiceSearchQuery("");
                }}
              >
                <div className="p-4 border-b border-[#b4dcff]/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d1b2a]/60" aria-hidden="true" />
                    <Input
                      type="text"
                      placeholder="Search services..."
                      value={serviceSearchQuery}
                      onChange={(e) => setServiceSearchQuery(e.target.value)}
                      className="pl-10 backdrop-blur-sm bg-white/50 border-[#b4dcff] focus:border-[#6ad0ff] transition-colors"
                      aria-label="Search services"
                    />
                  </div>
                </div>
                <div 
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 max-h-[400px] overflow-y-auto dropdown-scroll"
                  role="list"
                  aria-label="Service list"
                >
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <motion.div
                          key={index}
                          role="listitem"
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-start p-4 rounded-xl hover:bg-[#a2e3ff]/20 transition-colors cursor-pointer"
                          tabIndex={0}
                          aria-label={`${service.title}: ${service.description}`}
                          onClick={() => {
                            navigate(`/ask-ai?preset=${encodeURIComponent(service.title)}`);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              navigate(`/ask-ai?preset=${encodeURIComponent(service.title)}`);
                            }
                          }}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a2e3ff] to-[#6ad0ff] flex items-center justify-center mb-3" aria-hidden="true">
                            <Icon className="w-5 h-5 text-[#0d1b2a]" />
                          </div>
                          <h4 className="text-sm font-bold text-[#0d1b2a] mb-1">
                            {service.title}
                          </h4>
                          <p className="text-xs text-[#0d1b2a]/60">
                            {service.description}
                          </p>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center py-8 text-[#0d1b2a]/60" role="status">
                      No services found
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
            <Button variant="ghost" className="text-[#0d1b2a] hover:text-[#6ad0ff] hover:bg-[#a2e3ff]/20 transition-colors" onClick={() => navigate("/about")} aria-label="Navigate to about page">
              About
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
            <Button 
              variant="ghost" 
              className="text-[#0d1b2a] hover:text-[#6ad0ff] hover:bg-[#a2e3ff]/20 transition-colors" 
              onClick={() => {
                if (window.location.pathname === '/') {
                  document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/#contact-us');
                }
              }}
              aria-label="Navigate to contact section"
            >
              Contact
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Button
              className="bg-gradient-to-r from-[#a2e3ff] to-[#6ad0ff] text-[#0d1b2a] font-semibold hover:from-[#6ad0ff] hover:to-[#a2e3ff] transition-all shadow-lg hover:shadow-xl"
              onClick={() => navigate("/ask-ai")}
              aria-label="Navigate to Ask AI page"
            >
              Ask AI
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#0d1b2a]/10 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          <DropdownMenu
            open={isMobileMenuOpen}
            onOpenChange={(open) => {
              setIsMobileMenuOpen(open);
              if (!open) {
                setProductSearchQuery("");
                setServiceSearchQuery("");
              }
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-[#0d1b2a] hover:text-[#6ad0ff] hover:bg-[#a2e3ff]/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              className="z-[60] w-[96vw] max-w-[420px] p-0 overflow-hidden backdrop-blur-2xl bg-white/90 border-[3px] border-[#b4dcff] rounded-3xl shadow-[0_20px_60px_rgba(106,208,255,0.35)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-[#a2e3ff] to-[#6ad0ff] text-[#0d1b2a]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://harmless-tapir-303.convex.cloud/api/storage/65ce408f-7e83-4ee0-b6d0-a80698a32a36"
                    alt="Jastech Logo"
                    className="h-8 w-auto rounded-md"
                  />
                  <span className="font-semibold tracking-wide">Menu</span>
                </div>
              </div>
              {/* Primary links */}
              <DropdownMenuItem
                className="cursor-pointer rounded-xl px-3 py-3 text-[#0d1b2a] hover:bg-[#a2e3ff]/20 transition-colors"
                onClick={() => { setIsMobileMenuOpen(false); navigate("/"); }}
              >
                Home
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-xl px-3 py-3 text-[#0d1b2a] hover:bg-[#a2e3ff]/20 transition-colors"
                onClick={() => { setIsMobileMenuOpen(false); navigate("/about"); }}
              >
                About
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-xl px-3 py-3 text-[#0d1b2a] hover:bg-[#a2e3ff]/20 transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (window.location.pathname === "/") {
                    document
                      .getElementById("contact-us")
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/#contact-us");
                  }
                }}
              >
                Contact
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-xl px-3 py-3 bg-gradient-to-r from-[#a2e3ff] to-[#6ad0ff] text-[#0d1b2a] font-semibold hover:from-[#6ad0ff] hover:to-[#a2e3ff] transition-all shadow-md"
                onClick={() => { setIsMobileMenuOpen(false); navigate("/ask-ai"); }}
              >
                Ask AI
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Products Section */}
              <div className="px-2 py-1.5">
                <div className="text-xs font-semibold text-[#0d1b2a]/70 mb-2">
                  Products
                </div>
                <div className="relative mb-2">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d1b2a]/60"
                    aria-hidden="true"
                  />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="h-11 rounded-xl pl-10 backdrop-blur-sm bg-white/50 border-[#b4dcff] focus:border-[#6ad0ff] transition-colors text-sm"
                    aria-label="Search products"
                  />
                </div>
                <div className="max-h-72 overflow-y-auto dropdown-scroll pr-1">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, i) => {
                      const Icon = product.icon;
                      return (
                        <DropdownMenuItem
                          key={`m-p-${i}`}
                          className="cursor-pointer py-3 rounded-xl hover:bg-[#a2e3ff]/20 transition-colors"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate(
                              `/ask-ai?preset=${encodeURIComponent(
                                product.title
                              )}`
                            );
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a2e3ff] to-[#6ad0ff] flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-[#0d1b2a]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#0d1b2a]">
                                {product.title}
                              </div>
                              <div className="text-xs text-[#0d1b2a]/60">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      );
                    })
                  ) : (
                    <div className="text-center py-4 text-xs text-[#0d1b2a]/60">
                      No products found
                    </div>
                  )}
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Services Section */}
              <div className="px-2 py-1.5">
                <div className="text-xs font-semibold text-[#0d1b2a]/70 mb-2">
                  Services
                </div>
                <div className="relative mb-2">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d1b2a]/60"
                    aria-hidden="true"
                  />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={serviceSearchQuery}
                    onChange={(e) => setServiceSearchQuery(e.target.value)}
                    className="h-11 rounded-xl pl-10 backdrop-blur-sm bg-white/50 border-[#b4dcff] focus:border-[#6ad0ff] transition-colors text-sm"
                    aria-label="Search services"
                  />
                </div>
                <div className="max-h-72 overflow-y-auto dropdown-scroll pr-1">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service, i) => {
                      const Icon = service.icon;
                      return (
                        <DropdownMenuItem
                          key={`m-s-${i}`}
                          className="cursor-pointer py-3 rounded-xl hover:bg-[#a2e3ff]/20 transition-colors"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate(
                              `/ask-ai?preset=${encodeURIComponent(
                                service.title
                              )}`
                            );
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a2e3ff] to-[#6ad0ff] flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-[#0d1b2a]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#0d1b2a]">
                                {service.title}
                              </div>
                              <div className="text-xs text-[#0d1b2a]/60">
                                {service.description}
                              </div>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      );
                    })
                  ) : (
                    <div className="text-center py-4 text-xs text-[#0d1b2a]/60">
                      No services found
                    </div>
                  )}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
}