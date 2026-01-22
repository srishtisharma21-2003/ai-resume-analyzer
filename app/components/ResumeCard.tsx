import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

const ResumeCard = ({
                        resume: { id, companyName, jobTitle, feedback, imagePath },
                    }: {
    resume: Resume;
}) => {
    return (
        <Link
            to={`/resume/${id}`}
            className="resume-card backdrop-blur-md bg-white/70 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
            <div className="flex justify-between items-start p-4">
                <div>
                    <h2 className="font-bold text-black">{companyName}</h2>
                    <h3 className="text-gray-500">{jobTitle}</h3>
                </div>

                <ScoreCircle score={feedback.overallScore} id={id} />
            </div>

            <div className="m-4 overflow-hidden rounded-xl">
                <img
                    src={`/images/${imagePath}`}
                    alt="resume"
                    className="w-full h-[480px] object-cover"
                    onError={(e) => {
                        console.log("Image failed:", `/images/${imagePath}`);
                        e.currentTarget.src = "/images/resume_01.png";
                    }}
                />
            </div>
        </Link>
    );
};

export default ResumeCard;
