import { Problem } from "@/module/problem/store";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
const URL = import.meta.env.VITE_API_URL;

const ProblemC = ({ id, problem_img_path, description, title }: Problem) => {
  return (
    <Card
      style={{ width: "100%", maxWidth: "400px", margin: "20px auto" }}
      cover={<img alt="example" src={`${URL}/storage/${problem_img_path}`} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default ProblemC;
