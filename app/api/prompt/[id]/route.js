import Prompt from "@models/prompt";
import { dbConnection } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await dbConnection();
    const prompts = await Prompt.findById(params?.id).populate("creator");
    if (!prompts) {
      return new Response("post not found!", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("err in get post", error);
    return new Response("failed to fetch post", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await dbConnection();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("post not found!", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log("err in patch", error);
    return new Response("something went wrong while editing post", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await dbConnection();
    await Prompt.findByIdAndDelete(params?.id);
    return new Response("post deleted!", { status: 200 });
  } catch (error) {
    return new Response("something went wrong while deleting post", {
      status: 500,
    });
  }
};
