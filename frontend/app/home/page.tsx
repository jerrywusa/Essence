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
    lessonId: "id1",
  },
  {
    image: img,
    title: "title 2",
    speechType: "monologue",
    lessonId: "id2",
  },
  {
    image: img,
    title: "title 3",
    speechType: "monologue",
    lessonId: "id3",
  },
  {
    image: img,
    title: "title 4",
    speechType: "monologue",
    lessonId: "id4",
  },
  {
    image: img,
    title: "title 5",
    speechType: "dialogue",
    lessonId: "id5",
  },
];

const name = "Jerry";

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <div
        style={{
          paddingLeft: "25px",
          paddingBottom: "50px",
          paddingTop: "30px",
          fontSize: "56px",
          fontWeight: "bold",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Welcome back, {name}!
      </div>
      <Lessons lessons={lessonArr} />;
    </>
  );
};

export default Home;
