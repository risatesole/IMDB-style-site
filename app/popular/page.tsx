import Link from "next/link";
import styles from "./styles.module.css";

type CardData = {
  title: string;
  posterimageurl: string;
  redirecturl: string;
  details?: string;
};

function CardComponent({ title, posterimageurl, redirecturl }: CardData) {
  return (
    <div>
      <p>Movie card</p>
      <Link href={redirecturl}>
        <img
          src={posterimageurl}
          alt={`${title} poster`}
          title={`${title} poster`}
          className={styles.posterImage}
        />
      </Link>
      <p>{title}</p>
      <p>End of movie card</p>
    </div>
  );
}

function CardsPopularPage({ cards }: { cards: CardData[] }) {
  return (
    <div>
      {cards.map((card, index) => (
        <CardComponent
          key={index}
          title={card.title}
          posterimageurl={card.posterimageurl}
          redirecturl={card.redirecturl}
        />
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
