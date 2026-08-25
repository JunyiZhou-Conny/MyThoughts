import { describe, it, expect, beforeEach } from 'vitest'
import { createThought, loadThoughts, saveThoughts } from './storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns an empty list when nothing is stored', () => {
    expect(loadThoughts()).toEqual([])
  })

  it('persists and reloads thoughts', () => {
    const thought = createThought('Remember to hydrate')
    saveThoughts([thought])
    expect(loadThoughts()).toEqual([thought])
  })

  it('trims whitespace when creating a thought', () => {
    const thought = createThought('   spaced out   ')
    expect(thought.text).toBe('spaced out')
  })

  it('generates unique ids for each thought', () => {
    const a = createThought('one')
    const b = createThought('two')
    expect(a.id).not.toBe(b.id)
  })

  it('ignores corrupt stored payloads', () => {
    localStorage.setItem('mythoughts.v1', 'not-json')
    expect(loadThoughts()).toEqual([])
  })

  it('filters out malformed entries', () => {
    localStorage.setItem(
      'mythoughts.v1',
      JSON.stringify([{ id: '1', text: 'ok', createdAt: 1 }, { nope: true }]),
    )
    expect(loadThoughts()).toEqual([{ id: '1', text: 'ok', createdAt: 1 }])
  })
})
