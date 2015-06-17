$(function(){

var model = {
    init: function() {
        if (!localStorage.posters) {
          localStorage.posters = JSON.stringify(posters);
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
    }
};

var octopus = {
  init: function() {
    model.init();
    view.init();
  },
  getPosters: function() {
    return model.getAll();
  },
  sortByArtist: function() {

      var sortable = [],
          posters = model.getAll().posters;

      for (poster in posters) {
          sortable.push([posters[poster].artist, posters[poster]]); 
      }

      sortable.sort(function(a,b) { return a[1].artist.toLowerCase() > b[1].artist.toLowerCase()});
      
      var sortedByArtist = [];
      for ( s in sortable) {
         sortedByArtist.push(sortable[s][1]);
      }

      return sortedByArtist;
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
    return modell.getAll().reverse();
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

// var HTMLposterStart = '<figure class="poster-entry"></figure>';
// var HTMLposterTitle = '<a href="#">%data%</a>';
// var HTMLposterDates = '<div class="date-text">%data%</div>';
// var HTMLposterDescription = '<p class="description"><br>%data%</p>';
// var HTMLposterImageURL = '<picture><img class="lazy poster" src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-original="images/posters/%data%-large_1x.jpeg" width="%width%"></picture>';
// var HTMLposterCaption = '<figcaption>%data%</figcaption>';
// var HTMLposterWWW = '<p class="www"><a href="#" target="_blank"> >>> </a></p>';
    }
};


  octopus.init();
});