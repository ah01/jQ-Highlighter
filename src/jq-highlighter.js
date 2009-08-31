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
  
  function highlightText(text, className)
  {
    return "<span class='" + className + "'>" + text + "</span>";
  }
  
  function highlightWords(text, list, className)
  {
    var reg = new RegExp("\\b" + list.replace(/\s+/g, '\\b|\\b') + "\\b", "gm");
    return text.replace(reg, "<span class='" + className + "'>$&</span>");
  }
  
  // highlight fn.
  return function()
  {
    var html = $(this).html();

    $.each(codes, function(){
      var className = this.name;
      html = html.replace(this.reg, function(text){
        return highlightText(text, className);
      });
    });
    
    html = highlightWords(html, keywords, "keyword");
    html = highlightWords(html, specials, "special");
    
    $(this).html(html);
  };
  
})();
