import React, { useState } from "react";
import AudioSpectrum from "react-audio-spectrum";
import RkImage from "../components/RkImage";
import { MeterColors, Strings, Urls } from "../constants";
import { IMAGE_CHANGE, IMAGE_LOGO } from "../resources";
import "./App.css";

function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [spectrumIndex, setSpectrumIndex] = useState(0);
  const [mediaButtonText, setMediaButtonText] = useState(Strings.PAUSE);
  const [meterColor, setMeterColor] = useState(MeterColors.RAINBOW);
  const [isPlaying, setIsPlaying] = useState(true);

  const play = (event) => {
    event.preventDefault();
    let player = document.getElementById("audio-element");
    if (isPlaying) {
      setMediaButtonText(Strings.PLAY);
      player.pause();
      setIsPlaying(false);
      setMeterColor(MeterColors.LIST[2]);
    } else {
      setMediaButtonText(Strings.PAUSE);
      player.play();
      setIsPlaying(true);
    }
  }

  const changeSpectrum = () => {
    let player = document.getElementById("audio-element");
    let index = spectrumIndex + 1;
    if (index > MeterColors.LIST.length - 1) {
      index = 0;
    }
    setSpectrumIndex(index);
    player.pause();
    setMeterColor(MeterColors.LIST[index]);
    player.play();
    let mediaButton = document.getElementById("media-button");
    mediaButton.focus();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: height }}>
      <RkImage source={IMAGE_LOGO} width={250} height={250} style={{ marginTop: 20 }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
        <button className={`media-button ${isPlaying ? 'heart-bit-neon' : 'heart-bit-neon-inactive'}`} onClick={play} id="media-button">
          {mediaButtonText}
        </button>
        <audio controls id="audio-element" autoPlay={true} crossOrigin="anonymous" preload="auto">
          <source src={Urls.PRIMARY_STREAM} type="audio/mpeg" />
          <source src={Urls.PRIMARY_STREAM} type="audio/mp3" />
        </audio>
        {isPlaying &&
          <button className={"change-button"} onClick={changeSpectrum}>
            <RkImage source={IMAGE_CHANGE} width={64} height={64} />
          </button>
        }
      </div>
      <br />
      <AudioSpectrum
        id="audio-canvas"
        crossOrigin="anonymous"
        height={200}
        width={width}
        audioId={"audio-element"}
        capColor={meterColor[meterColor.length - 1].color}
        capHeight={2}
        meterWidth={6}
        meterCount={512}
        meterColor={meterColor}
        gap={2} />
    </div>
  );
}

export default App;
