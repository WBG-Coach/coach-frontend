import React from "react";
import { StyledImage } from "./styles";
import { ImageProps } from "./types";

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <StyledImage
      {...props}
      src={
        props.src.startsWith("http")
          ? props.src
          : window.location.origin +
            (process.env.REACT_APP_BASENAME
              ? "/" + process.env.REACT_APP_BASENAME + "/"
              : "") +
            (props.src.startsWith("./") ? props.src.substring(2) : props.src)
      }
    />
  );
};
