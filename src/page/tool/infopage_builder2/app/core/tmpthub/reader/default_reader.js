import { TmptDefinitionBlob } from "../../tmpt/TmptDefinitionBlob.js";

export function defaultReader ({tmptDefinitionText, setName, groupName}) {
    const parsedDefinitionText = new TmptDefinitionParser({
        tmptDefinitionText: tmptDefinitionText
    });

    const bodyStyleConfigJsonStr = parsedDefinitionText.getBodyStyleConfig();
    const hookStyleConfigJsonStr = parsedDefinitionText.getHookStyleConfig();

    const tmptDefinitionBlob = new TmptDefinitionBlob({
        refId: null,
        setName: setName,
        groupName: groupName,
        body: parsedDefinitionText.getBody(),
        bodystyle: parsedDefinitionText.getBodyStyle(),
        thumbnail: parsedDefinitionText.getThumbnail(),
        thumbnailstyle: parsedDefinitionText.getThumbnailStyle(),
        bodystyleconfig: bodyStyleConfigJsonStr && JSON.parse(bodyStyleConfigJsonStr),
        hookstyleconfig: hookStyleConfigJsonStr && JSON.parse(hookStyleConfigJsonStr),
    });
    return tmptDefinitionBlob;
}



class TmptDefinitionParser {
    constructor ({tmptDefinitionText}) {
        this.definitionLines = tmptDefinitionText.split("\n");
        for (let i=0; i < this.definitionLines.length; i++) {
            this.definitionLines[i] = this.definitionLines[i].trim();
        }
    }

    getTranslatorName() {
        if (this.definitionLines.length) {
            if (this.definitionLines[0].startsWith("#!")) {
                return this.definitionLines[0].replace("#!", "");
            }
        }
        return null;
    }

    getBody () {
        return this._getTextBetweenTokens({
            startToken: "@body",
            stopToken: "@bodyend"
        });
    }

    getBodyStyle () {
        return this._getTextBetweenTokens({
            startToken: "@bodystyle",
            stopToken: "@bodystyleend"
        }).replace("<style>", "").replace("</style>", "");
    }
    
    getThumbnail () {
        return this._getTextBetweenTokens({
            startToken: "@thumbnail",
            stopToken: "@thumbnailend"
        });
    }

    getThumbnailStyle () {
        return this._getTextBetweenTokens({
            startToken: "@thumbnailstyle",
            stopToken: "@thumbnailstyleend"
        }).replace("<style>", "").replace("</style>", "");
    }

    getBodyStyleConfig () {
        return this._getTextBetweenTokens({
            startToken: "@bodystyleconfig",
            stopToken: "@bodystyleconfigend"
        }).replace("<script>", "").replace("</script>", "").replaceAll("`", "").replaceAll("\n", "").trim(); 
    }

    getHookStyleConfig () {
        return this._getTextBetweenTokens({
            startToken: "@hookstyleconfig",
            stopToken: "@hookstyleconfigend"
        }).replace("<script>", "").replace("</script>", "").replaceAll("`", "").replaceAll("\n", "").trim();
    }

    _getTextBetweenTokens ({startToken, stopToken}) {
        let text = "";

        let started = false;
        for (let line of this.definitionLines) {
            if (!started) {
                if (line === startToken) {
                    started = true;
                }
                continue;
            }

            if (started) {
                if (line === stopToken) {
                    break
                }
                text += "\n" + line;
            }
        }

        return text.trim();
    }
}