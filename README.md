Animation Chain
==============

A jQuery plugin to chain CSS3 transitions together.


Example
==============

<pre><code>
var c1 = $("#div-two").animationChain()
            .addClass("color1")
            .addClass("color2")
            .addClass("color3")
            .addClass("color4");
            
var c2 = $("#div-one").animationChain()
            .addClass("color1")
            .addClass("color2")
            .addClass("color3")
            .addClass("color4");
            
//Start both chains            
$.animationChain()
  .execute(function () { c1.start(); })
  .execute(function () { c2.start(); })
  .start();
            
</code></pre>
