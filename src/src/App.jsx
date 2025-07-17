import { useState, createContext, useContext } from 'react'
import './App.css'

// Story Context for managing global state
const StoryContext = createContext()

export const useStory = () => {
  const context = useContext(StoryContext)
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider')
  }
  return context
}

// Story data structure
const initialStoryState = {
  character: null,
  location: null,
  beginning: '',
  middle: '',
  ending: '',
  title: '',
  problem: null,
  solution: null,
  currentScreen: 1,
  totalScreens: 21,
  progress: 0
}

// Progress Bar Component - Fixed at top for tablets
const ProgressBar = () => {
  const { story } = useStory()
  const progress = (story.currentScreen / story.totalScreens) * 100
  
  return (
    <div className="progress-container">
      <div className="progress-content">
        <div className="progress-info">
          <span className="progress-text">
            Ecranul {story.currentScreen} din {story.totalScreens}
          </span>
          <span className="progress-percentage">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: ${progress}% }}
          ></div>
        </div>
      </div>
    </div>
  )
}

// Screen 1 - Introduction
const Screen1 = () => {
  const { nextScreen } = useStory()
  
  return (
    <div className="story-container">
      <div className="story-card bounce-in">
        <div className="text-center">
          <div className="emoji-large mb-8">📚✨</div>
          <h1 className="story-title">
            Bun venit!
          </h1>
          <p className="story-text mb-12">
            În această lecție vom învăța cum să scriem o poveste clară și interesantă, 
            folosind 3 părți esențiale: <strong>început</strong>, <strong>cuprins</strong> și <strong>încheiere</strong>.
          </p>
          <button 
            className="story-button"
            onClick={nextScreen}
          >
            Hai să începem! 🚀
          </button>
        </div>
      </div>
    </div>
  )
}

// Screen 2 - What is a story?
const Screen2 = () => {
  const { nextScreen } = useStory()
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">📖</div>
          <h2 className="story-subtitle">
            Ce e o povestire?
          </h2>
          <div className="text-left space-y-6 mb-12">
            <div className="flex items-center space-x-4 p-6 bg-green-100 rounded-2xl">
              <span className="text-4xl">✅</span>
              <span className="text-2xl font-medium">Are un personaj</span>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-blue-100 rounded-2xl">
              <span className="text-4xl">✅</span>
              <span className="text-2xl font-medium">Se petrece într-un loc</span>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-yellow-100 rounded-2xl">
              <span className="text-4xl">✅</span>
              <span className="text-2xl font-medium">Se întâmplă ceva important</span>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-purple-100 rounded-2xl">
              <span className="text-4xl">✅</span>
              <span className="text-2xl font-medium">Se termină cu o încheiere clară</span>
            </div>
          </div>
          <div className="mb-8 p-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl">
            <div className="text-6xl mb-4">🌳👧👦🏰</div>
            <p className="text-xl text-gray-700">
              <strong>Exemplu:</strong> Doi copii se plimbă prin pădurea magică și găsesc un castel ascuns unde locuiește un dragon prietenos care îi învață să zboare!
            </p>
          </div>
          <button 
            className="story-button"
            onClick={nextScreen}
          >
            Continuă 📚
          </button>
        </div>
      </div>
    </div>
  )
}

// Screen 3 - True or False Quiz
const Screen3 = () => {
  const { nextScreen } = useStory()
  const [answers, setAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  
  const questions = [
    { id: 1, text: "Povestirile nu trebuie să aibă început.", correct: false },
    { id: 2, text: "Personajul trebuie să fie mereu un copil.", correct: false },
    { id: 3, text: "Fiecare poveste are o acțiune principală.", correct: true }
  ]
  
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }
  
  const checkAnswers = () => {
    setShowFeedback(true)
  }
  
  const allAnswered = Object.keys(answers).length === questions.length
  const allCorrect = questions.every(q => answers[q.id] === q.correct)
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">🤔</div>
          <h2 className="story-subtitle">
            Adevărat sau Fals?
          </h2>
          <div className="space-y-8 mb-12">
            {questions.map((question) => (
              <div key={question.id} className="text-left">
                <p className="text-2xl font-medium mb-6">{question.id}. {question.text}</p>
                <div className="flex space-x-6 justify-center">
                  <button
                    className={`quiz-option ${
                      answers[question.id] === true 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'bg-gray-200 text-gray-700 border-gray-200 hover:bg-green-200'
                    }`}
                    onClick={() => handleAnswer(question.id, true)}
                  >
                    ADEVĂRAT ✅
                  </button>
                  <button
                    className={`quiz-option ${
                      answers[question.id] === false 
                        ? 'bg-red-500 text-white border-red-500' 
                        : 'bg-gray-200 text-gray-700 border-gray-200 hover:bg-red-200'
                    }`}
                    onClick={() => handleAnswer(question.id, false)}
                  >
                    FALS ❌
                  </button>
                </div>
                {showFeedback && (
                  <div className={`mt-4 p-4 rounded-2xl text-center text-xl font-bold ${
                    answers[question.id] === question.correct 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {answers[question.id] === question.correct ? 'Corect! 🎉' : 'Greșit! 😅'}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="button-group">
            {allAnswered && !showFeedback && (
              <button className="story-button-secondary" onClick={checkAnswers}>
                Verifică răspunsurile 🔍
              </button>
            )}
            {showFeedback && allCorrect && (
              <button className="story-button" onClick={nextScreen}>
                Bravo! Continuă 🎉
              </button>
            )}
            {showFeedback && !allCorrect && (
              <button className="story-button-warning" onClick={() => {
                setAnswers({})
                setShowFeedback(false)
              }}>
                Încearcă din nou 🔄
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 4 - Order the parts (Click-based selection)
const Screen4 = () => {
  const { nextScreen } = useStory()
  const [selectedSentence, setSelectedSentence] = useState(null)
  const [positions, setPositions] = useState([null, null, null])
  const [isComplete, setIsComplete] = useState(false)
  
  const sentences = [
    { id: 1, text: "Maria s-a pierdut în pădure.", correctPosition: 1 },
    { id: 2, text: "A doua zi, părinții au găsit-o.", correctPosition: 2 },
    { id: 3, text: "Era o dimineață frumoasă de vară...", correctPosition: 0 }
  ]
  
  const correctOrder = [3, 1, 2]
  
  const selectSentence = (sentence) => {
    setSelectedSentence(sentence)
  }
  
  const placeInPosition = (position) => {
    if (selectedSentence) {
      const newPositions = [...positions]
      // Remove sentence from any previous position
      const prevIndex = newPositions.findIndex(s => s?.id === selectedSentence.id)
      if (prevIndex !== -1) {
        newPositions[prevIndex] = null
      }
      // Place in new position
      newPositions[position] = selectedSentence
      setPositions(newPositions)
      setSelectedSentence(null)
      
      // Check if complete and correct
      const allPlaced = newPositions.every(s => s !== null)
      if (allPlaced) {
        const currentOrder = newPositions.map(s => s.id)
        setIsComplete(JSON.stringify(currentOrder) === JSON.stringify(correctOrder))
      }
    }
  }
  
  const resetOrder = () => {
    setPositions([null, null, null])
    setSelectedSentence(null)
    setIsComplete(false)
  }
  
  const availableSentences = sentences.filter(s => !positions.some(p => p?.id === s.id))
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">🧩</div>
          <h2 className="story-subtitle">
            Ordonează părțile unei povești
          </h2>
          <p className="story-text mb-8">
            1. Selectează o propoziție de mai jos<br/>
            2. Apoi apasă pe poziția unde vrei să o pui
          </p>
          
          <div className="space-y-6 mb-12">
            {[0, 1, 2].map(position => (
              <div
                key={position}
                className={drop-zone cursor-pointer ${selectedSentence ? 'hover:bg-blue-100' : ''}}
                onClick={() => selectedSentence && placeInPosition(position)}
              >
                {positions[position] ? (
                  <span className="text-xl font-medium text-blue-800">
                    {position + 1}. {positions[position].text}
                  </span>
                ) : (
                  <span className="text-gray-400 text-xl">
                    Poziția {position + 1} - {selectedSentence ? 'Apasă aici pentru a plasa' : 'Selectează o propoziție mai întâi'}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          <div className="space-y-4 mb-12">
            <h3 className="text-2xl font-bold text-gray-700">
              Propozițiile disponibile:
            </h3>
            {availableSentences.map(sentence => (
              <div
                key={sentence.id}
                className={`draggable-item cursor-pointer ${
                  selectedSentence?.id === sentence.id 
                    ? 'border-blue-500 bg-blue-100' 
                    : 'hover:border-blue-300'
                }`}
                onClick={() => selectSentence(sentence)}
              >
                {sentence.text}
                {selectedSentence?.id === sentence.id && (
                  <span className="ml-4 text-blue-600 font-bold">← SELECTATĂ</span>
                )}
              </div>
            ))}
          </div>
          
          <div className="button-group">
            <button className="story-button-warning" onClick={resetOrder}>
              Resetează 🔄
            </button>
            {isComplete && (
              <button className="story-button" onClick={nextScreen}>
                Perfect! Continuă 🎉
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 5 - Choose Character (without images)
const Screen5 = () => {
  const { story, updateStory, nextScreen } = useStory()
  
  const characters = [
    { 
      id: 'girl', 
      name: 'O fetiță curajoasă', 
      emoji: '👧', 
      description: 'Îi place să exploreze și să descopere lucruri noi. Este foarte curajoasă și nu se teme de aventuri!'
    },
    { 
      id: 'boy', 
      name: 'Un băiat visător', 
      emoji: '👦', 
      description: 'Îi place să citească cărți și să își imagineze povești fantastice. Este foarte creativ!'
    },
    { 
      id: 'cat', 
      name: 'Un motan năzdrăvan', 
      emoji: '🐱', 
      description: 'Un motan foarte deștept care poate vorbi și îi place să facă poznă. Este foarte prietenos!'
    },
    { 
      id: 'robot', 
      name: 'Un roboțel vorbitor', 
      emoji: '🤖', 
      description: 'Un robot mic și drăguț care poate zbura și are multe funcții magice. Îi place să ajute!'
    }
  ]
  
  const selectCharacter = (character) => {
    updateStory({ character })
  }
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">🎭</div>
          <h2 className="story-subtitle">
            Alege un personaj
          </h2>
          <p className="story-text mb-12">
            Cu cine vrei să scrii povestea ta?
          </p>
          
          <div className="character-grid mb-12">
            {characters.map(character => (
              <div
                key={character.id}
                className={character-option ${story.character?.id === character.id ? 'selected' : ''}}
                onClick={() => selectCharacter(character)}
              >
                <div className="character-emoji">{character.emoji}</div>
                <p className="character-name">{character.name}</p>
                <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                  {character.description}
                </p>
              </div>
            ))}
          </div>
          
          {story.character && (
            <button className="story-button" onClick={nextScreen}>
              Continuă cu {story.character.name} ➡
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Screen 6 - Choose Location
const Screen6 = () => {
  const { story, updateStory, nextScreen } = useStory()
  
  const locations = [
    { 
      id: 'forest', 
      name: 'Pădurea magică', 
      emoji: '🌲', 
      description: 'O pădure plină de copaci înalți, flori colorate și animale prietenoase. Aici se întâmplă lucruri magice!'
    },
    { 
      id: 'castle', 
      name: 'Castelul din nori', 
      emoji: '🏰', 
      description: 'Un castel frumos care plutește în nori, cu turnuri înalte și grădini suspendate. Foarte misterios!'
    },
    { 
      id: 'city', 
      name: 'Orașul colorat', 
      emoji: '🏙', 
      description: 'Un oraș modern cu clădiri colorate, parcuri mari și multe locuri de joacă. Plin de viață!'
    },
    { 
      id: 'space', 
      name: 'Planeta stelelor', 
      emoji: '🌟', 
      description: 'O planetă îndepărtată plină de stele strălucitoare și ființe prietenoase din spațiu!'
    }
  ]
  
  const selectLocation = (location) => {
    updateStory({ location })
  }
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">🗺</div>
          <h2 className="story-subtitle">
            Alege locația
          </h2>
          <p className="story-text mb-12">
            Unde se va petrece povestea ta?
          </p>
          
          <div className="character-grid mb-12">
            {locations.map(location => (
              <div
                key={location.id}
                className={character-option ${story.location?.id === location.id ? 'selected' : ''}}
                onClick={() => selectLocation(location)}
              >
                <div className="character-emoji">{location.emoji}</div>
                <p className="character-name">{location.name}</p>
                <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                  {location.description}
                </p>
              </div>
            ))}
          </div>
          
          {story.location && (
            <button className="story-button" onClick={nextScreen}>
              Continuă în {story.location.name} ➡
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Screen 7 - Write Beginning
const Screen7 = () => {
  const { story, updateStory, nextScreen } = useStory()
  const [text, setText] = useState(story.beginning || '')
  
  const handleContinue = () => {
    updateStory({ beginning: text })
    nextScreen()
  }
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">✍</div>
          <h2 className="story-subtitle">
            Scrie începutul poveștii
          </h2>
          
          <div className="story-hint bg-blue-100 mb-8">
            <p className="story-hint-text text-blue-800">
              💡 <strong>Hint:</strong> Prezintă personajul {story.character?.name} în {story.location?.name}. 
              Cum arată? Ce face? Cum se simte?
            </p>
          </div>
          
          <textarea
            className="story-input mb-8"
            placeholder={Exemplu: ${story.character?.name} se plimba prin ${story.location?.name} într-o zi frumoasă...}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
          />
          
          <div className="button-group">
            {text.trim().length > 10 && (
              <button className="story-button" onClick={handleContinue}>
                Continuă la mijloc 📖
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [story, setStory] = useState(initialStoryState)
  
  const updateStory = (updates) => {
    setStory(prev => ({ ...prev, ...updates }))
  }
  
  const nextScreen = () => {
    setStory(prev => ({
      ...prev,
      currentScreen: prev.currentScreen + 1,
      progress: ((prev.currentScreen + 1) / prev.totalScreens) * 100
    }))
  }
  
  const prevScreen = () => {
    setStory(prev => ({
      ...prev,
      currentScreen: Math.max(1, prev.currentScreen - 1),
      progress: ((prev.currentScreen - 1) / prev.totalScreens) * 100
    }))
  }
  
  const renderScreen = () => {
    switch (story.currentScreen) {
      case 1: return <Screen1 />
      case 2: return <Screen2 />
      case 3: return <Screen3 />
      case 4: return <Screen4 />
      case 5: return <Screen5 />
      case 6: return <Screen6 />
      case 7: return <Screen7 />
      case 8: return <Screen8 />
      case 9: return <Screen9 />
      case 10: return <Screen10 />
      case 11: return <Screen11 />
      case 12: return <Screen12 />
      case 13: return <Screen13 />
      case 14: return <Screen14 />
      default: 
        return (
          <div className="story-container">
            <div className="story-card">
              <div className="text-center">
                <div className="emoji-large mb-8">🎉</div>
                <h2 className="story-subtitle">
                  Felicitări!
                </h2>
                <p className="story-text mb-8">
                  Ai terminat lecția de scriere creativă! Povestea ta "{story.title}" este gata!
                </p>
                <div className="button-group">
                  <button 
                    className="story-button" 
                    onClick={() => setStory(initialStoryState)}
                  >
                    Începe o poveste nouă 🔄
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }
  
  return (
    <StoryContext.Provider value={{ story, updateStory, nextScreen, prevScreen }}>
      <div className="App">
        <ProgressBar />
        {renderScreen()}
      </div>
    </StoryContext.Provider>
  )
}

export default App


// Screen 8 - Choose Problem
const Screen8 = () => {
  const { story, updateStory, nextScreen } = useStory()
  
  const problems = [
    { id: 'lost', text: 'Se pierde și nu știe drumul înapoi', emoji: '😰' },
    { id: 'treasure', text: 'Găsește o comoară misterioasă', emoji: '💎' },
    { id: 'friend', text: 'Întâlnește un prieten în pericol', emoji: '😟' },
    { id: 'magic', text: 'Descoperă o putere magică nouă', emoji: '✨' }
  ]
  
  const selectProblem = (problem) => {
    updateStory({ problem })
  }
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">⚡</div>
          <h2 className="story-subtitle">
            Ce se întâmplă în poveste?
          </h2>
          <p className="story-text mb-12">
            Alege problema sau evenimentul principal:
          </p>
          
          <div className="space-y-6 mb-12">
            {problems.map(problem => (
              <div
                key={problem.id}
                className={`selection-option cursor-pointer ${
                  story.problem?.id === problem.id ? 'border-green-500 bg-green-50' : 'hover:border-blue-400'
                }`}
                onClick={() => selectProblem(problem)}
              >
                <span className="selection-emoji">{problem.emoji}</span>
                <span className="selection-text">{problem.text}</span>
                {story.problem?.id === problem.id && (
                  <span className="ml-auto text-green-600 font-bold">✓ SELECTAT</span>
                )}
              </div>
            ))}
          </div>
          
          {story.problem && (
            <button className="story-button" onClick={nextScreen}>
              Continuă cu această problemă ➡
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Screen 9 - Write Middle
const Screen9 = () => {
  const { story, updateStory, nextScreen } = useStory()
  const [text, setText] = useState(story.middle || '')
  
  const handleContinue = () => {
    updateStory({ middle: text })
    nextScreen()
  }
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">📝</div>
          <h2 className="story-subtitle">
            Scrie mijlocul poveștii
          </h2>
          
          <div className="story-hint bg-yellow-100 mb-8">
            <p className="story-hint-text text-yellow-800">
              💡 <strong>Hint:</strong> Descrie cum {story.character?.name} se confruntă cu problema: 
              "{story.problem?.text}". Ce încearcă să facă? Ce obstacole întâlnește?
            </p>
          </div>
          
          <textarea
            className="story-input mb-8"
            placeholder={Exemplu: ${story.character?.name} a încercat să rezolve problema, dar...}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
          />
          
          <div className="button-group">
            {text.trim().length > 10 && (
              <button className="story-button" onClick={handleContinue}>
                Continuă la sfârșit 🏁
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 10 - Choose Solution
const Screen10 = () => {
  const { story, updateStory, nextScreen } = useStory()
  
  const solutions = [
    { id: 'help', text: 'Primește ajutor de la un prieten', emoji: '🤝' },
    { id: 'clever', text: 'Găsește o soluție inteligentă', emoji: '💡' },
    { id: 'brave', text: 'Își găsește curajul să continue', emoji: '💪' },
    { id: 'magic', text: 'Folosește magia pentru a rezolva', emoji: '🪄' }
  ]
  
  const selectSolution = (solution) => {
    updateStory({ solution })
  }
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">🎯</div>
          <h2 className="story-subtitle">
            Cum se rezolvă problema?
          </h2>
          <p className="story-text mb-12">
            Alege cum se termină povestea:
          </p>
          
          <div className="space-y-6 mb-12">
            {solutions.map(solution => (
              <div
                key={solution.id}
                className={`selection-option cursor-pointer ${
                  story.solution?.id === solution.id ? 'border-green-500 bg-green-50' : 'hover:border-blue-400'
                }`}
                onClick={() => selectSolution(solution)}
              >
                <span className="selection-emoji">{solution.emoji}</span>
                <span className="selection-text">{solution.text}</span>
                {story.solution?.id === solution.id && (
                  <span className="ml-auto text-green-600 font-bold">✓ SELECTAT</span>
                )}
              </div>
            ))}
          </div>
          
          {story.solution && (
            <button className="story-button" onClick={nextScreen}>
              Continuă cu această soluție ➡
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Screen 11 - Write Ending
const Screen11 = () => {
  const { story, updateStory, nextScreen } = useStory()
  const [text, setText] = useState(story.ending || '')
  
  const handleContinue = () => {
    updateStory({ ending: text })
    nextScreen()
  }
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">🏁</div>
          <h2 className="story-subtitle">
            Scrie încheierea poveștii
          </h2>
          
          <div className="story-hint bg-purple-100 mb-8">
            <p className="story-hint-text text-purple-800">
              💡 <strong>Hint:</strong> Descrie cum {story.character?.name} rezolvă totul prin: 
              "{story.solution?.text}". Cum se simte la sfârșit? Ce învață?
            </p>
          </div>
          
          <textarea
            className="story-input mb-8"
            placeholder={Exemplu: În final, ${story.character?.name} a reușit să...}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
          />
          
          <div className="button-group">
            {text.trim().length > 10 && (
              <button className="story-button" onClick={handleContinue}>
                Vezi povestea completă 📖
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 12 - Complete Story Display
const Screen12 = () => {
  const { story, nextScreen } = useStory()
  
  const readStory = () => {
    const fullStory = ${story.beginning} ${story.middle} ${story.ending}
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(fullStory)
      utterance.lang = 'ro-RO'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">📚</div>
          <h2 className="story-subtitle">
            Povestea ta completă!
          </h2>
          
          <div className="text-left bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl mb-8 shadow-inner">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">🌟 Începutul:</h3>
              <p className="text-xl leading-relaxed text-gray-700">{story.beginning}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">⚡ Mijlocul:</h3>
              <p className="text-xl leading-relaxed text-gray-700">{story.middle}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-green-600 mb-4">🏁 Sfârșitul:</h3>
              <p className="text-xl leading-relaxed text-gray-700">{story.ending}</p>
            </div>
          </div>
          
          <div className="button-group">
            <button className="story-button-secondary" onClick={readStory}>
              Citește cu voce tare 🔊
            </button>
            <button className="story-button" onClick={nextScreen}>
              Continuă 📝
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 13 - Self Evaluation
const Screen13 = () => {
  const { nextScreen } = useStory()
  const [checks, setChecks] = useState({})
  
  const criteria = [
    { id: 'character', text: 'Povestea mea are un personaj clar' },
    { id: 'location', text: 'Am descris unde se petrece acțiunea' },
    { id: 'problem', text: 'Am inclus o problemă sau un conflict' },
    { id: 'solution', text: 'Am găsit o soluție la problemă' },
    { id: 'ending', text: 'Povestea are o încheiere clară' }
  ]
  
  const handleCheck = (id) => {
    setChecks(prev => ({ ...prev, [id]: !prev[id] }))
  }
  
  const allChecked = criteria.every(c => checks[c.id])
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">✅</div>
          <h2 className="story-subtitle">
            Recitește și verifică
          </h2>
          <p className="story-text mb-12">
            Bifează dacă povestea ta are toate elementele:
          </p>
          
          <div className="space-y-6 mb-12">
            {criteria.map(criterion => (
              <div
                key={criterion.id}
                className="flex items-center space-x-6 p-6 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100"
                onClick={() => handleCheck(criterion.id)}
              >
                <input
                  type="checkbox"
                  className="story-checkbox"
                  checked={checks[criterion.id] || false}
                  onChange={() => handleCheck(criterion.id)}
                />
                <span className="text-xl font-medium text-left flex-1">
                  {criterion.text}
                </span>
                {checks[criterion.id] && (
                  <span className="text-green-600 text-2xl">✓</span>
                )}
              </div>
            ))}
          </div>
          
          {allChecked && (
            <div className="mb-8 p-6 bg-green-100 rounded-2xl">
              <p className="text-2xl font-bold text-green-800">
                🎉 Excelent! Povestea ta are toate elementele importante!
              </p>
            </div>
          )}
          
          <div className="button-group">
            <button className="story-button" onClick={nextScreen}>
              {allChecked ? 'Perfect! Continuă 🎉' : 'Continuă oricum ➡'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 14 - Choose Title
const Screen14 = () => {
  const { story, updateStory, nextScreen } = useStory()
  const [title, setTitle] = useState(story.title || '')
  
  const handleContinue = () => {
    updateStory({ title })
    nextScreen()
  }
  
  const suggestedTitles = [
    Aventura lui ${story.character?.name},
    Misterul din ${story.location?.name},
    $ {story.character?.name} și ${story.problem?.text.toLowerCase()},
    Povestea magică din ${story.location?.name}
  ]
  
  return (
    <div className="story-container">
      <div className="story-card fade-in">
        <div className="text-center">
          <div className="emoji-large mb-8">📝</div>
          <h2 className="story-subtitle">
            Alege un titlu pentru poveste
          </h2>
          
          <input
            type="text"
            className="story-input mb-8"
            placeholder="Scrie titlul poveștii tale..."
            value={title}
            onChange={(e) => setText(e.target.value)}
            style={{ minHeight: '80px', fontSize: '1.5rem' }}
          />
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-6">💡 Sugestii:</h3>
            <div className="space-y-4">
              {suggestedTitles.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full p-4 bg-blue-100 hover:bg-blue-200 rounded-2xl text-xl font-medium text-blue-800 transition-all duration-300"
                  onClick={() => setTitle(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          <div className="button-group">
            {title.trim().length > 2 && (
              <button className="story-button" onClick={handleContinue}>
                Continuă cu titlul: "{title}" ➡
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Update the renderScreen function to include all new screens
