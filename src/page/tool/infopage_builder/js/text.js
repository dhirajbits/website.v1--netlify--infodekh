import { InfopageBuilderApp } from "../app/core/root/InfopageBuilderApp";

const app = new InfopageBuilderApp()

const movieUpdatePage = app.createNewPage({
    type: "movieUpdate",
})

movieUpdatePage.title = "something";
movieUpdatePage.toPageDefintionBlob().toJSON();


const pageDefinitionBlob = PageDefinitionBlob.fromJSON({jsonstr: text});
const newPage = app.createNewPage({
    pageDefinitionBlob: pageDefinitionBlob
});
