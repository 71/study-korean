import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a TokenizedText. */
export interface ITokenizedText {

    /** TokenizedText text */
    text?: (string|null);

    /** TokenizedText tokens */
    tokens?: (TokenizedText.IToken[]|null);
}

/** Represents a TokenizedText. */
export class TokenizedText implements ITokenizedText {

    /**
     * Constructs a new TokenizedText.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITokenizedText);

    /** TokenizedText text. */
    public text: string;

    /** TokenizedText tokens. */
    public tokens: TokenizedText.IToken[];

    /**
     * Creates a new TokenizedText instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TokenizedText instance
     */
    public static create(properties?: ITokenizedText): TokenizedText;

    /**
     * Encodes the specified TokenizedText message. Does not implicitly {@link TokenizedText.verify|verify} messages.
     * @param message TokenizedText message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITokenizedText, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TokenizedText message, length delimited. Does not implicitly {@link TokenizedText.verify|verify} messages.
     * @param message TokenizedText message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITokenizedText, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TokenizedText message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TokenizedText
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TokenizedText;

    /**
     * Decodes a TokenizedText message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TokenizedText
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TokenizedText;

    /**
     * Verifies a TokenizedText message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TokenizedText message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TokenizedText
     */
    public static fromObject(object: { [k: string]: any }): TokenizedText;

    /**
     * Creates a plain object from a TokenizedText message. Also converts values to other types if specified.
     * @param message TokenizedText
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TokenizedText, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TokenizedText to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for TokenizedText
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace TokenizedText {

    /** Properties of a Token. */
    interface IToken {

        /** Token text */
        text?: (string|null);

        /** Token wordId */
        wordId?: (number|null);
    }

    /** Represents a Token. */
    class Token implements IToken {

        /**
         * Constructs a new Token.
         * @param [properties] Properties to set
         */
        constructor(properties?: TokenizedText.IToken);

        /** Token text. */
        public text: string;

        /** Token wordId. */
        public wordId?: (number|null);

        /** Token _wordId. */
        public _wordId?: "wordId";

        /**
         * Creates a new Token instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Token instance
         */
        public static create(properties?: TokenizedText.IToken): TokenizedText.Token;

        /**
         * Encodes the specified Token message. Does not implicitly {@link TokenizedText.Token.verify|verify} messages.
         * @param message Token message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TokenizedText.IToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Token message, length delimited. Does not implicitly {@link TokenizedText.Token.verify|verify} messages.
         * @param message Token message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TokenizedText.IToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Token message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Token
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TokenizedText.Token;

        /**
         * Decodes a Token message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Token
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TokenizedText.Token;

        /**
         * Verifies a Token message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Token message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Token
         */
        public static fromObject(object: { [k: string]: any }): TokenizedText.Token;

        /**
         * Creates a plain object from a Token message. Also converts values to other types if specified.
         * @param message Token
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TokenizedText.Token, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Token to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Token
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Properties of a Word. */
export interface IWord {

    /** Word text */
    text?: (string|null);

    /** Word noun */
    noun?: (Word.IDefined|null);

    /** Word dependentNoun */
    dependentNoun?: (Word.IDefined|null);

    /** Word pronoun */
    pronoun?: (Word.IDefined|null);

    /** Word interjection */
    interjection?: (Word.IDefined|null);

    /** Word verb */
    verb?: (Word.IDefined|null);

    /** Word auxVerb */
    auxVerb?: (Word.IDefined|null);

    /** Word auxAdjective */
    auxAdjective?: (Word.IDefined|null);

    /** Word eomi */
    eomi?: (Word.IDefined|null);

    /** Word adjective */
    adjective?: (Word.IDefined|null);

    /** Word adverb */
    adverb?: (Word.IDefined|null);

    /** Word josa */
    josa?: (Word.IDefined|null);

    /** Word determiner */
    determiner?: (Word.IDefined|null);

    /** Word modifier */
    modifier?: (Word.IDefined|null);

    /** Word number */
    number?: (Word.IDefined|null);

    /** Word abbreviation */
    abbreviation?: (Word.IDefined|null);

    /** Word phrase */
    phrase?: (Word.IDefined|null);

    /** Word score */
    score?: (number|null);

    /** Word mostCommon */
    mostCommon?: (number|null);
}

/** Represents a Word. */
export class Word implements IWord {

    /**
     * Constructs a new Word.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWord);

    /** Word text. */
    public text: string;

    /** Word noun. */
    public noun?: (Word.IDefined|null);

    /** Word dependentNoun. */
    public dependentNoun?: (Word.IDefined|null);

    /** Word pronoun. */
    public pronoun?: (Word.IDefined|null);

    /** Word interjection. */
    public interjection?: (Word.IDefined|null);

    /** Word verb. */
    public verb?: (Word.IDefined|null);

    /** Word auxVerb. */
    public auxVerb?: (Word.IDefined|null);

    /** Word auxAdjective. */
    public auxAdjective?: (Word.IDefined|null);

    /** Word eomi. */
    public eomi?: (Word.IDefined|null);

    /** Word adjective. */
    public adjective?: (Word.IDefined|null);

    /** Word adverb. */
    public adverb?: (Word.IDefined|null);

    /** Word josa. */
    public josa?: (Word.IDefined|null);

    /** Word determiner. */
    public determiner?: (Word.IDefined|null);

    /** Word modifier. */
    public modifier?: (Word.IDefined|null);

    /** Word number. */
    public number?: (Word.IDefined|null);

    /** Word abbreviation. */
    public abbreviation?: (Word.IDefined|null);

    /** Word phrase. */
    public phrase?: (Word.IDefined|null);

    /** Word score. */
    public score: number;

    /** Word mostCommon. */
    public mostCommon?: (number|null);

    /** Word _noun. */
    public _noun?: "noun";

    /** Word _dependentNoun. */
    public _dependentNoun?: "dependentNoun";

    /** Word _pronoun. */
    public _pronoun?: "pronoun";

    /** Word _interjection. */
    public _interjection?: "interjection";

    /** Word _verb. */
    public _verb?: "verb";

    /** Word _auxVerb. */
    public _auxVerb?: "auxVerb";

    /** Word _auxAdjective. */
    public _auxAdjective?: "auxAdjective";

    /** Word _eomi. */
    public _eomi?: "eomi";

    /** Word _adjective. */
    public _adjective?: "adjective";

    /** Word _adverb. */
    public _adverb?: "adverb";

    /** Word _josa. */
    public _josa?: "josa";

    /** Word _determiner. */
    public _determiner?: "determiner";

    /** Word _modifier. */
    public _modifier?: "modifier";

    /** Word _number. */
    public _number?: "number";

    /** Word _abbreviation. */
    public _abbreviation?: "abbreviation";

    /** Word _phrase. */
    public _phrase?: "phrase";

    /** Word _mostCommon. */
    public _mostCommon?: "mostCommon";

    /**
     * Creates a new Word instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Word instance
     */
    public static create(properties?: IWord): Word;

    /**
     * Encodes the specified Word message. Does not implicitly {@link Word.verify|verify} messages.
     * @param message Word message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWord, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Word message, length delimited. Does not implicitly {@link Word.verify|verify} messages.
     * @param message Word message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWord, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Word message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Word
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Word;

    /**
     * Decodes a Word message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Word
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Word;

    /**
     * Verifies a Word message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Word message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Word
     */
    public static fromObject(object: { [k: string]: any }): Word;

    /**
     * Creates a plain object from a Word message. Also converts values to other types if specified.
     * @param message Word
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Word, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Word to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Word
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace Word {

    /** Properties of a Meaning. */
    interface IMeaning {

        /** Meaning definition */
        definition?: (ITokenizedText|null);

        /** Meaning translation */
        translation?: (string|null);

        /** Meaning definitionTranslation */
        definitionTranslation?: (string|null);

        /** Meaning related */
        related?: (Word.Meaning.IWordRef[]|null);

        /** Meaning originalForms */
        originalForms?: (Word.Meaning.IWordRef[]|null);

        /** Meaning synonyms */
        synonyms?: (Word.Meaning.IWordRef[]|null);

        /** Meaning antonyms */
        antonyms?: (Word.Meaning.IWordRef[]|null);

        /** Meaning honorifics */
        honorifics?: (Word.Meaning.IWordRef[]|null);

        /** Meaning abbreviations */
        abbreviations?: (string[]|null);
    }

    /** Represents a Meaning. */
    class Meaning implements IMeaning {

        /**
         * Constructs a new Meaning.
         * @param [properties] Properties to set
         */
        constructor(properties?: Word.IMeaning);

        /** Meaning definition. */
        public definition?: (ITokenizedText|null);

        /** Meaning translation. */
        public translation: string;

        /** Meaning definitionTranslation. */
        public definitionTranslation: string;

        /** Meaning related. */
        public related: Word.Meaning.IWordRef[];

        /** Meaning originalForms. */
        public originalForms: Word.Meaning.IWordRef[];

        /** Meaning synonyms. */
        public synonyms: Word.Meaning.IWordRef[];

        /** Meaning antonyms. */
        public antonyms: Word.Meaning.IWordRef[];

        /** Meaning honorifics. */
        public honorifics: Word.Meaning.IWordRef[];

        /** Meaning abbreviations. */
        public abbreviations: string[];

        /**
         * Creates a new Meaning instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Meaning instance
         */
        public static create(properties?: Word.IMeaning): Word.Meaning;

        /**
         * Encodes the specified Meaning message. Does not implicitly {@link Word.Meaning.verify|verify} messages.
         * @param message Meaning message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Word.IMeaning, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Meaning message, length delimited. Does not implicitly {@link Word.Meaning.verify|verify} messages.
         * @param message Meaning message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Word.IMeaning, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Meaning message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Meaning
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Word.Meaning;

        /**
         * Decodes a Meaning message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Meaning
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Word.Meaning;

        /**
         * Verifies a Meaning message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Meaning message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Meaning
         */
        public static fromObject(object: { [k: string]: any }): Word.Meaning;

        /**
         * Creates a plain object from a Meaning message. Also converts values to other types if specified.
         * @param message Meaning
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Word.Meaning, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Meaning to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Meaning
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Meaning {

        /** Properties of a WordRef. */
        interface IWordRef {

            /** WordRef text */
            text?: (string|null);

            /** WordRef wordIds */
            wordIds?: (number[]|null);
        }

        /** Represents a WordRef. */
        class WordRef implements IWordRef {

            /**
             * Constructs a new WordRef.
             * @param [properties] Properties to set
             */
            constructor(properties?: Word.Meaning.IWordRef);

            /** WordRef text. */
            public text: string;

            /** WordRef wordIds. */
            public wordIds: number[];

            /**
             * Creates a new WordRef instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WordRef instance
             */
            public static create(properties?: Word.Meaning.IWordRef): Word.Meaning.WordRef;

            /**
             * Encodes the specified WordRef message. Does not implicitly {@link Word.Meaning.WordRef.verify|verify} messages.
             * @param message WordRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Word.Meaning.IWordRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WordRef message, length delimited. Does not implicitly {@link Word.Meaning.WordRef.verify|verify} messages.
             * @param message WordRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Word.Meaning.IWordRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WordRef message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WordRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Word.Meaning.WordRef;

            /**
             * Decodes a WordRef message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WordRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Word.Meaning.WordRef;

            /**
             * Verifies a WordRef message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WordRef message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WordRef
             */
            public static fromObject(object: { [k: string]: any }): Word.Meaning.WordRef;

            /**
             * Creates a plain object from a WordRef message. Also converts values to other types if specified.
             * @param message WordRef
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Word.Meaning.WordRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WordRef to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for WordRef
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a RelatedForm. */
    interface IRelatedForm {

        /** RelatedForm text */
        text?: (string|null);

        /** RelatedForm verbForm */
        verbForm?: (number|null);

        /** RelatedForm nounForm */
        nounForm?: (number|null);
    }

    /** Represents a RelatedForm. */
    class RelatedForm implements IRelatedForm {

        /**
         * Constructs a new RelatedForm.
         * @param [properties] Properties to set
         */
        constructor(properties?: Word.IRelatedForm);

        /** RelatedForm text. */
        public text: string;

        /** RelatedForm verbForm. */
        public verbForm?: (number|null);

        /** RelatedForm nounForm. */
        public nounForm?: (number|null);

        /** RelatedForm id. */
        public id?: ("verbForm"|"nounForm");

        /**
         * Creates a new RelatedForm instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RelatedForm instance
         */
        public static create(properties?: Word.IRelatedForm): Word.RelatedForm;

        /**
         * Encodes the specified RelatedForm message. Does not implicitly {@link Word.RelatedForm.verify|verify} messages.
         * @param message RelatedForm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Word.IRelatedForm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RelatedForm message, length delimited. Does not implicitly {@link Word.RelatedForm.verify|verify} messages.
         * @param message RelatedForm message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Word.IRelatedForm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RelatedForm message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RelatedForm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Word.RelatedForm;

        /**
         * Decodes a RelatedForm message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RelatedForm
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Word.RelatedForm;

        /**
         * Verifies a RelatedForm message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RelatedForm message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RelatedForm
         */
        public static fromObject(object: { [k: string]: any }): Word.RelatedForm;

        /**
         * Creates a plain object from a RelatedForm message. Also converts values to other types if specified.
         * @param message RelatedForm
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Word.RelatedForm, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RelatedForm to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RelatedForm
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Defined. */
    interface IDefined {

        /** Defined wordId */
        wordId?: (number|null);

        /** Defined text */
        text?: (string|null);

        /** Defined pos */
        pos?: (string|null);

        /** Defined lexicalUnit */
        lexicalUnit?: (string|null);

        /** Defined origin */
        origin?: (string|null);

        /** Defined pronunciation */
        pronunciation?: (string|null);

        /** Defined soundUrl */
        soundUrl?: (string|null);

        /** Defined meanings */
        meanings?: (Word.IMeaning[]|null);

        /** Defined relatedForms */
        relatedForms?: (Word.IRelatedForm[]|null);

        /** Defined exampleIds */
        exampleIds?: (number[]|null);

        /** Defined appearsInDefinitionOf */
        appearsInDefinitionOf?: (number[]|null);
    }

    /** Represents a Defined. */
    class Defined implements IDefined {

        /**
         * Constructs a new Defined.
         * @param [properties] Properties to set
         */
        constructor(properties?: Word.IDefined);

        /** Defined wordId. */
        public wordId: number;

        /** Defined text. */
        public text: string;

        /** Defined pos. */
        public pos: string;

        /** Defined lexicalUnit. */
        public lexicalUnit: string;

        /** Defined origin. */
        public origin: string;

        /** Defined pronunciation. */
        public pronunciation: string;

        /** Defined soundUrl. */
        public soundUrl: string;

        /** Defined meanings. */
        public meanings: Word.IMeaning[];

        /** Defined relatedForms. */
        public relatedForms: Word.IRelatedForm[];

        /** Defined exampleIds. */
        public exampleIds: number[];

        /** Defined appearsInDefinitionOf. */
        public appearsInDefinitionOf: number[];

        /**
         * Creates a new Defined instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Defined instance
         */
        public static create(properties?: Word.IDefined): Word.Defined;

        /**
         * Encodes the specified Defined message. Does not implicitly {@link Word.Defined.verify|verify} messages.
         * @param message Defined message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Word.IDefined, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Defined message, length delimited. Does not implicitly {@link Word.Defined.verify|verify} messages.
         * @param message Defined message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Word.IDefined, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Defined message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Defined
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Word.Defined;

        /**
         * Decodes a Defined message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Defined
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Word.Defined;

        /**
         * Verifies a Defined message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Defined message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Defined
         */
        public static fromObject(object: { [k: string]: any }): Word.Defined;

        /**
         * Creates a plain object from a Defined message. Also converts values to other types if specified.
         * @param message Defined
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Word.Defined, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Defined to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Defined
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Properties of an Example. */
export interface IExample {

    /** Example exampleId */
    exampleId?: (number|null);

    /** Example koSentence */
    koSentence?: (ITokenizedText|null);

    /** Example enTranslation */
    enTranslation?: (string|null);

    /** Example enTranslationAlt */
    enTranslationAlt?: (string|null);

    /** Example notes */
    notes?: (string|null);

    /** Example soundId */
    soundId?: (number|null);
}

/** Represents an Example. */
export class Example implements IExample {

    /**
     * Constructs a new Example.
     * @param [properties] Properties to set
     */
    constructor(properties?: IExample);

    /** Example exampleId. */
    public exampleId: number;

    /** Example koSentence. */
    public koSentence?: (ITokenizedText|null);

    /** Example enTranslation. */
    public enTranslation: string;

    /** Example enTranslationAlt. */
    public enTranslationAlt: string;

    /** Example notes. */
    public notes: string;

    /** Example soundId. */
    public soundId?: (number|null);

    /** Example _soundId. */
    public _soundId?: "soundId";

    /**
     * Creates a new Example instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Example instance
     */
    public static create(properties?: IExample): Example;

    /**
     * Encodes the specified Example message. Does not implicitly {@link Example.verify|verify} messages.
     * @param message Example message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IExample, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Example message, length delimited. Does not implicitly {@link Example.verify|verify} messages.
     * @param message Example message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IExample, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Example message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Example
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Example;

    /**
     * Decodes an Example message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Example
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Example;

    /**
     * Verifies an Example message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Example message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Example
     */
    public static fromObject(object: { [k: string]: any }): Example;

    /**
     * Creates a plain object from an Example message. Also converts values to other types if specified.
     * @param message Example
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Example, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Example to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Example
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an AllData. */
export interface IAllData {

    /** AllData words */
    words?: (IWord[]|null);

    /** AllData examples */
    examples?: (IExample[]|null);

    /** AllData pos */
    pos?: (AllData.IPartOfSpeech[]|null);
}

/** Represents an AllData. */
export class AllData implements IAllData {

    /**
     * Constructs a new AllData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAllData);

    /** AllData words. */
    public words: IWord[];

    /** AllData examples. */
    public examples: IExample[];

    /** AllData pos. */
    public pos: AllData.IPartOfSpeech[];

    /**
     * Creates a new AllData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AllData instance
     */
    public static create(properties?: IAllData): AllData;

    /**
     * Encodes the specified AllData message. Does not implicitly {@link AllData.verify|verify} messages.
     * @param message AllData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAllData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AllData message, length delimited. Does not implicitly {@link AllData.verify|verify} messages.
     * @param message AllData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAllData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AllData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AllData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AllData;

    /**
     * Decodes an AllData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AllData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AllData;

    /**
     * Verifies an AllData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AllData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AllData
     */
    public static fromObject(object: { [k: string]: any }): AllData;

    /**
     * Creates a plain object from an AllData message. Also converts values to other types if specified.
     * @param message AllData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AllData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AllData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AllData
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace AllData {

    /** Properties of a PartOfSpeech. */
    interface IPartOfSpeech {

        /** PartOfSpeech id */
        id?: (string|null);

        /** PartOfSpeech ko */
        ko?: (string|null);

        /** PartOfSpeech en */
        en?: (string|null);

        /** PartOfSpeech enAlt */
        enAlt?: (string|null);

        /** PartOfSpeech wordId */
        wordId?: (number|null);
    }

    /** Represents a PartOfSpeech. */
    class PartOfSpeech implements IPartOfSpeech {

        /**
         * Constructs a new PartOfSpeech.
         * @param [properties] Properties to set
         */
        constructor(properties?: AllData.IPartOfSpeech);

        /** PartOfSpeech id. */
        public id: string;

        /** PartOfSpeech ko. */
        public ko: string;

        /** PartOfSpeech en. */
        public en: string;

        /** PartOfSpeech enAlt. */
        public enAlt: string;

        /** PartOfSpeech wordId. */
        public wordId: number;

        /**
         * Creates a new PartOfSpeech instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartOfSpeech instance
         */
        public static create(properties?: AllData.IPartOfSpeech): AllData.PartOfSpeech;

        /**
         * Encodes the specified PartOfSpeech message. Does not implicitly {@link AllData.PartOfSpeech.verify|verify} messages.
         * @param message PartOfSpeech message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AllData.IPartOfSpeech, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartOfSpeech message, length delimited. Does not implicitly {@link AllData.PartOfSpeech.verify|verify} messages.
         * @param message PartOfSpeech message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AllData.IPartOfSpeech, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartOfSpeech message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PartOfSpeech
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AllData.PartOfSpeech;

        /**
         * Decodes a PartOfSpeech message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PartOfSpeech
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AllData.PartOfSpeech;

        /**
         * Verifies a PartOfSpeech message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartOfSpeech message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartOfSpeech
         */
        public static fromObject(object: { [k: string]: any }): AllData.PartOfSpeech;

        /**
         * Creates a plain object from a PartOfSpeech message. Also converts values to other types if specified.
         * @param message PartOfSpeech
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AllData.PartOfSpeech, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartOfSpeech to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PartOfSpeech
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
