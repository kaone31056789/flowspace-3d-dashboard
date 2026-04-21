import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";

export default function TaskGrid({ tasks, loading, onDelete, onToggle }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="spinner" />
        <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
          Loading your workspace...
        </span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "1rem",
            background: "rgba(99, 102, 241, 0.08)",
            border: "1px solid rgba(99, 102, 241, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.6 }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </div>
        <h3
          style={{
            fontSize: "1.0625rem",
            fontWeight: 600,
            color: "#cbd5e1",
            margin: "0 0 0.375rem 0",
          }}
        >
          Nothing here yet
        </h3>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "#64748b",
            margin: 0,
          }}
        >
          Add a task or note to get started
        </p>
      </motion.div>
    );
  }

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
