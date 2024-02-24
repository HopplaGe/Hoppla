import {motion} from "framer-motion";
import {Dispatch, SetStateAction} from "react";

type OptionsProps = {
    votes: { title: string; votes: number; color: string }[];
    setVotes: Dispatch<SetStateAction<{ title: string; votes: number; color: string }[]>>;
}

const Options = ({votes, setVotes}: OptionsProps) => {
    const totalVotes = votes.reduce((acc, cv) => (acc += cv.votes), 0);

    const handleIncrementVote = (vote: any) => {
        const newVote = {...vote, votes: vote.votes + 1};

        setVotes((pv) => pv.map((v) => (v.title === newVote.title ? newVote : v)));
    };

    return (
        <div className="col-span-1 py-12">
            <h3 className="mb-6 text-3xl font-semibold text-default-800">
                გისარგებლიათ თუ არა ჰოპლას მსგავსი სერვისით?
            </h3>
            <div className="mb-6 space-y-2 flex flex-col">
                {votes.map((vote) => {
                    return (
                        <motion.button
                            whileHover={{scale: 1.015}}
                            whileTap={{scale: 0.985}}
                            onClick={() => handleIncrementVote(vote)}
                            key={vote.title}
                            className={`rounded-md ${vote.color} py-2 font-medium text-white fira-go text-center flex-none`}
                        >
                            {vote.title}
                        </motion.button>
                    );
                })}
            </div>
            <div className="flex items-center justify-between">
                <span className="mb-2 text-default-400 fira-go text-xs">სულ {totalVotes} პასუხი</span>
                {/*<motion.button*/}
                {/*    whileHover={{scale: 1.015}}*/}
                {/*    whileTap={{scale: 0.985}}*/}
                {/*    onClick={() => {*/}
                {/*        setVotes((pv) => pv.map((v) => ({...v, votes: 0})));*/}
                {/*    }}*/}
                {/*    className="rounded-sm px-2 py-1.5 text-sm font-medium text-default-300 fira-go"*/}
                {/*>*/}
                {/*    მთვლელის განულება*/}
                {/*</motion.button>*/}
            </div>
        </div>
    );
};

export default Options;