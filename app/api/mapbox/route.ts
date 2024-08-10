import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        },
      },
    );

    return NextResponse.json(response.data.features);
  } catch (error) {
    console.error("There was an error while fetching places:", error);
    return NextResponse.json(
      { message: "There was an error while fetching places." },
      { status: 500 },
    );
  }
}
