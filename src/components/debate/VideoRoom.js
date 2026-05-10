"use client";

import { useEffect, useState, useRef } from "react";
import DailyIframe from "@daily-co/daily-js";
import { IconMic, IconParty, IconSwords } from "@/components/ui/Icons";
import styles from "./VideoRoom.module.css";

export default function VideoRoom({ url, onLeave }) {
  const videoContainer = useRef(null);
  const [callObject, setCallObject] = useState(null);

  useEffect(() => {
    if (!videoContainer.current) return;

    let newCallObject = null;

    const initFrame = async () => {
      // Fix for React StrictMode calling useEffect twice
      const existingFrame = DailyIframe.getCallInstance();
      if (existingFrame) {
        await existingFrame.destroy();
      }
      
      // If component unmounted while destroying, abort
      if (!videoContainer.current) return;

      newCallObject = DailyIframe.createFrame(videoContainer.current, {
        iframeStyle: {
          width: "100%",
          height: "100%",
          border: "0",
          borderRadius: "16px",
        },
        showLeaveButton: true,
        showFullscreenButton: true,
      });

      newCallObject.join({ url });
      setCallObject(newCallObject);

      newCallObject.on("left-meeting", () => {
        newCallObject.destroy();
        setCallObject(null);
        onLeave();
      });
    };

    initFrame();

    return () => {
      if (newCallObject) {
        newCallObject.destroy();
      }
    };
  }, [url, onLeave]);

  return (
    <div className={styles.videoWrapper}>
      <div className={styles.videoHeader}>
        <span className="tag tag-red"><IconSwords size={12} /> LIVE DEBATE</span>
      </div>
      <div className={styles.videoContainer} ref={videoContainer}></div>
    </div>
  );
}
