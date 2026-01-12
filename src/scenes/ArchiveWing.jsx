import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import libraryBg from "../assets/shelf.jpg";

function ArchiveWing() {
  const navigate = useNavigate();

  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => {
      setLightPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const [parallels, setParallels] = useState([]);
  const [lifecycles, setLifecycles] = useState({});
  const [phases, setPhases] = useState({});

useEffect(() => {
  fetch("http://127.0.0.1:8000/archive/parallels")
    .then(res => res.json())
    .then(data => {
      console.log("PARALLELS:", data);
      setParallels(data);
    });

  fetch("http://127.0.0.1:8000/archive/lifecycles")
    .then(res => res.json())
    .then(data => {
      console.log("LIFECYCLES:", data);
      setLifecycles(data);
    });

  fetch("http://127.0.0.1:8000/archive/phases")
    .then(res => res.json())
    .then(data => {
      console.log("PHASES:", data);
      setPhases(data);
    });
}, []);

  return (
    <div
    className="min-h-screen px-20 py-16 relative"
    style={{
    backgroundImage: `url(${libraryBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  <div className="absolute inset-0 bg-black/60"></div>
  <div className="relative z-10">


      {/* Return */}
      <p
        onClick={() => navigate("/")}
        className="text-bone/50 tracking-widest uppercase text-xs cursor-pointer mb-12 hover:text-bone"
      >
        ← Return to Hall
      </p>

      <h1 className="text-3xl tracking-widest mb-16">The Archives</h1>

      <div className="space-y-16 mt-20">
        {parallels.map((item, idx) => (
          <div key={idx} className="archive-scroll group">
            <p className="scroll-title">
              {item.myth} ↔ {item.history}
            </p>
          
            <p className="scroll-sub">
              lifecycle similarity: {item.lifecycle_similarity}
            </p>

        {/* Hidden until click */}
          <div className="scroll-hidden">
            <p className="sig-line">
              {item.life1.map(phase => (
                <span key={phase} className="phase-word group relative">
                  {phase}
                  <span className="phase-tooltip">
                    {phases[phase]?.description}
                  </span>
                </span>
             )).reduce((prev, curr) => [prev, " → ", curr])}
           </p>
           
           <p className="sig-line">
              {item.life2.map(phase => (
                <span
                  key={phase}
                  className="phase-word"
                  title={phases[phase]?.description}
                >
                  {phase}
                </span>
             )).reduce((prev, curr) => [prev, " → ", curr])}
           </p>
        </div>
     </div>
  ))}

      {/* Blue light */}
      <div
        className="cursor-light"
        style={{
          left: `${lightPos.x}px`,
          top: `${lightPos.y}px`,
        }}
      />
    </div>
  </div>
</div>
  );
}

export default ArchiveWing;