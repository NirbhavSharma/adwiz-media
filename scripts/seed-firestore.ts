import { db, FieldValue } from "../lib/firebase-admin";

const services = [
  {
    slug: "social-media-management",
    name: "Social Media Management",
    description: "Monthly content planning, creative production, publishing, engagement, and reporting.",
    iconName: "Share2",
    isFeatured: true
  },
  {
    slug: "online-presence-setup",
    name: "Online Presence Setup",
    description: "Profile optimization, brand messaging, visual direction, and launch-ready platform setup.",
    iconName: "Sparkles",
    isFeatured: true
  },
  {
    slug: "reach-campaigns",
    name: "Reach Campaigns",
    description: "Organic and paid campaign planning for visibility, enquiries, and lead generation.",
    iconName: "Megaphone",
    isFeatured: true
  },
  {
    slug: "growth-analytics",
    name: "Growth Analytics",
    description: "KPI reporting and monthly recommendations for improving reach, content, and campaigns.",
    iconName: "LineChart",
    isFeatured: true
  }
];

const packages = [
  {
    slug: "presence",
    name: "Presence",
    summary: "For brands that need a professional online foundation.",
    startingPriceInr: null,
    features: ["Profile setup", "Brand messaging", "12 content pieces", "Monthly report"],
    isActive: true
  },
  {
    slug: "growth",
    name: "Growth",
    summary: "For businesses ready for consistent social media management.",
    startingPriceInr: null,
    features: ["Content calendar", "20 content pieces", "Community support", "Campaign planning"],
    isActive: true
  },
  {
    slug: "scale",
    name: "Scale",
    summary: "For teams that need full marketing support and stronger lead flow.",
    startingPriceInr: null,
    features: ["Paid campaign support", "30+ content pieces", "Analytics dashboard", "Priority strategy"],
    isActive: true
  }
];

async function seed() {
  if (!db) {
    console.error("Firebase not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env.local");
    process.exit(1);
  }

  console.log("Seeding Firestore...\n");

  console.log("Writing services...");
  for (const service of services) {
    await db.collection("services").doc(service.slug).set({
      ...service,
      createdAt: FieldValue.serverTimestamp()
    });
    console.log(`  ✓ ${service.name}`);
  }

  console.log("\nWriting packages...");
  for (const pkg of packages) {
    await db.collection("packages").doc(pkg.slug).set({
      ...pkg,
      createdAt: FieldValue.serverTimestamp()
    });
    console.log(`  ✓ ${pkg.name}`);
  }

  console.log("\nDone! Seeded 4 services and 3 packages.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
