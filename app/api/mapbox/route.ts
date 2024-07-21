import axios from "axios";

const getPlaces = async (query: string) => {
    try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        },
      }
    );

    return response.data.features;
  } catch (error) {
    console.error("There was an error while fetching places:", error);
  }
}

export default getPlaces;