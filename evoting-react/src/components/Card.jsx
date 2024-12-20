import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Card({ election }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [statusMessage, setStatusMessage] = useState("");

    const startDate = new Date(`${election.start_date} ${election.start_time}`);
    const endDate = new Date(`${election.end_date} ${election.end_time}`);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            if (now < startDate) {
                const diff = startDate - now;
                const totalSeconds = Math.floor(diff / 1000);
                const days = Math.floor(totalSeconds / (60 * 60 * 24));
                const hours = Math.floor(
                    (totalSeconds % (60 * 60 * 24)) / (60 * 60)
                );
                const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
                const seconds = totalSeconds % 60;

                setStatusMessage("Election hasn't started yet. Starts in:");
                return { days, hours, minutes, seconds };
            } else if (now >= startDate && now < endDate) {
                const diff = endDate - now;
                const totalSeconds = Math.floor(diff / 1000);
                const days = Math.floor(totalSeconds / (60 * 60 * 24));
                const hours = Math.floor(
                    (totalSeconds % (60 * 60 * 24)) / (60 * 60)
                );
                const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
                const seconds = totalSeconds % 60;

                setStatusMessage("Election is ongoing. Ends in:");
                return { days, hours, minutes, seconds };
            } else {
                setStatusMessage("Election has ended.");
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
        };

        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="p-8 max-w-lg bg-white rounded-2xl hover:shadow-sm flex flex-col items-center shadow-sm">
            <h4 className="font-bold text-xl">{election.name}</h4>

            <div className="mt-2 text-gray-700 text-center">
                <p className="text-base ">{statusMessage}</p>
                {statusMessage !== "Election has ended." && (
                    <div>
                        {timeLeft.days > 0 && (
                            <span>{timeLeft.days} days </span>
                        )}
                        <span>{String(timeLeft.hours).padStart(2, "0")}:</span>
                        <span>
                            {String(timeLeft.minutes).padStart(2, "0")}:
                        </span>
                        <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                    </div>
                )}
            </div>
            <div className="mt-5">
                <Link
                    to={`election/${election.id}`}
                    className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary"
                >
                    Show
                </Link>
            </div>
        </div>
    );
}

export default Card;
