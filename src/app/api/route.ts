// This fixed GET response can be emitted as a static file during `next build`.
export const dynamic = "force-static";

export async function GET() {
  return Response.json({ message: "Hello, world!" });
}
