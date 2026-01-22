import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter"; // Keep original path
import {useNavigate} from "react-router";
import {useEffect} from "react";

const resumes = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        feedback: { overallScore: 85 },
        imagePath: "resume_01.png",
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        feedback: { overallScore: 65 },
        imagePath: "resume_02.png",
    },
    {
        id: "3",
        companyName: "Amazon",
        jobTitle: "Backend Developer",
        feedback: { overallScore: 78 },
        imagePath: "resume_03.png",
    },
];

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumied" },
        { name: "description", content: "great feedback for your dream job!" },
    ];
}

export default function Home() {
    const {isLoading, auth} = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.isAuthenticated) {
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated, navigate]);

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center">
            <Navbar />

            <section className="main-section">
                <div className="page-heading">
                    <h1 className="text-green-500">Track your Application & Resume Rating</h1>
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                </div>

                <div className="resumes-section grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resumes.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume} />
                    ))}
                </div>
            </section>
        </main>
    );
}