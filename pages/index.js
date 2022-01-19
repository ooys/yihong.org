import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <div className="absolute w-[100%]">
            <div className="static bg-dark h-[100vh] pt-[20vh] lg:pt-[30vh] px-[15vw] grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                <div className="text-left">
                    <div className="text-white font-title text-[4vw] md:text-[2vw] lg:text-[1.5vw] ">
                        I am
                    </div>
                    <div className="text-white font-title text-[8vw] md:text-[4vw] lg:text-[4vw] ">
                        Yihong Song.
                    </div>
                    <div className="text-white font-title text-[3vw] md:text-[2vw] lg:text-[1.5vw] ">
                        Developer, Composer, Entrepreneur
                    </div>
                    <div className="text-white my-4 font-title text-[4vw] md:text-[3vw] lg:text-[2vw]">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/michaelsong4399"
                            className="mr-4 lg:mr-6">
                            <span className="icon">
                                <FontAwesomeIcon
                                    className="fa-lg"
                                    icon={fab.faGithub}></FontAwesomeIcon>
                            </span>
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/yihongs/">
                            <span className="icon">
                                <FontAwesomeIcon
                                    className="fa-lg"
                                    icon={fab.faLinkedin}></FontAwesomeIcon>
                            </span>
                        </a>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </div>
    );
}
