import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanWord } from "./Components/HangmanWord"
import { HangmanDrawing } from "./Components/HangmanDrawing"
import { HangmanKeyboard } from "./Components/HangmanKeyboard"

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
  },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key= e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])


  return (
    <div className="max-w-[800px] flex flex-col gap-8 mx-auto my-0 items-center">
      <div className="text-[2rem] text-center">
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try! - Refresh to try again"}
      </div>
      
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>

      <HangmanWord 
        guessedLetters={guessedLetters} 
        wordToGuess={wordToGuess}
        reveal={isLoser}
      />

      <HangmanKeyboard 
        activeLetters={guessedLetters.filter(letter =>
          wordToGuess.includes(letter)
        )}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        disabled={isWinner || isLoser}
      />

    </div>
  )
}

export default App
