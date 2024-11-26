"use client"
import React from 'react'
import Lottie from "react-lottie"
import animation from "../Lottie/noddingman.json"

function NoddingAnimation() {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
  return (
    <div>
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
  )
}

export default NoddingAnimation