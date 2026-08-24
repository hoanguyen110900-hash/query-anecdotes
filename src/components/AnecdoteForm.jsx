import { useAnecdotes } from '../hooks/useAnecdotes'

const AnecdoteForm = () => {
  const { isPending, addAnecdote: addAnecdoteToServer } = useAnecdotes()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdoteToServer(content)
  }

  if (isPending) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm