import HomeAnimation from "../components/animations/HomeAnimation";
import HomeBackground from "../components/animations/HomeBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
    faPython,
    faJsSquare,
    faJava,
    faReact,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useState, useEffect, useRef } from "react";
import {
    faChevronDown,
    faExternalLinkAlt,
    faBook,
} from "@fortawesome/free-solid-svg-icons";
import Sun from "/components/Sun.js";

export default function Home() {
    const [timer, setTimer] = useState(0);
    const [pos, setPos] = useState(0);
    const ref = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer <= 10) {
                setTimer(timer + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        function checkPos() {
            const t = ref.current.container.current.scrollTop;
            const frame = t / window.innerHeight;
            console.log(frame);
            setPos(frame);
        }
        ref.current.container.current.onscroll = checkPos;
    });

    return (
        <>
            <HomeAnimation />
            <Parallax
                pages={4}
                style={{ top: "0", left: "0", backgroundColor: "white" }}
                ref={ref}>
                <ParallaxLayer offset={0} speed={1}>
                    <HomeBackground timer={timer} />
                </ParallaxLayer>
                <ParallaxLayer offset={0.5} speed={0.1}>
                    {/* Clouds */}
                    <img
                        src="/images/clouds.svg"
                        className="mt-[70vh] h-[100vh] overflow-hidden scale-[2.3]"></img>
                </ParallaxLayer>

                <ParallaxLayer offset={0.85} speed={0.25}>
                    {/* Scroll Down Button */}
                    <div className="text-center">
                        <a
                            href="javascript:void(0)"
                            onClick={() => ref.current.scrollTo(1)}
                            className=" transition-colors hover:text-blue text-[1rem] animate-[appear_8s_ease-in-out_forwards] ">
                            <span className="icon">
                                <FontAwesomeIcon
                                    className="fa-lg"
                                    icon={faChevronDown}></FontAwesomeIcon>
                            </span>
                        </a>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={0.85} speed={0.6} className="mt-[15vh]">
                    {/* Coding Section Introduction */}
                    <div className="bg-blue h-[60vh] px-[15vw] pt-[8vh]">
                        <div className="text-white font-title text-[8vw] md:text-[4vw] lg:text-[4vw] ">
                            Software Developer
                        </div>
                        <div className="text-white font-subtitle lg:text-[1.5vw] md:text-[2vw]">
                            I am a full stack web developer with a passion for
                            machine learning, automation, and optimization.
                        </div>
                        <div className="text-white pt-[4vh] text-[6vw] md:text-[3vw] lg:text-[2.5vw]">
                            <span className="icon pr-[1.5rem]">
                                <FontAwesomeIcon
                                    className="fa-lg"
                                    icon={fab.faReact}></FontAwesomeIcon>
                            </span>
                            <span className="icon pr-[1.5rem]">
                                <FontAwesomeIcon
                                    className="fa-lg"
                                    icon={fab.faPython}></FontAwesomeIcon>
                            </span>
                            <span className="icon pr-[1.5rem]">
                                <FontAwesomeIcon
                                    className="fa-lg"
                                    icon={fab.faJsSquare}></FontAwesomeIcon>
                            </span>
                            <span className="icon">
                                <FontAwesomeIcon
                                    className="fa-lg"
                                    icon={fab.faJava}></FontAwesomeIcon>
                            </span>
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={1}>
                    <div
                        className={"w-[100vw] h-[500vh] mt-[100vh]"}
                        style={{
                            backgroundColor:
                                "rgba(0, 0, 0, " + (pos - 1.5) * 3 + ")",
                        }}></div>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={2}>
                    <div className=" h-[100vh] px-[10vw] pt-[15vh]">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <img
                                src="/images/rvhnhs.png"
                                className="rounded-2xl shadow-xl max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]"></img>
                            <div className=" bg-white shadow-xl	mt-[-2vh] md:mt-[8vh] px-[2rem] py-[2rem] w-[80vw] md:w-[40vw] rounded-2xl h-auto">
                                <div className="text-black font-title text-[5vw] md:text-[4vw] lg:text-[2vw] text-center md:text-left">
                                    Riverside NHS Portal
                                </div>
                                <div className="bg-blue h-[0.25rem] rounded-2xl my-[0.5rem]"></div>
                                <div className="text-black font-subtitle md:text-[1rem] lg:text-[1.125rem] ">
                                    <ul className="list-disc ml-[1rem]">
                                        <li>
                                            Dynamic website optimizing
                                            volunteering and tutoring
                                            experiences through clean designs
                                            and personalized profiles for 300+
                                            Riverside High School NHS members,
                                            officers, and administrators.
                                        </li>
                                        <li>
                                            First fully student-made project to
                                            be certified by Loudoun County
                                            Department of Digital Innovation.
                                        </li>
                                        <li>
                                            Built through Next JS front-end and
                                            Firebase back-end in JSX and CSS.
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-black text-[1.75rem] mt-[1rem]">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://rvhnhs.vercel.app"
                                        className="transition-colors hover:text-blue">
                                        <span className="icon pr-[1.5rem]">
                                            <FontAwesomeIcon
                                                className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                                icon={
                                                    faExternalLinkAlt
                                                }></FontAwesomeIcon>
                                        </span>
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://github.com/michaelsong4399/rvhsnhs.org"
                                        className="transition-colors hover:text-blue">
                                        <span className="icon pr-[1.5rem]">
                                            <FontAwesomeIcon
                                                className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                                icon={
                                                    fab.faGithub
                                                }></FontAwesomeIcon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-[50vh]">
                            <div className=" bg-white shadow-xl	mt-[-2vh] md:mt-[15vh] px-[2rem] py-[2rem] w-[80vw] md:w-[40vw] rounded-2xl h-auto z-10">
                                <div className="text-black font-title text-[5vw] md:text-[4vw] lg:text-[2vw] text-center md:text-left">
                                    ACL Pi-a-thon Contest
                                </div>
                                <div className="bg-blue h-[0.25rem] rounded-2xl my-[0.5rem]"></div>
                                <div className="text-black font-subtitle md:text-[1rem] lg:text-[1.125rem] ">
                                    <ul className="list-disc ml-[1rem]">
                                        <li>
                                            Week-long virtual competition of
                                            math challenges, riddles, and
                                            puzzles uniting passionate Academies
                                            of Loudoun students.
                                        </li>
                                        <li>
                                            Prize pool of $850.00 funded by
                                            Academies of Loudoun PTSO and
                                            awarded to winners.
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-black text-[1.75rem] mt-[1rem]">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://aclsms.vercel.app/piathon-2021"
                                        className="transition-colors hover:text-blue">
                                        <span className="icon pr-[1.5rem]">
                                            <FontAwesomeIcon
                                                className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                                icon={
                                                    faExternalLinkAlt
                                                }></FontAwesomeIcon>
                                        </span>
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://github.com/michaelsong4399/ACL-secret-math-society"
                                        className="transition-colors hover:text-blue">
                                        <span className="icon pr-[1.5rem]">
                                            <FontAwesomeIcon
                                                className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                                icon={
                                                    fab.faGithub
                                                }></FontAwesomeIcon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <img
                                src="/images/piathon.png"
                                className="rounded-2xl shadow-xl max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw] md:ml-[-10vw]"></img>
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={2.75} speed={0.5} style={{}}>
                    <Sun />
                </ParallaxLayer>
                <ParallaxLayer offset={2.75} speed={1.5} style={{}}>
                    <div className=" h-[100vh] px-[10vw]">
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-[50vh]">
                            <div className=" bg-white shadow-xl	mt-[-2vh] md:mt-[15vh] px-[2rem] py-[2rem] w-[80vw] md:w-[40vw] rounded-2xl h-auto z-10">
                                <div className="text-black font-title text-[5vw] md:text-[4vw] lg:text-[2vw] text-center md:text-left">
                                    Starzam
                                </div>
                                <div className="bg-blue h-[0.25rem] rounded-2xl my-[0.5rem]"></div>
                                <div className="text-black font-subtitle md:text-[1rem] lg:text-[1.125rem] ">
                                    <ul className="list-disc ml-[1rem]">
                                        <li>
                                            Star properties, measured from light
                                            curves.
                                        </li>
                                        <li>
                                            Machine learning research inspired
                                            by the Shazam music recognition
                                            algorithm.
                                        </li>
                                        <li>
                                            2nd Place Winner of Mathematics and
                                            Physics & Astronomy at 2022 Loudoun
                                            County Regional Science and
                                            Engineering Fair
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-black text-[1.75rem] mt-[1rem]">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://starzam.yihong.org/"
                                        className="transition-colors hover:text-blue">
                                        <span className="icon pr-[1.5rem]">
                                            <FontAwesomeIcon
                                                className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                                icon={
                                                    faExternalLinkAlt
                                                }></FontAwesomeIcon>
                                        </span>
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://github.com/michaelsong4399/starzam"
                                        className="transition-colors hover:text-blue">
                                        <span className="icon pr-[1.5rem]">
                                            <FontAwesomeIcon
                                                className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                                icon={
                                                    fab.faGithub
                                                }></FontAwesomeIcon>
                                        </span>
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="/docs/starzam.pdf"
                                        className="transition-colors hover:text-blue">
                                        <span className="icon pr-[1.5rem]">
                                            <FontAwesomeIcon
                                                className="fa-lg hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
                                                icon={faBook}></FontAwesomeIcon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </>
    );
}
