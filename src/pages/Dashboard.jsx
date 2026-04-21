import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import Navbar from "../components/Navbar";
import HeroCanvas from "../components/HeroCanvas";
import TaskInput from "../components/TaskInput";
import TaskGrid from "../components/TaskGrid";

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, loading, addTask, deleteTask, toggleTask } = useTasks(user?.uid);
  const [filter, setFilter] = useState("all");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const firstName = user?.displayName?.split(" ")[0] || "there";

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "tasks") return t.type === "task" || !t.type;
    if (filter === "notes") return t.type === "note";
    if (filter === "completed") return t.completed === true;
    return true;
  });

  const taskCount = tasks.filter((t) => t.type === "task" || !t.type).length;
  const noteCount = tasks.filter((t) => t.type === "note").length;
  const completedCount = tasks.filter((t) => t.completed === true).length;

  return (
    <div className="relative" style={{ minHeight: "100vh" }}>
      {/* 3D Background */}
      <HeroCanvas />

      {/* Ambient Blobs */}
      <div
        className="ambient-blob"
        style={{
          width: "700px",
          height: "700px",
          background: "#6366f1",
          top: "-300px",
          right: "-200px",
        }}
      />
      <div
        className="ambient-blob"
        style={{
          width: "500px",
          height: "500px",
          background: "#4338ca",
          bottom: "-200px",
          left: "-150px",
          opacity: 0.1,
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main
        className="relative z-10 mx-auto px-6"
        style={{
          maxWidth: "72rem",
          paddingTop: "7rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              margin: "0 0 0.25rem 0",
              background: "linear-gradient(135deg, #f1f5f9, #cbd5e1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            {getGreeting()}, {firstName} ✨
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "#64748b", margin: 0 }}>
            Here&apos;s your workspace — organize, track, and conquer.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              label: "Total",
              value: tasks.length,
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              ),
              color: "#6366f1",
            },
            {
              label: "Tasks",
              value: taskCount,
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ),
              color: "#34d399",
            },
            {
              label: "Notes",
              value: noteCount,
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              ),
              color: "#fbbf24",
            },
            {
              label: "Done",
              value: completedCount,
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ),
              color: "#a78bfa",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              className="glass-card flex items-center gap-3"
              style={{ padding: "0.875rem 1rem" }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: `${stat.color}10`,
                  border: `1px solid ${stat.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#dae2fd",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.625rem",
                    color: "#64748b",
                    fontWeight: 600,
                    marginTop: "0.125rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Task Input */}
        <div className="mb-8">
          <TaskInput onAdd={addTask} />
        </div>

        {/* Filter Tabs + Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-center justify-between mb-5 flex-wrap gap-3"
        >
          <div className="flex items-center gap-2">
            {[
              { key: "all", label: "All" },
              { key: "tasks", label: "Tasks" },
              { key: "notes", label: "Notes" },
              { key: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "var(--font-inter)",
                  background: filter === tab.key
                    ? "rgba(192, 193, 255, 0.1)"
                    : "transparent",
                  borderColor: filter === tab.key
                    ? "rgba(192, 193, 255, 0.25)"
                    : "rgba(70, 69, 84, 0.15)",
                  color: filter === tab.key ? "#c0c1ff" : "#64748b",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span
            style={{
              fontSize: "0.6875rem",
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            {filteredTasks.length} {filteredTasks.length === 1 ? "item" : "items"}
          </span>
        </motion.div>

        {/* Task Grid */}
        <TaskGrid
          tasks={filteredTasks}
          loading={loading}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      </main>
    </div>
  );
}
