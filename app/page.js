import Alur from "./_component/alur";
import Footer from "./_component/footer";
import Hero from "./_component/hero";
import Intro from "./_component/intro";
import Keunggulan from "./_component/keunggulan";
import Program from "./_component/program";
import QuestionsList from "./_component/questionList";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Keunggulan/>
      <Intro/>
      <Program/>
      <Alur/>
      <QuestionsList/>
      <video src="/videos/background.webm" autoPlay loop className='fixed w-full h-screen top-0 left-0 -z-10 object-cover'></video>
    </div>
  );
}
