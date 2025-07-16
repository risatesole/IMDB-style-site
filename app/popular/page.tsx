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

type CardData = {
  title: string;
  posterimageurl: string;
  redirecturl: string;
};

function CardsPopularPage({ cards }: { cards: CardData[] }) {
  return (
    <div>
      {cards.map((card, index) => (
        <Link href={card.redirecturl} key={index}>
          <div>
            <img src={card.posterimageurl} alt={`${card.title} poster`} />
            <p>{card.title}</p>
          </div>
        </Link>
      ))}
    </div>
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

  const cardsData = data.results.map((item: any) => ({
    title: item.name,
    posterimageurl: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
    redirecturl: `/show/${item.id}`,
  }));

  return (
    <div>
      <p>Welcome to the popular page</p>
      <CardsPopularPage cards={cardsData} />

      {/* 
      <p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </p> 
      */}
    </div>
  );
}

