"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

// Enhanced predefined responses based on keywords
const getResponseFromKeywords = (userMessage: string): string | null => {
  const message = userMessage.toLowerCase();
  
  // 🌐 Greetings & Common Intents
  if (message.match(/\b(hello|hi|hey|greetings)\b/)) {
    return "Hey there! 👋 I'm Jastech AI — your digital assistant for everything tech, web, and infrastructure.";
  }
  
  if (message.includes("thanks") || message.includes("thank you")) {
    return "Always a pleasure to assist you! 😊";
  }
  
  if (message.includes("bye") || message.includes("goodbye") || message.includes("see you")) {
    return "Goodbye! 👋 Reach out anytime for expert IT and infrastructure support.";
  }
  
  // 📍 Contact Information
  if (
    message.includes("contact") ||
    message.includes("address") ||
    message.includes("phone") ||
    message.includes("email") ||
    message.includes("office") ||
    message.includes("where")
  ) {
    return `📍 **Registered Office:**\nT-497, Patel Nagar West, New Delhi - 110008\n\n🏢 **Warehouse Office:**\nT-497, Patel Nagar West, New Delhi - 110008\n\n📞 **Phone:** +91-9899388291\n\n📧 **Email:** sales@jasinfosystems.in\n\n🌐 **Website:** www.jasinfosystems.in`;
  }
  
  // Services inquiries
  if (message.includes("services") || message.includes("what do you do") || message.includes("what do you offer") || message.includes("offer")) {
    return "We offer comprehensive IT infrastructure, web, networking, cloud, AI, and security solutions for enterprises and startups alike.";
  }
  
  // Team/About
  if ((message.includes("about") && !message.includes("tell me about")) || message.includes("team") || message.includes("company") || message.includes("who are you")) {
    return "We're Jastech Infosys — a team of engineers, developers, and innovators providing enterprise-grade IT, networking, and AI-driven infrastructure services.";
  }
  
  // 💻 WEBSITE DEVELOPMENT
  if (message.includes("website") || message.includes("web development") || message.includes("web design")) {
    if (message.includes("design") || message.includes("ui") || message.includes("ux")) {
      return "We design visually stunning, user-friendly, and high-performance websites tailored to your brand identity.";
    } else if (message.includes("development") || message.includes("build") || message.includes("create")) {
      return "Our developers craft scalable, secure, and optimized websites using the latest technologies like React, Node.js, and WordPress.";
    } else if (message.includes("seo") || message.includes("optimize") || message.includes("optimise")) {
      return "We enhance your online visibility through SEO optimization, analytics, and performance tuning.";
    } else if (message.includes("maintenance") || message.includes("update")) {
      return "We provide complete website maintenance — updates, content refresh, and backend monitoring.";
    } else if (message.includes("hosting")) {
      return "We offer high-speed, secure hosting with 99.9% uptime and 24/7 monitoring.";
    } else if (message.includes("portfolio") || message.includes("showcase")) {
      return "We've built stunning portfolios for businesses across industries — from startups to enterprises.";
    } else if (message.includes("ecommerce") || message.includes("e-commerce") || message.includes("shop")) {
      return "We develop secure, scalable eCommerce platforms with payment gateway integration and inventory management.";
    } else if (message.includes("cms") || message.includes("wordpress")) {
      return "We specialize in WordPress, Drupal, and custom CMS development for easy content management.";
    } else if (message.includes("responsive") || message.includes("mobile")) {
      return "All our websites are fully responsive and optimized for mobile, tablet, and desktop devices.";
    } else if (message.includes("redesign") || message.includes("revamp")) {
      return "We modernize outdated websites with fresh designs, improved UX, and better performance.";
    } else {
      return "We build and maintain modern, responsive, and secure web experiences for businesses of all sizes.";
    }
  }
  
  // 🖥️ DATA CENTER SETUP
  if (message.includes("data center") || message.includes("datacenter")) {
    if (message.includes("setup") || message.includes("installation")) {
      return "We handle end-to-end data center setups — cabling, power systems, racks, servers, and complete deployment.";
    } else if (message.includes("design")) {
      return "We design scalable, efficient, and fault-tolerant data centers to meet enterprise requirements.";
    } else if (message.includes("maintenance") || message.includes("upgrade")) {
      return "We provide 24/7 data center monitoring, maintenance, and power optimization services.";
    } else if (message.includes("cooling") || message.includes("hvac")) {
      return "We implement advanced cooling and HVAC systems to maintain optimal data center temperatures.";
    } else if (message.includes("power") || message.includes("ups")) {
      return "We install redundant power systems, UPS, and backup generators for uninterrupted operations.";
    } else if (message.includes("monitoring") || message.includes("dcim")) {
      return "We deploy DCIM solutions for real-time monitoring, capacity planning, and asset management.";
    } else if (message.includes("disaster") || message.includes("recovery")) {
      return "We design disaster recovery strategies with backup sites and failover mechanisms.";
    } else {
      return "Our data center solutions cover design, deployment, monitoring, and disaster recovery.";
    }
  }
  
  // ⚙️ SERVER SOLUTIONS
  if (message.includes("server")) {
    if (message.includes("supply") || message.includes("buy") || message.includes("purchase")) {
      return "We supply high-end, enterprise-grade servers from trusted brands like Dell, HP, and Lenovo.";
    } else if (message.includes("setup") || message.includes("installation") || message.includes("deploy")) {
      return "Our team installs and configures dedicated or cloud servers for peak performance.";
    } else if (message.includes("maintenance") || message.includes("upgrade") || message.includes("support")) {
      return "We offer performance tuning, OS upgrades, and server health monitoring.";
    } else if (message.includes("rack") && message.includes("server")) {
      return "We provide rack-mounted servers with optimal space utilization and cooling.";
    } else if (message.includes("blade")) {
      return "We deploy blade servers for high-density computing with shared infrastructure.";
    } else if (message.includes("tower")) {
      return "We supply tower servers ideal for small to medium businesses with limited rack space.";
    } else if (message.includes("storage")) {
      return "We configure storage servers with RAID, NAS, and SAN solutions for data management.";
    } else if (message.includes("virtualization") || message.includes("virtual")) {
      return "We set up virtualized server environments using VMware, Hyper-V, and KVM.";
    } else if (message.includes("backup")) {
      return "We implement automated backup solutions with offsite replication and recovery testing.";
    } else if (message.includes("migration")) {
      return "We handle seamless server migrations with minimal downtime and data integrity.";
    } else {
      return "We provide supply, setup, and maintenance for all server environments.";
    }
  }
  
  // 🗄️ RACKS
  if (message.includes("rack")) {
    if (message.includes("installation") || message.includes("setup")) {
      return "We install and organize server racks with proper cooling and cabling management.";
    } else if (message.includes("design") || message.includes("custom")) {
      return "We design customized rack systems to maximize efficiency and airflow.";
    } else if (message.includes("cable") || message.includes("management")) {
      return "We implement structured cable management for clean, organized, and maintainable racks.";
    } else if (message.includes("cooling")) {
      return "We integrate rack-level cooling solutions to prevent overheating and ensure reliability.";
    } else {
      return "We offer professional rack design, assembly, and installation services.";
    }
  }
  
  // 🔌 SWITCHES
  if (message.includes("switch")) {
    if (message.includes("configuration") || message.includes("configure")) {
      return "We configure managed and unmanaged switches for efficient network routing.";
    } else if (message.includes("supply") || message.includes("buy")) {
      return "We supply enterprise-grade switches from trusted brands like Cisco and HP.";
    } else if (message.includes("managed")) {
      return "We deploy managed switches with VLAN, QoS, and advanced traffic control features.";
    } else if (message.includes("poe") || message.includes("power over ethernet")) {
      return "We install PoE switches to power IP cameras, phones, and wireless access points.";
    } else if (message.includes("layer 3") || message.includes("l3")) {
      return "We configure Layer 3 switches for inter-VLAN routing and advanced network segmentation.";
    } else {
      return "We handle switch supply, setup, and configuration for all network sizes.";
    }
  }
  
  // 💼 LAN NETWORKING
  if (message.includes("lan") || message.includes("network")) {
    if (message.includes("setup") || message.includes("installation")) {
      return "We provide complete LAN setup, structured cabling, and switch configurations.";
    } else if (message.includes("troubleshoot") || message.includes("repair") || message.includes("fix")) {
      return "Our engineers troubleshoot and fix LAN issues quickly and efficiently.";
    } else if (message.includes("design")) {
      return "We design secure and scalable network infrastructures for your business.";
    } else if (message.includes("wireless") || message.includes("wifi") || message.includes("wi-fi")) {
      return "We deploy enterprise wireless networks with seamless roaming and centralized management.";
    } else if (message.includes("cabling") || message.includes("cable")) {
      return "We install Cat5e, Cat6, and fiber optic cabling for high-speed connectivity.";
    } else if (message.includes("router")) {
      return "We configure routers for WAN connectivity, VPN, and advanced routing protocols.";
    } else if (message.includes("firewall")) {
      return "We deploy next-gen firewalls for network security, intrusion prevention, and content filtering.";
    } else if (message.includes("vlan")) {
      return "We implement VLANs for network segmentation, security, and traffic optimization.";
    } else if (message.includes("vpn")) {
      return "We set up secure VPN solutions for remote access and site-to-site connectivity.";
    } else {
      return "We offer end-to-end LAN networking services for businesses and enterprises.";
    }
  }
  
  // 🧠 ANTIVIRUS SOLUTIONS
  if (message.includes("antivirus") || message.includes("malware") || message.includes("virus")) {
    if (message.includes("installation") || message.includes("install")) {
      return "We install and configure advanced antivirus and endpoint protection systems.";
    } else if (message.includes("support") || message.includes("update")) {
      return "Our team provides antivirus support, updates, and threat removal.";
    } else if (message.includes("enterprise")) {
      return "We deploy enterprise antivirus solutions with centralized management and reporting.";
    } else if (message.includes("endpoint")) {
      return "We implement endpoint detection and response (EDR) for advanced threat protection.";
    } else {
      return "We offer complete antivirus and malware protection for your systems.";
    }
  }
  
  // 🌐 NETSCALER SOLUTIONS
  if (message.includes("netscaler") || message.includes("adc")) {
    if (message.includes("load balancing") || message.includes("load balancer")) {
      return "We provide Netscaler-based load balancing and application delivery optimization.";
    } else if (message.includes("ssl")) {
      return "We configure SSL offloading and certificate management on Netscaler ADC.";
    } else {
      return "Our Netscaler solutions improve performance, security, and traffic management.";
    }
  }
  
  // ☁️ CITRIX / VMWARE SOLUTIONS
  if (message.includes("citrix") || message.includes("vmware")) {
    if (message.includes("virtualization") || message.includes("virtual")) {
      return "We set up Citrix and VMware virtualization environments for high efficiency.";
    } else if (message.includes("vdi") || message.includes("desktop")) {
      return "We deploy Virtual Desktop Infrastructure (VDI) for secure remote work environments.";
    } else if (message.includes("xenserver") || message.includes("esxi")) {
      return "We configure XenServer and ESXi hypervisors for enterprise virtualization.";
    } else {
      return "We deliver complete virtualization and cloud infrastructure deployment services.";
    }
  }
  
  // 🔒 SECURITY SOLUTIONS
  if (message.includes("security") || message.includes("cyber")) {
    if (message.includes("installation") || message.includes("install")) {
      return "We install and configure multi-layered security systems for data and networks.";
    } else if (message.includes("audit") || message.includes("assessment")) {
      return "We conduct full security audits and vulnerability assessments.";
    } else if (message.includes("penetration") || message.includes("pentest")) {
      return "We perform penetration testing to identify and fix security vulnerabilities.";
    } else if (message.includes("siem")) {
      return "We deploy SIEM solutions for real-time security monitoring and incident response.";
    } else if (message.includes("compliance") || message.includes("iso")) {
      return "We help achieve security compliance with ISO 27001, PCI-DSS, and GDPR standards.";
    } else {
      return "We offer enterprise-level cybersecurity and physical security implementations.";
    }
  }
  
  // 📹 CCTV INSTALLATION
  if (message.includes("cctv") || message.includes("camera") || message.includes("surveillance")) {
    if (message.includes("installation") || message.includes("install")) {
      return "We install high-definition CCTV surveillance systems with remote access.";
    } else if (message.includes("maintenance") || message.includes("repair")) {
      return "We provide maintenance, configuration, and monitoring setup for CCTV systems.";
    } else if (message.includes("ip camera") || message.includes("network camera")) {
      return "We deploy IP cameras with PoE, cloud storage, and mobile app integration.";
    } else if (message.includes("nvr") || message.includes("dvr")) {
      return "We configure NVR/DVR systems for video recording, playback, and archival.";
    } else if (message.includes("analytics") || message.includes("ai")) {
      return "We integrate AI-powered video analytics for facial recognition and motion detection.";
    } else {
      return "We provide professional CCTV installation and smart surveillance solutions.";
    }
  }
  
  // 🔐 BIOMETRIC SOLUTIONS
  if (message.includes("biometric") || message.includes("attendance") || message.includes("access control")) {
    if (message.includes("attendance")) {
      return "We provide biometric attendance and access control systems for offices and industries.";
    } else if (message.includes("fingerprint")) {
      return "We install fingerprint-based access control for secure entry management.";
    } else if (message.includes("face") || message.includes("facial")) {
      return "We deploy facial recognition systems for contactless access and attendance.";
    } else if (message.includes("iris")) {
      return "We implement iris recognition for high-security access control applications.";
    } else {
      return "Our biometric solutions ensure advanced and secure identity access management.";
    }
  }
  
  // ⚡ ELECTRIC FENCING
  if (message.includes("fencing") || message.includes("electric fence") || message.includes("perimeter")) {
    return "We install and maintain electric fencing systems for maximum perimeter security.";
  }
  
  // 🚗 VEHICLE HIRING SERVICES
  if (message.includes("vehicle") || message.includes("transport") || message.includes("fleet") || message.includes("car")) {
    return "We offer corporate vehicle hiring and transportation management services.";
  }
  
  // 👷 MANPOWER SUPPLY SERVICES
  if (message.includes("manpower") || message.includes("staff") || message.includes("technician") || message.includes("hiring")) {
    return "We provide skilled IT manpower and technical staffing solutions on demand.";
  }
  
  // 🏢 INTERIOR DESIGN
  if (message.includes("interior") || (message.includes("design") && !message.includes("website"))) {
    if (message.includes("office")) {
      return "Our interior design experts craft modern, functional, and professional office spaces.";
    } else if (message.includes("lighting")) {
      return "We design intelligent lighting systems for ambiance, productivity, and energy efficiency.";
    } else if (message.includes("furniture")) {
      return "We provide ergonomic furniture solutions for comfortable and productive workspaces.";
    } else {
      return "Our interior design experts craft modern, functional, and professional office spaces.";
    }
  }
  
  // 🔥 FIRE FIGHTING SYSTEMS
  if (message.includes("fire")) {
    if (message.includes("detection") || message.includes("alarm")) {
      return "We install fire detection and alarm systems with automatic alerts and notifications.";
    } else if (message.includes("suppression") || message.includes("sprinkler")) {
      return "We deploy fire suppression systems including sprinklers, FM-200, and CO2 systems.";
    } else {
      return "We design and install fire fighting and suppression systems for safety and compliance.";
    }
  }
  
  // 🖨️ PRINTERS
  if (message.includes("printer") || message.includes("copier") || message.includes("scan")) {
    if (message.includes("multifunction") || message.includes("mfp")) {
      return "We supply multifunctional printers — print, scan, and copy all in one device.";
    } else if (message.includes("installation") || message.includes("install")) {
      return "We install and configure printers for your office environment.";
    } else if (message.includes("maintenance") || message.includes("repair")) {
      return "We provide maintenance, toner replacement, and printer support services.";
    } else if (message.includes("laser")) {
      return "We supply high-speed laser printers for high-volume printing needs.";
    } else if (message.includes("inkjet")) {
      return "We offer inkjet printers for color printing and photo-quality output.";
    } else {
      return "We offer a wide range of printers, including multifunctional and high-speed devices.";
    }
  }
  
  // 🧩 IT PERIPHERALS
  if (message.includes("peripheral") || message.includes("accessory") || message.includes("monitor") || message.includes("keyboard") || message.includes("mouse")) {
    return "We supply a complete range of IT peripherals — monitors, input devices, and cables.";
  }
  
  // Pricing inquiries
  if (message.match(/\b(price|pricing|cost|how much|quote)\b/)) {
    return "For accurate pricing and customized quotes, please contact Jastech directly. Our pricing varies based on specifications, quantity, and project requirements. You can reach us through our contact form on the website.";
  }
  
  // Cloud
  if (message.includes("cloud") || message.includes("aws") || message.includes("azure") || message.includes("google cloud")) {
    if (message.includes("migration")) {
      return "We handle seamless cloud migration with minimal downtime and data integrity.";
    } else if (message.includes("aws")) {
      return "We deploy and manage AWS infrastructure including EC2, S3, RDS, and Lambda.";
    } else if (message.includes("azure")) {
      return "We implement Microsoft Azure solutions for hybrid cloud and enterprise applications.";
    } else if (message.includes("google")) {
      return "We configure Google Cloud Platform for scalable and cost-effective cloud computing.";
    } else {
      return "Virtualization and VDI using Citrix/VMware—optimize resource usage, centralize management, and improve scalability. Cloud Infrastructure solutions for AWS, Azure, and Google Cloud.";
    }
  }
  
  // Company info
  if (message.includes("jastech") || message.includes("who are you")) {
    return "Jastech Infosystems Pvt. Ltd. is a Delhi-based IT consulting and product engineering company founded in 2015 by Jasmine Kaur. We specialize in Business and Technology Consulting, Cloud Infrastructure, Product Engineering, and comprehensive IT solutions.";
  }
  
  // Support
  if (message.includes("support") || message.includes("help") || message.includes("technical") || message.includes("issue")) {
    return "Our support team is available for hardware, software, and network troubleshooting.";
  }
  
  // Out of scope
  if (message.match(/\b(weather|news|politics|sports|personal)\b/)) {
    return "I'm not supposed to do that.";
  }
  
  return null;
};

// Add function to generate contextual reply suggestions
const getReplySuggestions = (userMessage: string): string[] => {
  const message = userMessage.toLowerCase();
  
  if (message.match(/\b(hello|hi|hey|greetings)\b/)) {
    return ["Tell me about your services", "Who are you?", "Contact details"];
  } else if (message.includes("services") || message.includes("what do you do") || message.includes("offer")) {
    return ["Web development", "Server setup", "CCTV installation", "Contact info"];
  } else if (message.includes("about") || message.includes("team") || message.includes("company")) {
    return ["Show services", "Where's your office?", "Contact info"];
  } else if (message.includes("thank")) {
    return ["Show services", "Contact info", "Goodbye"];
  } else if (message.includes("bye") || message.includes("goodbye")) {
    return ["Hello again", "Website services", "Office address"];
  } else if (message.includes("contact") || message.includes("email") || message.includes("phone") || message.includes("address")) {
    return ["Website development", "Security systems", "Server setup"];
  } else if (message.includes("website") || message.includes("web")) {
    if (message.includes("design")) {
      return ["Do you handle SEO?", "Show maintenance plans", "Portfolio"];
    } else if (message.includes("development")) {
      return ["Hosting services", "SEO optimization", "Web maintenance"];
    } else if (message.includes("seo")) {
      return ["Website redesign", "Do you handle Google Ads?", "Maintenance support"];
    } else if (message.includes("maintenance")) {
      return ["Contact support", "Hosting info", "Web redesign"];
    } else if (message.includes("hosting")) {
      return ["SEO optimization", "Website redesign", "Security setup"];
    } else {
      return ["SEO optimization", "Hosting", "Contact info"];
    }
  } else if (message.includes("data center") || message.includes("datacenter")) {
    if (message.includes("setup")) {
      return ["Design services", "Maintenance plans", "Server installation"];
    } else if (message.includes("design")) {
      return ["Setup options", "Monitoring support", "Server supply"];
    } else if (message.includes("maintenance")) {
      return ["Contact support", "Server monitoring", "Network setup"];
    } else {
      return ["Setup", "Server solutions", "Contact info"];
    }
  } else if (message.includes("server")) {
    if (message.includes("supply") || message.includes("buy")) {
      return ["Server installation", "Server maintenance", "Data center setup"];
    } else if (message.includes("setup") || message.includes("installation")) {
      return ["Maintenance", "Security configuration", "Network setup"];
    } else if (message.includes("maintenance")) {
      return ["Server supply", "Data center management", "Backup solutions"];
    } else {
      return ["Server setup", "Data center", "LAN networking"];
    }
  } else if (message.includes("rack")) {
    return ["Server setup", "Data center", "Network cabling"];
  } else if (message.includes("network") || message.includes("lan") || message.includes("switch")) {
    if (message.includes("setup")) {
      return ["Troubleshooting", "Network design", "Firewall setup"];
    } else if (message.includes("troubleshoot")) {
      return ["Router configuration", "Switch installation", "Firewall setup"];
    } else if (message.includes("design")) {
      return ["Network monitoring", "Server integration", "Contact info"];
    } else {
      return ["Network troubleshooting", "Firewall setup", "Contact info"];
    }
  } else if (message.includes("security") || message.includes("cyber") || message.includes("firewall")) {
    if (message.includes("installation")) {
      return ["Security audit", "Firewall configuration", "CCTV setup"];
    } else if (message.includes("audit")) {
      return ["Security installation", "Data protection", "Endpoint security"];
    } else if (message.includes("fire")) {
      return ["Safety systems", "CCTV setup", "Access control"];
    } else {
      return ["Security installation", "Firewall setup", "Data protection"];
    }
  } else if (message.includes("cctv") || message.includes("camera") || message.includes("surveillance")) {
    if (message.includes("installation")) {
      return ["Maintenance", "Smart surveillance", "Contact info"];
    } else if (message.includes("maintenance")) {
      return ["Add new cameras", "Cloud monitoring", "Contact info"];
    } else {
      return ["Smart surveillance", "Security systems", "Contact info"];
    }
  } else if (message.includes("biometric") || message.includes("attendance")) {
    return ["CCTV installation", "Security setup", "Office automation"];
  } else if (message.includes("fencing") || message.includes("fence")) {
    return ["Security systems", "CCTV installation", "Access control"];
  } else if (message.includes("vehicle") || message.includes("transport")) {
    return ["Driver support", "Corporate travel", "Logistics services"];
  } else if (message.includes("manpower") || message.includes("staff")) {
    return ["Hiring inquiry", "Technical support", "Contact HR"];
  } else if (message.includes("interior")) {
    return ["Lighting setup", "Furniture design", "Smart office automation"];
  } else if (message.includes("printer")) {
    if (message.includes("multifunction")) {
      return ["Printer installation", "Maintenance service", "Buy printer"];
    } else if (message.includes("installation")) {
      return ["Printer maintenance", "Buy printer", "Peripheral support"];
    } else if (message.includes("maintenance")) {
      return ["Buy printer", "Peripheral setup", "Contact support"];
    } else {
      return ["Printer installation", "Buy printer", "Contact info"];
    }
  } else if (message.includes("peripheral") || message.includes("monitor") || message.includes("keyboard")) {
    return ["Printer setup", "Server supply", "LAN installation"];
  } else if (message.includes("cloud") || message.includes("citrix") || message.includes("vmware")) {
    return ["Server setup", "Data center", "Contact info"];
  } else if (message.includes("antivirus") || message.includes("malware")) {
    return ["Security systems", "Server security", "Support contact"];
  } else if (message.includes("support") || message.includes("help")) {
    return ["Contact support", "LAN repair", "Server issue"];
  } else if (message.match(/\b(price|pricing|cost|quote)\b/)) {
    return ["Contact sales", "Request quote", "View services"];
  } else {
    return ["Website development", "Security systems", "Data centers", "Contact info"];
  }
};

export const sendChatMessage = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
        content: v.string(),
      })
    ),
    systemPrompt: v.string(),
  },
  handler: async (ctx, args) => {
    const lastUserMessage = args.messages
      .filter(m => m.role === "user")
      .pop();
    
    if (!lastUserMessage) {
      return {
        success: false,
        error: "No user message found",
      };
    }
    
    const response = getResponseFromKeywords(lastUserMessage.content);
    const suggestions = getReplySuggestions(lastUserMessage.content);
    
    if (response) {
      return {
        success: true,
        response: response,
        suggestions: suggestions,
      };
    }
    
    return {
      success: true,
      response: "Hmm, I didn't quite catch that. Could you specify your area of interest? We cover everything from web, IT, AI, to infrastructure. 💡",
      suggestions: ["Website development", "Security systems", "Data centers", "Contact info"],
    };
  },
});

export const transcribeAudio = action({
  args: {
    audioText: v.string(),
  },
  handler: async (ctx, args) => {
    return {
      success: true,
      text: args.audioText,
    };
  },
});