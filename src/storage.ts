import type { Thought } from './types'

const STORAGE_KEY = 'mythoughts.v1'

/**
 * Reads the persisted list of thoughts. Returns an empty list when nothing has
 * been saved yet or when the stored payload is corrupt/unparseable.
 */
export function loadThoughts(): Thought[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isThought)
  } catch {
    return []
  }
}

export function saveThoughts(thoughts: Thought[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(thoughts))
}

export function createThought(text: string): Thought {
  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text: text.trim(),
    createdAt: Date.now(),
  }
}

function isThought(value: unknown): value is Thought {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.text === 'string' &&
    typeof candidate.createdAt === 'number'
  )
}
