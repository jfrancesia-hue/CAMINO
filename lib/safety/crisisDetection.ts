export type CrisisDetectionResult = {
  flag: "none" | "crisis";
  risk: string | null;
};

const crisisPatterns: Array<{ pattern: RegExp; risk: string }> = [
  { pattern: /\b(suicid|suicidar|matarme|quitarme la vida|no quiero vivir)\b/i, risk: "suicidio" },
  { pattern: /\b(autolesion|cortarme|hacerme dano|lastimarme)\b/i, risk: "autolesion" },
  { pattern: /\b(abuso|abusaron|violacion|violaron)\b/i, risk: "abuso" },
  { pattern: /\b(me van a matar|quiero matar|violencia|arma)\b/i, risk: "violencia" },
  { pattern: /\b(no aguanto mas|no puedo mas|desesperado|desesperada)\b/i, risk: "desesperacion_extrema" },
  { pattern: /\b(ataque de panico|me falta el aire|siento que me muero)\b/i, risk: "panico" },
  { pattern: /\b(peligro inmediato|emergencia|ayuda ahora)\b/i, risk: "peligro_inmediato" },
];

export const CRISIS_RESPONSE =
  "Siento mucho que estes pasando por esto. Tu vida importa y no tenes que atravesarlo solo/a. Si estas en peligro inmediato, contacta a emergencias de tu pais o a una persona de confianza ahora mismo. Tambien puedo ayudarte a respirar mientras buscas ayuda.";

export function detectCrisis(message: string): CrisisDetectionResult {
  for (const item of crisisPatterns) {
    if (item.pattern.test(message)) {
      return {
        flag: "crisis",
        risk: item.risk,
      };
    }
  }

  return {
    flag: "none",
    risk: null,
  };
}
