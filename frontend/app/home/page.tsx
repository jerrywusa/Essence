import { FunctionComponent } from "react";
import img from "./wows ss.jpeg";
import Lessons from "./lessons";
import { LessonType } from "../types";
import { currentUser } from "@clerk/nextjs/server";

interface HomeProps {}

const lessonArr: Array<LessonType> = [
  {
    image: img,
    title: "title 1",
    speechType: "dialogue",
    lessonId: "id1",
    videoLink: "http://localhost:3003/videos/ForestGump.mp4",
  },
  {
    image: img,
    title: "title 2",
    speechType: "monologue",
    lessonId: "id2",
    videoLink: "http://localhost:3003/videos/ForestGump.mp4",
  },
  {
    image: img,
    title: "title 3",
    speechType: "monologue",
    lessonId: "id3",
    videoLink: "http://localhost:3003/videos/ForestGump.mp4",
  },
  {
    image: img,
    title: "title 4",
    speechType: "monologue",
    lessonId: "id4",
    videoLink: "http://localhost:3003/videos/ForestGump.mp4",
  },
  {
    image: img,
    title: "title 5",
    speechType: "dialogue",
    lessonId: "id5",
    videoLink: "http://localhost:3003/videos/ForestGump.mp4",
  },
];

const Home: FunctionComponent<HomeProps> = async () => {
  const user = await currentUser();

  // Determine the greeting text
  let greetingText = "Welcome!";
  if (user) {
    greetingText = `Welcome back, ${
      user.firstName || user.fullName || "there"
    }!`;
  }

  return (
    <>
      <div
        style={{
          paddingLeft: "70px",
          paddingBottom: "50px",
          paddingTop: "30px",
          fontSize: "56px",
          fontWeight: "bold",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {greetingText}
      </div>
      {user && <Lessons lessons={lessonArr} />}
    </>
  );
};

export default Home;
