import { FunctionComponent } from "react";
import img from "./wows ss.jpeg";
import Lessons from "./lessons";
import { LessonType } from "../types";
import Header from "./header";

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

const name = "Jerry";

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Header />
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
