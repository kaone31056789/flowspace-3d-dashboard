import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="mx-auto max-w-6xl px-6 py-4"
        style={{
          margin: "0.75rem auto",
          background: "rgba(30, 41, 59, 0.5)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "1rem",
          border: "1px solid rgba(148, 163, 184, 0.1)",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 0 16px rgba(99, 102, 241, 0.3)",
              }}
            >
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>F</span>
            </div>
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #e2e8f0, #a5b4fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              FlowSpace
            </span>
          </div>

          {/* User Section */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "#e2e8f0",
                  }}
                >
                  {user.displayName}
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    color: "#64748b",
                  }}
                >
                  {user.email}
                </span>
              </div>

              <img
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  border: "2px solid rgba(99, 102, 241, 0.3)",
                  objectFit: "cover",
                }}
              />

              <button
                onClick={logout}
                className="btn-ghost"
                id="logout-button"
                style={{ fontSize: "0.75rem" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
