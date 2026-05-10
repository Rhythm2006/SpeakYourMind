"use client";

import { useEffect, useRef } from "react";
import { IconSwords } from "@/components/ui/Icons";
import styles from "./VideoRoom.module.css";

export default function VideoRoom({ lobbyId, isHost, userName, topic, onLeave }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let zp = null;

    const initZego = async () => {
      // Dynamically import ZegoCloud to prevent Next.js SSR 'document is not defined' error
      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");

      const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
      
      // Ensure userID and roomID are strictly strings
      const userID = Math.floor(Math.random() * 10000) + "";
      const roomID = String(lobbyId);

      // Generate the token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName || "User"
      );

      // Create instance
      zp = ZegoUIKitPrebuilt.create(kitToken);

      // Join the room with your configuration
      zp.joinRoom({
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
          mode: "OneONoneCall",
          config: {
            role: "Host", // Everyone can be host in 1on1 calls usually, or we can use isHost ? "Host" : "Audience" if it was live stream
          },
        },
        onLeaveRoom: () => {
          onLeave();
        },
      });
    };

    initZego();

    return () => {
      if (zp) {
        zp.destroy();
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
