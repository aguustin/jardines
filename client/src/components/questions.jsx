import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        <span className="text-gray-700">{value || "Seleccionar opción"}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {React.Children.map(children, child => 
            React.cloneElement(child, {
              onClick: () => {
                onValueChange(child.props.value);
                setIsOpen(false);
              }
            })
          )}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children, onClick }) => (
  <div
    onClick={onClick}
    className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
  >
    {children}
  </div>
);

export default function QuestionnaireUI() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const get_preguntas = async () => {
      try {
        const res = await fetch('/api/preguntas');
        const data = await res.json();
        console.log(data);
        setQuestions(data.preguntas);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    get_preguntas();
  }, [setQuestions]);
   
  const onSelect = (questionId, optionId) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? { ...q, selectedOptionId: parseInt(optionId) }
          : q
      )
    );
  };

  const handleSubmit = () => {
    const answered = questions.filter(q => q.selectedOptionId).length;
    alert(`Respuestas enviadas: ${answered}/${questions.length} completadas`);
  };

  const answeredCount = questions.filter(q => q.selectedOptionId).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Formulario de Evaluación
          </h1>
          <p className="text-gray-600">
            Complete todas las preguntas para enviar el formulario
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso</span>
              <span className="font-semibold">{answeredCount}/{questions.length}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        
        {/* Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((q, index) => (
            <div 
              key={q.id} 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* Question Number */}
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    q.selectedOptionId 
                      ? 'bg-gradient-to-br from-green-400 to-green-600' 
                      : 'bg-gradient-to-br from-gray-300 to-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                
                {/* Question Content */}
                <div className="flex-1">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    {q.text}
                  </label>
                  
                  <Select
                    value={q.selectedOptionId ? 
                      q.options.find(o => o.id === q.selectedOptionId)?.text : 
                      ""
                    }
                    onValueChange={value => onSelect(q.id, value)}
                  >
                    {q.options.map(o => (
                      <SelectItem key={o.id} value={o.id.toString()}>
                        {o.text}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform ${
              answeredCount === questions.length
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {answeredCount === questions.length 
              ? 'Enviar Respuestas ✓' 
              : `Complete todas las preguntas (${answeredCount}/${questions.length})`
            }
          </button>
        </div>
      </div>
    </div>
  );
}