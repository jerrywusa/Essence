import { StaticImageData } from "next/image";

type Emotion = "Happy" | "Sad" | "Angry";

type SpeechType = "Dialogue" | "Monologue";

export interface LessonType {
  image: StaticImageData;
  title: string;
  speechType: string;
  lessonId: string;
}

export interface DataType {
  lessons: Array<LessonType>;
  name: string;
}
