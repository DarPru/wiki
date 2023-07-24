var searchElem = document.querySelector(".search__search");
var output = document.querySelector(".result");
if (output) {
let lang = output.dataset.lang;
let data_search = output.dataset.search;
let data_result = output.dataset.result;
let data_nofound = output.dataset.nofound;
let data_empty = output.dataset.empty;


function loadSearch() { 
    var xhr = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);                
                    if (data) {
                       resolve(data.items); 
                    }
                } else {
                    reject(console.log(xhr.responseText));
                }
            }
        };
        xhr.open('GET', lang + "index.json");
        xhr.send();
    });
}

showSearchResults();
function showSearchResults() {
    var query = window.location.href  || '';
    searchString = (query.indexOf('?') < 0) ? '' :  query.replace(/(.*)?s=(.*)/, '$2');
    var clean_request = decodeURIComponent(searchString.replaceAll('+', ' '));  
    loadSearch().then(posts => {   
        var target = document.querySelector('.result'); 
        var postsByTitle = posts.reduce((acc, curr) => { 
            acc[curr.title] = curr;
            return acc;
        }, {}
        );
         var fuse = new Fuse(posts, {
          keys: ['title', 'content', 'img']
        })
        
        if (clean_request && clean_request != '') {
            var matches = fuse.search(clean_request);
            let main_title = document.getElementById('main_title')
            if (matches.length > 0){
                let content = '';
                main_title.innerHTML = '<span class="front__title">' + data_search + ': \"' + clean_request + '\"</span>';
                matches.forEach((m) => {
                    let url = m['item']['url'];
                    let title = m['item']['title'];
                    let img = m['item']['img'];
                    content += '<div class="search__item"><a href="' + url +  '">' + title + '</a></div>';
                });

                target.innerHTML += '<div class="search__album">' + content + '</div>';
            } else {
                 main_title.innerHTML = '<span class="front__title">' +  data_search + ': \"' + clean_request + '\"</span>'
                target.innerHTML += '<br><h2 style="text-align:center">' + data_nofound + '</h2>';
                 target.innerHTML += '</div>'
            }  
        } else {
            main_title.innerHTML = '<span style="text-align:center">' + data_empty + '</span>';
        }
    });
};
}