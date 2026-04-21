import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeroCanvas from "../components/HeroCanvas";

export default function LoginPage() {
  const { loginWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      {/* 3D Background */}
      <HeroCanvas />

      {/* Ambient Blobs */}
      <div
        className="ambient-blob"
        style={{
          width: "600px",
          height: "600px",
          background: "#6366f1",
          top: "-200px",
          right: "-100px",
        }}
      />
      <div
        className="ambient-blob"
        style={{
          width: "500px",
          height: "500px",
          background: "#4338ca",
          bottom: "-150px",
          left: "-100px",
          opacity: 0.1,
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-card relative z-10 text-center"
        style={{
          padding: "3rem 2.5rem",
          maxWidth: "420px",
          width: "90%",
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex items-center justify-center mx-auto"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            boxShadow: "0 0 32px rgba(99, 102, 241, 0.3)",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "white",
            }}
          >
            F
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            margin: "0 0 0.5rem 0",
            background: "linear-gradient(135deg, #f1f5f9, #a5b4fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          FlowSpace
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            fontSize: "0.875rem",
            color: "#64748b",
            margin: "0 0 2rem 0",
            lineHeight: 1.6,
          }}
        >
          Your immersive 3D workspace for managing
          <br />
          tasks with style and clarity
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          id="google-signin-button"
          style={{
            width: "100%",
            padding: "0.875rem 1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid rgba(148, 163, 184, 0.15)",
            background: "rgba(255, 255, 255, 0.04)",
            color: "#e2e8f0",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            transition: "all 0.3s ease",
            fontFamily: "var(--font-inter)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
            e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.15)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Google Icon */}
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            fontSize: "0.6875rem",
            color: "#475569",
            marginTop: "1.5rem",
            margin: "1.5rem 0 0 0",
          }}
        >
          Secure authentication powered by Firebase
        </motion.p>
      </motion.div>
    </div>
  );
}
