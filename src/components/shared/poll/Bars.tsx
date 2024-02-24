import {motion} from "framer-motion";

type BarsProps = {
    votes: { title: string; votes: number; color: string }[];
}

const Bars = ({votes}: BarsProps) => {
    const totalVotes = votes.reduce((acc, cv) => (acc += cv.votes), 0);

    return (
        <div
            className="col-span-1 grid min-h-[200px] gap-2"
            style={{
                gridTemplateColumns: `repeat(${votes.length}, minmax(0, 1fr))`,
            }}
        >
            {votes.map((vote) => {
                const height = vote.votes
                    ? ((vote.votes / totalVotes) * 100).toFixed(2)
                    : 0;
                return (
                    <div key={vote.title} className="col-span-1">
                        <div
                            className="relative flex h-full w-full items-end overflow-hidden rounded-2xl bg-gradient-to-b from-default-50 to-default-100">
                            <motion.span
                                animate={{height: `${height}%`}}
                                className={`relative z-0 w-full rounded-xl ${vote.color}`}
                                transition={{type: "spring"}}
                            />
                            <span
                                className="absolute bottom-0 left-[50%] mt-2 inline-block w-full -translate-x-[50%] p-2 text-center text-sm text-slate-50">
                                <b className="fira-go">{vote.title}</b>
                                <br></br>
                                <span className="text-xs text-default-200 fira-go">
                                  {vote.votes} პასუხი
                                </span>
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Bars;