import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const { isError } = useAnecdotes()

  if (isError) {
    return <h3>Anecdote service is not available due to server problem</h3>
  }

  return (
    <div>
      <h2>Anecdote app</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App