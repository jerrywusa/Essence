import Image from "next/image";
import { FunctionComponent } from "react";

import actionLogo from "./actionLogo.svg";

import historyLogo from "./history.svg";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "10vh",
        top: "0px",
        left: "0px",
        paddingTop: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
          }}
        >
          <Image
            src={actionLogo}
            alt="action logo"
            style={{
              width: "27.24px",
              height: "26.43px",
              marginLeft: "25px",
              marginTop: "20px",
            }}
          />

          <p
            style={{
              color: "white",
              fontSize: "26.18px",
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              marginLeft: "5px",
              marginTop: "15px",
            }}
          >
            ssence
          </p>
        </div>

        <div
          style={{
            display: "flex",
            paddingRight: "35px",
            width: "130px",
            justifyContent: "space-evenly",
          }}
        >
          <Image
            src={historyLogo}
            alt="action logo"
            style={{
              marginTop: "15px",
            }}
          />
          <div
            style={{
              marginTop: "22px",
            }}
          >
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
