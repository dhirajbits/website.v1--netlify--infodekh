import { removeEmptyStringFromArray } from "../../utility/array";


export async function fetchRegisterEntries ({dirFetchUrl}) {
    // Get register file fetch url
    const registerFileFetchUrl = null;
    if (dirFetchUrl.endsWith("/")) {
        registerFileFetchUrl = dirFetchUrl + "_register.txt";
    }
    
    else {
        registerFileFetchUrl = dirFetchUrl + "/_register.txt";
    }


    // Get text content of register file
    let fileTextContent = "";
    const response = await fetch(registerFileFetchUrl);
    if (response.ok) {
        fileTextContent = await response.text();
    }
    
    else {
        console.error("Unable to fetch register entries of directory --> Unable to fetch 'register.txt' file.")
    }


    // Get entries of register
    let fileFetchUrls = null;
    if (fileTextContent) {
        fileTextContent = fileTextContent.replaceAll("\r", "\n");
        fileFetchUrls = fileTextContent.split("\n");
        fileFetchUrls = removeEmptyStringFromArray({arr: fileFetchUrls});
    }


    return fileFetchUrls;
}