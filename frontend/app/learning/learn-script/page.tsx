export default function Page({ params }: { params: { lessonId: string } }) {
  return <div>My Post: {params.lessonId}</div>;
}
