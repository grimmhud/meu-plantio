import { prepareConversation } from "@/backend/conversation/context";
export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 16000)
    return Response.json({ error: "Content too large." }, { status: 413 });
  try {
    const context = prepareConversation(await request.json());
    return Response.json(
      {
        available: false,
        message: "Calling is not available yet.",
        context,
      },
      { status: 501, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Check the plan before talking." },
      { status: 400 },
    );
  }
}
