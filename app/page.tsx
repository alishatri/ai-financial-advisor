"use client";

import Image from "next/image";
import Chat from "./components/Chat";
import { useState } from "react";
export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleAskMeClick = () => {
    setShowChat(true);
    setShowButton(false);
  };

  return (
    <>
      <main className="App">
        <div className="container">
          <div className="logoBox">
          <h1>WallStreetBetsGPT</h1>
            <Image src="/logo.png" alt="logo" width={300} height={250} />
            <h2 style={{ padding: "10px" }}>
              This is boot based of r/wallstreetbets knowledge
            </h2>
            <p style={{ padding: "10px" }}>
              Ask me any financial question you want
            </p>
          {showButton && (
            <button
              type="button"
              className="mainButton"
              onClick={() => {
                setShowChat(true);
                setShowButton(false);
              }}
            >
              Let's start conversation
            </button>
          )}
          </div>
          {showChat && <Chat />}
        </div>
      </main>
    </>
  );
}
