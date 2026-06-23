import { NextResponse } from "next/server";
import { db, FieldValue, adminAuth } from "../../../../lib/firebase-admin";

type Params = { params: Promise<{ id: string }> };

async function verifyToken(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token || !adminAuth) {
    return null;
  }

  try {
    return await adminAuth.verifyIdToken(token);
  } catch {
    return null;
  }
}

export async function GET(request: Request, { params }: Params) {
  const decoded = await verifyToken(request);

  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json({ error: "Firebase not configured" }, { status: 503 });
  }

  const { id } = await params;
  const doc = await db.collection("leads").doc(id).get();

  if (!doc.exists) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const data = doc.data()!;

  return NextResponse.json({
    ok: true,
    lead: {
      id: doc.id,
      name: data.name ?? "",
      company: data.company ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      interest: data.interest ?? "",
      message: data.message ?? "",
      source: data.source ?? "website",
      status: data.status ?? "new",
      createdAt: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() ?? new Date().toISOString()
    }
  });
}

export async function PATCH(request: Request, { params }: Params) {
  const decoded = await verifyToken(request);

  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json({ error: "Firebase not configured" }, { status: 503 });
  }

  const { id } = await params;
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const docRef = db.collection("leads").doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const allowedStatuses = ["new", "contacted", "qualified", "won", "lost"];
  const updates: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };

  if (body.status && typeof body.status === "string" && allowedStatuses.includes(body.status)) {
    updates.status = body.status;
  }

  if (body.notes && typeof body.notes === "string") {
    updates.notes = body.notes.trim();
  }

  await docRef.update(updates);

  return NextResponse.json({ ok: true, id });
}
