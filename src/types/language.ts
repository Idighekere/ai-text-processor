
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
    type: 'key-points' | 'tldr' | 'teaser' | 'headline';
}

export interface Message {
    id: number;
    text: string;
    detectedLanguage: LanguageDetectionResult;
    translatedText?: string;
    // summary: SummaryResult | null;
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
    isLoading: boolean;
    error: string | null;

}

export interface LanguageAction {
    // Actions
    addMessage?: (text: string, detectedLanguage?: LanguageDetectionResult) => void;
    updateMessage: (id: number, text: string) => void;
    // setTargetLanguage: (lang: string) => void;
    setDownloadProgress: (progress: DownloadProgress) => void;
    detectLanguage: (text: string) => Promise<LanguageDetectionResult | undefined>;
    translate: (text: string, source: string, target: string) => Promise<string>;
    summarize?: (text: string) => Promise<void>;
    clearError: () => void;
    setMessage?: (message: Partial<Message>) => void
}
