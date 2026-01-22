import type {
  ReadingAnalysisRequest,
  AnalysisResult,
  ContentGenerationRequest,
  GeneratedContent,
  SimplifyTextRequest,
  SimplifiedText,
  TranslateRequest,
  TranslationResult,
  ReadingTips,
  HealthResponse,
  SupportedLanguagesResponse,
  DifficultyGuideResponse,
} from '../types/api';

const API_BASE_URL = 'http://localhost:8000/api';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export const api = {
  analyzeReading: async (data: ReadingAnalysisRequest): Promise<AnalysisResult> => {
    return fetchAPI<AnalysisResult>('/analyze-reading', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  generateContent: async (data: ContentGenerationRequest): Promise<GeneratedContent> => {
    return fetchAPI<GeneratedContent>('/generate-content', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  simplifyText: async (data: SimplifyTextRequest): Promise<SimplifiedText> => {
    return fetchAPI<SimplifiedText>('/simplify-text', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  translate: async (data: TranslateRequest): Promise<TranslationResult> => {
    return fetchAPI<TranslationResult>('/translate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getTips: async (analysisResult: AnalysisResult): Promise<ReadingTips> => {
    return fetchAPI<ReadingTips>('/get-tips', {
      method: 'POST',
      body: JSON.stringify(analysisResult),
    });
  },

  checkHealth: async (): Promise<HealthResponse> => {
    return fetchAPI<HealthResponse>('/health');
  },

  getSupportedLanguages: async (): Promise<SupportedLanguagesResponse> => {
    return fetchAPI<SupportedLanguagesResponse>('/supported-languages');
  },

  getDifficultyGuide: async (): Promise<DifficultyGuideResponse> => {
    return fetchAPI<DifficultyGuideResponse>('/difficulty-guide');
  },
};
