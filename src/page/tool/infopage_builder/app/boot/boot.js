import { Model } from "../parts/model/Model.js";
import { Engine } from "../parts/engine/@engine/Engine.js";
import { Panel } from "../parts/panel/Panel.js";
import { Viewbox } from "../parts/viewbox/@viewbox/Viewbox.js";


const model = new Model();
model.boot();

const engine = new Engine({model});
await engine.boot();

const panel = new Panel({engine});
panel.boot();

const viewbox = new Viewbox({panel});
viewbox.boot();

