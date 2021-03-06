var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;

function pullDownAction () {
    setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        el = document.getElementById('listenews');

        for (i=0; i<3; i++) {
            li = document.createElement('li');
            li.innerText = 'Generated row ' + (++generatedCount);
            el.insertBefore(li, el.childNodes[0]);
        }
        
        myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
    setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        /*el = document.getElementById('listenews');

        for (i=0; i<3; i++) {
            li = document.createElement('li');
            li.innerText = 'Generated row ' + (++generatedCount);
            el.appendChild(li, el.childNodes[0]);
        }
*/
/**************************/
       var countnews=$('#countnews').val();
        $.getJSON( "http://www.automag.tn/mobileapp?node=Listnews-root&page=1&start="+countnews+"&limit=7", function( data ) {
        var dataC = [];
       
        
        $.each( data.items, function(index,item) {
        
        dataC.push(
            '<li class="item">'
            +'<img class="ui avatar image" src="'+item.photoMin+'">'
                +'<div class="content">'
                +'<div class="header">' + item.titre + '</div>'
                    +'<div class="date">'
                    + item.categorie
                    + ' <span> | '
                    +item.date
                    + '</span>'
                + '</div>'
            +'</div>'
        +'</li>');
        
        });
        $("#listenews").append(dataC.join( "" ));
        countnews=eval(countnews)+eval(dataC.length);
        $('#countnews').val(eval(countnews));
        });

/***************************/
var nexCount=eval(countnews)+7;

$.getJSON( "http://www.automag.tn/mobileapp?node=Listnews-root&page=1&start="+nexCount+"&limit=7", function( data ) {
  console.log(data.items.length+"***");
   if(eval(data.items.length)>=7){
    console.log(data.items.length);
 myScroll.refresh();

   }
       
     
});
        
        
       
        
            // Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
   // pullDownEl = document.getElementById('pullDown');
   // pullDownOffset = pullDownEl.offsetHeight;

/**************************/
       var countnews=0;
        $.getJSON( "http://www.automag.tn/mobileapp?node=Listnews-root&page=1&start="+countnews+"&limit=7", function( data ) {
        var dataC = [];
       
        
        $.each( data.items, function(index,item) {
        
        dataC.push(
            '<li class="item">'
            +'<img class="ui avatar image" src="'+item.photoMin+'">'
                +'<div class="content">'
                +'<div class="header">' + item.titre + '</div>'
                    +'<div class="date">'
                    + item.categorie
                    + ' <span> | '
                    +item.date
                    + '</span>'
                + '</div>'
            +'</div>'
        +'</li>');
        
        });
        $("#listenews").append(dataC.join( "" ));
        countnews=countnews+dataC.length;
        $('#countnews').val(countnews);
        });

/***************************/



    pullUpEl = document.getElementById('pullUp');   
    pullUpOffset = pullUpEl.offsetHeight;
    
    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
           /* if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
           } else*/  if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
            }
        },
        onScrollMove: function () {
           /* if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                this.minScrollY = -pullDownOffset;
            } else */if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
          /*  if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';                
                pullDownAction();   // Execute custom function (ajax call?)
            } else*/ if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';                
                pullUpAction(); // Execute custom function (ajax call?)
            }
        }
    });
    
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
