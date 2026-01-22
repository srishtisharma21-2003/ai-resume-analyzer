import { useEffect, useState } from "react";

const ScoreCircle = ({ score = 75, id }: { score: number; id: string }) => {
    const radius = 55;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => setProgress(score / 100), 150);
        return () => clearTimeout(t);
    }, [score]);

    const strokeDashoffset = circumference * (1 - progress);
    const gradientId = `grad-${id}`;

    return (
        <div className="relative w-[140px] h-[140px]">
            <svg viewBox="0 0 140 140" className="-rotate-90">
                <circle
                    cx="70"
                    cy="70"
                    r={normalizedRadius}
                    stroke="#e5e7eb"
                    strokeWidth={stroke}
                    fill="transparent"
                />

                <defs>
                    <linearGradient id={gradientId} x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF97AD" />
                        <stop offset="100%" stopColor="#5171FF" />
                    </linearGradient>
                </defs>

                <circle
                    cx="70"
                    cy="70"
                    r={normalizedRadius}
                    stroke={`url(#${gradientId})`}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center font-semibold">
                {score}/100
            </div>
        </div>
    );
};

export default ScoreCircle;
