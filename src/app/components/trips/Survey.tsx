import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Sparkles } from 'lucide-react';

type SurveyAnswers = {
  duration: number;
  budget: number;
  transport: string[];
  maxTravelTime: number;
  activities: string[];
  season: string[];
  climate: string;
  environment: string[];
};

export default function Survey() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<SurveyAnswers>({
    duration: 3,
    budget: 50,
    transport: [],
    maxTravelTime: 2,
    activities: [],
    season: [],
    climate: '',
    environment: []
  });

  const totalQuestions = 8;

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Simula: casi siempre va a match (80% de probabilidad)
      const allCompleted = Math.random() > 0.2;
      if (allCompleted) {
        navigate('/match-destinations/new');
      } else {
        navigate('/waiting-survey/new');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleOption = (field: keyof SurveyAnswers, value: string) => {
    const currentValues = answers[field] as string[];
    if (currentValues.includes(value)) {
      setAnswers({
        ...answers,
        [field]: currentValues.filter(v => v !== value)
      });
    } else {
      setAnswers({
        ...answers,
        [field]: [...currentValues, value]
      });
    }
  };

  const isSelected = (field: keyof SurveyAnswers, value: string) => {
    const currentValues = answers[field] as string[];
    return currentValues.includes(value);
  };

  return (
    <div className="size-full bg-[#E8F2FF] overflow-y-auto">
      <div className="max-w-md mx-auto min-h-full flex flex-col">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-400 px-4 md:px-6 py-4 md:py-5 hover:text-gray-600 transition-colors md:fixed md:top-4 md:left-4 md:z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Salir</span>
        </button>

        <div className="flex-1 px-4 pb-8 flex items-center">
          <div className="w-full bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#92C0E8]/20 p-3 rounded-2xl">
                <Sparkles className="w-8 h-8 text-[#92C0E8]" />
              </div>
              <h1 className="text-2xl">Nuevo Viaje</h1>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex gap-2 mb-2">
                {Array.from({ length: totalQuestions }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full ${
                      index < currentQuestion ? 'bg-[#92C0E8]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Pregunta {currentQuestion} de {totalQuestions}</p>
            </div>

            {/* Question 1: Duration */}
            {currentQuestion === 1 && (
              <div>
                <h2 className="text-2xl mb-8">¿Cuál es la duración ideal?</h2>
                <div className="mb-8">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={answers.duration}
                    onChange={(e) => setAnswers({ ...answers, duration: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center mt-4">
                    <span className="text-5xl text-[#92C0E8]">{answers.duration}</span>
                    <span className="text-2xl text-gray-600 ml-2">días</span>
                  </div>
                </div>
              </div>
            )}

            {/* Question 2: Budget */}
            {currentQuestion === 2 && (
              <div>
                <h2 className="text-2xl mb-8">Presupuesto aproximado por persona</h2>
                <div className="mb-8">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={answers.budget}
                    onChange={(e) => setAnswers({ ...answers, budget: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center mt-4">
                    <span className="text-5xl text-[#92C0E8]">{answers.budget}</span>
                    <span className="text-2xl text-gray-600 ml-2">€</span>
                  </div>
                </div>
              </div>
            )}

            {/* Question 3: Transport */}
            {currentQuestion === 3 && (
              <div>
                <h2 className="text-2xl mb-8">¿Que transporte esta dispuesto a coger?</h2>
                <div className="space-y-3 mb-8">
                  <div className="grid grid-cols-2 gap-3">
                    {['Avión', 'Tren', 'Coche', 'Barcos'].map((option) => (
                      <button
                        key={option}
                        onClick={() => toggleOption('transport', option)}
                        className={`py-3 px-6 rounded-full border-2 transition-colors ${
                          isSelected('transport', option)
                            ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => toggleOption('transport', 'Indiferente')}
                    className={`w-full py-3 px-6 rounded-full border-2 transition-colors ${
                      isSelected('transport', 'Indiferente')
                        ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    Indiferente
                  </button>
                </div>
              </div>
            )}

            {/* Question 4: Max travel time */}
            {currentQuestion === 4 && (
              <div>
                <h2 className="text-2xl mb-8">¿Duración máxima de trayecto?</h2>
                <div className="mb-8">
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={answers.maxTravelTime}
                    onChange={(e) => setAnswers({ ...answers, maxTravelTime: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center mt-4">
                    <span className="text-5xl text-[#92C0E8]">{answers.maxTravelTime}</span>
                    <span className="text-2xl text-gray-600 ml-2">h</span>
                  </div>
                </div>
              </div>
            )}

            {/* Question 5: Activities */}
            {currentQuestion === 5 && (
              <div>
                <h2 className="text-2xl mb-8">¿Que actividades atraen tu interes ?</h2>
                <div className="space-y-3 mb-8">
                  <div className="grid grid-cols-2 gap-3">
                    {['Cultura', 'Montaña', 'Playa', 'Gastronomía', 'Deportes', 'Familia'].map((option) => (
                      <button
                        key={option}
                        onClick={() => toggleOption('activities', option)}
                        className={`py-3 px-6 rounded-full border-2 transition-colors ${
                          isSelected('activities', option)
                            ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Question 6: Season */}
            {currentQuestion === 6 && (
              <div>
                <h2 className="text-2xl mb-8">¿En que temporada tienes previsto hacer el viaje?</h2>
                <div className="space-y-3 mb-8">
                  <div className="grid grid-cols-2 gap-3">
                    {['Verano', 'Invierno', 'Primavera', 'Otoño'].map((option) => (
                      <button
                        key={option}
                        onClick={() => toggleOption('season', option)}
                        className={`py-3 px-6 rounded-full border-2 transition-colors ${
                          isSelected('season', option)
                            ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Question 7: Climate */}
            {currentQuestion === 7 && (
              <div>
                <h2 className="text-2xl mb-8">¿Qué clima quieres?</h2>
                <div className="mb-8">
                  <input
                    type="text"
                    value={answers.climate}
                    onChange={(e) => setAnswers({ ...answers, climate: e.target.value })}
                    placeholder="Ej: Cálido, Templado, Frío..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#92C0E8]"
                  />
                </div>
              </div>
            )}

            {/* Question 8: Environment */}
            {currentQuestion === 8 && (
              <div>
                <h2 className="text-2xl mb-8">¿Qué tipo de entorno prefieres?</h2>
                <div className="space-y-3 mb-8">
                  <div className="grid grid-cols-2 gap-3">
                    {['Urbano', 'Rural', 'Natural', 'Remoto'].map((option) => (
                      <button
                        key={option}
                        onClick={() => toggleOption('environment', option)}
                        className={`py-3 px-6 rounded-full border-2 transition-colors ${
                          isSelected('environment', option)
                            ? 'bg-[#92C0E8] border-[#92C0E8] text-white'
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-8">
              {currentQuestion > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ← Anterior
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 bg-[#92C0E8] text-white py-3 rounded-xl hover:bg-[#7eb3df] transition-colors"
              >
                {currentQuestion === totalQuestions ? 'Finalizar' : 'Siguiente →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
