import { useEffect, useMemo, useState } from 'react'
import type { Thought } from './types'
import { createThought, loadThoughts, saveThoughts } from './storage'
import './App.css'

function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function App() {
  const [thoughts, setThoughts] = useState<Thought[]>(() => loadThoughts())
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    saveThoughts(thoughts)
  }, [thoughts])

  const visibleThoughts = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const sorted = [...thoughts].sort((a, b) => b.createdAt - a.createdAt)
    if (!needle) return sorted
    return sorted.filter((t) => t.text.toLowerCase().includes(needle))
  }, [thoughts, query])

  function addThought() {
    const text = draft.trim()
    if (!text) return
    setThoughts((prev) => [createThought(text), ...prev])
    setDraft('')
  }

  function deleteThought(id: string) {
    setThoughts((prev) => prev.filter((t) => t.id !== id))
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      addThought()
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span className="app__logo" aria-hidden="true">
            💭
          </span>
          MyThoughts
        </h1>
        <p className="app__subtitle">Capture what's on your mind.</p>
      </header>

      <section className="composer" aria-label="New thought">
        <textarea
          className="composer__input"
          placeholder="What are you thinking about?"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          aria-label="Thought text"
        />
        <div className="composer__actions">
          <span className="composer__hint">Tip: press ⌘/Ctrl + Enter to save</span>
          <button
            className="button button--primary"
            onClick={addThought}
            disabled={!draft.trim()}
          >
            Add thought
          </button>
        </div>
      </section>

      <section className="thoughts" aria-label="Your thoughts">
        <div className="thoughts__toolbar">
          <input
            className="thoughts__search"
            type="search"
            placeholder="Search your thoughts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search thoughts"
          />
          <span className="thoughts__count">
            {thoughts.length} {thoughts.length === 1 ? 'thought' : 'thoughts'}
          </span>
        </div>

        {visibleThoughts.length === 0 ? (
          <p className="thoughts__empty">
            {thoughts.length === 0
              ? 'No thoughts yet — add your first one above.'
              : 'No thoughts match your search.'}
          </p>
        ) : (
          <ul className="thoughts__list">
            {visibleThoughts.map((thought) => (
              <li key={thought.id} className="thought">
                <p className="thought__text">{thought.text}</p>
                <div className="thought__meta">
                  <time className="thought__time" dateTime={new Date(thought.createdAt).toISOString()}>
                    {formatTimestamp(thought.createdAt)}
                  </time>
                  <button
                    className="button button--ghost"
                    onClick={() => deleteThought(thought.id)}
                    aria-label="Delete thought"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
