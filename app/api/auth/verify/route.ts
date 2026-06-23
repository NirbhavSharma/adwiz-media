import { NextResponse } from "next/server";
import { adminAuth } from "../../../../lib/firebase-admin";

export async function POST(request: Request) {
  if (!adminAuth) {
    return NextResponse.json(
      { error: "Firebase not configured" },
      { status: 503 }
    );
  }

  let body: { idToken?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const idToken = body.idToken?.trim();

  if (!idToken) {
    return NextResponse.json({ error: "idToken is required" }, { status: 400 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);

    return NextResponse.json({
      ok: true,
      uid: decoded.uid,
      email: decoded.email ?? null
    });
  } catch {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
