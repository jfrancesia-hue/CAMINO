export type CaminoModeId =
  | "paz"
  | "fe"
  | "proposito"
  | "relaciones"
  | "noche"
  | "descargo"
  | "gratitud";

export type CaminoMode = {
  guidance: string;
  id: CaminoModeId;
  label: string;
};

export const caminoModes: CaminoMode[] = [
  {
    guidance: "Bajar intensidad emocional, respirar y recuperar calma sin minimizar lo que la persona siente.",
    id: "paz",
    label: "Paz",
  },
  {
    guidance: "Acompanhar la reconexion con Dios desde humildad, oracion opcional y reflexion biblica simple.",
    id: "fe",
    label: "Fe",
  },
  {
    guidance: "Ordenar deseos, talentos, decisiones y pequenos pasos hacia sentido y esperanza.",
    id: "proposito",
    label: "Proposito",
  },
  {
    guidance: "Ayudar a mirar vinculos con honestidad, limites sanos y cuidado por la dignidad propia y ajena.",
    id: "relaciones",
    label: "Relaciones",
  },
  {
    guidance: "Acompanhar la noche, ansiedad nocturna, descanso, respiracion y entrega serena.",
    id: "noche",
    label: "Noche",
  },
  {
    guidance: "Permitir descargar sin juicio, ordenar pensamientos y volver al cuerpo con suavidad.",
    id: "descargo",
    label: "Descargo",
  },
  {
    guidance: "Reconocer regalos pequenos, sostener esperanza y practicar gratitud concreta.",
    id: "gratitud",
    label: "Gratitud",
  },
];

export function getModeById(id: string | null | undefined) {
  return caminoModes.find((mode) => mode.id === id) ?? caminoModes[0];
}
