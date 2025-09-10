import { TmptHub } from "../tmpthub/TmptHub.js";

const appTmptHub = new TmptHub({
	dirFetchUrl: "./app/parts/engine/template",
});

await appTmptHub.zInit();

export { appTmptHub };
