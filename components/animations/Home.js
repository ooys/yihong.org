import Typewriter from "typewriter-effect";

function HomeAnimation() {
    return (
        <div
            className={
                "absolute w-[100%] z-10 animate-[disappear_3s_ease-in-out_forwards]"
            }>
            <div className="static bg-[#ffffff] h-screen text-center py-[30vh] ">
                <div className=" font-title text-[14vw] md:text-[10vw] lg:text-[8vw]">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter

                                .typeString("Hello.")
                                .callFunction(() => {
                                    console.log("String typed out!");
                                })
                                .start();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomeAnimation;
