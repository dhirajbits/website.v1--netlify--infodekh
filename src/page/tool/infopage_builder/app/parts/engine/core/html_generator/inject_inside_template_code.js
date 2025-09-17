export function injectInsideTemplateCode({
	title,
	htmlCode,
	cmptCSS,
	tmptCSS,
}) {
   return `
   <!DOCTYPE html>
   <html>
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">


         <link rel="stylesheet" href="../public/css/initial_setup/_all.css">
         <link rel="stylesheet" href="../public/css/variable/_all.css">
         <link rel="stylesheet" href="../public/css/utility_class/_all.css">


         <link rel="icon" type="image/x-icon" href="../public/asset/icon/infodekh_icon.svg">


         <title>${title} | infodekh</title>
      </head>
      <body>
         
         <div class="--HTML-GENERATOR--htmlCode--">
            ${htmlCode}
         </div>
         
         <div class="--HTML-GENERATOR--cmptCSS--">
            ${cmptCSS}
         </div>
         
         <div class="--HTML-GENERATOR--tmptCSS--">
            ${tmptCSS}
         </div>
      
      </body>
   `;
}
