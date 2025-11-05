import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const homeRelated = {
  yes_no: [
    { id: 12, text: "Agua potable", scoreYes: 0, scoreNo: 3, selected: null },
    { id: 13, text: "Luz", scoreYes: 0, scoreNo: 3, selected: null },
    { id: 14, text: "Gas natural", scoreYes: 0, scoreNo: 2, selected: null },
    { id: 15, text: "Baño dentro de vivienda", scoreYes: 0, scoreNo: 2, selected: null },
    { id: 16, text: "Red cloacal", scoreYes: 0, scoreNo: 2, selected: null },
    { id: 17, text: "Comparte vivienda con otra familia", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 18, text: "Más de 5 integrantes en la vivienda", scoreYes: 2, scoreNo: 0, selected: null }
  ],
  options: [
    {
      id: 10,
      text: "Tipo de construcción de la vivienda familiar",
      options: [
        { id: 1, text: "Material", score: 0 },
        { id: 2, text: "Adobe", score: 1 },
        { id: 3, text: "Módulo de madera", score: 2 },
        { id: 4, text: "Chapa y/o Nylon", score: 3 }
      ],
      selectedOptionId: null
    },
    {
      id: 11,
      text: "Condición vivienda",
      options: [
        { id: 1, text: "Propia", score: 0 },
        { id: 2, text: "Alquilada", score: 2 },
        { id: 3, text: "Cedida/prestada", score: 1 },
        { id: 4, text: "Situación de calle", score: 3 }
      ],
      selectedOptionId: null
    }
  ]
};

const familyRelated = {
  yes_no: [],
  options: [
    {
      id: 2,
      text: "Domicilio laboral",
      options: [
        { id: 1, text: "Es cercano al JMM (hasta 1 km)", score: 2 },
        { id: 2, text: "Es lejano al JMM", score: 0 }
      ],
      selectedOptionId: null
    },
    {
      id: 4,
      text: "Ingresos mensuales que registra la familia conviviente",
      options: [
        { id: 1, text: "Menos de $400.000", score: 3 },
        { id: 2, text: "Entre $400.000 a $800.000", score: 2 },
        { id: 3, text: "Más de $800.000", score: 0 }
      ],
      selectedOptionId: null
    },
  ]
}

const parentRelated = {
  yes_no: [
    { id: 3, text: "Madre/padre o adulto responsable trabaja en la Municipalidad de Godoy Cruz", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 5, text: "Recibe ayuda económica como: Asignación Universal por Hijo, Alimentar", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 21, text: "Consumos problemáticos en la familia directa", scoreYes: 3, scoreNo: 0, selected: null },
    { id: 22, text: "La familia es o ha sido intervenida por ETI, Juzgado, PPMI, género, Niñez", scoreYes: 3, scoreNo: 0, selected: null },
    { id: 23, text: "Madre/padre o adulto como único responsable", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 24, text: "Madre/padre falleció", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 25, text: "Madre adolescente (hasta 20 años)", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 27, text: "Prohibición de acercamiento entre progenitores", scoreYes: 1, scoreNo: 0, selected: null },
    { id: 30, text: "Progenitor/responsable con discapacidad", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 31, text: "Único adulto a cargo con discapacidad", scoreYes: 3, scoreNo: 0, selected: null },
    { id: 34, text: "Progenitor/responsable conviviente con enfermedad severa", scoreYes: 2, scoreNo: 0, selected: null },
  ],
  options: [
    {
      id: 29,
      text: "Familiar privado de libertad",
      options: [
        { id: 1, text: "Madre/Padre/Responsable", score: 3 },
        { id: 2, text: "No corresponde", score: 0 }
      ],
      selectedOptionId: null
    }
  ]
};

const kidRelated = {
  yes_no: [
    { id: 6, text: "Hermano/a actualmente asiste al jardín", scoreYes: 3, scoreNo: 0, selected: null },
    { id: 8, text: "Niño/a prematuro", scoreYes: 1, scoreNo: 0, selected: null },
    { id: 19, text: "El/la niño/a comparte dormitorio con +3 personas", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 20, text: "El/la niño/a comparte cama con otra persona", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 26, text: "Prohibición de acercamiento al niño/a por parte de alguno de los progenitores", scoreYes: 2, scoreNo: 0, selected: null },
    { id: 28, text: "Niño/a vive en efector provincial", scoreYes: 3, scoreNo: 0, selected: null },
    { id: 32, text: "Niño/a con CUD (certificado único de discapacidad)", scoreYes: 4, scoreNo: 0, selected: null },
    { id: 33, text: "Hermano/a con discapacidad", scoreYes: 2, scoreNo: 0, selected: null },
  ],
  options: [
    {
      id: 1,
      text: "Domicilio actual del niño/a",
      options: [
        { id: 1, text: "Es cercano al JMM (hasta 1 km)", score: 2 },
        { id: 2, text: "Es lejano al JMM", score: 0 }
      ],
      selectedOptionId: null
    },
    {
      id: 7,
      text: "Estado nutricional",
      options: [
        { id: 1, text: "Normal", score: 0 },
        { id: 2, text: "Sobrepeso", score: 1 },
        { id: 3, text: "Déficit nutricional", score: 2 }
      ],
      selectedOptionId: null
    },
    {
      id: 9,
      text: "Vacunas",
      options: [
        { id: 1, text: "Completas", score: 0 },
        { id: 2, text: "Incompletas", score: 2 }
      ],
      selectedOptionId: null
    },
  ]
};

const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        <span className={value ? "text-gray-700" : "text-gray-400"}>{value || "Seleccionar opción"}</span>
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

const MultipleChoiceItems = ({ preguntas, onSelect, gkey }) => (
  <Card className="mb-6">
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {preguntas.map((q, index) => (
          <div
            key={q.id}
            className={`from-white to-gray-50 rounded-xl shadow-sm p-5 border-2 border-gray-100 hover:border-blue-300 transition-all ${q.selectedOptionId !== null
                            ? 'bg-green-50 border-green-300' : ''
                          }`}
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <label className={`block w-full px-3 py-2 text-base font-semibold mb-3 rounded-lg`}>
                  {q.text}
                </label>
                <Select
                  className="border-black-100"
                  value={q.selectedOptionId ?
                    q.options.find(o => o.id === q.selectedOptionId)?.text :
                    ""
                  }
                  onValueChange={value => onSelect(gkey, q.id, value)}
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
    </CardContent>
  </Card>
);

const YesNoItems = ({ gkey, preguntas, onToggle }) => (
  <Card>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {preguntas.map((q) => (
          <div
            key={q.id}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${q.selected === null
              ? 'bg-white border-gray-200'
              : q.selected
                ? 'bg-green-50 border-green-300'
                : 'bg-red-50 border-red-300'
              }`}
          >
            <span className="text-sm font-medium text-gray-700 flex-1 pr-4">
              {q.text}
            </span>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold ${q.selected === false ? 'text-red-600' : 'text-gray-400'}`}>
                NO
              </span>
              <Switch
                className="data-[state=checked]:bg-purple-600"
                checked={q.selected === true}
                onCheckedChange={(checked) => onToggle(gkey, q.id, checked)}
              />
              <span className={`text-xs font-semibold ${q.selected === true ? 'text-green-600' : 'text-gray-400'}`}>
                SÍ
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);



export default function FormularionConPuntaje({ userCUIL }) {
  const [sections, setSections] = useState({
    "kid": kidRelated,
    "parent": parentRelated,
    "family": familyRelated,
    "home": homeRelated
  });
  const [sent, setSent] = useState(false);

  const getAllQuestions = (sections) => {
    const result = {
      options: [],
      yes_no: []
    };

    Object.values(sections).forEach(sec => {
      if (sec.options) result.options.push(...sec.options);
      if (sec.yes_no) result.yes_no.push(...sec.yes_no);
    });

    return result;
  };

  const onSelect = (gkey, questionId, optionId) => {
    setSections(
      prev => {
        const updatedSections = { ...prev };
        updatedSections[gkey]["options"] = updatedSections[gkey]["options"].map(q =>
          q.id === questionId
            ? { ...q, selectedOptionId: parseInt(optionId) }
            : q
        );
        return updatedSections;
      }
    );
  };

  const onToggle = (gkey, questionId, checked) => {
    setSections(
      prev => {
        const updatedSections = { ...prev };
        updatedSections[gkey].yes_no = updatedSections[gkey].yes_no.map(q =>
          q.id === questionId
            ? { ...q, selected: checked }
            : q
        );
        return updatedSections;
      }
    );
  };

  const handleSubmit = () => {

    // Calcular puntajes
    const { options: allOptions, yes_no: allYesNo } = getAllQuestions(sections);

    const scoreOptions = allOptions.reduce((total, q) => {
      if (q.selectedOptionId !== null) {
        const opt = q.options.find(o => o.id === q.selectedOptionId);
        return total + (opt?.score || 0);
      }
      return total;
    }, 0);

    const scoreYesNo = allYesNo.reduce((total, q) => {
      if (q.selected !== null) {
        return total + (q.selected ? q.scoreYes : q.scoreNo);
      }
      return total;
    }, 0);

    const totalScore = scoreOptions + scoreYesNo;
    alert(`Formulario enviado\nPuntaje Sección A: ${scoreOptions}\nPuntaje Sección B: ${scoreYesNo}\nPuntaje Total: ${totalScore}`);

    // Enviar datos al servidor
    fetch('/api/puntaje_formulario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userCUIL, totalScore })
    }).then(response => {
      if (response.ok) {
        alert('Datos enviados correctamente al servidor.');
        setSent(true);
      } else {
        alert('Error al enviar los datos al servidor. Vuelva a intentarlo.');
      }
    });
  };

  const { options: allOptions, yes_no: allYesNo } = getAllQuestions(sections);

  const answeredOptions = allOptions.filter(q => q.selectedOptionId !== null).length;
  const answeredYesNo = allYesNo.filter(q => q.selected !== null).length;

  const totalAnswered = answeredOptions + answeredYesNo;
  const totalQuestions = allOptions.length + allYesNo.length;

  const progress = (totalAnswered / totalQuestions) * 100;

  const titles = {
    kid: "Información del Niño/a",
    parent: "Información de Progenitores/Tutores",
    family: "Características de la Familia",
    home: "Características de la Vivienda"
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <button
            onClick={() => window.history.back()}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>

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
              <span className="font-semibold">{totalAnswered}/{totalQuestions}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Sections */}
        {
          Object.entries(sections).map(
            ([key, section], index) => (
              <Card key={index} className="mb-6">
                <CardHeader className={`bg-gradient-to-r from-blue-500 to-blue-600 ${({
                      kid: "from-blue-500 to-blue-700",
                      parent: "from-green-500 to-green-700",
                      family: "from-purple-500 to-purple-700",
                      home: "from-amber-500 to-amber-700"
                    })[key]}`}>
                  <CardTitle className="text-white text-xl">{titles[key]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <MultipleChoiceItems gkey={key} preguntas={section.options} onSelect={onSelect} />
                  <YesNoItems gkey={key} preguntas={section.yes_no} onToggle={onToggle} />
                </CardContent>
              </Card>
            )
          )
        }

        {/* Submit Button */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <button
            onClick={handleSubmit}
            disabled={totalAnswered < totalQuestions || sent}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform ${!sent && totalAnswered === totalQuestions
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            {sent ? 'Formulario Enviado ✓' :
              totalAnswered === totalQuestions
                ? 'Enviar Formulario ✓'
                : `Complete todas las preguntas (${totalAnswered}/${totalQuestions})`
            }
          </button>
        </div>
      </div>
    </div>
  );
}