import { getCollection, type CollectionEntry } from "astro:content";

export type Thought = CollectionEntry<"thoughts">;
export type InboxNote = CollectionEntry<"inbox">;

export async function getPublishedThoughts(): Promise<Thought[]> {
  const thoughts = await getCollection("thoughts", ({ data }) => !data.draft);
  return thoughts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getInboxNotes(): Promise<InboxNote[]> {
  const notes = await getCollection("inbox");
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function topicsFrom(thoughts: Thought[]): string[] {
  return [...new Set(thoughts.map((thought) => thought.data.topic))].sort(
    (a, b) => a.localeCompare(b),
  );
}

export function groupByTopic(thoughts: Thought[]): [string, Thought[]][] {
  const groups = new Map<string, Thought[]>();

  for (const thought of thoughts) {
    const list = groups.get(thought.data.topic) ?? [];
    list.push(thought);
    groups.set(thought.data.topic, list);
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}
