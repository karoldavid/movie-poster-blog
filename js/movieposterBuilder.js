$(function(){

  var model = {
    init: function() {
      if (!localStorage.posters) {
        localStorage.posters = JSON.stringify(posters.posters);
      }
    },
    getAll: function() {
      return JSON.parse(localStorage.posters);
    },
    getAllArtists: function() {
      var artistNames = [],
          posters = JSON.parse(localStorage.posters).posters;
      for (poster in posters) {
          artistNames.push(posters[poster].artist); 
      }
      return $.unique(artistNames);
    },
    set: function(posters) {
      localStorage.posters = JSON.stringify(posters);
    }
  };

  var octopus = {
    init: function() {
      model.init();
      view.init();
      sortView.init();
    },
    getPosters: function() {
      return model.getAll();
    },
    sortByArtist: function() {
      var sortable = [],
          posters = model.getAll();

      for (poster in posters) {
          sortable.push([posters[poster].artist, posters[poster]]); 
      }

      sortable.sort(function(a,b) { return a[1].artist.toLowerCase() > b[1].artist.toLowerCase()});
      
      var sortedByArtist = [];
      for ( s in sortable) {
         sortedByArtist.push(sortable[s][1]);
      }
      model.set(sortedByArtist);
      return model.getAll();
    },
    sortPosters: function() {
      var posters = model.getAll().posters,
          list = model.getAllArtists();

      var mapped = list.map(function(el, i) {
        return { index: i, value: el.toLowerCase() };
      })

      // sorting the mapped array containing the reduced values
      mapped.sort(function(a, b) {
        return +(a.value > b.value) || +(a.value === b.value) - 1;
      });

      // container for the resulting order
      var result = mapped.map(function(el){
        return list[el.index];
      });
      console.log(result);
      },
      reverse: function() {
         model.set(model.getAll().reverse());
        return model.getAll();
      }
    };

    var view = {
      init: function() {
        this.posterElem = $('#poster');
        view.render();
      },
      //strips image name from filename and adds it as alt text to all images
      addAltText: function() {
        $(document).ready(function() {
          $('img').each(function(){
            var $img = $(this),
              filename = $img.attr('data-original') || $img.attr('src'),
              imageName = filename.substring(7, filename.lastIndexOf('.'));
              $img.attr('alt', imageName);
              //console.log(imageName);
          });
        });
      },
      render: function() {
        var landscape = 800,
            portrait = 600,
            width = landscape,
            //posters = octopus.getPosters().posters,
            posters = octopus.sortByArtist();
      

        for (poster in posters) {
          var url = posters[poster].url,
              title = posters[poster].title['PL'],
              artist = posters[poster].artist,
              x = posters[poster].size[0],
              y = posters[poster].size[1],
              description = posters[poster].description,
              www = posters[poster].www;

              if (posters[poster].size[0] > posters[poster].size[1]) {
                width = landscape;
              } else {
                width = portrait;
              };

              var elem = '<figure class="poster-entry">'
                         + '<picture><img class="lazy poster" src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-original="images/posters/' + url + '-large_1x.jpeg" width="' + width + '"></picture>'
                         + '<figcaption>' + title + " (Poster designer: " + artist + "; " + x + "x" + y + ")" + '</figcaption>'
                         //+ '<a href="#">' + title + '</a>'
                         //+ '<div class="date-text">%data%</div>'
                         + '<p class="description"><br>' + description + '</p>'
                         + '<p class="www"><a href="' + www +'" target="_blank"> >>> </a></p></figure>';
           
              this.posterElem.append(elem);
        }
        view.addAltText();
      }
    };

    var sortView = {
      init: function() {
        this.posterElems = $('.poster-entry');

        this.reverseButtonElem = document.getElementById('reverse'); //$('#reverse');
        this.posters = model.getAll();
        console.log(this.reverseButtonElem);
        this.reverseButtonElem.addEventListener('click', function(){
            this.posters = octopus.reverse();
            //alert("reverse order");
            sortView.render();
        });
        sortView.render();
      },
      render: function() {
        //console.log(posterElems[0].childNodes[0]);
        var pic  = this.posterElems.find('picture'),
            fig  = this.posterElems.find('figcaption'),
            desc = this.posterElems.find('.description'),
            href  = this.posterElems.find('.www a'),
            length = this.posters.length,
            landscape = 800,
            portrait = 600,
            width = landscape;

        console.log('----------------');
        
        for (var i = 0; i < length; i++) {
          var url         = this.posters[i].url,
              title       = this.posters[i].title['PL'],
              artist      = this.posters[i].artist,
              x           = this.posters[i].size[0],
              y           = this.posters[i].size[1],
              description = this.posters[i].description,
              www         = this.posters[i].www;

          if (this.posters[i].size[0] > this.posters[i].size[1]) {
            width = landscape;
          } else {
            width = portrait;
          }

          console.log(pic[i].innerHTML);
          pic[i].innerHTML = '<img class="lazy poster" src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-original="images/posters/' + url + '-large_1x.jpeg" width="' + width + '">'
          console.log(fig[i].innerText);
          fig[i].innerText = title + " (Poster designer: " + artist + "; " + x + "x" + y + ")"
          console.log(desc[i].innerText);
          desc[i].innerText = description;
          console.log(href[i].href);
          href[i].href = www;
          console.log('----------------');
        }
      }
    };

  octopus.init();
});