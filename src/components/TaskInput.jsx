import { useState } from "react";
import { motion } from "framer-motion";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("task");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    let dueDateISO = null;
    if (type === "task" && dueDate) {
      const dateStr = dueTime ? `${dueDate}T${dueTime}` : `${dueDate}T00:00`;
      dueDateISO = dateStr;
    }

    onAdd(text, type, dueDateISO);
    setText("");
    setDueDate("");
    setDueTime("");
  };

  return (
    <motion.form
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div
        className="glass-card p-3"
        style={{
          borderColor: isFocused ? "rgba(192, 193, 255, 0.2)" : undefined,
          boxShadow: isFocused ? "0 0 24px rgba(128, 131, 255, 0.08)" : undefined,
        }}
      >
        {/* Type Toggle */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <button
            type="button"
            onClick={() => setType("task")}
            style={{
              padding: "0.375rem 1rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              border: "1px solid",
              cursor: "pointer",
              transition: "all 0.25s ease",
              fontFamily: "var(--font-inter)",
              background: type === "task"
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(128, 131, 255, 0.15))"
                : "transparent",
              borderColor: type === "task"
                ? "rgba(192, 193, 255, 0.3)"
                : "rgba(70, 69, 84, 0.2)",
              color: type === "task" ? "#c0c1ff" : "#908fa0",
            }}
          >
            ✓ Task
          </button>
          <button
            type="button"
            onClick={() => setType("note")}
            style={{
              padding: "0.375rem 1rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              border: "1px solid",
              cursor: "pointer",
              transition: "all 0.25s ease",
              fontFamily: "var(--font-inter)",
              background: type === "note"
                ? "linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1))"
                : "transparent",
              borderColor: type === "note"
                ? "rgba(251, 191, 36, 0.3)"
                : "rgba(70, 69, 84, 0.2)",
              color: type === "note" ? "#fbbf24" : "#908fa0",
            }}
          >
            ✎ Note
          </button>
        </div>

        {/* Input Row */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center shrink-0 ml-1"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: type === "task"
                ? "rgba(99, 102, 241, 0.1)"
                : "rgba(251, 191, 36, 0.1)",
            }}
          >
            {type === "task" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            )}
          </div>

          <input
            id="task-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={type === "task" ? "What needs to be done?" : "Write a note..."}
            className="input-field flex-1"
            style={{
              background: "transparent",
              border: "none",
              padding: "0.75rem 0",
              boxShadow: "none",
            }}
          />

          <button
            type="submit"
            id="add-task-button"
            className="btn-accent shrink-0"
            disabled={!text.trim()}
            style={{
              opacity: text.trim() ? 1 : 0.4,
              padding: "0.625rem 1.25rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        </div>

        {/* Date/Time Picker for Tasks */}
        {type === "task" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 mt-3 px-1"
          >
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{
                  background: "rgba(6, 14, 32, 0.6)",
                  border: "1px solid rgba(70, 69, 84, 0.2)",
                  borderRadius: "0.5rem",
                  padding: "0.375rem 0.625rem",
                  color: "#c7c4d7",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-inter)",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                style={{
                  background: "rgba(6, 14, 32, 0.6)",
                  border: "1px solid rgba(70, 69, 84, 0.2)",
                  borderRadius: "0.5rem",
                  padding: "0.375rem 0.625rem",
                  color: "#c7c4d7",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-inter)",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
            </div>
            <span style={{ fontSize: "0.6875rem", color: "#64748b" }}>
              Optional due date
            </span>
          </motion.div>
        )}
      </div>
    </motion.form>
  );
}
