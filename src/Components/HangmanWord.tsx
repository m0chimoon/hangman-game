type HangmanWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
}

export function HangmanWord({guessedLetters, wordToGuess, reveal = false}: HangmanWordProps) {
  return (
    <div className="flex gap-[0.25em] text-[6rem] font-bold uppercase font-mono">
      {wordToGuess.split("").map((letter, index) => (
        <span key={index} className="border-b-[0.1em] border-solid border-black">
          <span className={`${guessedLetters.includes(letter) || reveal ? "visible" : "invisible"} ${!guessedLetters.includes(letter) && reveal ? "text-red-500" : "text-black"}`}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}