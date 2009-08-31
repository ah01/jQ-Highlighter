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
  
  function normalizeText(text)
  {
    // tabs
    text = text.replace(/\t/g, "    ");
    
    // fix spaces
    text = text.replace(/ {2,}/g, function(space){
      var res = [];
      for(var i = 0; i < space.length; i++){
        res.push("&nbsp;");
      }
      return res.join("");
    });
    
    return text;
  }
  
  // highlight multiline text (each line individually)
  function highlightText(text, className)
  {
    var left  = "<span class='" + className + "'>",
        right = "</span>",
        lines = text.split("\n");
    
    return left + lines.join(right + "\n" + left) + right;
  }
  
  function highlightWords(text, list, className)
  {
    var reg = new RegExp("\\b" + list.replace(/\s+/g, '\\b|\\b') + "\\b", "gm");
    return text.replace(reg, "<span class='" + className + "'>$&</span>");
  }
  
  function highlightLines(text)
  {
    text = normalizeText(text);
    var res = [], even = true, lines = text.split("\n");
    
    $.each(lines, function(line){
      var text = this.length ? this : "&nbsp;";
      res.push("<div class='line " + ( even ? "even" : "odd" ) + "'><var>" + line + ":</var>" + text + "</div>");
      even = !even;
    });
    
    return res.join("");
  }
  
  // highlight fn.
  function highlight(text)
  {
    $.each(codes, function(){
      var className = this.name;
      text = text.replace(this.reg, function(token){
        return highlightText(token, className);
      });
    });
    
    text = highlightWords(text, keywords, "keyword");
    text = highlightWords(text, specials, "special");
    
    text = highlightLines(text);
    return text;
  };
  
  return function(){
    this.each(function(){
      var e = $(this); 
      e.html(highlight(e.html()));
    });
    return this;
  };
  
})();
