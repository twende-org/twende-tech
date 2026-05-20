import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    // Skip tracking admin or client portal pages to keep stats focused on visitors
    if (path.startsWith("/admin") || path.startsWith("/dashboard")) {
      return;
    }

    // Check if this path was already tracked in the current session
    const sessionTracked = sessionStorage.getItem("tracked_paths") || "";
    const trackedPathsList = sessionTracked.split(",").filter(Boolean);
    
    if (trackedPathsList.includes(path)) {
      // Already tracked this page pathname in this session. Skip to optimize DB writes!
      return;
    }

    // Set a 2-second debounce timer to filter out quick bounces/accidental clicks
    const timer = setTimeout(async () => {
      try {
        // Double check session list to prevent race conditions during timer lifecycle
        const currentSessionTracked = sessionStorage.getItem("tracked_paths") || "";
        const currentList = currentSessionTracked.split(",").filter(Boolean);
        if (currentList.includes(path)) return;

        // Retrieve or generate a session ID for tracking unique visitors
        let sessionId = sessionStorage.getItem("visitor_session_id");
        if (!sessionId) {
          sessionId = "sess_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          sessionStorage.setItem("visitor_session_id", sessionId);
        }

        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

        const pageViewData = {
          path: path || "/",
          sessionId,
          date: today,
          userAgent: navigator.userAgent,
          referrer: document.referrer || "direct",
          createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, "page_views"), pageViewData);

        // Append to tracked paths
        currentList.push(path);
        sessionStorage.setItem("tracked_paths", currentList.join(","));
      } catch (error) {
        console.error("Failed to track visitor page view:", error);
      }
    }, 2000); // 2-second bounce threshold

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
