"use client"
import { useState, useEffect } from "react";
import Alur from "./_component/alur";
import Footer from "./_component/footer";
import Hero from "./_component/hero";
import Intro from "./_component/intro";
import Keunggulan from "./_component/keunggulan";
import PopupLogin from "./_component/login";
import Program from "./_component/program";
import QuestionsList from "./_component/questionList";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const searchParams = useSearchParams();
  const showLogin = searchParams.get("showLogin") === "true";
  const [isOpen, setIsopen] = useState(false);
  useEffect(() => {
    if (showLogin) {
      setIsopen(true);
    }
  }, [showLogin]); 

  return (
    <div>
      <Hero />
      <Keunggulan />
      <Intro />
      <Program />
      <Alur />
      <QuestionsList />
      <video src="/videos/background.webm" autoPlay loop className='fixed w-full h-screen top-0 left-0 -z-10 object-cover'></video>
      <PopupLogin isOpen={isOpen} close={() => setIsopen(false)} />
    </div>
  );
}
