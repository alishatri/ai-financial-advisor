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
    <main className="App">
      <div className="container">
        <div className="logoBox">
          <Image src="/logo.png" alt="logo" width="400" height="300" />
          <Chat/>
        </div>
      </div>
    </main>
  );
}
