import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Landing.module.css";
import { MapPin, Cog, FlaskConical, Factory, Package, User } from "lucide-react";

const steps = [
  { icon: <MapPin size={34} />, title: "Geo-Tagged Collection", text: "Every herb is collected with GPS proof." },
  { icon: <Cog size={34} />, title: "Immutable Blockchain Record", text: "Stored on tamper-proof blockchain." },
  { icon: <FlaskConical size={34} />, title: "Quality Testing", text: "Each herb batch undergoes lab testing." },
  { icon: <Factory size={34} />, title: "Processing & Formulation", text: "Processed in certified facilities." },
  { icon: <Package size={34} />, title: "Packaging", text: "Each product gets a blockchain batch ID." },
  { icon: <User size={34} />, title: "Verified Consumer", text: "Consumers can verify using QR code." }
];


const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>

      {/* NAVBAR */}
      <div className={styles.navbar}>
        <nav>
          <div className={styles.logo}>HerbChain</div>
          <ul>
            <li>About</li>
            <li>How We Work</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
      {/* IMAGE SLIDER */}
      <div className={styles.headerImage}>
        <img
          src="https://www.ayurorganic.com.au/cdn/shop/files/Ayurvedic_and_Organic_SIngle_and_Blended_Herbs_1.webp?v=1749389990&width=1500"
          className={styles.slide}
        />
        <img
          src="https://www.pharmamanch.in/wp-content/uploads/2024/09/Top-10-Herbal-Companies-In-India.jpg"
          className={styles.slide}
        />
        <img
          src="https://t3.ftcdn.net/jpg/16/27/75/38/360_F_1627753819_TLWx2Fs1OZEc5BeHkA27IIsZkdUJerl8.jpg"
          className={styles.slide}
        />
      </div>
      <div className={styles.heroText}>
        <h1>Track Every Herb</h1>
        <h2>From Farm to Bottle</h2>
        <p>Blockchain-powered traceability for authentic Ayurvedic formulations</p>
      </div>
      <div className={styles.loginBtn}>
        <button onClick={() => navigate("/Login")}>Login</button>
      </div>
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
      {/* HOW WE WORK */}
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
      <section >
        <div className="aboutSection">
          <h2 className="aboutTitle">Motive Of HerbChain</h2>

          <div className="aboutContentWrapper">

            <div className="aboutImageWrapper">
              <img
                src="feature.png"
                className="aboutImage"
                alt="Herbs"
              />
            </div>

            {/* <div className="aboutTextWrapper">
      <p className="aboutParagraph">
        At HerbChain, our mission is to create a transparent, sustainable, and
        trustworthy herbal supply ecosystem. We empower local farmers, ensure
        product authenticity, and use blockchain to trace herbs from source to
        consumer.
      </p>
    </div> */}

          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
