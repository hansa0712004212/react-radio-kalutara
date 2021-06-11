import React, { useEffect, useState } from "react";
import AudioSpectrum from "react-audio-spectrum";
import { isMobileOnly } from "react-device-detect";
import Sky from "react-sky";
import RkImage from "../components/RkImage";
import { MeterColors, Strings, Urls } from "../constants";
import { CURRET_TRACK } from "../constants/urls";
import {
  IMAGE_CHANGE, IMAGE_CHRISTMAS_SET, IMAGE_CLOUD_SET, IMAGE_LOGO, IMAGE_LOVE_SET, IMAGE_WESAK_SET,
  WALLPAPER_CHRISTMAS, WALLPAPER_CHRISTMAS_DESKTOP, WALLPAPER_POSON, WALLPAPER_POSON_DESKTOP,
  WALLPAPER_SKY, WALLPAPER_SKY_DESKTOP, WALLPAPER_VALENTINE, WALLPAPER_VALENTINE_DESKTOP,
  WALLPAPER_WESAK, WALLPAPER_WESAK_DESKTOP
} from "../resources";
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

const getBackgroundStyleBuild = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  let size = "200px";
  let howmuch = 30;
  let imageSet = IMAGE_CLOUD_SET;
  let backgroundImage = (isMobileOnly) ? WALLPAPER_SKY.default : WALLPAPER_SKY_DESKTOP.default;
  switch (month) {
    case 2:
      if (day === 14) {
        howmuch = 90;
        size = "50px";
        imageSet = IMAGE_LOVE_SET;
        backgroundImage = (isMobileOnly) ? WALLPAPER_VALENTINE.default : WALLPAPER_VALENTINE_DESKTOP.default;
      }
      break;
    case 5:
      if ([26, 27].includes(day)) {
        howmuch = 60;
        size = "50px";
        imageSet = IMAGE_WESAK_SET;
        backgroundImage = (isMobileOnly) ? WALLPAPER_WESAK.default : WALLPAPER_WESAK_DESKTOP.default;
      }
      break;
    case 6:
      if (day === 24) {
        howmuch = 60;
        size = "50px";
        imageSet = IMAGE_WESAK_SET;
        backgroundImage = (isMobileOnly) ? WALLPAPER_POSON.default : WALLPAPER_POSON_DESKTOP.default;
      }
      break;
    case 12:
      if (day === 25) {
        howmuch = 90;
        size = "50px";
        imageSet = IMAGE_CHRISTMAS_SET;
        backgroundImage = (isMobileOnly) ? WALLPAPER_CHRISTMAS.default : WALLPAPER_CHRISTMAS_DESKTOP.default;
      }
      break;
  }
  return { backgroundImage, imageSet, size, howmuch }
}

const App = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [spectrumIndex, setSpectrumIndex] = useState(2);
  const [mediaButtonText, setMediaButtonText] = useState(Strings.PLAY);
  const [isPlaying, setIsPlaying] = useState(false);
  const [welcome, setWelcome] = useState(getWelcomeText());
  const [backgroundBuilder] = useState(getBackgroundStyleBuild());
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setWelcome(getWelcomeText());
      if (isPlaying) {
        setIframeKey(iframeKey + 1);
      }
    }, 60000);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setIframeKey(iframeKey + 1);
    }
  }, [isPlaying]);

  const play = (event) => {
    event.preventDefault();
    let player = document.getElementById("audio-element");
    if (isPlaying) {
      setMediaButtonText(Strings.PLAY);
      player.pause();
      setIsPlaying(false);
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
    player.play();
    let mediaButton = document.getElementById("media-button");
    mediaButton.focus();
  };

  return (
    <div style={{ opacity: 0.9, backgroundImage: `url(${backgroundBuilder.backgroundImage})`, backgroundRepeat: "no-repeat", display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center", maxHeight: height, height: height }}>
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
          {isPlaying && <marquee behavior="scroll">
            <embed type="text/html" src={CURRET_TRACK} height="48px" width="100%" />
          </marquee>
          }
          <button className={`${isPlaying ? "" : "change-button-hide"} change-button`} onClick={changeSpectrum}>
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
          capColor={MeterColors.LIST[spectrumIndex][MeterColors.LIST[spectrumIndex].length - 1].color}
          capHeight={2}
          meterWidth={6}
          meterCount={512}
          meterColor={MeterColors.LIST[spectrumIndex]}
          gap={0.75} />
      </div>
      <Sky
        images={backgroundBuilder.imageSet}
        how={backgroundBuilder.howmuch} /* Pass the number of images Sky will render chosing randomly */
        time={60} /* time of animation */
        size={backgroundBuilder.size} /* size of the rendered images */
        background={`url(${backgroundBuilder.backgroundImage})`} /* color of background */
      />
    </div>
  );
};

export default App;
