<<<<<<< HEAD
"use client";

import { FunctionComponent, useContext } from "react";
import Lessons from "./lessons";
import { Context } from "../page";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { lessons, name } = useContext(Context);
=======


import { FunctionComponent } from "react";
import img from "./wows ss.jpeg";
import Lessons from "./lessons";
import { LessonType } from "../types";
import { currentUser } from '@clerk/nextjs/server';

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

const Home: FunctionComponent<HomeProps> = async () => {
  const user = await currentUser();

  // Determine the greeting text
  let greetingText = "Welcome!";
  if (user) {
    greetingText = `Welcome back, ${user.firstName || user.fullName || 'there'}!`;
  }
>>>>>>> 306bd96bda713d5d0a910a598218566a0402906c

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
        {greetingText}
      </div>
<<<<<<< HEAD
      <Lessons lessons={lessons} />;
=======
      {user && <Lessons lessons={lessonArr} />}
>>>>>>> 306bd96bda713d5d0a910a598218566a0402906c
    </>
  );
};

export default Home;