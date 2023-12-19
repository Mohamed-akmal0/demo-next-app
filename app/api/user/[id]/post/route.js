import Prompt from "@models/prompt";
import { dbConnection } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await dbConnection();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("err in get prompt", error);
    return new Response("failed to fetch post", { status: 500 });
  }
};
