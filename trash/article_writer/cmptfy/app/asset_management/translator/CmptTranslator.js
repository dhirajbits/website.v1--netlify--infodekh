import { Translator } from "./Translator.js";


export class CmptTranslator extends Translator {
    static translate ({definitionText}) {
        return definitionText;
    }
}