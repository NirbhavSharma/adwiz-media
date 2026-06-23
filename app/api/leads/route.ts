import { NextResponse } from "next/server";
import { db, FieldValue, adminAuth } from "../../../lib/firebase-admin";
import { validateLeadPayload } from "../../../lib/validators";
import type { LeadPayload } from "../../../lib/validators";

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

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const { lead, error } = validateLeadPayload(body);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!db) {
    return NextResponse.json({
      ok: true,
      mode: "preview",
      message: "Lead validated. Configure Firebase credentials to persist enquiries."
    });
  }

  try {
    const docRef = await db.collection("leads").add({
      ...lead,
      source: "website",
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    return NextResponse.json({ ok: true, leadId: docRef.id });
  } catch (err) {
    console.error("Firestore write error:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const decoded = await verifyToken(request);

  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json({ error: "Firebase not configured" }, { status: 503 });
  }

  try {
    const snapshot = await db
      .collection("leads")
      .orderBy("createdAt", "desc")
      .limit(200)
      .get();

    const leads = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
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
      };
    });

    return NextResponse.json({ ok: true, leads });
  } catch (err) {
    console.error("Firestore read error:", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
