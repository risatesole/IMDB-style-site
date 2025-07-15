export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.NEXT_THEMOVIEDB;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing NEXT_THEMOVIEDB API key" }),
      { status: 500 }
    );
  }

  const body = await request.json();
  const { movieid } = body;

  if (!movieid) {
    return new Response(JSON.stringify({ error: "Missing movieid in body" }), {
      status: 400,
    });
  }

  const url = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${apiKey}&language=en-US`;
  console.log("Fetching movie details:", url);

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("TMDb error:", errorText);
    return new Response(
      JSON.stringify({ error: `Failed to fetch. Status: ${res.status}` }),
      { status: res.status }
    );
  }

  const data = await res.json();
  console.log("Movie details fetched successfully");
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
