"use client";

import Image from "next/image";
import Chat from "./components/Chat";
import { useState } from "react";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleAskMeClick = () => {
    setShowChat(true);
    setShowButton(false)
  };
  return (
    <main style={{ height: showChat ? '115vh' : '100vh' }} className="App">
      <div className="container">
        <div className="logoBox">
          <Image src="/logo.png" alt="logo" width="400" height="300" />
          {showChat && <Chat />}
        </div>
          {showButton && (
            <button className="mainButton" type="button" onClick={handleAskMeClick}>
              Ask me
            </button>
          )}
      </div>
    </main>
  );
}
