import { SentinelId } from '../types/sentinels';

export interface SentinelVoiceProfile {
  id: SentinelId;
  name: string;
  roleBadge: string;
  pitch: number;
  rate: number;
  volume: number;
  preferredVoices: string[];
  gender: 'male' | 'female';
  personality: string;
}

export const SENTINEL_VOICE_PROFILES: Record<SentinelId, SentinelVoiceProfile> = {
  jax: {
    id: 'jax',
    name: 'Jax',
    roleBadge: 'Lead Sentinel',
    pitch: 1.02,
    rate: 1.02,
    volume: 1.0,
    preferredVoices: [
      'Microsoft Andrew Online (Natural)',
      'Microsoft Brian Online (Natural)',
      'Microsoft Guy Online (Natural)',
      'Microsoft Ryan Online (Natural)',
      'Microsoft Christopher Online (Natural)',
      'Microsoft Eric Online (Natural)',
      'Google US English',
      'Google UK English Male',
      'Daniel (Enhanced)',
      'Oliver (Enhanced)',
      'Evan (Enhanced)',
      'Nathan (Enhanced)',
      'Microsoft Mark',
      'Alex',
    ],
    gender: 'male',
    personality: 'Warm, confident, articulate human leader',
  },
  it: {
    id: 'it',
    name: 'IT Sentinel',
    roleBadge: 'Infrastructure & Asset Guardian',
    pitch: 1.03,
    rate: 1.03,
    volume: 1.0,
    preferredVoices: [
      'Microsoft Brian Online (Natural)',
      'Microsoft Ryan Online (Natural)',
      'Microsoft Christopher Online (Natural)',
      'Microsoft Andrew Online (Natural)',
      'Google UK English Male',
      'Google US English',
      'Daniel (Enhanced)',
      'Microsoft Mark',
      'Aaron',
      'Alex',
    ],
    gender: 'male',
    personality: 'Crisp, engaging, modern cybersecurity specialist',
  },
  privacy: {
    id: 'privacy',
    name: 'Privacy Sentinel',
    roleBadge: 'Data Protection & Web Defense',
    pitch: 1.03,
    rate: 1.01,
    volume: 1.0,
    preferredVoices: [
      'Microsoft Ava Online (Natural)',
      'Microsoft Emma Online (Natural)',
      'Microsoft Aria Online (Natural)',
      'Microsoft Jenny Online (Natural)',
      'Microsoft Sonia Online (Natural)',
      'Google UK English Female',
      'Google US English',
      'Stephanie (Enhanced)',
      'Samantha (Enhanced)',
      'Victoria',
    ],
    gender: 'female',
    personality: 'Warm, articulate, assured regulatory specialist',
  },
  risky: {
    id: 'risky',
    name: 'Risky Sentinel',
    roleBadge: 'Enterprise Threat & Forensics',
    pitch: 1.0,
    rate: 1.0,
    volume: 1.0,
    preferredVoices: [
      'Microsoft Christopher Online (Natural)',
      'Microsoft Guy Online (Natural)',
      'Microsoft Andrew Online (Natural)',
      'Microsoft Eric Online (Natural)',
      'Google UK English Male',
      'Oliver (Enhanced)',
      'Daniel (Enhanced)',
      'George',
      'Arthur',
    ],
    gender: 'male',
    personality: 'Calm, grounded, authoritative risk advisor',
  },
  hr: {
    id: 'hr',
    name: 'HR Sentinel',
    roleBadge: 'People Governance & Culture',
    pitch: 1.04,
    rate: 1.01,
    volume: 1.0,
    preferredVoices: [
      'Microsoft Jenny Online (Natural)',
      'Microsoft Emma Online (Natural)',
      'Microsoft Ava Online (Natural)',
      'Microsoft Aria Online (Natural)',
      'Samantha (Enhanced)',
      'Google US English',
      'Google UK English Female',
      'Jenny',
      'Samantha',
    ],
    gender: 'female',
    personality: 'Warm, friendly, encouraging People & Culture specialist',
  },
};

// Persistent queue prevents browser garbage-collection from cutting off speech mid-sentence
let activeUtteranceQueue: SpeechSynthesisUtterance[] = [];
let isCancelled = false;
let voiceEnabled = true;
let customSelectedVoices: Partial<Record<SentinelId, string>> = {};

// Listeners for active speaking state and audio animation
type SpeakingListener = (speaking: boolean, sentinelId: SentinelId | null, textSnippet?: string) => void;
const speakingListeners = new Set<SpeakingListener>();

export function subscribeSpeakingState(listener: SpeakingListener): () => void {
  speakingListeners.add(listener);
  return () => speakingListeners.delete(listener);
}

function notifySpeaking(speaking: boolean, sentinelId: SentinelId | null, textSnippet?: string) {
  speakingListeners.forEach((fn) => fn(speaking, sentinelId, textSnippet));
}

// Gentle acoustic audio activation cue
function playActivationChime(sentinelId: SentinelId) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (sentinelId === 'privacy' || sentinelId === 'risky') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.0, ctx.currentTime + 0.12); // A5
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5
    }

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch {
    // Autoplay policy fallback
  }
}

export function isVoiceSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function setVoiceEnabled(enabled: boolean) {
  voiceEnabled = enabled;
  if (!enabled) {
    stopSpeaking();
  }
}

export function getVoiceEnabled(): boolean {
  return voiceEnabled;
}

export function stopSpeaking() {
  isCancelled = true;
  activeUtteranceQueue = [];
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    notifySpeaking(false, null);
  }
}

// Voice classification regexes
const NATURAL_NEURAL_REGEX = /natural|neural|online|enhanced|premium|studio|wavenet/i;
const FEMALE_VOICE_REGEX = /female|woman|samantha|zira|victoria|karen|stephanie|hazel|susan|catherine|jenny|aria|ava|emma|ana|helena|sophia|monica|amelia|fiona|moira|veena|tessa/i;
const MALE_VOICE_REGEX = /male|man|alex|david|guy|daniel|george|oliver|mark|aaron|arthur|tom|rishi|christopher|ryan|eric|andrew|brian|evan|nathan/i;

// Natural human pronunciation mapper for technical and compliance terminology
export function humanizeComplianceSpeech(rawText: string): string {
  const text = rawText
    .replace(/[*_#`~]/g, '')
    .replace(/https?:\/\/\S+/g, 'one compliance dot com')
    .replace(/www\.1-compliance\.com/gi, 'one compliance dot com')
    .replace(/1-compliance\.com/gi, 'one compliance dot com')
    .replace(/[$](\d+(?:,\d+)?)\/mo/gi, '$1 dollars a month')
    .replace(/[$](\d+(?:,\d+)?)/g, '$1 dollars')
    .replace(/\b24\/7\/365\b/g, 'twenty-four seven, three sixty-five')
    .replace(/\b24\/7\b/g, 'twenty-four seven')
    .replace(/\b5[×x]5\b/gi, 'five by five')
    .replace(/\b28\+\s*years\b/gi, 'over twenty-eight years')
    // Compliance abbreviations humanization
    .replace(/\bSOC 2\b/gi, 'Sock two')
    .replace(/\bPCI[- ]DSS\b/gi, 'P C I, D S S')
    .replace(/\bHIPAA\b/gi, 'Hip-uh')
    .replace(/\bFinCEN\b/gi, 'Fin-sen')
    .replace(/\bBOI\b/g, 'B O I')
    .replace(/\bGDPR\b/gi, 'G D P R')
    .replace(/\bCCPA\b/gi, 'C C P A')
    .replace(/\bCPRA\b/gi, 'C P R A')
    .replace(/\bWCAG\b/gi, 'W C A G')
    .replace(/\bSSL\/TLS\b/gi, 'S S L and T L S')
    .replace(/\bNIST CSF\b/gi, 'Nist C S F')
    .replace(/\bNIST\b/gi, 'Nist')
    .replace(/\bISO 27001\b/gi, 'I S O twenty-seven thousand one')
    .replace(/\b1-Compliance OS™?\b/gi, 'One Compliance O S')
    .replace(/\b1-Compliance\b/gi, 'One Compliance')
    .replace(/\bOS\b/g, 'O S')
    .replace(/\bMSL\b/g, 'M S L')
    .replace(/\bCPA\b/g, 'C P A')
    .replace(/\bLLC\b/g, 'L L C')
    .replace(/\bAI\b/g, 'A I')
    .replace(/\bTLS\b/g, 'T L S')
    .replace(/\bCSP\b/g, 'C S P')
    .replace(/\bTPCRM\b/g, 'Third Party Vendor Risk')
    // Punctuation pacing: convert em-dashes and slashes so TTS never skips clauses
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/\.\s+/g, '. ')
    .replace(/;\s+/g, '. ')
    .trim();

  return text;
}

// Find the highest fidelity natural human SpeechSynthesisVoice
export function resolveSentinelVoice(sentinelId: SentinelId): SpeechSynthesisVoice | null {
  if (!isVoiceSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const profile = SENTINEL_VOICE_PROFILES[sentinelId];
  if (!profile) return voices[0] || null;

  // 1. User manual override
  const customUri = customSelectedVoices[sentinelId];
  if (customUri) {
    const customVoice = voices.find((v) => v.voiceURI === customUri || v.name === customUri);
    if (customVoice) return customVoice;
  }

  // 2. High-Priority Natural / Neural voices matching preferred list
  for (const preferredName of profile.preferredVoices) {
    const naturalMatch = voices.find((v) => {
      const nameLower = v.name.toLowerCase();
      const prefLower = preferredName.toLowerCase();
      const matches = nameLower.includes(prefLower);
      if (!matches) return false;

      // Gender safety check
      if (profile.gender === 'male' && FEMALE_VOICE_REGEX.test(v.name)) {
        return false;
      }
      return true;
    });
    if (naturalMatch) return naturalMatch;
  }

  // 3. Fallback: Search for any Natural / Neural / Enhanced voice matching gender
  if (profile.gender === 'male') {
    // Neural male voice in English
    const neuralMale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      const isNatural = NATURAL_NEURAL_REGEX.test(v.name);
      const isMale = MALE_VOICE_REGEX.test(v.name) && !FEMALE_VOICE_REGEX.test(v.name);
      return isEnglish && isNatural && isMale;
    });
    if (neuralMale) return neuralMale;

    // Any Natural/Neural English voice that is not female
    const nonFemaleNeural = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      const isNatural = NATURAL_NEURAL_REGEX.test(v.name);
      const notFemale = !FEMALE_VOICE_REGEX.test(v.name);
      return isEnglish && isNatural && notFemale;
    });
    if (nonFemaleNeural) return nonFemaleNeural;

    // Standard male English voice
    const standardMale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      const isMale = MALE_VOICE_REGEX.test(v.name) && !FEMALE_VOICE_REGEX.test(v.name);
      return isEnglish && isMale;
    });
    if (standardMale) return standardMale;

    // Any English voice that does NOT match female names
    const nonFemale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      return isEnglish && !FEMALE_VOICE_REGEX.test(v.name);
    });
    if (nonFemale) return nonFemale;
  } else {
    // Female profile
    const neuralFemale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      const isNatural = NATURAL_NEURAL_REGEX.test(v.name);
      const isFemale = FEMALE_VOICE_REGEX.test(v.name);
      return isEnglish && isNatural && isFemale;
    });
    if (neuralFemale) return neuralFemale;

    const standardFemale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      return isEnglish && FEMALE_VOICE_REGEX.test(v.name);
    });
    if (standardFemale) return standardFemale;
  }

  // 4. Default English voice
  const defaultEnglish = voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'));
  return defaultEnglish || voices[0] || null;
}

export function setCustomSentinelVoice(sentinelId: SentinelId, voiceURI: string) {
  customSelectedVoices[sentinelId] = voiceURI;
}

// Return voices sorted with High-Definition Natural / Neural voices first
export function getAllSystemVoices(): SpeechSynthesisVoice[] {
  if (!isVoiceSupported()) return [];
  const voices = window.speechSynthesis.getVoices();
  return [...voices].sort((a, b) => {
    const aNatural = NATURAL_NEURAL_REGEX.test(a.name) ? 1 : 0;
    const bNatural = NATURAL_NEURAL_REGEX.test(b.name) ? 1 : 0;
    if (aNatural !== bNatural) return bNatural - aNatural;
    const aEng = (a.lang || '').toLowerCase().startsWith('en') ? 1 : 0;
    const bEng = (b.lang || '').toLowerCase().startsWith('en') ? 1 : 0;
    return bEng - aEng;
  });
}

export function isNaturalVoice(voice: SpeechSynthesisVoice): boolean {
  return NATURAL_NEURAL_REGEX.test(voice.name);
}

export function speakSentinel(
  sentinelId: SentinelId,
  rawText: string,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (!voiceEnabled || !isVoiceSupported()) {
    return;
  }

  stopSpeaking();
  isCancelled = false;

  const profile = SENTINEL_VOICE_PROFILES[sentinelId] || SENTINEL_VOICE_PROFILES.jax;
  playActivationChime(sentinelId);

  const cleanText = humanizeComplianceSpeech(rawText);
  // Split into natural conversational sentences so speech synthesis never times out or sounds flat
  const sentences = cleanText
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (sentences.length === 0) {
    if (onEnd) onEnd();
    return;
  }

  const matchedVoice = resolveSentinelVoice(sentinelId);

  activeUtteranceQueue = sentences.map((sentence, idx) => {
    const u = new SpeechSynthesisUtterance(sentence);
    if (matchedVoice) {
      u.voice = matchedVoice;
      u.lang = matchedVoice.lang;
    }
    // Subtle natural conversational inflection per sentence (prevents monotone reading)
    const isQuestion = sentence.endsWith('?');
    const isOpening = idx === 0;
    const isClosing = idx === sentences.length - 1 && sentences.length > 1;
    u.pitch = isQuestion
      ? profile.pitch + 0.05
      : isOpening
      ? profile.pitch + 0.03
      : isClosing
      ? profile.pitch + 0.02
      : profile.pitch;
    u.rate = isClosing ? Math.max(0.96, profile.rate - 0.02) : profile.rate;
    u.volume = profile.volume;

    u.onstart = () => {
      if (isCancelled) return;
      notifySpeaking(true, sentinelId, sentence);
      if (idx === 0 && onStart) onStart();
    };

    u.onend = () => {
      if (isCancelled) return;
      if (idx === sentences.length - 1) {
        activeUtteranceQueue = [];
        notifySpeaking(false, null);
        if (onEnd) onEnd();
      }
    };

    u.onerror = () => {
      if (idx === sentences.length - 1) {
        activeUtteranceQueue = [];
        notifySpeaking(false, null);
        if (onEnd) onEnd();
      }
    };

    return u;
  });

  activeUtteranceQueue.forEach((u) => window.speechSynthesis.speak(u));
}
