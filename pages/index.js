import HomeAnimation from "../components/animations/HomeAnimation";
import HomeBackground from "../components/animations/HomeBackground";

import React, { useState, useEffect } from "react";

export default function Home() {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer <= 10) {
                setTimer(timer + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <>
            <div className="absolute w-[100%] z-0 scroll-smooth">
                <HomeAnimation />
                <HomeBackground timer={timer} />
                {/* <div className="static bg-[#ffffff] h-[100vh] pt-[20vh] lg:pt-[30vh] px-[15vw] grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                    <div className=""></div>
                    <div className="text-left">
                        <div className=" font-title text-[4vw] md:text-[2vw] lg:text-[1.5vw] ">
                            {timer <= 4 ? (
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            .pauseFor(3000)
                                            .typeString("I am")
                                            .start();
                                    }}
                                />
                            ) : (
                                //else, show the text
                                <>
                                    <span className="font-title text-[4vw] md:text-[2vw] lg:text-[1.5vw]">
                                        I am
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="font-title animate-[appear_5s_ease-in-out_forwards] text-[8vw] md:text-[4vw] lg:text-[4vw] ">
                            Yihong Song.
                        </div>
                        <div className="font-title animate-[appear_6s_ease-in-out_forwards] text-[3vw] md:text-[2vw] lg:text-[1.5vw] ">
                            Developer, Composer, Entrepreneur
                        </div>
                        <div className="my-4 animate-[appear_7s_ease-in-out_forwards] font-title text-[4vw] md:text-[3vw] lg:text-[2vw]">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/michaelsong4399"
                                className="mr-4 transition-colors lg:mr-6 hover:text-green">
                                Github
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}
