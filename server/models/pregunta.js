import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  score: { type: Number, required: true },
});

const QuestionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  options: { type: [OptionSchema], required: true },
  selectedOptionId: { type: String, default: "" },
});

const PreguntaSchema = new mongoose.Schema({
  preguntas: { type: [QuestionSchema], required: true },
});

export default mongoose.model("Pregunta", PreguntaSchema);