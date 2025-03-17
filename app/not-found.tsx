"use client";
import React from "react";
import Particles from "react-tsparticles";
import "@/public/styles/not-found.css";

const NotFound = () => {
  return (
    <div className="error-page mt-40">
      <div>
        <h1 data-h1="404">404</h1>
        <p data-p="NOT FOUND">NOT FOUND</p>
      </div>
      <Particles
        id="particles-js"
        options={{
          particles: {
            number: { value: 5, density: { enable: true, value_area: 800 } },
            color: { value: "#fcfcfc" },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 140,
              anim: {
                enable: true,
                speed: 10,
                size_min: 40,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 8,
              direction: "none",
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              resize: true,
            },
          },
          retina_detect: true,
        }}
      />
    </div>
  );
};

export default NotFound;
