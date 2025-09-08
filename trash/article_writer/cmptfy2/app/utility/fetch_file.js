import { removeEmptyStringFromArray } from "./array.js";



export async function getRegisterFromDir ({dirUrl}) {
    let registerFilepath = dirUrl + "/_register.txt";
    registerFilepath = registerFilepath.replace(
        "//_register.txt",
        "/_register.txt"
    );
    const registerContent = await getTextContentOfFileUrl({
        fileUrl: registerFilepath,
        clean: true
    })
    if (registerContent) {
        let lines = registerContent.split("\n");
        lines = removeEmptyStringFromArray({arr: lines});
        return lines;
    }
    return [];
}


export async function getTextContentOfFileUrl ({fileUrl, clean}) {
    const response = await fetch(fileUrl);
    if (response.ok) {
        let text = await response.text();
        if (clean) {
            text = text.trim().replaceAll("\r", "\n");
        }
        return text;
    }
    return null;

}