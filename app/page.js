import Alur from "./_component/alur";
import Footer from "./_component/footer";
import Hero from "./_component/hero";
import Intro from "./_component/intro";
import Keunggulan from "./_component/keunggulan";
import Program from "./_component/program";
import QuestionsList from "./_component/questionList";
import Navbar from "./_component/navbar"

export default function Home() {
  return (
    <div>
      <Hero/>
      <Keunggulan/>
      <Intro/>
      <Program/>
      <Alur/>
      <QuestionsList/>
    </div>
  );
}
