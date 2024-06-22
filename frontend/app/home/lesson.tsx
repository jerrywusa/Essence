import logo from "./wows ss.jpeg";
import Image from "next/image";
import vectorSvg from "./Vector.svg";

function Lesson() {
  const imageStyle = {
    borderRadius: 10,
    width: 444,
    height: 340.36,
    objectFit: "cover",
  };

  const titleStyle = {
    width: 284,
    height: 39,
  };

  return (
    <div
      style={{
        position: "relative",
        width: "444px",
        height: "340.36px",
      }}
    >
      <Image src={logo} alt="image description" style={imageStyle} />
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
          top: "250.91px",
          left: "21.82px",
          color: "white",
          fontSize: "26.18px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
        }}
      >
        The Wolf of Wall Street
      </p>
      <p
        style={{
          position: "absolute",
          top: "290px",
          left: "40px",
          color: "white",
          fontSize: "17.45px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          opacity: ".75",
        }}
      >
        Monologue
      </p>
      <Image
        src={vectorSvg}
        alt="vector svg iconA"
        style={{
          position: "absolute",
          top: "293px",
          left: "21.82px",
          width: "13.96px",
          height: "17.45px",
        }}
      />
    </div>
  );
}

export default Lesson;
