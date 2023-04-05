export type Mora = {
  text: string;
  consonant: string;
  consonant_length: number;
  vowel: string;
  vowel_length: number;
  pitch: number;
};

export type Query = {
  accent_phrases: {
    moras: Mora[];
    accent: number;
    pause_mora: Mora;
  };
  speedScale: number;
  pitchScale: number;
  intonationScale: number;
  volumeScale: number;
  prePhonemeLength: number;
  postPhonemeLength: number;
  outputSamplingRate: number;
  outputStereo: boolean;
  kana: string;
};

export type SupportedFeatures = {
  permitted_synthesis_morphing: string;
};

export type Style = {
  name: string;
  id: number;
};

export type Speaker = {
  supported_features: SupportedFeatures;
  name: string;
  speaker_uuid: string;
  styles: Style[];
  version: string;
};
