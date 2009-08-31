/**
 * jQ Highlighter – simple javascript syntax highlighter for jQuery    
 */ 

jQuery.fn.highlight = (function(){
  
  // --- JS description --------------------------------------------------------
  
  var keywords =	'break case catch continue default delete do else false for function if in instanceof new null return super switch throw true try typeof var while with';
  var specials = 'this document window prototype Array String Object Function Number';
  var codes = [
    {name: "string",    reg: /'(?:\.|(\\\')|[^\''\n])*'/g},
    {name: "string",    reg: /"(?:\.|(\\\")|[^\""\n])*"/g},
    {name: "mcomment",  reg: /\/\*[\s\S]*?\*\//gm},
    {name: "comment",   reg: /\/\/.*$/gm}
  ];
  
  // --- Core Functions --------------------------------------------------------
  
  // Replace tabulators and spaces by nbsp entites
  function normalizeText(text)
  {
    // tabulators
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
  
  // highlight keywords given by space separeted list
  function highlightWords(text, list, className)
  {
    var reg = new RegExp("\\b" + list.replace(/\s+/g, '\\b|\\b') + "\\b", "gm");
    return text.replace(reg, "<span class='" + className + "'>$&</span>");
  }
  
  // add line numbers and provide auto line wrapping (by div)
  function numberLines(text)
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
  
  // main highlight function
  function highlight(text)
  {
    // highlight tokens by regExp
    $.each(codes, function(){
      var className = this.name;
      text = text.replace(this.reg, function(token){
        return highlightText(token, className);
      });
    });
    
    // height kaywords and special words
    text = highlightWords(text, keywords, "keyword");
    text = highlightWords(text, specials, "special");
    
    // and finaly add line numbers
    text = numberLines(text);
    
    return text;
  };
  
  // --- Public part -----------------------------------------------------------
  
  return function()
  {
    this.each(function(){
      var e = $(this); 
      e.html(highlight(e.html()));
    });
    
    return this;
  };
  
})();
