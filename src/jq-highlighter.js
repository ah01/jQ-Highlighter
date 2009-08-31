/**
 * jQ Highlighter – simple syntax highlighter for jQuery  
 */ 

jQuery.fn.highlight = (function(){

  var keywords =	'break case catch continue default delete do else false for function if in instanceof new null return super switch throw true try typeof var while with';
  var specials = 'this document window prototype Array String Object Function Number';
  var codes = [
    {name: "string",    reg: /'(?:\.|(\\\')|[^\''\n])*'/g},
    {name: "string",    reg: /"(?:\.|(\\\")|[^\""\n])*"/g},
    {name: "mcomment",  reg: /\/\*[\s\S]*?\*\//gm},
    {name: "comment",   reg: /\/\/.*$/gm}
  ];

  // highlight fn.
  return function()
  {
    var html = $(this).html();

    $.each(codes, function(){
      html = html.replace(this.reg, "<span class='" + this.name + "'>$&</span>");
    });

    var keyReg = new RegExp("\\b" + keywords.replace(/\s+/g, '\\b|\\b') + "\\b", "gm");
    html = html.replace(keyReg, "<span class='keyword'>$&</span>");

    var specReg = new RegExp("\\b" + specials.replace(/\s+/g, '\\b|\\b') + "\\b", "gm");
    html = html.replace(specReg, "<span class='special'>$&</span>");
  
    $(this).html(html);
  };
  
})();
