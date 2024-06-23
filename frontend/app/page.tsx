import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Link href="/home">go to home page</Link>
      </div>
      <div>
        <Link href="/history">go to history page</Link>
      </div>
      <div>
        <Link href="/profile">go to profile page</Link>
      </div>
      <div>
        <Link href="/record">go to record page</Link>
      </div>
    </>
  );
}
