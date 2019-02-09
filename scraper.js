const rp = require('request-promise');
const $ = require('cheerio');
var fs = require('fs');

var url = 'https://parahumans.wordpress.com/2011/06/11/1-1/';
var count = 0;

function test(url) {
     rp(url)
        .then(function(html) {
           content =  $('#content > article > .entry-content',html).remove('.sharedaddy').html();
            //console.log($('#content > article > .entry-content > div',html).last().text());

            fs.appendFile('./worm.html', content, function(err) {
                if(err) throw err;
            });

            url = $('#content > article > .entry-content > p',html).first().children('a[title="Next Chapter"]').attr('href');
            console.log(url);
            if(count>=0){
                count--;
                test(url);
            }
            return content;
        })
        .catch(function(err) {
            console.log(err);
        });
}

test(url);