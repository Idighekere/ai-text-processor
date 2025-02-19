import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { LanguageAction, LanguageState, Message } from '../types/language'

const useTextStore = create<LanguageAction & LanguageState>()(persist((set, get) => ({


    // Initial state
    outputText: "",
    // sourceLanguage: 'en',
    // targetLanguage: 'es',
    detectedLanguage: null,
    // translatedText: null,
    // summary: null,
    isLoading: false,
    error: null,
    downloadProgress: null,
    messages: [],

    // Basic setters
    // setSourceLanguage: (lang: string) => set({ sourceLanguage: lang }),
    // setTargetLanguage: (lang: string) => set({ targetLanguage: lang }),
    clearError: () => set({ error: null }),
    setDownloadProgress: (progress) => set({ downloadProgress: progress }),

    addMessage: (text, detectedLanguage) => {

        // const detectedLanguage = get().detectedLanguage

        set((state) => ({
            messages: [...state.messages, { id: Date.now(), text, detectedLanguage, translatedText: '' }]
        }))

    },
    updateMessage: (id, translatedText) => {

        return set((state) => ({
            messages: state?.messages?.map((msg: Message) => msg.id == id ? { ...msg, translatedText } : msg)
        }))
    },
    // setMessage:(state)=>([...state,])),

    detectLanguage: async (text) => {
        set({ isLoading: true, error: null });
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
            set({ error: error instanceof Error ? error.message : 'An error occurred' });

        } finally {
            set({ isLoading: false });

        }
    },
    translate: async (text, source, target) => {
        set({ isLoading: true, error: null });
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
            set({ error: error instanceof Error ? error.message : 'An error occurred' });

        } finally {
            set({ isLoading: false });

        }
    },
    // summarize: async (text) => {
    //     set({ isLoading: true, error: null });
    //     try {

    //     } catch (error) {
    //         set({ error: error instanceof Error ? error.message : 'An error occurred' });

    //     } finally {
    //         set({ isLoading: false });

    //     }
    // },



}), {
    name: 'text',
    storage: createJSONStorage(() => localStorage),
},))

export default useTextStore
