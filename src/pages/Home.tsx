import { useNavigate } from 'react-router-dom';
import { Heart, Users, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Full Height Hero Section with Background Image */}
      <section className="relative h-screen md:h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/src/assets/hero-couple.jpg)',
          }}
        />
        
        {/* Lighter Gradient Overlay - Warm and Bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/25 to-transparent"></div>

        {/* Floating Bokeh Animation Layer */}
        <style>{`
          @keyframes float-bokeh-1 {
            0% { transform: translate(0, 0); opacity: 0; }
            8% { opacity: 0.3; }
            50% { opacity: 0.5; }
            92% { opacity: 0.1; }
            100% { transform: translate(30px, -100px); opacity: 0; }
          }
          @keyframes float-bokeh-2 {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 0.4; }
            50% { opacity: 0.6; }
            90% { opacity: 0.15; }
            100% { transform: translate(-50px, -110px); opacity: 0; }
          }
          @keyframes float-bokeh-3 {
            0% { transform: translate(0, 0); opacity: 0; }
            9% { opacity: 0.35; }
            50% { opacity: 0.55; }
            91% { opacity: 0.1; }
            100% { transform: translate(60px, -90px); opacity: 0; }
          }
          @keyframes float-bokeh-4 {
            0% { transform: translate(0, 0); opacity: 0; }
            11% { opacity: 0.3; }
            50% { opacity: 0.5; }
            89% { opacity: 0.12; }
            100% { transform: translate(-40px, -105px); opacity: 0; }
          }
          @keyframes float-bokeh-5 {
            0% { transform: translate(0, 0); opacity: 0; }
            7% { opacity: 0.4; }
            50% { opacity: 0.6; }
            93% { opacity: 0.1; }
            100% { transform: translate(45px, -95px); opacity: 0; }
          }
          @keyframes float-bokeh-6 {
            0% { transform: translate(0, 0); opacity: 0; }
            12% { opacity: 0.25; }
            50% { opacity: 0.45; }
            88% { opacity: 0.08; }
            100% { transform: translate(-65px, -120px); opacity: 0; }
          }
          @keyframes float-bokeh-7 {
            0% { transform: translate(0, 0); opacity: 0; }
            9% { opacity: 0.35; }
            50% { opacity: 0.55; }
            91% { opacity: 0.1; }
            100% { transform: translate(55px, -85px); opacity: 0; }
          }
          @keyframes float-bokeh-8 {
            0% { transform: translate(0, 0); opacity: 0; }
            13% { opacity: 0.32; }
            50% { opacity: 0.52; }
            87% { opacity: 0.12; }
            100% { transform: translate(-35px, -100px); opacity: 0; }
          }
          @keyframes float-bokeh-9 {
            0% { transform: translate(0, 0); opacity: 0; }
            8% { opacity: 0.38; }
            50% { opacity: 0.58; }
            92% { opacity: 0.11; }
            100% { transform: translate(70px, -110px); opacity: 0; }
          }
          @keyframes float-bokeh-10 {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 0.28; }
            50% { opacity: 0.48; }
            90% { opacity: 0.09; }
            100% { transform: translate(-60px, -95px); opacity: 0; }
          }
          @keyframes float-bokeh-11 {
            0% { transform: translate(0, 0); opacity: 0; }
            11% { opacity: 0.33; }
            50% { opacity: 0.53; }
            89% { opacity: 0.1; }
            100% { transform: translate(40px, -105px); opacity: 0; }
          }
          @keyframes float-bokeh-12 {
            0% { transform: translate(0, 0); opacity: 0; }
            7% { opacity: 0.42; }
            50% { opacity: 0.62; }
            93% { opacity: 0.14; }
            100% { transform: translate(-45px, -115px); opacity: 0; }
          }
          @keyframes float-bokeh-13 {
            0% { transform: translate(0, 0); opacity: 0; }
            12% { opacity: 0.3; }
            50% { opacity: 0.5; }
            88% { opacity: 0.1; }
            100% { transform: translate(65px, -100px); opacity: 0; }
          }
          @keyframes float-bokeh-14 {
            0% { transform: translate(0, 0); opacity: 0; }
            9% { opacity: 0.35; }
            50% { opacity: 0.55; }
            91% { opacity: 0.12; }
            100% { transform: translate(-70px, -105px); opacity: 0; }
          }
          @keyframes float-bokeh-15 {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 0.36; }
            50% { opacity: 0.56; }
            90% { opacity: 0.1; }
            100% { transform: translate(50px, -110px); opacity: 0; }
          }
          @keyframes float-bokeh-16 {
            0% { transform: translate(0, 0); opacity: 0; }
            13% { opacity: 0.28; }
            50% { opacity: 0.48; }
            87% { opacity: 0.08; }
            100% { transform: translate(-55px, -90px); opacity: 0; }
          }
          @keyframes float-bokeh-17 {
            0% { transform: translate(0, 0); opacity: 0; }
            8% { opacity: 0.4; }
            50% { opacity: 0.6; }
            92% { opacity: 0.13; }
            100% { transform: translate(35px, -100px); opacity: 0; }
          }
          @keyframes float-bokeh-18 {
            0% { transform: translate(0, 0); opacity: 0; }
            11% { opacity: 0.32; }
            50% { opacity: 0.52; }
            89% { opacity: 0.09; }
            100% { transform: translate(-75px, -115px); opacity: 0; }
          }
          @keyframes float-bokeh-19 {
            0% { transform: translate(0, 0); opacity: 0; }
            9% { opacity: 0.37; }
            50% { opacity: 0.57; }
            91% { opacity: 0.11; }
            100% { transform: translate(60px, -105px); opacity: 0; }
          }
          @keyframes float-bokeh-20 {
            0% { transform: translate(0, 0); opacity: 0; }
            12% { opacity: 0.3; }
            50% { opacity: 0.5; }
            88% { opacity: 0.1; }
            100% { transform: translate(-50px, -100px); opacity: 0; }
          }

          .bokeh-particle {
            position: absolute;
            bottom: 0;
            border-radius: 50%;
            filter: blur(18px);
            pointer-events: none;
          }

          .bokeh-1 {
            width: 45px;
            height: 45px;
            background: radial-gradient(circle, rgba(200, 148, 86, 0.4) 0%, rgba(200, 148, 86, 0.08) 100%);
            left: 5%;
            animation: float-bokeh-1 8s infinite ease-out;
            animation-delay: 0s;
          }
          .bokeh-2 {
            width: 65px;
            height: 65px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.35) 0%, rgba(212, 165, 116, 0.05) 100%);
            left: 12%;
            animation: float-bokeh-2 9.5s infinite ease-out;
            animation-delay: 0.5s;
          }
          .bokeh-3 {
            width: 50px;
            height: 50px;
            background: radial-gradient(circle, rgba(200, 148, 86, 0.42) 0%, rgba(200, 148, 86, 0.08) 100%);
            left: 18%;
            animation: float-bokeh-3 10s infinite ease-out;
            animation-delay: 1s;
          }
          .bokeh-4 {
            width: 55px;
            height: 55px;
            background: radial-gradient(circle, rgba(196, 147, 85, 0.38) 0%, rgba(196, 147, 85, 0.06) 100%);
            left: 25%;
            animation: float-bokeh-4 11s infinite ease-out;
            animation-delay: 1.5s;
          }
          .bokeh-5 {
            width: 48px;
            height: 48px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.4) 0%, rgba(212, 165, 116, 0.06) 100%);
            left: 32%;
            animation: float-bokeh-5 9s infinite ease-out;
            animation-delay: 0.8s;
          }
          .bokeh-6 {
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, rgba(200, 148, 86, 0.36) 0%, rgba(200, 148, 86, 0.05) 100%);
            left: 8%;
            animation: float-bokeh-6 12s infinite ease-out;
            animation-delay: 2s;
          }
          .bokeh-7 {
            width: 52px;
            height: 52px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.38) 0%, rgba(212, 165, 116, 0.07) 100%);
            left: 38%;
            animation: float-bokeh-7 10.5s infinite ease-out;
            animation-delay: 1.2s;
          }
          .bokeh-8 {
            width: 58px;
            height: 58px;
            background: radial-gradient(circle, rgba(196, 147, 85, 0.4) 0%, rgba(196, 147, 85, 0.06) 100%);
            left: 15%;
            animation: float-bokeh-8 11.5s infinite ease-out;
            animation-delay: 2.5s;
          }
          .bokeh-9 {
            width: 42px;
            height: 42px;
            background: radial-gradient(circle, rgba(200, 148, 86, 0.44) 0%, rgba(200, 148, 86, 0.08) 100%);
            left: 45%;
            animation: float-bokeh-9 9.5s infinite ease-out;
            animation-delay: 0.3s;
          }
          .bokeh-10 {
            width: 68px;
            height: 68px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.33) 0%, rgba(212, 165, 116, 0.05) 100%);
            left: 20%;
            animation: float-bokeh-10 10.5s infinite ease-out;
            animation-delay: 3s;
          }
          .bokeh-11 {
            width: 48px;
            height: 48px;
            background: radial-gradient(circle, rgba(200, 148, 86, 0.41) 0%, rgba(200, 148, 86, 0.07) 100%);
            left: 52%;
            animation: float-bokeh-11 9s infinite ease-out;
            animation-delay: 1.8s;
          }
          .bokeh-12 {
            width: 62px;
            height: 62px;
            background: radial-gradient(circle, rgba(196, 147, 85, 0.36) 0%, rgba(196, 147, 85, 0.06) 100%);
            left: 28%;
            animation: float-bokeh-12 11s infinite ease-out;
            animation-delay: 0.6s;
          }
          .bokeh-13 {
            width: 54px;
            height: 54px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.39) 0%, rgba(212, 165, 116, 0.07) 100%);
            left: 58%;
            animation: float-bokeh-13 10s infinite ease-out;
            animation-delay: 2.2s;
          }
          .bokeh-14 {
            width: 50px;
            height: 50px;
            background: radial-gradient(circle, rgba(200, 148, 86, 0.42) 0%, rgba(200, 148, 86, 0.08) 100%);
            left: 35%;
            animation: float-bokeh-14 10.5s infinite ease-out;
            animation-delay: 3.5s;
          }
          .bokeh-15 {
            width: 46px;
            height: 46px;
            background: radial-gradient(circle, rgba(196, 147, 85, 0.4) 0%, rgba(196, 147, 85, 0.07) 100%);
            left: 65%;
            animation: float-bokeh-15 9.5s infinite ease-out;
            animation-delay: 1.1s;
          }
          .bokeh-16 {
            width: 64px;
            height: 64px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.35) 0%, rgba(212, 165, 116, 0.05) 100%);
            left: 42%;
            animation: float-bokeh-16 11.5s infinite ease-out;
            animation-delay: 2.8s;
          }
          .bokeh-17 {
            width: 52px;
            height: 52px;
            background: radial-gradient(circle, rgba(200, 148, 86, 0.43) 0%, rgba(200, 148, 86, 0.08) 100%);
            left: 72%;
            animation: float-bokeh-17 10s infinite ease-out;
            animation-delay: 0.4s;
          }
          .bokeh-18 {
            width: 58px;
            height: 58px;
            background: radial-gradient(circle, rgba(196, 147, 85, 0.37) 0%, rgba(196, 147, 85, 0.06) 100%);
            left: 10%;
            animation: float-bokeh-18 12s infinite ease-out;
            animation-delay: 3.2s;
          }
          .bokeh-19 {
            width: 48px;
            height: 48px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.41) 0%, rgba(212, 165, 116, 0.07) 100%);
            left: 78%;
            animation: float-bokeh-19 10.5s infinite ease-out;
            animation-delay: 1.9s;
          }
          .bokeh-20 {
            width: 56px;
            height: 56px;
            background: radial-gradient(circle, rgba(200, 148, 86, 0.38) 0%, rgba(200, 148, 86, 0.06) 100%);
            left: 50%;
            animation: float-bokeh-20 9s infinite ease-out;
            animation-delay: 2.6s;
          }

          @keyframes heading-shimmer {
            0%, 100% {
              text-shadow: 0 0 20px rgba(200, 148, 86, 0.5), 0 0 40px rgba(212, 165, 116, 0.3);
            }
            50% {
              text-shadow: 0 0 30px rgba(200, 148, 86, 0.8), 0 0 60px rgba(212, 165, 116, 0.5);
            }
          }

          @keyframes button-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(200, 148, 86, 0.6), 0 0 40px rgba(212, 165, 116, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1);
            }
            50% {
              box-shadow: 0 0 30px rgba(200, 148, 86, 0.8), 0 0 60px rgba(212, 165, 116, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.2);
            }
          }

          .hero-heading {
            color: white;
            font-weight: 700;
            letter-spacing: -0.5px;
          }

          .hero-heading .gold-text {
            color: #d4a574;
            font-weight: 700;
          }

          .hero-button-primary {
            background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
            transition: all 0.2s ease;
            border: none;
            font-weight: 600;
          }

          .hero-button-primary:hover {
            box-shadow: 0 6px 25px rgba(251, 191, 36, 0.4);
            transform: translateY(-2px);
            background: linear-gradient(135deg, #FCD34D 0%, #FBBF24 100%);
          }

          .hero-button-primary:active {
            transform: translateY(0);
          }

          .hero-button-secondary {
            background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(251, 191, 36, 0.2);
            transition: all 0.2s ease;
            border: 1px solid rgba(251, 191, 36, 0.3);
            font-weight: 600;
          }

          .hero-button-secondary:hover {
            box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
            transform: translateY(-2px);
            background: linear-gradient(135deg, #FCD34D 0%, #FBBF24 100%);
          }

          .hero-button-secondary:active {
            transform: translateY(0);
          }

          /* Floating Bokeh Particle System */
          @keyframes float-particle {
            0% {
              transform: translateY(0px) translateX(0px);
              opacity: 0;
            }
            5% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.6;
            }
            95% {
              opacity: 0.2;
            }
            100% {
              transform: translateY(-120px) translateX(var(--offset-x, 0px));
              opacity: 0;
            }
          }

          .bokeh-particles-container {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 5;
            overflow: hidden;
          }

          .bokeh-particle-span {
            position: absolute;
            bottom: -20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, rgba(210, 170, 100, 0.6), rgba(180, 140, 80, 0.2));
            filter: blur(16px);
            box-shadow: 0 0 30px rgba(200, 150, 90, 0.4);
            animation: float-particle 10s infinite ease-in-out;
          }

          .bokeh-particle-span:nth-child(1) { left: 5%; animation-duration: 9s; animation-delay: 0s; }
          .bokeh-particle-span:nth-child(2) { left: 10%; animation-duration: 11s; animation-delay: 0.5s; }
          .bokeh-particle-span:nth-child(3) { left: 15%; animation-duration: 10s; animation-delay: 1s; }
          .bokeh-particle-span:nth-child(4) { left: 20%; animation-duration: 12s; animation-delay: 1.5s; }
          .bokeh-particle-span:nth-child(5) { left: 25%; animation-duration: 9.5s; animation-delay: 0.8s; }
          .bokeh-particle-span:nth-child(6) { left: 30%; animation-duration: 11.5s; animation-delay: 2s; }
          .bokeh-particle-span:nth-child(7) { left: 35%; animation-duration: 10.5s; animation-delay: 1.2s; }
          .bokeh-particle-span:nth-child(8) { left: 40%; animation-duration: 12s; animation-delay: 2.5s; }
          .bokeh-particle-span:nth-child(9) { left: 45%; animation-duration: 9s; animation-delay: 0.3s; }
          .bokeh-particle-span:nth-child(10) { left: 50%; animation-duration: 11s; animation-delay: 3s; }
          .bokeh-particle-span:nth-child(11) { left: 55%; animation-duration: 10s; animation-delay: 1.8s; }
          .bokeh-particle-span:nth-child(12) { left: 60%; animation-duration: 11.5s; animation-delay: 0.6s; }
          .bokeh-particle-span:nth-child(13) { left: 65%; animation-duration: 10.5s; animation-delay: 2.2s; }
          .bokeh-particle-span:nth-child(14) { left: 70%; animation-duration: 12s; animation-delay: 3.5s; }
          .bokeh-particle-span:nth-child(15) { left: 75%; animation-duration: 9.5s; animation-delay: 1.1s; }
          .bokeh-particle-span:nth-child(16) { left: 80%; animation-duration: 11.5s; animation-delay: 2.8s; }
          .bokeh-particle-span:nth-child(17) { left: 85%; animation-duration: 10.5s; animation-delay: 0.4s; }
          .bokeh-particle-span:nth-child(18) { left: 90%; animation-duration: 12s; animation-delay: 3.2s; }
          .bokeh-particle-span:nth-child(19) { left: 8%; animation-duration: 10s; animation-delay: 1.9s; }
          .bokeh-particle-span:nth-child(20) { left: 50%; animation-duration: 11s; animation-delay: 2.6s; }
          .bokeh-particle-span:nth-child(21) { left: 22%; animation-duration: 9.5s; animation-delay: 0.7s; }
          .bokeh-particle-span:nth-child(22) { left: 68%; animation-duration: 10.5s; animation-delay: 2.1s; }
          .bokeh-particle-span:nth-child(23) { left: 32%; animation-duration: 11.5s; animation-delay: 1.5s; }
          .bokeh-particle-span:nth-child(24) { left: 88%; animation-duration: 10s; animation-delay: 3.3s; }
        `}</style>

        {/* Bokeh Particles Container */}
        <div className="bokeh-particles-container">
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
          <span className="bokeh-particle-span"></span>
        </div>

        {/* Content Container */}
        <div className="container max-w-6xl mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full items-center">
            
            {/* Left Side - Content */}
            <div className="text-white space-y-6 animate-fade-in-up">
              <h1 className="hero-heading text-5xl md:text-7xl font-bold leading-tight font-serif">
                Find Your <span className="gold-text">Perfect</span> Life Partner
              </h1>
              <p className="text-xl md:text-2xl text-gold-200 font-light">
                Connect with compatible matches from the Chettiar community worldwide
              </p>
              <p className="text-lg text-gray-100">
                Premium matrimony platform with verified profiles, advanced matching, and community networking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  onClick={() => navigate('/register')}
                  className="hero-button-primary text-gold-600 font-semibold px-8 py-3 text-lg"
                >
                  Get Started Today
                </Button>
                <Button
                  onClick={() => navigate('/browse')}
                  className="hero-button-secondary font-semibold px-8 py-3 text-lg"
                >
                  Browse Profiles
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold-400" />
                  <span>100% Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-gold-400" />
                  <span>5000+ Matches</span>
                </div>
              </div>
            </div>

            {/* Right Side - Glassmorphism Search Card */}
            <div className="hidden md:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="backdrop-blur-sm bg-white/15 border border-white/25 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-6 font-serif">Find Your Match</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Looking For</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 backdrop-blur-sm text-sm">
                      <option value="bride" className="text-gray-900">Bride</option>
                      <option value="groom" className="text-gray-900">Groom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Age</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 backdrop-blur-sm text-sm">
                      <option value="" className="text-gray-900">Select Age Range</option>
                      <option value="18-25" className="text-gray-900">18 - 25</option>
                      <option value="25-30" className="text-gray-900">25 - 30</option>
                      <option value="30-35" className="text-gray-900">30 - 35</option>
                      <option value="35-40" className="text-gray-900">35 - 40</option>
                      <option value="40+" className="text-gray-900">40+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Location</label>
                    <input 
                      type="text" 
                      placeholder="City or Country" 
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 backdrop-blur-sm text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Religion</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 backdrop-blur-sm text-sm">
                      <option value="" className="text-gray-900">Select Religion</option>
                      <option value="hindu" className="text-gray-900">Hindu</option>
                      <option value="christian" className="text-gray-900">Christian</option>
                      <option value="muslim" className="text-gray-900">Muslim</option>
                      <option value="sikh" className="text-gray-900">Sikh</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => navigate('/browse')}
                    className="hero-button-primary w-full py-3 text-lg mt-6"
                  >
                    Find My Match
                  </Button>
                </form>

                <p className="text-center text-white text-xs mt-4 opacity-80">
                  New member? <button onClick={() => navigate('/register')} className="text-gold-300 font-semibold hover:text-gold-400">Sign up free</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-amber-700 mb-2 tracking-wide">Why Choose Us</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-4">A Heritage of Trust</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Trusted by thousands of Chettiar families for genuine connections and meaningful relationships</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-amber-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Verified</h3>
              <p className="text-gray-600">Every profile is manually verified to ensure authenticity and safety for all members</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-amber-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Horoscope Match</h3>
              <p className="text-gray-600">Traditional jathagam compatibility matching for auspicious connections</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-amber-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Family First</h3>
              <p className="text-gray-600">Built specifically for Chettiar families with community values at heart</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-amber-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy Promise</h3>
              <p className="text-gray-600">Your data is secure and private, shared only with your consent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-amber-700 mb-2 tracking-wide">Happy Couples</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">Success Stories</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="h-64 bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center">
                <div className="text-5xl">👰💍</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Priya & Ramesh</h3>
                <p className="text-amber-700 font-semibold mb-3">Chennai, Tamil Nadu</p>
                <p className="text-gray-600">"Chettiar Connect brought us together perfectly. The horoscope matching was spot on and we felt secure with the verification process."</p>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="h-64 bg-gradient-to-br from-rose-200 to-pink-100 flex items-center justify-center">
                <div className="text-5xl">💑✨</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Anjali & Vikram</h3>
                <p className="text-amber-700 font-semibold mb-3">Bangalore, Karnataka</p>
                <p className="text-gray-600">"This platform understands our values. Finding someone with the same family background and traditions was incredible."</p>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="h-64 bg-gradient-to-br from-purple-200 to-indigo-100 flex items-center justify-center">
                <div className="text-5xl">💕🎊</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Divya & Arjun</h3>
                <p className="text-amber-700 font-semibold mb-3">Mumbai, Maharashtra</p>
                <p className="text-gray-600">"We got married within 6 months! The community support and genuine profiles made all the difference."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 text-white py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Begin Your Sacred Journey</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">Find your perfect match within the Chettiar community and start your story today</p>
          <Button
            onClick={() => navigate('/register')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition duration-300"
          >
            Register Free Today
          </Button>
        </div>
      </section>

      {/* Premium Members Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-amber-700 mb-2 tracking-wide">Featured Profiles</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">Premium Members</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Profile Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <div className="relative h-64 bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center">
                <div className="text-6xl">👩‍🦱</div>
                <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-bold">⭐ Premium</div>
                <div className="absolute bottom-4 left-4 bg-white text-amber-800 px-4 py-2 rounded-lg font-bold">92% Match</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Kavya Singh</h3>
                <p className="text-gray-600 text-sm mb-3">28 years | 5'6"</p>
                <p className="text-gray-600 text-sm mb-4">Consultant | Bangalore</p>
                <Button
                  onClick={() => navigate('/browse')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                  View Profile
                </Button>
              </div>
            </div>

            {/* Profile Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <div className="relative h-64 bg-gradient-to-br from-rose-200 to-pink-100 flex items-center justify-center">
                <div className="text-6xl">👨‍💼</div>
                <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-bold">⭐ Premium</div>
                <div className="absolute bottom-4 left-4 bg-white text-amber-800 px-4 py-2 rounded-lg font-bold">95% Match</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Aditya Menon</h3>
                <p className="text-gray-600 text-sm mb-3">30 years | 5'10"</p>
                <p className="text-gray-600 text-sm mb-4">Software Engineer | Hyderabad</p>
                <Button
                  onClick={() => navigate('/browse')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                  View Profile
                </Button>
              </div>
            </div>

            {/* Profile Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <div className="relative h-64 bg-gradient-to-br from-purple-200 to-indigo-100 flex items-center justify-center">
                <div className="text-6xl">👩‍⚕️</div>
                <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-bold">⭐ Premium</div>
                <div className="absolute bottom-4 left-4 bg-white text-amber-800 px-4 py-2 rounded-lg font-bold">88% Match</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Ritika Sharma</h3>
                <p className="text-gray-600 text-sm mb-3">26 years | 5'4"</p>
                <p className="text-gray-600 text-sm mb-4">Doctor | Delhi</p>
                <Button
                  onClick={() => navigate('/browse')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
