import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { LanguageAction, LanguageState, Message } from '../types/language'
import { SummarizerOptions } from '../types/ai'

const useTextStore = create<LanguageAction & LanguageState>()(persist((set, get) => ({


    // Initial state
    outputText: "",
    // sourceLanguage: 'en',
    // targetLanguage: 'es',
    detectedLanguage: null,
    // translatedText: null,
    // summary: null,
    isLoading: {},
    errors: {},
    downloadProgress: null,
    messages: [],

    // Basic setters
    // setSourceLanguage: (lang: string) => set({ sourceLanguage: lang }),
    // setTargetLanguage: (lang: string) => set({ targetLanguage: lang }),
    clearError: () => set({ errors: null }),
    setError: (id, error) => set((state) => ({
        errors: { ...state.errors, [id]: error }
    })),
    setDownloadProgress: (progress) => set({ downloadProgress: progress }),

    addMessage: (id, text, detectedLanguage) => {
        // const detectedLanguage = get().detectedLanguage

        set((state) => ({
            messages: [...state.messages, { id, text, detectedLanguage, translatedText: '', summary: "" }]
        }))

    },
    clearChats: () => set({ messages: [] }),
    addTranslatedText: (id, translatedText) => {

        return set((state) => ({
            messages: state?.messages?.map((msg: Message) => msg.id == id ? { ...msg, translatedText } : msg)
        }))
    },
    addSummarizedText: (id, summary) => {
        set((state) => ({
            messages: state.messages.map((msg: Message) => msg.id == id ? { ...msg, summary } : msg)
        }))
    },
    // setMessage:(state)=>([...state,])),

    detectLanguage: async (id, text) => {
        // set({ isLoading: true, error: null });
        set((state) => ({
            isLoading: { ...state.isLoading, [id]: true },
            errors: { ...state.errors, [id]: null }
        }))
        try {
            if (!('ai' in self) || !('languageDetector' in self.ai)) {
                throw new Error('Language detection API not available');
            }
            const capabilities = await self.ai.languageDetector.capabilities();

            if (capabilities.available == 'no') {
                throw new Error("The language detector isn't usable");
            }
            // if(capabilities.available=='readily'){

            // }
            const detector = await self.ai.languageDetector.create(capabilities.available === 'after-download' ? {
                monitor(m) {
                    m.addEventListener('downloadprogress', (e) => {
                        set({
                            downloadProgress: {
                                loaded: e.loaded,
                                total: e.total
                            }
                        })
                    });
                },
            } : undefined);

            await detector.ready;
            const results = await detector.detect(text);

            if (results.length > 0) {
                // set({ detectedLanguage: results[0] });
                return results[0]
                const timeout = setTimeout(() => {

                }, 1000);

                clearTimeout(timeout)

                // set((state) => ({
                //     messages: {
                //         ...state.messages,
                //         detectedLanguage: results[0]
                //     }
                // }))
            }

        } catch (error) {
            set((state) => ({ errors: { ...state.errors, [id]: error instanceof Error ? error.message : 'An error occurred' } }))

        } finally {
            set((state) => ({
                isLoading: {
                    ...state.isLoading, [id]: false
                }
            }));

        }
    },
    translate: async (id, text, source, target) => {
        set((state) => ({
            isLoading: { ...state.isLoading, [id]: true },
            errors: { ...state.errors, [id]: null }
        }))
        try {
            let translator;

            if (!('ai' in self) || !('translator' in self.ai)) {
                throw new Error("The translator API isn't available");

            }

            const capabilities = await self.ai.translator.capabilities();
            console.log("capa", capabilities.languagePairAvailable(source, target))

            if (capabilities.available == 'no') {
                throw new Error("The Translator API isn't usable")
            }

            if (!capabilities.languagePairAvailable(source, target)) {
                throw new Error("Language pair can't be translated");

            }
            if (capabilities.available == 'readily') {
                translator = await self.ai.translator.create({
                    sourceLanguage: source,
                    targetLanguage: target,
                });
                console.log(translator)

            } else if (capabilities.available == 'after-download') {

                translator = await self.ai.languageDetector.create({
                    monitor(m) {
                        m.addEventListener('downloadprogress', (e) => {
                            set({
                                downloadProgress: {
                                    loaded: e.loaded,
                                    total: e.total
                                }
                            })
                            console.log(get().downloadProgress)
                        });
                    },
                });
            }
            await translator?.ready;
            const result = await translator?.translate(text);
            console.log("Trans", translator);

            return result

        } catch (error) {
            set((state) => ({

                errors: { ...state.errors, [id]: error instanceof Error ? error.message : "An error occurred" }
            }))
        } finally {
            set((state) => ({
                isLoading: { ...state.isLoading, [id]: false }

            }))
        }
    },
    summarize: async (id, longText) => {
        set((state) => ({
            isLoading: { ...state.isLoading, [id]: true },
            errors: { ...state.errors, [id]: null }
        }))
        try {
            let summarizer

            if (!('ai' in self && 'summarizer' in self.ai)) {
                throw new Error("The Summarizer API is not supported");
            }

            const options: SummarizerOptions = {
                sharedContext: 'This is a scientific article',
                type: 'key-points',
                format: 'markdown',
                length: 'medium',
            };

            const capabilities = await self.ai.summarizer.capabilities()

            if (capabilities.available == 'no') {
                throw new Error("The summarizer API isn't usable");
            }
            if (capabilities.available == 'readily') {
                summarizer = await self.ai.summarizer.create(options)

            } else {
                summarizer = await self.ai.summarizer.create(options)
                summarizer.addEventListener('downloadprogress', (e) => {
                    set({ downloadProgress: { loaded: e.loaded, total: e.total } })
                })

            }
            await summarizer.ready

            const summary = await summarizer.summarize(longText, { context: 'Make it understandable' })

            return summary




        } catch (error) {
            set((state) => ({
                errors: { ...state.errors, [id]: error instanceof Error ? error.message : "An error occurred" }
            }))

        } finally {
            set((state) => ({
                isLoading: { ...state.isLoading, [id]: false },
            }))
        }
    },



}), {
    name: 'text',
    storage: createJSONStorage(() => localStorage),
},))

export default useTextStore
