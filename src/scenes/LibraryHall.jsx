import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import libraryBg from "../assets/library.jpg";

function LibraryHall() {
  const navigate = useNavigate();

  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setLightPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-10"
    style={{
    backgroundImage: `url(${libraryBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
    >
      <div className="absolute inset-0 bg-black/45 z-0" />
      <div className="vignette" />

      <h1 className="text-4xl tracking-[0.4em] text-[#7b0f1a] drop-shadow-[0_0_14px_rgba(123,15,26,0.55)] mb-4">
      EXODUS
      </h1>

      <p className="text-[#e6e2dd] tracking-widest uppercase mb-16 drop-shadow-[0_0_10px_rgba(230,226,221,0.25)]">
      The Archives of Civilizational Memory
      </p>

      {/* Blue light */}
      <div
        className="cursor-light"
        style={{
          left: `${lightPos.x}px`,
          top: `${lightPos.y}px`,
        }}
      />

      <div className="flex gap-32">

        {/* Archive Door */}
        <div 
          onClick={() => navigate("/archives")}
          className="cursor-pointer group"
        >
          <p className="text-xl tracking-widest mb-2 text-[#f5f1eb] drop-shadow-[0_0_8px_rgba(245,241,235,0.35)] group-hover:text-white">
            The Archives
          </p>
          <p className="text-sm text-[#cfc9be] italic drop-shadow-[0_0_6px_rgba(207,201,190,0.25)] group-hover:text-[#ffffff]">
            Records of collapse and fracture
          </p>
        </div>

        {/* Judgement Door */}
        <div 
          onClick={() => navigate("/judgement")}
          className="cursor-pointer group"
        >
          <p className="text-xl tracking-widest mb-2 text-[#f5f1eb] drop-shadow-[0_0_8px_rgba(245,241,235,0.35)]">
            The Analyzer
          </p>
          <p className="text-sm text-[#cfc9be] italic drop-shadow-[0_0_6px_rgba(207,201,190,0.25)] group-hover:text-[#ffffff]">
            Structural evaluation chamber
          </p>
        </div>

      </div>

    </div>
  );
}

export default LibraryHall;