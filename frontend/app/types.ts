import { StaticImageData } from "next/image";

type Emotion = "Happy" | "Sad" | "Angry";

type SpeechType = "Dialogue" | "Monologue";

export interface LessonType {
  image: StaticImageData;
  title: string;
  speechType: string;
  lessonId: string;
  videoLink: string;
  videoId: string;
  scriptComponent: React.FC;
}

export interface DataType {
  lessons: Array<LessonType>;
  historyEntryList: Array<HistoryEntryType>;
}

export interface HistoryEntryType {
  lessonId: string;
  score: number;
}
