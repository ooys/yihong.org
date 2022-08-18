import HomeAnimation from "../components/animations/HomeAnimation";
import HomeBackground from "../components/animations/HomeBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faDiscord } from "@fortawesome/free-brands-svg-icons";
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
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Sun from "/components/Sun.js";
import HomeTransition from "../components/animations/HomeTransition";

export default function Home() {
    const ref = useRef();
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (item, text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(item);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        });
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        // e.target.focus();
        // this.setState({ copySuccess: "Copied!" });
    };

    return (
        <>
            <Parallax
                pages={4.2}
                style={{ top: "0", left: "0", backgroundColor: "white" }}
                ref={ref}>
                <ParallaxLayer offset={1} speed={0.1}>
                    <img
                        src="/images/clouds.svg"
                        className="mt-[70vh] h-[100vh] overflow-hidden scale-[2.3]"></img>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={1}>
                    <HomeAnimation />
                    <HomeBackground />
                </ParallaxLayer>

                <ParallaxLayer offset={0.85} speed={0.25}>
                    {/* Scroll Down Button */}
                    <div className="text-center">
                        <a
                            href="javascript:void(0)"
                            onClick={() => ref.current.scrollTo(1)}
                            className="transition-colors hover:text-blue text-[1rem] animate-[appear_8s_ease-in-out_forwards] ">
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
                    <HomeTransition props={ref} />
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={2}>
                    <div className=" h-[100vh] px-[10vw] pt-[15vh]">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <img
                                src="/images/rvhnhs.png"
                                className=" shadow-xl max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]"></img>
                            <div className=" bg-white shadow-xl	mt-[-2vh] md:mt-[8vh] px-[2rem] py-[2rem] w-[80vw] md:w-[40vw]  h-auto">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-[40vh]">
                            <div className=" bg-white shadow-xl	mt-[-2vh] md:mt-[15vh] px-[2rem] py-[2rem] w-[80vw] md:w-[40vw] h-auto z-10">
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
                                className="shadow-xl max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw] md:ml-[-10vw]"></img>
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={2.75} speed={0.5} style={{}}>
                    <Sun />
                </ParallaxLayer>
                <ParallaxLayer offset={2.75} speed={1.5} style={{}}>
                    <div className=" h-[100vh] px-[10vw]">
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-[50vh]">
                            <div className=" bg-white shadow-xl	mt-[-2vh] md:mt-[15vh] px-[2rem] py-[2rem] w-[80vw] md:w-[40vw] h-auto z-10">
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
                    {/* <div className="bg-white h-[20vh] mt-[-21vh]">
                        <div className="text-black">Yihong Song</div>
                    </div> */}
                </ParallaxLayer>
                <ParallaxLayer offset={3.2} speed={0.25}>
                    <div className="bg-black h-[90vh] mt-[15vh] pt-[15vh] px-[15vw]">
                        <div className="text-white font-title text-[8vw] md:text-[4vw] lg:text-[4vw] ">
                            Contact Me
                        </div>
                        <div className="text-white font-title mt-[5vh] text-[6vw] md:text-[2vw] transition-colors hover:text-green w-[13rem]">
                            <a
                                href="javascript: void(0)"
                                onClick={() => {
                                    copyToClipboard(
                                        "Discord",
                                        "michaelsong4399#2750"
                                    );
                                }}>
                                <span className="icon pr-[1.5rem]">
                                    <FontAwesomeIcon
                                        className="fa-lg "
                                        icon={faDiscord}></FontAwesomeIcon>
                                </span>
                                {copied == "Discord" ? "Copied!" : "Discord"}
                            </a>
                        </div>
                        <div className="text-white font-title mt-[5vh] text-[6vw] md:text-[2vw] transition-colors hover:text-green w-[12rem]">
                            <a
                                href="javascript: void(0)"
                                onClick={() => {
                                    copyToClipboard("Email", "song@yihong.org");
                                }}>
                                <span className="icon pr-[1.9rem] pl-[0.25rem]">
                                    <FontAwesomeIcon
                                        className="fa-lg "
                                        icon={faEnvelope}></FontAwesomeIcon>
                                </span>
                                {copied == "Email" ? "Copied!" : "Email"}
                            </a>
                        </div>
                    </div>
                </ParallaxLayer>
                {/* <ParallaxLayer offset={3} speed={2} className="mt-[15vh]">
                    
                    <div className="bg-green h-[60vh] px-[15vw] pt-[8vh]">
                        <div className="text-white font-title text-[8vw] md:text-[4vw] lg:text-[4vw] ">
                            Composer
                        </div>
                        <div className="text-white font-subtitle lg:text-[1.5vw] md:text-[2vw]">
                            I am a composer and arranger for
                            contemporary-classical chamber orchestra music.
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
                </ParallaxLayer> */}
            </Parallax>
        </>
    );
}
