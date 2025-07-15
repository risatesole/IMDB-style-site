export const dynamic = "force-dynamic";

function Requirements() {
  return (
    <>
      <p>This is the movie details site</p>
      <p>And these are the requirements:</p>
      <ul>
        <li>This page should have a big back cover with the movie image</li>
        <li>
          A small cover image (like a Facebook profile picture size) in front of
          the big movie picture
        </li>
        <li>A brief description about the movie</li>
        <li>A link to see the trailer</li>
        <li>Photos of the movie like snippets of what is in the movie</li>
        <li>List of the cast inside that movie</li>
      </ul>
    </>
  );
}


import Link from "next/link";

type PageProps = {
  params: {
    movieid: string;
  };
};

export async function getMovieDetails(id: string) {
  const apiKey = process.env.NEXT_THEMOVIEDB;
  if (!apiKey) {
    throw new Error("Missing NEXT_THEMOVIEDB API key in environment");
  }

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  console.log("Fetching movie details:", url);

  const res = await fetch(url, { cache: "no-store" });

  console.log("TMDb API response status:", res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response from TMDb:", errorText);
    throw new Error(`Failed to fetch movie details. Status: ${res.status}`);
  }

  const data = await res.json();
  console.log("Movie details fetched successfully");
  return data;
}


export default async function MovieDetailsPage(props: PageProps) {
  const { params } = await props;
  const { movieid } = await params;

  const moviedata = await getMovieDetails(movieid);

  return (
    <div style={{ padding: "20px" }}>
      <Requirements />

      <img
        src={`https://image.tmdb.org/t/p/original${moviedata.belongs_to_collection.poster_path}`}
        alt={`${moviedata.title} backdrop`}
        title="Front poster"
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          marginTop: "20px",
        }}
      />

      <img
        src={`https://image.tmdb.org/t/p/original${moviedata.backdrop_path}`}
        alt={`${moviedata.title} backdrop`}
        title="Backdoor cover"
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          marginTop: "20px",
        }}
      />
      <img
        src={`https://image.tmdb.org/t/p/original${moviedata.belongs_to_collection.backdrop_path}`}
        alt={`${moviedata.title} backdrop`}
        title="backdroop of collection image"
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          marginTop: "20px",
        }}
      />

      <img
        src={`https://image.tmdb.org/t/p/w200${moviedata.poster_path}`}
        alt={`${moviedata.title} poster`}
        style={{ borderRadius: "8px", marginTop: "20px" }}
      />

      <h1 style={{ fontSize: "2rem", marginTop: "20px" }}>{moviedata.title}</h1>
      <p>{moviedata.overview}</p>
      <p>
        <strong>Release Date:</strong> {moviedata.release_date}
      </p>

      <p>
        this movie belongs to collection:{" "}
        <b>{moviedata.belongs_to_collection.name}</b>
      </p>

      <p>Generos a los que pertenece: </p>
      <p>{JSON.stringify(moviedata.genres, null, 2)}</p>

      <p>
        <b>Production company that made the movie</b>
      </p>
      <p>{moviedata.production_companies[0]?.name}</p>
      <img
        src={`https://image.tmdb.org/t/p/w200${moviedata.production_companies[0]?.logo_path}`}
        alt={`${moviedata.title} poster`}
        style={{ borderRadius: "8px", marginTop: "20px" }}
      />

      <p>Home page de la movie</p>
      <p>
        <Link href={moviedata.homepage}>Home page of the movie</Link>
      </p>

      <p>
        <pre>{JSON.stringify(moviedata, null, 2)}</pre>
      </p>
    </div>
  );
}
