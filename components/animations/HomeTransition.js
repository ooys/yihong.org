import { useState, useEffect } from "react";

function HomeTransition({ props }) {
    const [pos, setPos] = useState(0);

    useEffect(() => {
        console.log(props);
        function checkPos() {
            const t = props.current.container.current.scrollTop;
            const frame = t / window.innerHeight;
            console.log(frame);
            setPos(frame);
        }
        props.current.container.current.onscroll = checkPos;
    });

    return (
        <div
            className={"w-[100vw] h-[500vh] mt-[100vh]"}
            style={{
                backgroundColor: "rgba(0, 0, 0, " + (pos - 1.5) * 3 + ")",
            }}></div>
    );
}

export default HomeTransition;
