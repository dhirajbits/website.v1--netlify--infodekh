import { TmptHub } from "../tmpthub/TmptHub.js";

const appTmptHub = new TmptHub({
	dirFetchUrl: "./app/template",
});

await appTmptHub.zInit();

export { appTmptHub };
