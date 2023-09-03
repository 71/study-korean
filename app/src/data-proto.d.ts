import * as $protobuf from "protobufjs";
import Long = require("long");
/**
 * * Properties of a SentenceData.
 * 	 * @exports ISentenceData
 * 	 * @interface ISentenceData
 * 	 * @property {string|null} [text] SentenceData text
 * 	 * @property {Array.<SentenceData.IToken>|null} [tokens] SentenceData tokens
 */
export interface ISentenceData {

    /** SentenceData text */
    text?: (string|null);

    /** SentenceData tokens */
    tokens?: (SentenceData.IToken[]|null);
}

/**
 * * Constructs a new SentenceData.
 * 	 * @exports SentenceData
 * 	 * @classdesc Represents a SentenceData.
 * 	 * @implements ISentenceData
 * 	 * @constructor
 * 	 * @param {ISentenceData=} [properties] Properties to set
 */
export class SentenceData implements ISentenceData {

    /**
     * * Constructs a new SentenceData.
     * 	 * @exports SentenceData
     * 	 * @classdesc Represents a SentenceData.
     * 	 * @implements ISentenceData
     * 	 * @constructor
     * 	 * @param {ISentenceData=} [properties] Properties to set
     */
    constructor(properties?: ISentenceData);

    /**
     * * SentenceData text.
     * 	 * @member {string} text
     * 	 * @memberof SentenceData
     * 	 * @instance
     */
    public text: string;

    /**
     * * SentenceData tokens.
     * 	 * @member {Array.<SentenceData.IToken>} tokens
     * 	 * @memberof SentenceData
     * 	 * @instance
     */
    public tokens: SentenceData.IToken[];

    /**
     * * Creates a new SentenceData instance using the specified properties.
     * 	 * @function create
     * 	 * @memberof SentenceData
     * 	 * @static
     * 	 * @param {ISentenceData=} [properties] Properties to set
     * 	 * @returns {SentenceData} SentenceData instance
     */
    public static create(properties?: ISentenceData): SentenceData;

    /**
     * * Encodes the specified SentenceData message. Does not implicitly {@link SentenceData.verify|verify} messages.
     * 	 * @function encode
     * 	 * @memberof SentenceData
     * 	 * @static
     * 	 * @param {ISentenceData} message SentenceData message or plain object to encode
     * 	 * @param {$protobuf.Writer} [writer] Writer to encode to
     * 	 * @returns {$protobuf.Writer} Writer
     */
    public static encode(message: ISentenceData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * * Encodes the specified SentenceData message, length delimited. Does not implicitly {@link SentenceData.verify|verify} messages.
     * 	 * @function encodeDelimited
     * 	 * @memberof SentenceData
     * 	 * @static
     * 	 * @param {ISentenceData} message SentenceData message or plain object to encode
     * 	 * @param {$protobuf.Writer} [writer] Writer to encode to
     * 	 * @returns {$protobuf.Writer} Writer
     */
    public static encodeDelimited(message: ISentenceData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * * Decodes a SentenceData message from the specified reader or buffer.
     * 	 * @function decode
     * 	 * @memberof SentenceData
     * 	 * @static
     * 	 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * 	 * @param {number} [length] Message length if known beforehand
     * 	 * @returns {SentenceData} SentenceData
     * 	 * @throws {Error} If the payload is not a reader or valid buffer
     * 	 * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SentenceData;

    /**
     * * Decodes a SentenceData message from the specified reader or buffer, length delimited.
     * 	 * @function decodeDelimited
     * 	 * @memberof SentenceData
     * 	 * @static
     * 	 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * 	 * @returns {SentenceData} SentenceData
     * 	 * @throws {Error} If the payload is not a reader or valid buffer
     * 	 * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SentenceData;

    /**
     * * Verifies a SentenceData message.
     * 	 * @function verify
     * 	 * @memberof SentenceData
     * 	 * @static
     * 	 * @param {Object.<string,*>} message Plain object to verify
     * 	 * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * * Creates a SentenceData message from a plain object. Also converts values to their respective internal types.
     * 	 * @function fromObject
     * 	 * @memberof SentenceData
     * 	 * @static
     * 	 * @param {Object.<string,*>} object Plain object
     * 	 * @returns {SentenceData} SentenceData
     */
    public static fromObject(object: { [k: string]: any }): SentenceData;

    /**
     * * Creates a plain object from a SentenceData message. Also converts values to other types if specified.
     * 	 * @function toObject
     * 	 * @memberof SentenceData
     * 	 * @static
     * 	 * @param {SentenceData} message SentenceData
     * 	 * @param {$protobuf.IConversionOptions} [options] Conversion options
     * 	 * @returns {Object.<string,*>} Plain object
     */
    public static toObject(message: SentenceData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * * Converts this SentenceData to JSON.
     * 	 * @function toJSON
     * 	 * @memberof SentenceData
     * 	 * @instance
     * 	 * @returns {Object.<string,*>} JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * * Gets the default type url for SentenceData
     * 	 * @function getTypeUrl
     * 	 * @memberof SentenceData
     * 	 * @static
     * 	 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * 	 * @returns {string} The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace SentenceData {

    /**
     * * Properties of a Token.
     * 		 * @memberof SentenceData
     * 		 * @interface IToken
     * 		 * @property {string|null} [text] Token text
     * 		 * @property {number|null} [wordId] Token wordId
     */
    interface IToken {

        /** Token text */
        text?: (string|null);

        /** Token wordId */
        wordId?: (number|null);
    }

    /**
     * * Constructs a new Token.
     * 		 * @memberof SentenceData
     * 		 * @classdesc Represents a Token.
     * 		 * @implements IToken
     * 		 * @constructor
     * 		 * @param {SentenceData.IToken=} [properties] Properties to set
     */
    class Token implements IToken {

        /**
         * * Constructs a new Token.
         * 		 * @memberof SentenceData
         * 		 * @classdesc Represents a Token.
         * 		 * @implements IToken
         * 		 * @constructor
         * 		 * @param {SentenceData.IToken=} [properties] Properties to set
         */
        constructor(properties?: SentenceData.IToken);

        /**
         * * Token text.
         * 		 * @member {string} text
         * 		 * @memberof SentenceData.Token
         * 		 * @instance
         */
        public text: string;

        /**
         * * Token wordId.
         * 		 * @member {number|null|undefined} wordId
         * 		 * @memberof SentenceData.Token
         * 		 * @instance
         */
        public wordId?: (number|null);

        /**
         * * Token _wordId.
         * 		 * @member {"wordId"|undefined} _wordId
         * 		 * @memberof SentenceData.Token
         * 		 * @instance
         */
        public _wordId?: "wordId";

        /**
         * * Creates a new Token instance using the specified properties.
         * 		 * @function create
         * 		 * @memberof SentenceData.Token
         * 		 * @static
         * 		 * @param {SentenceData.IToken=} [properties] Properties to set
         * 		 * @returns {SentenceData.Token} Token instance
         */
        public static create(properties?: SentenceData.IToken): SentenceData.Token;

        /**
         * * Encodes the specified Token message. Does not implicitly {@link SentenceData.Token.verify|verify} messages.
         * 		 * @function encode
         * 		 * @memberof SentenceData.Token
         * 		 * @static
         * 		 * @param {SentenceData.IToken} message Token message or plain object to encode
         * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
         * 		 * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: SentenceData.IToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * * Encodes the specified Token message, length delimited. Does not implicitly {@link SentenceData.Token.verify|verify} messages.
         * 		 * @function encodeDelimited
         * 		 * @memberof SentenceData.Token
         * 		 * @static
         * 		 * @param {SentenceData.IToken} message Token message or plain object to encode
         * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
         * 		 * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: SentenceData.IToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * * Decodes a Token message from the specified reader or buffer.
         * 		 * @function decode
         * 		 * @memberof SentenceData.Token
         * 		 * @static
         * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * 		 * @param {number} [length] Message length if known beforehand
         * 		 * @returns {SentenceData.Token} Token
         * 		 * @throws {Error} If the payload is not a reader or valid buffer
         * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SentenceData.Token;

        /**
         * * Decodes a Token message from the specified reader or buffer, length delimited.
         * 		 * @function decodeDelimited
         * 		 * @memberof SentenceData.Token
         * 		 * @static
         * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * 		 * @returns {SentenceData.Token} Token
         * 		 * @throws {Error} If the payload is not a reader or valid buffer
         * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SentenceData.Token;

        /**
         * * Verifies a Token message.
         * 		 * @function verify
         * 		 * @memberof SentenceData.Token
         * 		 * @static
         * 		 * @param {Object.<string,*>} message Plain object to verify
         * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * * Creates a Token message from a plain object. Also converts values to their respective internal types.
         * 		 * @function fromObject
         * 		 * @memberof SentenceData.Token
         * 		 * @static
         * 		 * @param {Object.<string,*>} object Plain object
         * 		 * @returns {SentenceData.Token} Token
         */
        public static fromObject(object: { [k: string]: any }): SentenceData.Token;

        /**
         * * Creates a plain object from a Token message. Also converts values to other types if specified.
         * 		 * @function toObject
         * 		 * @memberof SentenceData.Token
         * 		 * @static
         * 		 * @param {SentenceData.Token} message Token
         * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
         * 		 * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: SentenceData.Token, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * * Converts this Token to JSON.
         * 		 * @function toJSON
         * 		 * @memberof SentenceData.Token
         * 		 * @instance
         * 		 * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * * Gets the default type url for Token
         * 		 * @function getTypeUrl
         * 		 * @memberof SentenceData.Token
         * 		 * @static
         * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * 		 * @returns {string} The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/**
 * * Properties of a WordData.
 * 	 * @exports IWordData
 * 	 * @interface IWordData
 * 	 * @property {number|null} [wordId] WordData wordId
 * 	 * @property {string|null} [text] WordData text
 * 	 * @property {string|null} [pos] WordData pos
 * 	 * @property {string|null} [posKo] WordData posKo
 * 	 * @property {string|null} [posDescr] WordData posDescr
 * 	 * @property {string|null} [lexicalUnit] WordData lexicalUnit
 * 	 * @property {string|null} [origin] WordData origin
 * 	 * @property {string|null} [pronunciation] WordData pronunciation
 * 	 * @property {string|null} [soundUrl] WordData soundUrl
 * 	 * @property {Array.<WordData.IMeaning>|null} [meanings] WordData meanings
 * 	 * @property {Array.<WordData.IRelatedForm>|null} [relatedForms] WordData relatedForms
 * 	 * @property {Array.<number>|null} [exampleIds] WordData exampleIds
 * 	 * @property {number|null} [mostCommon] WordData mostCommon
 */
export interface IWordData {

    /** WordData wordId */
    wordId?: (number|null);

    /** WordData text */
    text?: (string|null);

    /** WordData pos */
    pos?: (string|null);

    /** WordData posKo */
    posKo?: (string|null);

    /** WordData posDescr */
    posDescr?: (string|null);

    /** WordData lexicalUnit */
    lexicalUnit?: (string|null);

    /** WordData origin */
    origin?: (string|null);

    /** WordData pronunciation */
    pronunciation?: (string|null);

    /** WordData soundUrl */
    soundUrl?: (string|null);

    /** WordData meanings */
    meanings?: (WordData.IMeaning[]|null);

    /** WordData relatedForms */
    relatedForms?: (WordData.IRelatedForm[]|null);

    /** WordData exampleIds */
    exampleIds?: (number[]|null);

    /** WordData mostCommon */
    mostCommon?: (number|null);
}

/**
 * * Constructs a new WordData.
 * 	 * @exports WordData
 * 	 * @classdesc Represents a WordData.
 * 	 * @implements IWordData
 * 	 * @constructor
 * 	 * @param {IWordData=} [properties] Properties to set
 */
export class WordData implements IWordData {

    /**
     * * Constructs a new WordData.
     * 	 * @exports WordData
     * 	 * @classdesc Represents a WordData.
     * 	 * @implements IWordData
     * 	 * @constructor
     * 	 * @param {IWordData=} [properties] Properties to set
     */
    constructor(properties?: IWordData);

    /**
     * * WordData wordId.
     * 	 * @member {number} wordId
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public wordId: number;

    /**
     * * WordData text.
     * 	 * @member {string} text
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public text: string;

    /**
     * * WordData pos.
     * 	 * @member {string} pos
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public pos: string;

    /**
     * * WordData posKo.
     * 	 * @member {string} posKo
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public posKo: string;

    /**
     * * WordData posDescr.
     * 	 * @member {string} posDescr
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public posDescr: string;

    /**
     * * WordData lexicalUnit.
     * 	 * @member {string} lexicalUnit
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public lexicalUnit: string;

    /**
     * * WordData origin.
     * 	 * @member {string|null|undefined} origin
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public origin?: (string|null);

    /**
     * * WordData pronunciation.
     * 	 * @member {string|null|undefined} pronunciation
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public pronunciation?: (string|null);

    /**
     * * WordData soundUrl.
     * 	 * @member {string|null|undefined} soundUrl
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public soundUrl?: (string|null);

    /**
     * * WordData meanings.
     * 	 * @member {Array.<WordData.IMeaning>} meanings
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public meanings: WordData.IMeaning[];

    /**
     * * WordData relatedForms.
     * 	 * @member {Array.<WordData.IRelatedForm>} relatedForms
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public relatedForms: WordData.IRelatedForm[];

    /**
     * * WordData exampleIds.
     * 	 * @member {Array.<number>} exampleIds
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public exampleIds: number[];

    /**
     * * WordData mostCommon.
     * 	 * @member {number|null|undefined} mostCommon
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public mostCommon?: (number|null);

    /**
     * * WordData _origin.
     * 	 * @member {"origin"|undefined} _origin
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public _origin?: "origin";

    /**
     * * WordData _pronunciation.
     * 	 * @member {"pronunciation"|undefined} _pronunciation
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public _pronunciation?: "pronunciation";

    /**
     * * WordData _soundUrl.
     * 	 * @member {"soundUrl"|undefined} _soundUrl
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public _soundUrl?: "soundUrl";

    /**
     * * WordData _mostCommon.
     * 	 * @member {"mostCommon"|undefined} _mostCommon
     * 	 * @memberof WordData
     * 	 * @instance
     */
    public _mostCommon?: "mostCommon";

    /**
     * * Creates a new WordData instance using the specified properties.
     * 	 * @function create
     * 	 * @memberof WordData
     * 	 * @static
     * 	 * @param {IWordData=} [properties] Properties to set
     * 	 * @returns {WordData} WordData instance
     */
    public static create(properties?: IWordData): WordData;

    /**
     * * Encodes the specified WordData message. Does not implicitly {@link WordData.verify|verify} messages.
     * 	 * @function encode
     * 	 * @memberof WordData
     * 	 * @static
     * 	 * @param {IWordData} message WordData message or plain object to encode
     * 	 * @param {$protobuf.Writer} [writer] Writer to encode to
     * 	 * @returns {$protobuf.Writer} Writer
     */
    public static encode(message: IWordData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * * Encodes the specified WordData message, length delimited. Does not implicitly {@link WordData.verify|verify} messages.
     * 	 * @function encodeDelimited
     * 	 * @memberof WordData
     * 	 * @static
     * 	 * @param {IWordData} message WordData message or plain object to encode
     * 	 * @param {$protobuf.Writer} [writer] Writer to encode to
     * 	 * @returns {$protobuf.Writer} Writer
     */
    public static encodeDelimited(message: IWordData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * * Decodes a WordData message from the specified reader or buffer.
     * 	 * @function decode
     * 	 * @memberof WordData
     * 	 * @static
     * 	 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * 	 * @param {number} [length] Message length if known beforehand
     * 	 * @returns {WordData} WordData
     * 	 * @throws {Error} If the payload is not a reader or valid buffer
     * 	 * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WordData;

    /**
     * * Decodes a WordData message from the specified reader or buffer, length delimited.
     * 	 * @function decodeDelimited
     * 	 * @memberof WordData
     * 	 * @static
     * 	 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * 	 * @returns {WordData} WordData
     * 	 * @throws {Error} If the payload is not a reader or valid buffer
     * 	 * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WordData;

    /**
     * * Verifies a WordData message.
     * 	 * @function verify
     * 	 * @memberof WordData
     * 	 * @static
     * 	 * @param {Object.<string,*>} message Plain object to verify
     * 	 * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * * Creates a WordData message from a plain object. Also converts values to their respective internal types.
     * 	 * @function fromObject
     * 	 * @memberof WordData
     * 	 * @static
     * 	 * @param {Object.<string,*>} object Plain object
     * 	 * @returns {WordData} WordData
     */
    public static fromObject(object: { [k: string]: any }): WordData;

    /**
     * * Creates a plain object from a WordData message. Also converts values to other types if specified.
     * 	 * @function toObject
     * 	 * @memberof WordData
     * 	 * @static
     * 	 * @param {WordData} message WordData
     * 	 * @param {$protobuf.IConversionOptions} [options] Conversion options
     * 	 * @returns {Object.<string,*>} Plain object
     */
    public static toObject(message: WordData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * * Converts this WordData to JSON.
     * 	 * @function toJSON
     * 	 * @memberof WordData
     * 	 * @instance
     * 	 * @returns {Object.<string,*>} JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * * Gets the default type url for WordData
     * 	 * @function getTypeUrl
     * 	 * @memberof WordData
     * 	 * @static
     * 	 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * 	 * @returns {string} The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace WordData {

    /**
     * * Properties of a Meaning.
     * 		 * @memberof WordData
     * 		 * @interface IMeaning
     * 		 * @property {ISentenceData|null} [definition] Meaning definition
     * 		 * @property {string|null} [translation] Meaning translation
     * 		 * @property {string|null} [definitionTranslation] Meaning definitionTranslation
     * 		 * @property {Array.<WordData.Meaning.IWordRef>|null} [related] Meaning related
     * 		 * @property {Array.<WordData.Meaning.IWordRef>|null} [originalForms] Meaning originalForms
     * 		 * @property {Array.<WordData.Meaning.IWordRef>|null} [synonyms] Meaning synonyms
     * 		 * @property {Array.<WordData.Meaning.IWordRef>|null} [antonyms] Meaning antonyms
     * 		 * @property {Array.<string>|null} [abbreviations] Meaning abbreviations
     */
    interface IMeaning {

        /** Meaning definition */
        definition?: (ISentenceData|null);

        /** Meaning translation */
        translation?: (string|null);

        /** Meaning definitionTranslation */
        definitionTranslation?: (string|null);

        /** Meaning related */
        related?: (WordData.Meaning.IWordRef[]|null);

        /** Meaning originalForms */
        originalForms?: (WordData.Meaning.IWordRef[]|null);

        /** Meaning synonyms */
        synonyms?: (WordData.Meaning.IWordRef[]|null);

        /** Meaning antonyms */
        antonyms?: (WordData.Meaning.IWordRef[]|null);

        /** Meaning abbreviations */
        abbreviations?: (string[]|null);
    }

    /**
     * * Constructs a new Meaning.
     * 		 * @memberof WordData
     * 		 * @classdesc Represents a Meaning.
     * 		 * @implements IMeaning
     * 		 * @constructor
     * 		 * @param {WordData.IMeaning=} [properties] Properties to set
     */
    class Meaning implements IMeaning {

        /**
         * * Constructs a new Meaning.
         * 		 * @memberof WordData
         * 		 * @classdesc Represents a Meaning.
         * 		 * @implements IMeaning
         * 		 * @constructor
         * 		 * @param {WordData.IMeaning=} [properties] Properties to set
         */
        constructor(properties?: WordData.IMeaning);

        /**
         * * Meaning definition.
         * 		 * @member {ISentenceData|null|undefined} definition
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public definition?: (ISentenceData|null);

        /**
         * * Meaning translation.
         * 		 * @member {string|null|undefined} translation
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public translation?: (string|null);

        /**
         * * Meaning definitionTranslation.
         * 		 * @member {string|null|undefined} definitionTranslation
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public definitionTranslation?: (string|null);

        /**
         * * Meaning related.
         * 		 * @member {Array.<WordData.Meaning.IWordRef>} related
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public related: WordData.Meaning.IWordRef[];

        /**
         * * Meaning originalForms.
         * 		 * @member {Array.<WordData.Meaning.IWordRef>} originalForms
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public originalForms: WordData.Meaning.IWordRef[];

        /**
         * * Meaning synonyms.
         * 		 * @member {Array.<WordData.Meaning.IWordRef>} synonyms
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public synonyms: WordData.Meaning.IWordRef[];

        /**
         * * Meaning antonyms.
         * 		 * @member {Array.<WordData.Meaning.IWordRef>} antonyms
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public antonyms: WordData.Meaning.IWordRef[];

        /**
         * * Meaning abbreviations.
         * 		 * @member {Array.<string>} abbreviations
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public abbreviations: string[];

        /**
         * * Meaning _translation.
         * 		 * @member {"translation"|undefined} _translation
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public _translation?: "translation";

        /**
         * * Meaning _definitionTranslation.
         * 		 * @member {"definitionTranslation"|undefined} _definitionTranslation
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         */
        public _definitionTranslation?: "definitionTranslation";

        /**
         * * Creates a new Meaning instance using the specified properties.
         * 		 * @function create
         * 		 * @memberof WordData.Meaning
         * 		 * @static
         * 		 * @param {WordData.IMeaning=} [properties] Properties to set
         * 		 * @returns {WordData.Meaning} Meaning instance
         */
        public static create(properties?: WordData.IMeaning): WordData.Meaning;

        /**
         * * Encodes the specified Meaning message. Does not implicitly {@link WordData.Meaning.verify|verify} messages.
         * 		 * @function encode
         * 		 * @memberof WordData.Meaning
         * 		 * @static
         * 		 * @param {WordData.IMeaning} message Meaning message or plain object to encode
         * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
         * 		 * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: WordData.IMeaning, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * * Encodes the specified Meaning message, length delimited. Does not implicitly {@link WordData.Meaning.verify|verify} messages.
         * 		 * @function encodeDelimited
         * 		 * @memberof WordData.Meaning
         * 		 * @static
         * 		 * @param {WordData.IMeaning} message Meaning message or plain object to encode
         * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
         * 		 * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: WordData.IMeaning, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * * Decodes a Meaning message from the specified reader or buffer.
         * 		 * @function decode
         * 		 * @memberof WordData.Meaning
         * 		 * @static
         * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * 		 * @param {number} [length] Message length if known beforehand
         * 		 * @returns {WordData.Meaning} Meaning
         * 		 * @throws {Error} If the payload is not a reader or valid buffer
         * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WordData.Meaning;

        /**
         * * Decodes a Meaning message from the specified reader or buffer, length delimited.
         * 		 * @function decodeDelimited
         * 		 * @memberof WordData.Meaning
         * 		 * @static
         * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * 		 * @returns {WordData.Meaning} Meaning
         * 		 * @throws {Error} If the payload is not a reader or valid buffer
         * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WordData.Meaning;

        /**
         * * Verifies a Meaning message.
         * 		 * @function verify
         * 		 * @memberof WordData.Meaning
         * 		 * @static
         * 		 * @param {Object.<string,*>} message Plain object to verify
         * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * * Creates a Meaning message from a plain object. Also converts values to their respective internal types.
         * 		 * @function fromObject
         * 		 * @memberof WordData.Meaning
         * 		 * @static
         * 		 * @param {Object.<string,*>} object Plain object
         * 		 * @returns {WordData.Meaning} Meaning
         */
        public static fromObject(object: { [k: string]: any }): WordData.Meaning;

        /**
         * * Creates a plain object from a Meaning message. Also converts values to other types if specified.
         * 		 * @function toObject
         * 		 * @memberof WordData.Meaning
         * 		 * @static
         * 		 * @param {WordData.Meaning} message Meaning
         * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
         * 		 * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: WordData.Meaning, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * * Converts this Meaning to JSON.
         * 		 * @function toJSON
         * 		 * @memberof WordData.Meaning
         * 		 * @instance
         * 		 * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * * Gets the default type url for Meaning
         * 		 * @function getTypeUrl
         * 		 * @memberof WordData.Meaning
         * 		 * @static
         * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * 		 * @returns {string} The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Meaning {

        /**
         * * Properties of a WordRef.
         * 			 * @memberof WordData.Meaning
         * 			 * @interface IWordRef
         * 			 * @property {string|null} [text] WordRef text
         * 			 * @property {Array.<number>|null} [wordIds] WordRef wordIds
         */
        interface IWordRef {

            /** WordRef text */
            text?: (string|null);

            /** WordRef wordIds */
            wordIds?: (number[]|null);
        }

        /**
         * * Constructs a new WordRef.
         * 			 * @memberof WordData.Meaning
         * 			 * @classdesc Represents a WordRef.
         * 			 * @implements IWordRef
         * 			 * @constructor
         * 			 * @param {WordData.Meaning.IWordRef=} [properties] Properties to set
         */
        class WordRef implements IWordRef {

            /**
             * * Constructs a new WordRef.
             * 			 * @memberof WordData.Meaning
             * 			 * @classdesc Represents a WordRef.
             * 			 * @implements IWordRef
             * 			 * @constructor
             * 			 * @param {WordData.Meaning.IWordRef=} [properties] Properties to set
             */
            constructor(properties?: WordData.Meaning.IWordRef);

            /**
             * * WordRef text.
             * 			 * @member {string} text
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @instance
             */
            public text: string;

            /**
             * * WordRef wordIds.
             * 			 * @member {Array.<number>} wordIds
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @instance
             */
            public wordIds: number[];

            /**
             * * Creates a new WordRef instance using the specified properties.
             * 			 * @function create
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @static
             * 			 * @param {WordData.Meaning.IWordRef=} [properties] Properties to set
             * 			 * @returns {WordData.Meaning.WordRef} WordRef instance
             */
            public static create(properties?: WordData.Meaning.IWordRef): WordData.Meaning.WordRef;

            /**
             * * Encodes the specified WordRef message. Does not implicitly {@link WordData.Meaning.WordRef.verify|verify} messages.
             * 			 * @function encode
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @static
             * 			 * @param {WordData.Meaning.IWordRef} message WordRef message or plain object to encode
             * 			 * @param {$protobuf.Writer} [writer] Writer to encode to
             * 			 * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: WordData.Meaning.IWordRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * * Encodes the specified WordRef message, length delimited. Does not implicitly {@link WordData.Meaning.WordRef.verify|verify} messages.
             * 			 * @function encodeDelimited
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @static
             * 			 * @param {WordData.Meaning.IWordRef} message WordRef message or plain object to encode
             * 			 * @param {$protobuf.Writer} [writer] Writer to encode to
             * 			 * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: WordData.Meaning.IWordRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * * Decodes a WordRef message from the specified reader or buffer.
             * 			 * @function decode
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @static
             * 			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * 			 * @param {number} [length] Message length if known beforehand
             * 			 * @returns {WordData.Meaning.WordRef} WordRef
             * 			 * @throws {Error} If the payload is not a reader or valid buffer
             * 			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WordData.Meaning.WordRef;

            /**
             * * Decodes a WordRef message from the specified reader or buffer, length delimited.
             * 			 * @function decodeDelimited
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @static
             * 			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * 			 * @returns {WordData.Meaning.WordRef} WordRef
             * 			 * @throws {Error} If the payload is not a reader or valid buffer
             * 			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WordData.Meaning.WordRef;

            /**
             * * Verifies a WordRef message.
             * 			 * @function verify
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @static
             * 			 * @param {Object.<string,*>} message Plain object to verify
             * 			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * * Creates a WordRef message from a plain object. Also converts values to their respective internal types.
             * 			 * @function fromObject
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @static
             * 			 * @param {Object.<string,*>} object Plain object
             * 			 * @returns {WordData.Meaning.WordRef} WordRef
             */
            public static fromObject(object: { [k: string]: any }): WordData.Meaning.WordRef;

            /**
             * * Creates a plain object from a WordRef message. Also converts values to other types if specified.
             * 			 * @function toObject
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @static
             * 			 * @param {WordData.Meaning.WordRef} message WordRef
             * 			 * @param {$protobuf.IConversionOptions} [options] Conversion options
             * 			 * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: WordData.Meaning.WordRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * * Converts this WordRef to JSON.
             * 			 * @function toJSON
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @instance
             * 			 * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * * Gets the default type url for WordRef
             * 			 * @function getTypeUrl
             * 			 * @memberof WordData.Meaning.WordRef
             * 			 * @static
             * 			 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * 			 * @returns {string} The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /**
     * * Properties of a RelatedForm.
     * 		 * @memberof WordData
     * 		 * @interface IRelatedForm
     * 		 * @property {string|null} [text] RelatedForm text
     * 		 * @property {number|null} [verbForm] RelatedForm verbForm
     * 		 * @property {number|null} [nounForm] RelatedForm nounForm
     */
    interface IRelatedForm {

        /** RelatedForm text */
        text?: (string|null);

        /** RelatedForm verbForm */
        verbForm?: (number|null);

        /** RelatedForm nounForm */
        nounForm?: (number|null);
    }

    /**
     * * Constructs a new RelatedForm.
     * 		 * @memberof WordData
     * 		 * @classdesc Represents a RelatedForm.
     * 		 * @implements IRelatedForm
     * 		 * @constructor
     * 		 * @param {WordData.IRelatedForm=} [properties] Properties to set
     */
    class RelatedForm implements IRelatedForm {

        /**
         * * Constructs a new RelatedForm.
         * 		 * @memberof WordData
         * 		 * @classdesc Represents a RelatedForm.
         * 		 * @implements IRelatedForm
         * 		 * @constructor
         * 		 * @param {WordData.IRelatedForm=} [properties] Properties to set
         */
        constructor(properties?: WordData.IRelatedForm);

        /**
         * * RelatedForm text.
         * 		 * @member {string} text
         * 		 * @memberof WordData.RelatedForm
         * 		 * @instance
         */
        public text: string;

        /**
         * * RelatedForm verbForm.
         * 		 * @member {number|null|undefined} verbForm
         * 		 * @memberof WordData.RelatedForm
         * 		 * @instance
         */
        public verbForm?: (number|null);

        /**
         * * RelatedForm nounForm.
         * 		 * @member {number|null|undefined} nounForm
         * 		 * @memberof WordData.RelatedForm
         * 		 * @instance
         */
        public nounForm?: (number|null);

        /**
         * * RelatedForm id.
         * 		 * @member {"verbForm"|"nounForm"|undefined} id
         * 		 * @memberof WordData.RelatedForm
         * 		 * @instance
         */
        public id?: ("verbForm"|"nounForm");

        /**
         * * Creates a new RelatedForm instance using the specified properties.
         * 		 * @function create
         * 		 * @memberof WordData.RelatedForm
         * 		 * @static
         * 		 * @param {WordData.IRelatedForm=} [properties] Properties to set
         * 		 * @returns {WordData.RelatedForm} RelatedForm instance
         */
        public static create(properties?: WordData.IRelatedForm): WordData.RelatedForm;

        /**
         * * Encodes the specified RelatedForm message. Does not implicitly {@link WordData.RelatedForm.verify|verify} messages.
         * 		 * @function encode
         * 		 * @memberof WordData.RelatedForm
         * 		 * @static
         * 		 * @param {WordData.IRelatedForm} message RelatedForm message or plain object to encode
         * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
         * 		 * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: WordData.IRelatedForm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * * Encodes the specified RelatedForm message, length delimited. Does not implicitly {@link WordData.RelatedForm.verify|verify} messages.
         * 		 * @function encodeDelimited
         * 		 * @memberof WordData.RelatedForm
         * 		 * @static
         * 		 * @param {WordData.IRelatedForm} message RelatedForm message or plain object to encode
         * 		 * @param {$protobuf.Writer} [writer] Writer to encode to
         * 		 * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: WordData.IRelatedForm, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * * Decodes a RelatedForm message from the specified reader or buffer.
         * 		 * @function decode
         * 		 * @memberof WordData.RelatedForm
         * 		 * @static
         * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * 		 * @param {number} [length] Message length if known beforehand
         * 		 * @returns {WordData.RelatedForm} RelatedForm
         * 		 * @throws {Error} If the payload is not a reader or valid buffer
         * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WordData.RelatedForm;

        /**
         * * Decodes a RelatedForm message from the specified reader or buffer, length delimited.
         * 		 * @function decodeDelimited
         * 		 * @memberof WordData.RelatedForm
         * 		 * @static
         * 		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * 		 * @returns {WordData.RelatedForm} RelatedForm
         * 		 * @throws {Error} If the payload is not a reader or valid buffer
         * 		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WordData.RelatedForm;

        /**
         * * Verifies a RelatedForm message.
         * 		 * @function verify
         * 		 * @memberof WordData.RelatedForm
         * 		 * @static
         * 		 * @param {Object.<string,*>} message Plain object to verify
         * 		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * * Creates a RelatedForm message from a plain object. Also converts values to their respective internal types.
         * 		 * @function fromObject
         * 		 * @memberof WordData.RelatedForm
         * 		 * @static
         * 		 * @param {Object.<string,*>} object Plain object
         * 		 * @returns {WordData.RelatedForm} RelatedForm
         */
        public static fromObject(object: { [k: string]: any }): WordData.RelatedForm;

        /**
         * * Creates a plain object from a RelatedForm message. Also converts values to other types if specified.
         * 		 * @function toObject
         * 		 * @memberof WordData.RelatedForm
         * 		 * @static
         * 		 * @param {WordData.RelatedForm} message RelatedForm
         * 		 * @param {$protobuf.IConversionOptions} [options] Conversion options
         * 		 * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: WordData.RelatedForm, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * * Converts this RelatedForm to JSON.
         * 		 * @function toJSON
         * 		 * @memberof WordData.RelatedForm
         * 		 * @instance
         * 		 * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * * Gets the default type url for RelatedForm
         * 		 * @function getTypeUrl
         * 		 * @memberof WordData.RelatedForm
         * 		 * @static
         * 		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * 		 * @returns {string} The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/**
 * * Properties of an ExampleData.
 * 	 * @exports IExampleData
 * 	 * @interface IExampleData
 * 	 * @property {number|null} [exampleId] ExampleData exampleId
 * 	 * @property {ISentenceData|null} [koSentence] ExampleData koSentence
 * 	 * @property {string|null} [enTranslation] ExampleData enTranslation
 * 	 * @property {string|null} [enTranslationAlt] ExampleData enTranslationAlt
 * 	 * @property {string|null} [notes] ExampleData notes
 * 	 * @property {number|null} [soundId] ExampleData soundId
 */
export interface IExampleData {

    /** ExampleData exampleId */
    exampleId?: (number|null);

    /** ExampleData koSentence */
    koSentence?: (ISentenceData|null);

    /** ExampleData enTranslation */
    enTranslation?: (string|null);

    /** ExampleData enTranslationAlt */
    enTranslationAlt?: (string|null);

    /** ExampleData notes */
    notes?: (string|null);

    /** ExampleData soundId */
    soundId?: (number|null);
}

/**
 * * Constructs a new ExampleData.
 * 	 * @exports ExampleData
 * 	 * @classdesc Represents an ExampleData.
 * 	 * @implements IExampleData
 * 	 * @constructor
 * 	 * @param {IExampleData=} [properties] Properties to set
 */
export class ExampleData implements IExampleData {

    /**
     * * Constructs a new ExampleData.
     * 	 * @exports ExampleData
     * 	 * @classdesc Represents an ExampleData.
     * 	 * @implements IExampleData
     * 	 * @constructor
     * 	 * @param {IExampleData=} [properties] Properties to set
     */
    constructor(properties?: IExampleData);

    /**
     * * ExampleData exampleId.
     * 	 * @member {number} exampleId
     * 	 * @memberof ExampleData
     * 	 * @instance
     */
    public exampleId: number;

    /**
     * * ExampleData koSentence.
     * 	 * @member {ISentenceData|null|undefined} koSentence
     * 	 * @memberof ExampleData
     * 	 * @instance
     */
    public koSentence?: (ISentenceData|null);

    /**
     * * ExampleData enTranslation.
     * 	 * @member {string} enTranslation
     * 	 * @memberof ExampleData
     * 	 * @instance
     */
    public enTranslation: string;

    /**
     * * ExampleData enTranslationAlt.
     * 	 * @member {string} enTranslationAlt
     * 	 * @memberof ExampleData
     * 	 * @instance
     */
    public enTranslationAlt: string;

    /**
     * * ExampleData notes.
     * 	 * @member {string} notes
     * 	 * @memberof ExampleData
     * 	 * @instance
     */
    public notes: string;

    /**
     * * ExampleData soundId.
     * 	 * @member {number|null|undefined} soundId
     * 	 * @memberof ExampleData
     * 	 * @instance
     */
    public soundId?: (number|null);

    /**
     * * ExampleData _soundId.
     * 	 * @member {"soundId"|undefined} _soundId
     * 	 * @memberof ExampleData
     * 	 * @instance
     */
    public _soundId?: "soundId";

    /**
     * * Creates a new ExampleData instance using the specified properties.
     * 	 * @function create
     * 	 * @memberof ExampleData
     * 	 * @static
     * 	 * @param {IExampleData=} [properties] Properties to set
     * 	 * @returns {ExampleData} ExampleData instance
     */
    public static create(properties?: IExampleData): ExampleData;

    /**
     * * Encodes the specified ExampleData message. Does not implicitly {@link ExampleData.verify|verify} messages.
     * 	 * @function encode
     * 	 * @memberof ExampleData
     * 	 * @static
     * 	 * @param {IExampleData} message ExampleData message or plain object to encode
     * 	 * @param {$protobuf.Writer} [writer] Writer to encode to
     * 	 * @returns {$protobuf.Writer} Writer
     */
    public static encode(message: IExampleData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * * Encodes the specified ExampleData message, length delimited. Does not implicitly {@link ExampleData.verify|verify} messages.
     * 	 * @function encodeDelimited
     * 	 * @memberof ExampleData
     * 	 * @static
     * 	 * @param {IExampleData} message ExampleData message or plain object to encode
     * 	 * @param {$protobuf.Writer} [writer] Writer to encode to
     * 	 * @returns {$protobuf.Writer} Writer
     */
    public static encodeDelimited(message: IExampleData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * * Decodes an ExampleData message from the specified reader or buffer.
     * 	 * @function decode
     * 	 * @memberof ExampleData
     * 	 * @static
     * 	 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * 	 * @param {number} [length] Message length if known beforehand
     * 	 * @returns {ExampleData} ExampleData
     * 	 * @throws {Error} If the payload is not a reader or valid buffer
     * 	 * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ExampleData;

    /**
     * * Decodes an ExampleData message from the specified reader or buffer, length delimited.
     * 	 * @function decodeDelimited
     * 	 * @memberof ExampleData
     * 	 * @static
     * 	 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * 	 * @returns {ExampleData} ExampleData
     * 	 * @throws {Error} If the payload is not a reader or valid buffer
     * 	 * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ExampleData;

    /**
     * * Verifies an ExampleData message.
     * 	 * @function verify
     * 	 * @memberof ExampleData
     * 	 * @static
     * 	 * @param {Object.<string,*>} message Plain object to verify
     * 	 * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * * Creates an ExampleData message from a plain object. Also converts values to their respective internal types.
     * 	 * @function fromObject
     * 	 * @memberof ExampleData
     * 	 * @static
     * 	 * @param {Object.<string,*>} object Plain object
     * 	 * @returns {ExampleData} ExampleData
     */
    public static fromObject(object: { [k: string]: any }): ExampleData;

    /**
     * * Creates a plain object from an ExampleData message. Also converts values to other types if specified.
     * 	 * @function toObject
     * 	 * @memberof ExampleData
     * 	 * @static
     * 	 * @param {ExampleData} message ExampleData
     * 	 * @param {$protobuf.IConversionOptions} [options] Conversion options
     * 	 * @returns {Object.<string,*>} Plain object
     */
    public static toObject(message: ExampleData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * * Converts this ExampleData to JSON.
     * 	 * @function toJSON
     * 	 * @memberof ExampleData
     * 	 * @instance
     * 	 * @returns {Object.<string,*>} JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * * Gets the default type url for ExampleData
     * 	 * @function getTypeUrl
     * 	 * @memberof ExampleData
     * 	 * @static
     * 	 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * 	 * @returns {string} The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/**
 * * Properties of an AllData.
 * 	 * @exports IAllData
 * 	 * @interface IAllData
 * 	 * @property {Array.<IWordData>|null} [words] AllData words
 * 	 * @property {Array.<IExampleData>|null} [examples] AllData examples
 */
export interface IAllData {

    /** AllData words */
    words?: (IWordData[]|null);

    /** AllData examples */
    examples?: (IExampleData[]|null);
}

/**
 * * Constructs a new AllData.
 * 	 * @exports AllData
 * 	 * @classdesc Represents an AllData.
 * 	 * @implements IAllData
 * 	 * @constructor
 * 	 * @param {IAllData=} [properties] Properties to set
 */
export class AllData implements IAllData {

    /**
     * * Constructs a new AllData.
     * 	 * @exports AllData
     * 	 * @classdesc Represents an AllData.
     * 	 * @implements IAllData
     * 	 * @constructor
     * 	 * @param {IAllData=} [properties] Properties to set
     */
    constructor(properties?: IAllData);

    /**
     * * AllData words.
     * 	 * @member {Array.<IWordData>} words
     * 	 * @memberof AllData
     * 	 * @instance
     */
    public words: IWordData[];

    /**
     * * AllData examples.
     * 	 * @member {Array.<IExampleData>} examples
     * 	 * @memberof AllData
     * 	 * @instance
     */
    public examples: IExampleData[];

    /**
     * * Creates a new AllData instance using the specified properties.
     * 	 * @function create
     * 	 * @memberof AllData
     * 	 * @static
     * 	 * @param {IAllData=} [properties] Properties to set
     * 	 * @returns {AllData} AllData instance
     */
    public static create(properties?: IAllData): AllData;

    /**
     * * Encodes the specified AllData message. Does not implicitly {@link AllData.verify|verify} messages.
     * 	 * @function encode
     * 	 * @memberof AllData
     * 	 * @static
     * 	 * @param {IAllData} message AllData message or plain object to encode
     * 	 * @param {$protobuf.Writer} [writer] Writer to encode to
     * 	 * @returns {$protobuf.Writer} Writer
     */
    public static encode(message: IAllData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * * Encodes the specified AllData message, length delimited. Does not implicitly {@link AllData.verify|verify} messages.
     * 	 * @function encodeDelimited
     * 	 * @memberof AllData
     * 	 * @static
     * 	 * @param {IAllData} message AllData message or plain object to encode
     * 	 * @param {$protobuf.Writer} [writer] Writer to encode to
     * 	 * @returns {$protobuf.Writer} Writer
     */
    public static encodeDelimited(message: IAllData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * * Decodes an AllData message from the specified reader or buffer.
     * 	 * @function decode
     * 	 * @memberof AllData
     * 	 * @static
     * 	 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * 	 * @param {number} [length] Message length if known beforehand
     * 	 * @returns {AllData} AllData
     * 	 * @throws {Error} If the payload is not a reader or valid buffer
     * 	 * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AllData;

    /**
     * * Decodes an AllData message from the specified reader or buffer, length delimited.
     * 	 * @function decodeDelimited
     * 	 * @memberof AllData
     * 	 * @static
     * 	 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * 	 * @returns {AllData} AllData
     * 	 * @throws {Error} If the payload is not a reader or valid buffer
     * 	 * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AllData;

    /**
     * * Verifies an AllData message.
     * 	 * @function verify
     * 	 * @memberof AllData
     * 	 * @static
     * 	 * @param {Object.<string,*>} message Plain object to verify
     * 	 * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * * Creates an AllData message from a plain object. Also converts values to their respective internal types.
     * 	 * @function fromObject
     * 	 * @memberof AllData
     * 	 * @static
     * 	 * @param {Object.<string,*>} object Plain object
     * 	 * @returns {AllData} AllData
     */
    public static fromObject(object: { [k: string]: any }): AllData;

    /**
     * * Creates a plain object from an AllData message. Also converts values to other types if specified.
     * 	 * @function toObject
     * 	 * @memberof AllData
     * 	 * @static
     * 	 * @param {AllData} message AllData
     * 	 * @param {$protobuf.IConversionOptions} [options] Conversion options
     * 	 * @returns {Object.<string,*>} Plain object
     */
    public static toObject(message: AllData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * * Converts this AllData to JSON.
     * 	 * @function toJSON
     * 	 * @memberof AllData
     * 	 * @instance
     * 	 * @returns {Object.<string,*>} JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * * Gets the default type url for AllData
     * 	 * @function getTypeUrl
     * 	 * @memberof AllData
     * 	 * @static
     * 	 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * 	 * @returns {string} The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
