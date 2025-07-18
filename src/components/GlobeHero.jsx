import React, { useRef, useEffect, useMemo } from "react";
import Globe from "react-globe.gl";

const GlobeHero = () => {
  const globeRef = useRef();

  const arcsData = useMemo(() => {
    return [...Array(8)].map(() => ({
      startLat: Math.random() * 180 - 90,
      startLng: Math.random() * 360 - 180,
      endLat: Math.random() * 180 - 90,
      endLng: Math.random() * 360 - 180,
      color: ["#3b82f6", "#60a5fa", "#93c5fd", "#1e40af"][
        Math.floor(Math.random() * 4)
      ],
    }));
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.1;
      globeRef.current.controls().enableZoom = false;
    }
  }, []);

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg"
      bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
      arcsData={arcsData}
      arcColor={"color"}
      arcDashLength={0.5}
      arcDashGap={2}
      arcDashInitialGap={() => Math.random() * 5}
      arcDashAnimateTime={900}
      atmosphereColor="#fff"
      atmosphereAltitude={0.15}
      showAtmosphere
    />
  );
};

export default GlobeHero;
