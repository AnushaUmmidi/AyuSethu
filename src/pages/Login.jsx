import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/Login.module.css";

export default function LoginPage() {
    const roles = ["Collector", "Tester", "Manufacturer", "Admin"];
    const [activeRole, setActiveRole] = useState("User");
    const [showRegister, setShowRegister] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {
        switch (activeRole) {
            case "Collector":
                navigate("/Collector");
                break;
            case "Tester":
                navigate("/Labtest");
                break;
            case "Manufacturer":
                navigate("/Manufacturer");
                break;
            case "Admin":
                navigate("/Admin");
                break;
            default:
                navigate("/Collector");
        }
    };

    const handleRegister = () => {
        alert("Registered successfully!");
        setShowRegister(false); // go back to login after register
    };
    return (
        <div className={styles.container}>
            <div className={styles.loginWrapper}>
                <div className={styles.authCard}>
                    <AnimatePresence mode="wait">
                        {showRegister ? (
                            <motion.div
                                key="register"
                                className={styles.form}
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className={styles.title}>Register</h2>

                                <label className={styles.label}>Select Role:</label>
                                <select
                                    value={activeRole}
                                    onChange={(e) => setActiveRole(e.target.value)}
                                    className={styles.input}
                                >
                                    {roles.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>

                                <input type="text" placeholder="Full Name" />
                                <input type="email" placeholder="Email" />
                                <input type="password" placeholder="Password" />

                                {activeRole === "Collector" && (
                                    <>
                                        <input type="text" placeholder="Phone Number" />
                                        <input type="text" placeholder="Organization" />
                                        <label
                                            htmlFor="collectorPhoto"
                                            className={styles.uploadLabel}
                                        >
                                            Upload Your Photo
                                        </label>

                                        <input
                                            id="collectorPhoto"
                                            type="file"
                                            className={styles.hiddenInput}
                                            accept="image/*,.pdf"
                                        />
                                    </>
                                )}

                                {activeRole === "Tester" && (
                                    <>
                                        <input type="text" placeholder="Lab Name" />
                                        <input type="text" placeholder="License Number" />
                                        <input
                                            id="TesterPhoto"
                                            type="file"
                                            className={styles.hiddenInput}
                                            accept="image/*,.pdf"
                                        />
                                        <label
                                            htmlFor="TesterPhoto"
                                            className={styles.uploadLabel}
                                        >
                                            Upload Your Photo
                                        </label>

                                    </>
                                )}

                                {activeRole === "Manufacturer" && (
                                    <>
                                        <input type="text" placeholder="Company Name" />
                                        <input type="text" placeholder="License Number" />
                                                                                <input
                                            id="manufacturerPhoto"
                                            type="file"
                                            className={styles.hiddenInput}
                                            accept="image/*,.pdf"
                                        />

                                        <label
                                            htmlFor="manufacturerPhoto"
                                            className={styles.uploadLabel}
                                        >
                                            Upload Your Photo
                                        </label>

                                        <input
                                            id="manufacturerLicense"
                                            type="file"
                                            className={styles.hiddenInput}
                                            accept="image/*,.pdf"
                                        />

                                        <label
                                            htmlFor="manufacturerLicense"
                                            className={styles.uploadLabel}
                                        >
                                            Upload Manufacturing License
                                        </label>

                                    </>
                                )}

                                <button className={styles.btn} onClick={handleRegister}>
                                    Register
                                </button>

                                <p className={styles.switchText}>
                                    Already have an account?{" "}
                                    <span onClick={() => setShowRegister(false)}>Login</span>
                                </p>
                            </motion.div>
                        ) : (
                            // LOGIN SECTION
                            <motion.div
                                key="login"
                                className={styles.form}
                                initial={{ x: -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 300, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className={styles.title}>Login</h2>

                                {/* Role Selector */}

                                <input type="email" placeholder="Email" className={styles.input} />
                                <input type="password" placeholder="Password" className={styles.input} />

                                <label htmlFor="roleSelectLogin" className={styles.label}>Select Role:</label>
                                <select
                                    id="roleSelectLogin"
                                    value={activeRole}
                                    onChange={(e) => setActiveRole(e.target.value)}
                                    className={styles.input}   // Use same class as input
                                >
                                    {roles.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>

                                <button className={styles.btn} onClick={handleLogin}>Login</button>

                                <p className={styles.switchText}>
                                    New here? <span onClick={() => setShowRegister(true)}>Register Now</span>
                                </p>


                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
