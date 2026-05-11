"use client";

import { useEffect, useRef } from "react";
import { IconSwords } from "@/components/ui/Icons";
import styles from "./VideoRoom.module.css";

export default function VideoRoom({ lobbyId, isHost, userId, userName, topic, onLeave }) {
  const containerRef = useRef(null);

  const zpRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let isCancelled = false;

    const initZego = async () => {
      // Dynamically import ZegoCloud to prevent Next.js SSR 'document is not defined' error
      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");

      if (isCancelled) return;

      const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET?.trim();

      if (!appID || !serverSecret) {
        console.error("ZegoCloud configuration is missing!");
        return;
      }
      
      // Ensure userID and roomID are strictly strings
      const zegoUserID = userId ? String(userId) : Math.floor(Math.random() * 10000) + "";
      const roomID = String(lobbyId);

      // Generate the token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        zegoUserID,
        userName || "User"
      );

      if (isCancelled) return;

      // Create instance
      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);

      // Join the room with your configuration
      zpRef.current.joinRoom({
        container: containerRef.current,
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
        maxUsers: 2,
        layout: "Auto",
        showLayoutButton: false,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // use the enum
        },
        onLeaveRoom: () => {
          if (zpRef.current) {
            zpRef.current.destroy();
            zpRef.current = null;
          }
          onLeave();
        },
      });
    };

    initZego();

    return () => {
      isCancelled = true;
      if (zpRef.current) {
        zpRef.current.destroy();
        zpRef.current = null;
      }
    };
  }, [lobbyId, userName, onLeave]);

  return (
    <div className={styles.videoWrapper}>
      {/* Header */}
      <div className={styles.videoHeader}>
        <div className={styles.headerLeft}>
          <span className="tag tag-red">
            <IconSwords size={12} /> LIVE DEBATE
          </span>
        </div>
      </div>

      {/* Topic */}
      {topic && (
        <div className={styles.topicBar}>
          <p>&ldquo;{topic}&rdquo;</p>
        </div>
      )}

      {/* ZegoCloud Container */}
      <div className={styles.videoContainer} ref={containerRef}></div>
    </div>
  );
}
