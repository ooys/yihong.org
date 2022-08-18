import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";

// import Image  from "next/image";
import Typewriter from "typewriter-effect";
import { faFile, faFileAlt } from "@fortawesome/free-solid-svg-icons";

function HomeBackground() {
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
                    Coder, Composer, Entrepreneur
                </div>
                <div className="my-4 animate-[appear_7s_ease-in-out_forwards] font-title text-[4vw] md:text-[3vw] lg:text-[2vw]">
                    <span className="mr-4 lg:mr-6">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/michaelsong4399"
                            className="transition-colors hover:text-green">
                            <span className="icon">
                                <FontAwesomeIcon
                                    className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                    icon={fab.faGithub}></FontAwesomeIcon>
                            </span>
                        </a>
                    </span>
                    <span className="mr-4 lg:mr-7">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/yihongs/"
                            className="transition-colors hover:text-green">
                            <span className="icon">
                                <FontAwesomeIcon
                                    className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                    icon={fab.faLinkedin}></FontAwesomeIcon>
                            </span>
                        </a>
                    </span>
                    <span className="mr-4 lg:mr-6">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="/docs/resume.pdf"
                            className="transition-colors hover:text-green">
                            <span className="icon">
                                <FontAwesomeIcon
                                    className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                    icon={faFileAlt}></FontAwesomeIcon>
                            </span>
                        </a>
                    </span>
                </div>
            </div>
            <div className="">
                {/* <div className="animate-[appear_8s_ease-in-out_forwards]">
            <Image
                src="/images/profile.svg"
                layout="responsive"
                width="100%"
                height="100%"
            />
        </div> */}
            </div>
        </div>
    );
}

export default HomeBackground;
