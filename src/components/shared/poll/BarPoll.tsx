"use client"
import {useState} from "react";
import {motion} from "framer-motion";
import Options from "@/components/shared/poll/BarPollOptions";
import Bars from "@/components/shared/poll/Bars";

const BarPoll = () => {
    const [votes, setVotes] = useState([
        {
            title: "დიახ",
            votes: 1,
            color: "bg-default",
        },
        {
            title: "არა",
            votes: 2,
            color: "bg-secondary",
        },
        {
            title: "არც კი მსმენია",
            votes: 2,
            color: "bg-violet-500",
        }
    ]);

    return (
        <section className="px-4 py-12">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-2 md:grid-cols-[1fr_400px] md:gap-12">
                <Options votes={votes} setVotes={setVotes}/>
                <Bars votes={votes}/>
            </div>
        </section>
    );
};

export default BarPoll;