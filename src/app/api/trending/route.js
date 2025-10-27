import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("TMDB API Error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch trending" },
      { status: 500 }
    );
  }
}
