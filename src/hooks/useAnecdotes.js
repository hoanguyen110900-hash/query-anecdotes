import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import { useNotify } from './useNotify'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotify()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`Added anecdote: ${newAnecdote.content}`)
      setTimeout(() => { setNotification(null) }, 5000)
    },
    onError: (error) => {
      setNotification(error.message)
      setTimeout(() => { setNotification(null) }, 5000)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`You voted for: ${updatedAnecdote.content}`)
      setTimeout(() => { setNotification(null) }, 5000)
    }
  })

  return {
    anecdotes: result.data ?? [],
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    votes: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  }
}