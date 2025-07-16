import Link from "next/link";
import styles from "./styles.module.css";

function CardComponent(
  title: string,
  details: string,
  posterimageurl: string,
  redirecturl: string
) {
  return (
    <>
      <div>
        <p>Movie card</p>
        <Link href={`${redirecturl}`} passHref>
          <img
            src={`${redirecturl}`}
            alt={`${title} poster`}
            title={`${title} poster`}
            className={styles.posterImage}
          />
        </Link>

        <p>End of movie card</p>
      </div>
    </>
  );
}

type CardRowProps = {
  title: string;
  overview: string;
  posterimageurl: string;
  redirecturl: string;
};

function CardRowComponent({
  title,
  overview,
  posterimageurl,
  redirecturl,
}: CardRowProps) {
  return (
    <>
      <div>
        <Link href={redirecturl} passHref>
          <img
            src={posterimageurl}
            alt={`${title} poster`}
            title={`${title} poster`}
            className={styles.posterImage}
          />
        </Link>
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
      <p>Welcome to the popular page</p>
      <CardRowComponent
        title={data.results[0].name}
        overview={data.results[0].overview}
        posterimageurl={`https://image.tmdb.org/t/p/w200${data.results[0].poster_path}`}
        redirecturl={`/show/${data.results[0].id}`}
      />

      <CardRowComponent
        title={data.results[1].name}
        overview={data.results[1].overview}
        posterimageurl={`https://image.tmdb.org/t/p/w200${data.results[1].poster_path}`}
        redirecturl={`/show/${data.results[1].id}`}
      />

      <p>id: {JSON.stringify(data.results[0].id, null, 2)}</p>
      <p>name: {JSON.stringify(data.results[0].name, null, 2)}</p>
      <p>poster:</p>

      <p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </p>
    </div>
  );
}
