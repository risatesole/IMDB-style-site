import Link from "next/link";
import styles from "./styles.module.css";
async function MovieCard() {
  const data = await getPopularTvshows();

  return (
    <>
      <div>
        <p>Hi</p>
        <p>Movie card</p>

<Link href={`/title/${data.results[0].id}`} passHref>
  <img
    src={`https://image.tmdb.org/t/p/w200${data.results[0].poster_path}`}
    alt={`${data.results[0].name} poster`}
    title={`${data.results[0].name} poster`}
    className={styles.posterImage}
  />
</Link>
<Link href={`/title/${data.results[1].id}`} passHref>
  <img
    src={`https://image.tmdb.org/t/p/w200${data.results[1].poster_path}`}
    alt={`${data.results[1].name} poster`}
    title={`${data.results[1].name} poster`}
    className={styles.posterImage}
  />
</Link>
<Link href={`/title/${data.results[2].id}`} passHref>
  <img
    src={`https://image.tmdb.org/t/p/w200${data.results[2].poster_path}`}
    alt={`${data.results[2].name} poster`}
    title={`${data.results[2].name} poster`}
    className={styles.posterImage}
  />
</Link>
<p>{data.results[2].id}</p>

        {/* <p>name: {data.results[0].name}</p> */}

        <p>End of movie card</p>
      </div>
    </>
  );
}

async function getPopularTvshows() {
  const baseUrl = process.env.NEXT_PUBLIC_BASEAPIURL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/popular`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ placeholder: "myplaceholder" }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response from api:", errorText);
    throw new Error(`Failed to fetch movie details. Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export default async function PopularPage() {
  const data = await getPopularTvshows();
  return (
    <div>
      <MovieCard />
      <p>Welcome to the popular page</p>
      <p>id: {JSON.stringify(data.results[0].id, null, 2)}</p>
      <p>name: {JSON.stringify(data.results[0].name, null, 2)}</p>
      <p>poster:</p>

      <p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </p>
    </div>
  );
}
