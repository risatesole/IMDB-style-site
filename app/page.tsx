import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Welcome</p>
      <p>go to <Link href={'/popular'}>this page</Link> to see what tv shows and movies are popular currently</p>
    </div>
  );
}
