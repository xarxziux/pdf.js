'use strict';

// In production, the bundled pdf.js shall be used instead of RequireJS.
require.config({paths: {'pdfjs': '../../src'}});
require(['pdfjs/display/api', 'pdfjs/display/global'], function (api, global) {
  // In production, change this to point to the built `pdf.worker.js` file.
  //alert ('typeof global.PDFJS = ' + typeof global.PDFJS);
  
  global.PDFJS.workerSrc = '../../src/worker_loader.js';
  
  // alert ('typeof api = ' + typeof api);
  // alert ('typeof api.getDocument = ' + typeof api.getDocument);
  // alert ('typeof Uint8Array = ' + typeof Uint8Array);
  // Fetch the PDF document from the URL using promises.
  // alert ('Calling api.getDocument');
  
  api.getDocument ('helloworld.pdf').then(function (pdf) {
    
    // Fetch the page.
    // alert ('typeof pdf = ' + typeof pdf);
    alert ('Promise fulfilled');
    
    pdf.getPage(1).then(function (page) {
      var scale = 1.5;
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions.
      var canvas = document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context.
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
  }, function (error) {
    
    if (error instanceof EvalError) {
      alert ('EvalError: ' + error.toString());
    } /* else if (error instanceof InternalError) {
      alert ('InternalError: ' + error.toString());
    } */ else if (error instanceof RangeError) {
      alert ('RangeError: ' + error.toString());
    } else if (error instanceof ReferenceError) {
      alert ('ReferenceError: ' + error.toString());
    } else if (error instanceof SyntaxError) {
      alert ('SyntaxError: ' + error.toString());
    } else if (error instanceof TypeError) {
      alert ('TypeError: ' + error.toString());
    } else if (error instanceof URIError) {
      alert ('URIError: ' + error.toString());
    } else if (error instanceof Error) {
      alert ('Unknown error: ' + error.toString());
    } else {
      alert ('Something else: ' + error.toString());
    }
      
      
      
      
    // alert (typeof error);
    alert ('Promise rejected: ' + error.toString());
    // alert ('Promise rejected: ' + error.message);
  });
});
