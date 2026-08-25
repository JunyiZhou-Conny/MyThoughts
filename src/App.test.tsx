import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the title and empty state', () => {
    render(<App />)
    expect(screen.getByText('MyThoughts')).toBeInTheDocument()
    expect(
      screen.getByText(/No thoughts yet/i),
    ).toBeInTheDocument()
  })

  it('adds a new thought', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByLabelText('Thought text'),
      'Build something people love',
    )
    await user.click(screen.getByRole('button', { name: /add thought/i }))

    expect(
      screen.getByText('Build something people love'),
    ).toBeInTheDocument()
    expect(screen.getByText('1 thought')).toBeInTheDocument()
  })

  it('deletes a thought', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Thought text'), 'Temporary note')
    await user.click(screen.getByRole('button', { name: /add thought/i }))
    expect(screen.getByText('Temporary note')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /delete thought/i }))
    expect(screen.queryByText('Temporary note')).not.toBeInTheDocument()
    expect(screen.getByText(/No thoughts yet/i)).toBeInTheDocument()
  })

  it('filters thoughts via search', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByLabelText('Thought text')
    await user.type(input, 'apples')
    await user.click(screen.getByRole('button', { name: /add thought/i }))
    await user.type(input, 'oranges')
    await user.click(screen.getByRole('button', { name: /add thought/i }))

    await user.type(screen.getByLabelText('Search thoughts'), 'apple')
    expect(screen.getByText('apples')).toBeInTheDocument()
    expect(screen.queryByText('oranges')).not.toBeInTheDocument()
  })

  it('persists thoughts across remounts', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await user.type(screen.getByLabelText('Thought text'), 'Persisted thought')
    await user.click(screen.getByRole('button', { name: /add thought/i }))
    unmount()

    render(<App />)
    expect(screen.getByText('Persisted thought')).toBeInTheDocument()
  })
})
