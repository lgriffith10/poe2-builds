// Relays a Path of Building code from pobb.in, which does not allow cross-origin reads.
// Stateless and restricted to pobb.in build ids.
export async function GET(_req: Request, { params }: RouteContext<"/api/pobb/[id]">) {
  const { id } = await params;
  if (!/^[A-Za-z0-9_-]{4,40}$/.test(id)) {
    return Response.json({ error: "Invalid pobb.in id" }, { status: 400 });
  }
  const res = await fetch(`https://pobb.in/${id}/raw`, {
    headers: { "User-Agent": "ExileCodex/0.1 (PoE2 build site; pobb.in import)" },
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);
  if (!res?.ok) {
    return Response.json({ error: res ? `pobb.in answered ${res.status}` : "pobb.in is unreachable" }, { status: 502 });
  }
  const code = (await res.text()).trim();
  if (!/^[A-Za-z0-9_=-]+$/.test(code)) {
    return Response.json({ error: "pobb.in did not return a build code" }, { status: 502 });
  }
  return new Response(code, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
