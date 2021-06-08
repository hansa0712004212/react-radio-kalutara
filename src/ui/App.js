import React, { useEffect, useState } from "react";
import AudioSpectrum from "react-audio-spectrum";
import Sky from "react-sky";
import RkImage from "../components/RkImage";
import { MeterColors, Strings, Urls } from "../constants";
import { IMAGE_CHANGE, IMAGE_CLOUD_SET, IMAGE_LOGO, IMAGE_LOVE_SET, IMAGE_WESAK_SET, WALLPAPER_SKY_2 } from "../resources";
import "./App.css";

const getWelcomeText = () => {
  let text = "";
  const hour = new Date().getHours();
  if (hour < 12) {
    text = "Good Morning";
  } else if (hour < 14) {
    text = "Good Afternoon";
  } else {
    text = "Good Evening";
  }
  return text;
};

const getImageSet = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  let imageSet = IMAGE_CLOUD_SET;
  if ((month === 5 && [26, 27].includes(day)) || (month === 6 && day === 24)) {
    imageSet = IMAGE_WESAK_SET;
  } else if ((month === 2 && day === 14)) {
    imageSet = IMAGE_LOVE_SET;
  }
  return imageSet;
};

const App = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [spectrumIndex, setSpectrumIndex] = useState(0);
  const [mediaButtonText, setMediaButtonText] = useState(Strings.PLAY);
  const [meterColor, setMeterColor] = useState(MeterColors.RAINBOW);
  const [isPlaying, setIsPlaying] = useState(false);
  const [welcome, setWelcome] = useState(getWelcomeText());
  const [imageSet] = useState(getImageSet());

  useEffect(() => {
    setInterval(() => setWelcome(getWelcomeText()), 60000);
  });

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

  const changeSpectrum = (event) => {
    event.preventDefault();
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
  };

  return (
    <div style={{ opacity: 0.9, backgroundImage: `url(${WALLPAPER_SKY_2.default})`, backgroundRepeat: "no-repeat", display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center", maxHeight: height, height: height }}>
      <div style={{ position: "relative", display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center", maxHeight: height, height: height }}>
        <p id="welcome">{welcome}</p>
        <RkImage source={IMAGE_LOGO} width={200} height={200} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
          <audio controls id="audio-element" autoPlay={false} crossOrigin="anonymous" preload="auto">
            <source src={Urls.PRIMARY_STREAM} type="audio/mpeg" />
            <source src={Urls.PRIMARY_STREAM} type="audio/mp3" />
          </audio>
          <button className={`media-button ${isPlaying ? "heart-bit-neon" : "heart-bit-neon-inactive"}`} onClick={play} id="media-button">
            {mediaButtonText}
          </button>
          <button className={`${isPlaying ? '' : 'change-button-hide'} change-button`} onClick={changeSpectrum}>
            <RkImage source={IMAGE_CHANGE} width={32} height={32} />
          </button>
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
      <Sky
        images={imageSet}
        how={30} /* Pass the number of images Sky will render chosing randomly */
        time={60} /* time of animation */
        size={"100px"} /* size of the rendered images */
        background={`url(${WALLPAPER_SKY_2.default})`} /* color of background */
      />
    </div>
  );
}

export default App;
