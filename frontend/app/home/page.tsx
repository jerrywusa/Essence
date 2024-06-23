"use client";

import { FunctionComponent, useContext } from "react";
import Lessons from "./lessons";
import { Context } from "../page";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { lessons, name } = useContext(Context);

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
      <Lessons lessons={lessons} />;
    </>
  );
};

export default Home;
