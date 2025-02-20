/**
 * Converts a language code to its full language name
 * @param {string} code - The language code (e.g., 'en', 'fr', 'es')
 * @returns {string} The full language name
 */

export const getLanguageName = (code: string) => {
    if (!code) return 'Unknown';

    switch (code.toLowerCase()) {
        case 'en':
            return 'English';
        case 'fr':
            return 'French';
        case 'es':
            return 'Spanish';
        case 'ru':
            return 'Russian';
        case 'pt':
            return 'Portuguese';
        case 'tr':
            return 'Turkish';
        case 'de':
            return 'German';
        case 'it':
            return 'Italian';
        case 'nl':
            return 'Dutch';
        case 'pl':
            return 'Polish';
        case 'ar':
            return 'Arabic';
        case 'ja':
            return 'Japanese';
        case 'ko':
            return 'Korean';
        case 'zh':
            return 'Chinese';
        case 'hi':
            return 'Hindi';
        case 'bn':
            return 'Bengali';
        case 'ur':
            return 'Urdu';
        case 'vi':
            return 'Vietnamese';
        case 'th':
            return 'Thai';
        case 'id':
            return 'Indonesian';
        case 'gl':
            return 'Galician'
        case 'ar-Latn':
            return 'Romanized Arabic'
        default:
            return code
    }
}
