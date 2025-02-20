
interface DownloadProgress {
    loaded: number;
    total: number;
}

export interface LanguageDetectionResult {
    detectedLanguage: string;
    confidence: number;
}

export interface TranslationResult {
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
}

export interface SummaryResult {
    summary: string;
    // type: 'key-points' | 'tldr' | 'teaser' | 'headline';
}

export interface Message {
    id: number;
    text: string;
    detectedLanguage: LanguageDetectionResult;
    translatedText?: string;
    summary: string;
}


export interface LanguageState {

    // Input states
    // sourceLanguage: string;
    // targetLanguage: string;
    downloadProgress: DownloadProgress | null
    // Results
    outputText: string;
    detectedLanguage: Promise<LanguageDetectionResult> | null;

    messages: Message[];

    // Status states
    isLoading: { [key: number]: boolean };
    errors: { [key: number]: null | string };

}

export interface LanguageAction {
    // Actions
    addMessage?: (id: number, text: string, detectedLanguage?: LanguageDetectionResult) => void;
    addTranslatedText: (id: number, text: string) => void;
    addSummarizedText: (id: number, text: string) => void;

    // setTargetLanguage: (lang: string) => void;
    setDownloadProgress: (progress: DownloadProgress) => void;
    detectLanguage: (id: number, text: string) => Promise<LanguageDetectionResult | undefined>;
    translate: (id: number, text: string, source: string, target: string) => Promise<string>;
    summarize?: (id: number, text: string) => Promise<string>;
    clearError: () => void;
    clearChats?: () => void
    setError?: (id: number, error: string) => void;
    setMessage?: (message: Partial<Message>) => void
}
