import { motion } from "framer-motion";

export default function TaskCard({ task, onDelete, onToggle, index }) {
  const isTask = task.type === "task" || !task.type;
  const isNote = task.type === "note";
  const isCompleted = task.completed === true;

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const isOverdue = date < now && !isCompleted;
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: date.getHours() !== 0 || date.getMinutes() !== 0 ? "2-digit" : undefined,
      minute: date.getHours() !== 0 || date.getMinutes() !== 0 ? "2-digit" : undefined,
    });
    return { formatted, isOverdue };
  };

  const dueInfo = isTask ? formatDueDate(task.dueDate) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="glass-card group relative"
      style={{
        padding: "1.25rem 1.5rem",
        cursor: "default",
        opacity: isCompleted ? 0.6 : 1,
        borderLeft: isNote
          ? "3px solid rgba(251, 191, 36, 0.4)"
          : isCompleted
            ? "3px solid rgba(52, 211, 153, 0.4)"
            : "3px solid rgba(99, 102, 241, 0.3)",
      }}
    >
      {/* Content */}
      <div className="flex items-start justify-between gap-3">
        {/* Left: Toggle + Text */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Toggle Button (Tasks only) */}
          {isTask && (
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggle(task.id, task.completed)}
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "6px",
                border: isCompleted
                  ? "2px solid rgba(52, 211, 153, 0.5)"
                  : "2px solid rgba(70, 69, 84, 0.4)",
                background: isCompleted
                  ? "rgba(52, 211, 153, 0.15)"
                  : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "1px",
                transition: "all 0.2s ease",
              }}
            >
              {isCompleted && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </motion.button>
          )}

          {/* Note Icon */}
          {isNote && (
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "6px",
                background: "rgba(251, 191, 36, 0.1)",
                border: "1px solid rgba(251, 191, 36, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "1px",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p
              style={{
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: isCompleted ? "#64748b" : "#dae2fd",
                lineHeight: 1.6,
                margin: 0,
                wordBreak: "break-word",
                textDecoration: isCompleted ? "line-through" : "none",
              }}
            >
              {task.text}
            </p>

            {/* Meta Row */}
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              {/* Type Badge */}
              <span
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "9999px",
                  background: isNote
                    ? "rgba(251, 191, 36, 0.08)"
                    : "rgba(99, 102, 241, 0.08)",
                  color: isNote ? "#fbbf24" : "#818cf8",
                  border: `1px solid ${isNote ? "rgba(251, 191, 36, 0.15)" : "rgba(99, 102, 241, 0.15)"}`,
                }}
              >
                {isNote ? "Note" : "Task"}
              </span>

              {/* Due Date */}
              {dueInfo && (
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    color: dueInfo.isOverdue ? "#ef4444" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {dueInfo.isOverdue ? "Overdue · " : ""}
                  {dueInfo.formatted}
                </span>
              )}

              {/* Created At */}
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: "#475569",
                  fontWeight: 500,
                }}
              >
                {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Delete Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(task.id)}
          id={`delete-task-${task.id}`}
          style={{
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.1)",
            borderRadius: "8px",
            padding: "6px",
            cursor: "pointer",
            opacity: 0,
            transition: "opacity 0.2s ease, background 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          className="group-hover:!opacity-100"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.1)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
