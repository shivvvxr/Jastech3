import { useNavigate } from "react-router";

export function Footer() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    if (window.location.pathname === '/') {
      document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact-us');
    }
  };

  return (
    <footer className="relative mt-32 backdrop-blur-xl bg-white/30 border-t border-[#b4dcff]/30">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Company Info Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-[#0d1b2a] mb-4">
              Jastech Infosys Pvt. Ltd.
            </h3>
            <p className="text-[#0d1b2a]/70 mb-6 leading-relaxed">
              JASTECH Infosystems provides business and technology consulting to help clients fully harness the potential of the Cloud. Our team brings vast experience in crafting and delivering vertical-specific implementations.
            </p>
            <blockquote className="border-l-4 border-[#6ad0ff] pl-4 italic text-[#0d1b2a]/80">
              "Try not to become a man of success. Rather become a man of value."
            </blockquote>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-bold text-[#0d1b2a] mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/')} 
                  className="text-[#0d1b2a]/70 hover:text-[#6ad0ff] hover:underline underline-offset-4 decoration-2 decoration-[#6ad0ff] transition-all duration-200 transform hover:translate-x-1"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')} 
                  className="text-[#0d1b2a]/70 hover:text-[#6ad0ff] hover:underline underline-offset-4 decoration-2 decoration-[#6ad0ff] transition-all duration-200 transform hover:translate-x-1"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={handleContactClick} 
                  className="text-[#0d1b2a]/70 hover:text-[#6ad0ff] hover:underline underline-offset-4 decoration-2 decoration-[#6ad0ff] transition-all duration-200 transform hover:translate-x-1"
                >
                  Contact Us / Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Services (side-by-side on md+) */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Products */}
              <div>
                <h4 className="text-lg font-bold text-[#0d1b2a] mb-4">Products</h4>
                <ul className="space-y-2 mb-6 md:mb-0">
                  <li className="text-[#0d1b2a]/70">CITRIX / VMWare</li>
                  <li className="text-[#0d1b2a]/70">CA Technology / Tools</li>
                  <li className="text-[#0d1b2a]/70">Firewalls UTM</li>
                  <li className="text-[#0d1b2a]/70">Racks</li>
                  <li className="text-[#0d1b2a]/70">Printers</li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-bold text-[#0d1b2a] mb-4">Services</h4>
                <ul className="space-y-2">
                  <li className="text-[#0d1b2a]/70">CITRIX / VMWare</li>
                  <li className="text-[#0d1b2a]/70">CA Technology / Tools</li>
                  <li className="text-[#0d1b2a]/70">Firewalls UTM</li>
                  <li className="text-[#0d1b2a]/70">Racks</li>
                  <li className="text-[#0d1b2a]/70">Printers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#b4dcff]/30 pt-8 text-center">
          <p className="text-[#0d1b2a] font-medium">
            © 2025 Jastech Infosys Pvt. Ltd. | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}