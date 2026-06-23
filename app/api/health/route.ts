import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase-admin";

export async function GET() {
  let firebaseStatus: "connected" | "not-configured" | "error" = "not-configured";

  if (db) {
    try {
      await db.collection("_health").doc("ping").get();
      firebaseStatus = "connected";
    } catch {
      firebaseStatus = "error";
    }
  }

  return NextResponse.json({
    ok: true,
    service: "adwiz-media-web",
    firebase: firebaseStatus,
    timestamp: new Date().toISOString()
  });
}
