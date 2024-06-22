import { FunctionComponent } from "react";
import img from "./wows ss.jpeg";
import Lessons from "./lessons";
import { LessonType } from "../types";

interface HomeProps {}

const lessonArr: Array<LessonType> = [
  {
    image: img,
    title: "title 1",
    speechType: "dialogue",
  },
  {
    image: img,
    title: "title 2",
    speechType: "monologue",
  },
  {
    image: img,
    title: "title 3",
    speechType: "monologue",
  },
  {
    image: img,
    title: "title 4",
    speechType: "monologue",
  },
  {
    image: img,
    title: "title 5",
    speechType: "dialogue",
  },
];

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <div>welcome back ava</div>
      <Lessons lessons={lessonArr} />;
    </>
  );
};

export default Home;
