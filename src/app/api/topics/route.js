import { NextResponse } from "next/server";
import { categories, topics, getRandomTopic, getRandomTopicAny } from "@/lib/topics";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const random = searchParams.get("random");

  // Return random topic
  if (random === "true") {
    if (category && topics[category]) {
      return NextResponse.json({
        category,
        topic: getRandomTopic(category),
        categoryInfo: categories.find((c) => c.id === category),
      });
    }
    const result = getRandomTopicAny();
    return NextResponse.json({
      ...result,
      categoryInfo: categories.find((c) => c.id === result.category),
    });
  }

  // Return all categories
  if (!category) {
    return NextResponse.json({ categories });
  }

  // Return topics for a specific category
  if (topics[category]) {
    return NextResponse.json({
      category,
      categoryInfo: categories.find((c) => c.id === category),
      topics: topics[category],
    });
  }

  return NextResponse.json({ error: "Category not found" }, { status: 404 });
}
