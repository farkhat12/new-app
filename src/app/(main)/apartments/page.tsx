import { serverApi } from "@/lib/api/server-api";

const Apartments = async () => {
  let apartments = [];

  try {
    const result = await serverApi.get("/apartments");
    apartments = result.data.data;
  } catch (error) {
    console.error("Failed to fetch apartments:", error);
  }

  return <div>Apartments</div>;
};

export default Apartments;
