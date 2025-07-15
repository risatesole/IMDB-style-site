import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Welcome</p>
      <p>go to <Link href={'/movie/299534'}>this page</Link> to see movie details based in id in browser url</p>
    </div>
  );
}
