String.prototype.endsWith = function (s) {
    return this.length >= s.length && this.substr(this.length - s.length) == s;
    }

    $(function () {
        var key = "SyRBH30uqdyxbqzpRcJ96FZFqXP0GjKs3calfHDo4Ln5Gu5i29IfV3CJIFIqPcVC";
        var forum = "solicen";
        $('.count-comments').each(function (e) {
            var url = $(this).attr('data-disqus-url');
            console.log(url);
            var el = document.getElementById(url);
            var disqusUrl = 'https://disqus.com/api/3.0/forums/listThreads.json?forum='+forum+'&api_key='+key;
            $.get(disqusUrl).then(function(res) {
              res.response.forEach(function(t) {  
                if (t.posts != -1){
                  console.log(t.clean_title + " | комментарии: " + t.posts + "\n");                     
                  if (t.link.endsWith(url)){
                      el.innerHTML = t.posts;
                  }                      
                } 
              })
            },'json');
        });
    });