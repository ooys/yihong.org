import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import HomeAnimation from "../components/animations/Home";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Typewriter from "typewriter-effect";

export default function Home() {
    //timer that updates every second
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
            <HomeAnimation />
            <div className="absolute w-[100%] z-0 scroll-smooth">
                <div className="static bg-[#ffffff]  h-[100vh] pt-[20vh] lg:pt-[20vh] px-[15vw] grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                    <div className="text-left lg:pt-[10vh]">
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
                            <span className="mr-4 lg:mr-6">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://github.com/michaelsong4399"
                                    className="transition-colors hover:text-green">
                                    <span className="icon ">
                                        <FontAwesomeIcon
                                            className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                            icon={
                                                fab.faGithub
                                            }></FontAwesomeIcon>
                                    </span>
                                </a>
                            </span>
                            <span className="mr-4 lg:mr-6">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.linkedin.com/in/yihongs/"
                                    className="mr-4 transition-colors lg:mr-6 hover:text-green">
                                    <span className="icon">
                                        <FontAwesomeIcon
                                            className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                            icon={
                                                fab.faLinkedin
                                            }></FontAwesomeIcon>
                                    </span>
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <div className="animate-[appear_8s_ease-in-out_forwards]">
                            <Image
                                src="/images/profile.svg"
                                layout="responsive"
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
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
