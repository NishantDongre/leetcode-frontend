import React, { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaArrowRotateLeft, FaRegCirclePause } from "react-icons/fa6";
import { GiAlarmClock } from "react-icons/gi";
const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isActive && !isPaused) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePausePlay = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsPaused(false);
        setSeconds(0);
    };

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}m ${secs}s`;
    };

    return (
        <div>
            {!isActive && !isPaused && (
                <button
                    onClick={handleStart}
                    className="flex gap-2 px-1 items-center border-[1px] rounded-md"
                >
                    <GiAlarmClock /> Start Timer <FaRegPlayCircle />
                </button>
            )}
            {isActive && (
                <div className="flex gap-2 justify-center items-center">
                    <GiAlarmClock /> Your Time: {formatTime(seconds)}
                    <button onClick={handlePausePlay}>
                        {isPaused ? <FaRegPlayCircle /> : <FaRegCirclePause />}
                    </button>
                    <button onClick={handleReset}>
                        <FaArrowRotateLeft />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Timer;
