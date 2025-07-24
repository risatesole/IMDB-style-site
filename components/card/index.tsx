import Link from "next/link";
import styles from "./styles.module.css";

export type CardData = {
  title: string;
  posterimageurl: string;
  redirecturl: string;
  overview?: string;
};

export default function CardComponent({
  title,
  posterimageurl,
  redirecturl,
  overview,
}: CardData) {
  return (
      <div className={styles.cardsContainer}>
        <Link href={redirecturl}>
          <img
            src={posterimageurl}
            alt={`${title} poster`}
            title={`${title} poster ${overview}`}
            className={styles.posterImage}
          />
        </Link>
        <p>{title}</p>
      </div>
  );
}
