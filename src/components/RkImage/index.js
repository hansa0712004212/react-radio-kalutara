import React from "react";

const RkImage = ({ source, width, height, style }) => {
  return (
    <img src={source.default} width={width} height={height} style={style} alt="" />
  )
}

export default RkImage;