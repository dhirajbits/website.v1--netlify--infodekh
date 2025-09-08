import { Translator } from "./Translator.js";


export class TmptTranslator extends Translator {
    static translate ({definitionText}) {
        return definitionText;
    }
}