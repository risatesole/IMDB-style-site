import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Welcome to <b>What to Watch!</b> Whether you&apos;re  in the mood for a thrilling movie night, a binge-worthy series, or just looking for something new to dive into, you&apos;ve come to the right place. We’re here to help you discover the best content across all platforms—tailored to your taste, mood, and time. Sit back, relax, and let us guide you to your next great watch.</p>
      <p>go to <Link href={'/popular'}>this page</Link> to see what tv shows and movies are popular currently</p>
    </div>
  );
}
