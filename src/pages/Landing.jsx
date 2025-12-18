import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Landing.module.css";
import {
  MapPin,
  Cog,
  FlaskConical,
  Factory,
  Package,
  User,
  Mail,
  Phone,
  MapPin as MapPinIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    icon: <MapPin size={34} />,
    title: "Farmer",
    text: "Geo-tagged harvesting with real-time capture of origin, species, and quality.",
  },
  {
    icon: <Cog size={34} />,
    title: "Collector",
    text: "Centralized aggregation ensuring proper documentation, sorting, and authenticated handover.",
  },
  {
    icon: <FlaskConical size={34} />,
    title: "Tester",
    text: "Laboratory validation of moisture, pesticides, DNA authentication, and purity metrics.",
  },
  {
    icon: <Factory size={34} />,
    title: "Processing & Formulation",
    text: "Processed in certified facilities.",
  },
  {
    icon: <Package size={34} />,
    title: "Manufacturer",
    text: "Processing, formulation, packaging, and final QR tagging powered by blockchain.",
  },
  {
    icon: <User size={34} />,
    title: "Consumer",
    text: "Complete traceability access—origin, purity tests, sustainability, and batch details.",
  },
];

// Testimonials Data
const testimonialsData = [
  {
    name: "Dr. Meera Rao",
    role: "Ayurveda Practitioner",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "AyuSethu transformed my daily wellness routine. The natural formulations exceeded my expectations. Highly recommended!",
  },
  {
    name: "Rahul Sharma",
    role: "Wellness Blogger",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "The best holistic products I've used. The commitment to authenticity really shows in every bottle.",
  },
  {
    name: "Anjali Verma",
    role: "Yoga Instructor",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Clean ingredients, genuine benefits, and a beautiful brand story. AyuSethu has become a staple in my lifestyle.",
  },
  {
    name: "Dr. Arvind Patel",
    role: "Herbal Researcher",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "The transparency in sourcing through blockchain technology sets AyuSethu apart in the Ayurvedic industry.",
  },
  {
    name: "Priya Desai",
    role: "Nutritionist",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "My clients love knowing exactly where their supplements come from. The traceability feature is revolutionary.",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentTestimonial]);

  return (
    <div className={styles.container}>
      {/* NAVBAR */}
      <div className={styles.navbar}>
        <nav>
          <img
            src="https://res.cloudinary.com/dmolvlt7e/image/upload/v1766070051/Gemini_Generated_Image_ysxwkbysxwkbysxw-removebg-preview_jezctz.png"
            alt="logo"
            className={styles.logoImage}
          />
          <div className={styles.logo}>AyuSethu</div>
          <ul>
            <li>About</li>
            <li>How We Work</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>

      {/* HERO SECTION */}
      <div className={styles.heroSection}>
        {/* IMAGE SLIDER */}
        <div className={styles.headerImage}>
          <img
            src="https://www.ayurorganic.com.au/cdn/shop/files/Ayurvedic_and_Organic_SIngle_and_Blended_Herbs_1.webp?v=1749389990&width=1500"
            className={styles.slide}
            alt="Herbs"
          />
          <img
            src="https://www.pharmamanch.in/wp-content/uploads/2024/09/Top-10-Herbal-Companies-In-India.jpg"
            className={styles.slide}
            alt="Herbal Companies"
          />
          <img
            src="https://t3.ftcdn.net/jpg/16/27/75/38/360_F_1627753819_TLWx2Fs1OZEc5BeHkA27IIsZkdUJerl8.jpg"
            className={styles.slide}
            alt="Ayurvedic Medicine"
          />
        </div>

        {/* HERO TEXT */}
        <div className={styles.heroText}>
          <h1>Track Every Herb</h1>
          <h2>From Farm to Formulation</h2>
          <p>Blockchain-powered traceability for authentic Ayurvedic formulations</p>
        </div>

        {/* LOGIN BUTTON */}
        <div className={styles.loginBtn}>
          <button onClick={() => navigate("/Login")}>Login</button>
        </div>

        {/* FEATURES SECTION */}
        <div className={styles.featuresSection}>
          <div className={styles.featureBox}>
            <MapPin size={42} className={styles.featureIcon} />
            <div>
              <h3 className={styles.featureTitle}>QR Code Product</h3>
              <p className={styles.featureSubtitle}>Verification</p>
            </div>
          </div>

          <div className={`${styles.featureBox} ${styles.darkBox}`}>
            <Cog size={42} className={styles.featureIcon} />
            <div>
              <h3 className={styles.featureTitle}>End-to-End</h3>
              <p className={styles.featureSubtitle}>Traceability Viewer</p>
            </div>
          </div>

          <div className={`${styles.featureBox} ${styles.greenBox}`}>
            <User size={42} className={styles.featureIcon} />
            <div>
              <h3 className={styles.featureTitle}>Multi-Language</h3>
              <p className={styles.featureSubtitle}>Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* HOW WE WORK SECTION */}
      <section className={styles.workSection}>
        <h3 className={styles.workHeading}>How We Work</h3>
        <p className={styles.workTagline}>
          Ensuring transparency, purity, and trust at every stage.
        </p>

        <div className={styles.workContainer}>
          {steps.map((step, i) => (
            <div key={i} className={styles.stepWrapper}>
              <div className={styles.iconCircle}>{step.icon}</div>
              {i !== steps.length - 1 && <div className={styles.dash}></div>}
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <div className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>Motive Of AyuSethu</h2>

        <div className={styles.aboutContentWrapper}>
          <div className={styles.aboutImageWrapper}>
            <img
              src="https://res.cloudinary.com/dmolvlt7e/image/upload/v1766033128/WhatsApp_Image_2025-12-09_at_08.28.38-removebg-preview_vtrebu.png"
              className={styles.aboutImage}
              alt="Herbs"
            />
          </div>

          <div className={styles.aboutTextWrapper}>
            <p className={styles.aboutParagraph}>
              AYU SETHU brings transparency and trust to the Ayurvedic herbal supply chain by securely recording every stage of a herb's journey from cultivation and procurement to lab testing and manufacturing—using blockchain and geo-tagging. By scanning a QR code, consumers can instantly verify origin, quality, lab reports, and sustainability compliance, ensuring that every Ayurvedic product is pure, authentic, and responsibly sourced.
            </p>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsHeader}>
          <h2>What Our Customers Say</h2>
          <p>
            Hear from people who have trusted AyuSethu for their wellness journey.
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <button className={`${styles.navArrow} ${styles.navArrowLeft}`} onClick={prevTestimonial}>
            <ChevronLeft size={24} />
          </button>

          <div className={styles.carouselSlide}>
            <div className={styles.testimonialContent}>
              <div className={styles.quoteIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#2e7d32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <p className={styles.testimonialQuote}>
                "{testimonialsData[currentTestimonial].quote}"
              </p>
              <div className={styles.testimonialAuthor}>
                <img
                  src={testimonialsData[currentTestimonial].image}
                  alt={testimonialsData[currentTestimonial].name}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorInfo}>
                  <h3>{testimonialsData[currentTestimonial].name}</h3>
                  <p>{testimonialsData[currentTestimonial].role}</p>
                </div>
              </div>
            </div>
          </div>

          <button className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={nextTestimonial}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className={styles.carouselIndicators}>
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentTestimonial ? styles.active : ""
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </section>

      <div className={styles.white}></div>

      {/* FOOTER SECTION */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <img
                src="https://res.cloudinary.com/domogztsv/image/upload/v1765220874/WhatsApp_Image_2025-12-09_at_12.36.40_AM_bp8jxt.jpg"
                alt="AyuSethu Logo"
                className={styles.footerLogoImage}
              />
              <h3 className={styles.footerLogoText}>AyuSethu</h3>
            </div>
            <p className={styles.footerDescription}>
              Blockchain-powered traceability for authentic Ayurvedic formulations from farm to formulation.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#work">How We Work</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#login">Login</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Contact Us</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPinIcon size={18} />
                <span>123 Ayurveda Street, Haridwar, Uttarakhand, India 249401</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} />
                <span>info@ayusethu.com</span>
              </div>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}><Facebook size={24} /></a>
              <a href="#" className={styles.socialIcon}><Twitter size={24} /></a>
              <a href="#" className={styles.socialIcon}><Instagram size={24} /></a>
              <a href="#" className={styles.socialIcon}><Linkedin size={24} /></a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} AyuSethu. All rights reserved.</p>
          <div className={styles.footerLegal}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;