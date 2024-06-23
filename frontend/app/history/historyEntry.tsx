"use client";

import { FunctionComponent, useContext } from "react";
import vectorSvg from "../home/Vector.svg";
import Image from "next/image";
import { HistoryEntryType } from "../types";
import { useRouter } from "next/navigation";
import { Context } from "../page";
import dotsSvg from "./dots.svg";
import xSvg from "./x.svg";

interface HistoryEntryProps {
  historyEntry: HistoryEntryType;
}

const imageStyle = {
  borderRadius: 10,
  width: "442px",
  height: "249px",
  objectFit: "cover",
};

const HistoryEntry: FunctionComponent<HistoryEntryProps> = ({
  historyEntry,
}) => {
  const router = useRouter();
  const { lessons } = useContext(Context);

  const lesson = lessons.find(
    (lesson) => lesson.lessonId === historyEntry.lessonId
  )!;

  return (
    <div className="hover:cursor-pointer">
      <div
        style={{
          position: "relative",
          width: "442px",
          height: "249px",
          marginLeft: "70px",
        }}
        onClick={() => router.push(`/learning/watch-video/${lesson.lessonId}`)}
      >
        <Image src={lesson.image} alt="image description" style={imageStyle} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)", // Adjust gradient colors and direction as needed
            borderRadius: 10,
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "200.91px",
            left: "460px",
            color: "white",
            fontSize: "32px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            width: "600px",
          }}
        >
          {lesson.title}
        </p>
        <p
          style={{
            position: "absolute",
            bottom: "170px",
            left: "492px",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            opacity: ".50",
          }}
        >
          {lesson.speechType}
        </p>
        <Image
          src={vectorSvg}
          alt="vector svg icon"
          style={{
            position: "absolute",
            bottom: "175px",
            right: "-42px",
            width: "19px",
            height: "24px",
            opacity: ".50",
          }}
        />
        <p
          style={{
            position: "absolute",
            bottom: "100px",
            right: "-132px",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {`Score: ${historyEntry.score}%`}
        </p>
        <button
          className="bg-red-600 text-white rounded"
          style={{
            position: "absolute",
            top: "160px",
            left: "470px",
            width: "110px",
            height: "40px",
            opacity: ".90",
          }}
        >
          View
        </button>

        <Image
          src={xSvg}
          alt="x svg icon"
          style={{
            position: "absolute",
            bottom: "200px",
            left: "1230px",
            width: "20px",
            height: "40px",
            opacity: ".70",
          }}
        />

        <Image
          src={dotsSvg}
          alt="dots svg icon"
          style={{
            position: "absolute",
            bottom: "200px",
            left: "1283px",
            width: "7px",
            height: "40px",
            opacity: ".70",
          }}
        />
      </div>
    </div>
  );
};

export default HistoryEntry;
