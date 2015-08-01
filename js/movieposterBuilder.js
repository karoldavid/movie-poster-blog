$(function(posters) {

    var initialPosters = posters;


    /* var url = posters[poster].url,
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
                         + '<p class="website"><a href="' + www +'" target="_blank"> >>> </a></p></figure>';
           
              this.posterElem.append(elem);*/


    var Poster = function(data) {
      var portrait = 600,
          landscape = 800;

      this.artist = data.artist;
      this.director = data.director;
      this.description = data.description;
      this.src = 'images/posters/' + data.src+ '-large_1x.jpeg';
      this.title_pl = data.title['PL'] || "";
      this.title_en = data.title['EN'] || "";
      this.title_ger = data.title['GER'] || "";
      this.website= data.website;
      this.year_movie = data.year['movie'];
      this.x = data.size[0];
      this.y = data.size[1];
      this.width = this.x > this.y ? landscape : portrait;

      this.figcaption = ko.pureComputed(function() {
          return this.title_pl + ' (Poster designer: ' + this.artist + '; ' + this.x + 'x' + this.y + ')';
      }, this);

      this.title_all = ko.pureComputed(function() {
          var titleAll = "";

         for (t in data.title) {
              titleAll += data.title[t] + " ";
        };
          return titleAll;
      }, this);

      this.searchQuery = ko.pureComputed(function() {
        return this.title_all() + " " + this.artist + " " + this.director + " " + this.year_movie;
      }, this);

    };

    var ViewModel = function() {

        var self = this;

        self.query = ko.observable("");

         self.chosenPosterId = ko.observable("");

        // Build poster list
        self.posterList = ko.observableArray(ko.utils.arrayMap(initialPosters, function(posterItem) {
            return new Poster(posterItem)
        }));

        // Sort poster list by name property
        self.posterList().sort(function(left, right) {
            return left.title_en === right.title_en ? 0 : (left.title_en < right.title_en ? -1 : 1)
        })
        
        // Reverse poster list order
        self.reverseList = function() {
            self.posterList.reverse();
        }
        
        self.goToPoster = function(poster) {
            self.chosenPosterId(poster != self.chosenPosterId() ? poster : "");
        };

        //Filter location list and return search result
        self.searchResults = ko.computed(function() {
            var search = self.query().toLowerCase();
            return ko.utils.arrayFilter(self.posterList(), function(poster) {
                return poster.searchQuery().toLowerCase().indexOf(search) >= 0;
            });
        });

        //http://www.omdbapi.com/?t=Game of Thrones&Season=1&Episode=1
/*
        self.openMovieDb = ko.observableArray([]);

        self.getMovieInfo = ko.computed(function() {
        self.posterList().forEach(function(poster) {

            var url = 'http://www.omdbapi.com/?',
                title = poster.title_en || poster.title_pl,
                year = poster.year_movie;

            $.ajax({
                url: url,
                dataType: 'json',
                data: 's=' + title,
                      //'s=' + title +
                      //'&type=movie' +
                      //'&y=' + year,
                async: true,

                success: function(data) {
                    var response = data.Search ? data.Search : "nothing found";


                    //self.openMovieDb.push(response);
                    if (response === "nothing found") {
                      console.log(title + ": " + response);
                    } else {
                      console.log(response);
                    }
                }
            });
        });
    });*/
 
    };
    

    ko.applyBindings(new ViewModel());
}(posters.posters));


