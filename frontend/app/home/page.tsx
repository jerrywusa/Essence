import { FunctionComponent } from "react";
import Lessons from "./lessons";
import { currentUser } from "@clerk/nextjs/server";

interface HomeProps {}

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
      {user && <Lessons />}
    </>
  );
};

export default Home;
