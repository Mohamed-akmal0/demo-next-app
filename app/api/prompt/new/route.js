import { dbConnection } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { prompt, tag, userId } = await req.json();
  try {
    //have to call every time this function because it is lambda function
    //it will die when the job is done
    await dbConnection();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    console.log("error in prompt api ", error);
    return new Response("Failed to create a prompt", {status: 500})
  }
};
