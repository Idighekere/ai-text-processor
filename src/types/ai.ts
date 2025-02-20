/* eslint-disable @typescript-eslint/no-unused-vars */
// Types for Language Detection
interface LanguageDetectorCapabilities {
    available: 'no' | 'readily' | 'after-download';
    languageAvailable: (language: string) => boolean;
}

interface LanguageDetectionResult {
    detectedLanguage: string;
    confidence: number;
}

interface LanguageDetector {
    detect: (text: string) => Promise<LanguageDetectionResult[]>;
    ready: Promise<void>;
}

// Types for Translation
interface TranslatorCapabilities {
    available: 'no' | 'readily' | 'after-download';
    languagePairAvailable: (source: string, target: string) => boolean;
}

interface TranslatorOptions {
    sourceLanguage: string;
    targetLanguage: string;
    monitor?: (monitor: DownloadMonitor) => void;
}

interface Translator {
    translate: (text: string) => Promise<string>;
    ready: Promise<void>;
}

// Types for Summarization
interface SummarizerCapabilities {
    available: 'no' | 'readily' | 'after-download';
}

type SummaryType = 'key-points' | 'tldr' | 'teaser' | 'headline';
type SummaryFormat = 'markdown' | 'plain-text';
type SummaryLength = 'short' | 'medium' | 'long';

interface SummarizerOptions {
    sharedContext?: string;
    type?: SummaryType;
    format?: SummaryFormat;
    length?: SummaryLength;
    monitor?: (monitor: DownloadMonitor) => void;
}

interface SummarizeOptions {
    context?: string;
}

interface Summarizer {
    summarize: (text: string, options?: SummarizerOptions) => Promise<string>;
    ready: Promise<void>;
}

// Shared types
interface DownloadProgressEvent extends Event {
    loaded: number;
    total: number;
}

interface DownloadMonitor {
    addEventListener: (
        event: 'downloadprogress',
        callback: (event: DownloadProgressEvent) => void
    ) => void;
    removeEventListener: (
        event: 'downloadprogress',
        callback: (event: DownloadProgressEvent) => void
    ) => void;
}

// AI namespace types
interface ChromeAI {
    languageDetector: {
        capabilities: () => Promise<LanguageDetectorCapabilities>;
        create: (options?: { monitor?: (monitor: DownloadMonitor) => void }) => Promise<LanguageDetector>;
    };
    translator: {
        capabilities: () => Promise<TranslatorCapabilities>;
        create: (options: TranslatorOptions) => Promise<Translator>;
        // translate:Translator
    };
    summarizer: {
        capabilities: () => Promise<SummarizerCapabilities>;
        create: (options?: SummarizerOptions) => Promise<Summarizer>;
    };
}

// Global self type
interface Global extends Window {
    ai: ChromeAI;
}

declare global {
    interface Window {
        ai: ChromeAI;
    }
    // const self: Global
}

// Export types that will be used in the store
export type {
    ChromeAI,
    LanguageDetector,
    Translator,
    Summarizer,
    LanguageDetectionResult,
    TranslatorOptions,
    SummarizerOptions,
    SummarizeOptions,
    DownloadProgressEvent,
    DownloadMonitor
};
