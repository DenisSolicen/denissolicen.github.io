String.prototype.endsWith = function (s) {
    return this.length >= s.length && this.substr(this.length - s.length) == s;
    }

    /*
        Get Disqus comment counts given an array of URLs
        Considerations
        --------------
        + In most cases, you should use the default comment counting script
        + This example will make client-side API calls, which on a busy site, will exhaust your 1000 requests/hour limit quickly.
        Consider requesting comment counts server-side and caching the results. 
        + Make sure the domain you're hosting this page on has been added to your whitelisted domains in your application: http://disqus.com/api/applications/
        Cases where you might use this
        ------------------------------
        1. When you're counting comments on an element other than a <a> tag
        2. If you're counting comments from another Disqus shortname on a page where you're using the default comment counting script
    */

    $(function () {
        var key = "SyRBH30uqdyxbqzpRcJ96FZFqXP0GjKs3calfHDo4Ln5Gu5i29IfV3CJIFIqPcVC";
        var forum = "solicen";
        var urls = [];
        var oCount = [];
       console.log("Fetching comments...")

        $('.count-comments').each(function (e) {
            var url = $(this).attr('data-disqus-url');
            urls.push(url);
        });

        let i = setInterval(function() {
          console.log("Fetching comments...")
          doCount();
        }, 360000);

        doCount();
        function doCount() {
          var disqusUrl = 'https://disqus.com/api/3.0/forums/listThreads.json?forum='+encodeURIComponent(forum)+'&api_key='+key+'&limit=100';
          $.get(disqusUrl).then(function(res) {
            res.response.forEach(function(t) {  
              if (t.posts != -1){
                var u = urls.find(x => t.link.endsWith(x));
                if (u !== undefined){
                  var el = document.getElementById(u);
                  var elAdd = document.getElementById(u + '|');
                  if (el.innerHTML != t.posts) {                  
                      el.innerHTML = t.posts;
                  }
                  
                }                                
              } 
            })
          },'json');
        };  
    });