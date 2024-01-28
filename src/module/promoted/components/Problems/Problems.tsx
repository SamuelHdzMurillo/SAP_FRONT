import { Problem } from "@/module/problem/store";
import ProblemC from "./ProblemC";
const Problems = ({ problems }: { problems: Problem[] }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {problems.map((problem) => (
        <ProblemC key={problem.id} {...problem} />
      ))}
    </div>
  );
};

export default Problems;
