import { TmptDefinitionBlob } from "./TmptDefinitionBlob.js";



export class TmptDefinitionReader {
    static tags = ["@body", "@bodyend", "@bodystyle", "@bodystyleend", "@thumbnail", "@thumbnailend", "@thumbnailstyle", "@thumbnailstyleend"];

    static read({definitionText}) {
        return this.getTmptDefinitionBlob({
            definitionText: definitionText
        });
    }

    
    static getTmptDefinitionBlob ({definitionText}) {
        return new TmptDefinitionBlob({
            body: this.getBodyDefinitionText({
                definitionText: definitionText
            }),
            bodystyle: this.getBodyStyleDefinitionText({
                definitionText: definitionText
            }),
            thumbnail: this.getThumbnailDefinitionText({
                definitionText: definitionText
            }),
            thumbnailstyle: this.getThumbnailStyleDefinitionText({
                definitionText: definitionText
            }),
        });
    }


    static getBodyDefinitionText ({definitionText}) {
        return this.getDefinitionBtwTag({
            definitionText: definitionText,
            tag: "@body"
        });
    }

    
    static getBodyStyleDefinitionText ({definitionText}) {
        return this.getDefinitionBtwTag({
            definitionText: definitionText,
            tag: "@bodystyle"
        });
    }


    static getThumbnailDefinitionText ({definitionText}) {
        return this.getDefinitionBtwTag({
            definitionText: definitionText,
            tag: "@thumbnail"
        });
    }

    
    static getThumbnailStyleDefinitionText ({definitionText}) {
        return this.getDefinitionBtwTag({
            definitionText: definitionText,
            tag: "@thumbnailstyle"
        });
    }


    static getDefinitionBtwTag ({definitionText, tag}) {
        let definitionBtnTags = "";
        const lines = definitionText.split("\n");
        let insideTag = false;
        for (let line of lines) {
            if (line === tag) {
                insideTag = true;
                continue;
            }
            if (insideTag) {
                if ((line !== tag) && (this.tags.includes(line))) {
                    break;
                }
            }
            
            if (insideTag) {
                definitionBtnTags += "\n" + line;
            }
        }
        return definitionBtnTags.trim();
    }
}
