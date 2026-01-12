import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ritualSound from "../assets/ritual.mp3";

function JudgementChamber() {
  const navigate = useNavigate();

  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => {
      setLightPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const ritualAudioRef = useRef(null);
  useEffect(() => {
  ritualAudioRef.current = new Audio(ritualSound);
  ritualAudioRef.current.loop = true;
  ritualAudioRef.current.volume = 0.25; // whisper-level ominous

  const play = ritualAudioRef.current.play();
  if (play !== undefined) {
    play.catch(() => {}); // ignore autoplay block
  }

  return () => {
    ritualAudioRef.current.pause();
    ritualAudioRef.current = null;
  };
}, []);


  const [inputText, setInputText] = useState("");
  const [judgement, setJudgement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phaseMessage, setPhaseMessage] = useState("");

  const submitForJudgement = async () => {
  if (!inputText.trim()) return;

  setIsLoading(true);
  setJudgement(null);

  setPhaseMessage("Consulting symbolic lattice…");

  setTimeout(() => {
    setPhaseMessage("Archetypal alignment in progress…");
  }, 900);

  setTimeout(() => {
    setPhaseMessage("Phase collapse detected…");
  }, 1800);

  try {
    const res = await fetch("http://127.0.0.1:8000/judge/judge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText })
    });

    const data = await res.json();
    setJudgement(data);
  } catch (err) {
    console.error(err);
  } finally {
    setIsLoading(false);
    setPhaseMessage("");
  }
};


  return (
    <div className="relative min-h-screen px-24 py-20 grid grid-cols-1 md:grid-cols-2 gap-32 overflow-hidden">
      <div className="judgement-void absolute inset-0 z-0"/>
      <div className="judgement-grain absolute inset-0 z-1" />
      <div className="judgement-vignette absolute inset-0 z-2" />

      <div className="space-y-16 relative z-10">
        <p 
          onClick={() => navigate("/")}
          className="text-bone/40 tracking-widest uppercase text-xs cursor-pointer mb-10 hover:text-bone/60"
        >
          ← Return to Hall
        </p>

        {/* Blue light */}
        <div
        className="cursor-light judgement"
        style={{ left: `${lightPos.x}px`, top: `${lightPos.y}px` }}
        />

         <h2 className="text-2xl tracking-widest mb-6">
          Judgement Chamber
         </h2>
         
         <p className="text-bone/50 italic mb-16">
           {isLoading
           ? phaseMessage || "Consulting symbolic lattice…"
           : judgement
           ? "Narrative received. Structural evaluation complete."
           : "No narrative has been presented for structural evaluation."}
         </p>
         
         <div className="space-y-12">
          <div>
            <p className="tracking-widest uppercase text-xs text-bone/40 mb-2">
              Lifecycle Phase
            </p>
            <p className={`italic text-bone/70 ${judgement ? "judgement-result" : ""}`}>
              {isLoading
              ? "Archetypal alignment in progress…"
              : judgement
              ? judgement.lifecycle_phase
              : "Verdict suspended."}
            </p>
          </div>

          <div>
            <p className="tracking-widest uppercase text-xs text-bone/40 mb-2">
              Archetypal Triggers
            </p>
            <p className={`italic text-bone/70 ${judgement ? "judgement-result" : ""}`}>
              {isLoading
              ? "Symbolic fractures under analysis…"
              : judgement
              ? judgement.triggers.join(", ")
              : "No symbolic ruptures detected."}
            </p>
          </div>

          <div>
            <p className="tracking-widest uppercase text-xs text-bone/40 mb-2">
              Collapse Trajectory
            </p>
          <p className={`italic text-bone/70 ${judgement ? "judgement-result" : ""}`}>
            {isLoading
            ? "Phase collapse detected…"
            : judgement
            ? judgement.collapse_trajectory
            : "Structural arc undefined."}
          </p>
         </div>

        </div>
      </div>

      <div className="flex flex-col justify-start mt-40 relative z-10">
        <p className="text-bone/40 tracking-widest uppercase text-xs mb-4">
          Present Narrative
        </p>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter the narrative for structural judgement..."
          className="w-full h-56 bg-black/50 border border-bone/20 p-5 text-bone tracking-wide focus:outline-none focus:border-bone/60 resize-none mb-8 backdrop-blur-sm"
        />
        
        <button
          onClick={submitForJudgement}
          className="self-start px-8 py-3 border border-bone/40 text-bone tracking-widest uppercase text-xs hover:bg-bone/10 hover:border-bone/70 transition-all duration-300"
        >
          Submit for Judgement
        </button>

      </div>
    </div>
  );
}

export default JudgementChamber;