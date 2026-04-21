import { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export function useTasks(userId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const taskList = snapshot.docs
          .map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }))
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;
            return bTime - aTime;
          });
        setTasks(taskList);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching tasks:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const addTask = useCallback(
    async (text, type = "task", dueDate = null) => {
      if (!userId || !text.trim()) return;
      try {
        const docData = {
          userId,
          text: text.trim(),
          type,
          createdAt: serverTimestamp(),
        };
        if (type === "task") {
          docData.completed = false;
          if (dueDate) {
            docData.dueDate = dueDate;
          }
        }
        await addDoc(collection(db, "tasks"), docData);
      } catch (err) {
        console.error("Error adding task:", err);
        setError(err.message);
      }
    },
    [userId]
  );

  const toggleTask = useCallback(async (taskId, currentStatus) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), {
        completed: !currentStatus,
      });
    } catch (err) {
      console.error("Error toggling task:", err);
      setError(err.message);
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message);
    }
  }, []);

  return { tasks, loading, error, addTask, deleteTask, toggleTask };
}
