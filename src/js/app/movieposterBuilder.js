/**
 * @file app.js
 * @version 0.1 2015
 * @author Karol Zyskowski
 * @email k.zysk@zoho.com
 * Please read the README.md file for more information about the Polish Movie Poster Gallery
 * Here is a link to the live version:
 * {@link http://karoldavid.github.io/movie-poster-blog/ GitHub}
 * Here is a link to the Github repository:
 * {@link http://github.com/karoldavid/movie-poster-blog.git/ GitHub}
 */

/**
 * @descripion
 * The file app.js provides the funcionality to create poster objects and binds them
 * to the view and to the search bar. It updates any changes to the data via
 * knockoutJS Model-View-View Model pattern (MVVM) instantly.
 */

/**
 * Wrapper function
 * @param {object} posters - poster data
 */
$(function(posters) {
    "use strict";

    var posters = [],
        viewModel;

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', 'src/js/data/movieposterData.json', true);
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
              }
        };
        xobj.send(null);
     }

    /*
    var elem = '<figure class="poster-entry">' +
               '<picture><img class="lazy poster" src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-original="images/posters/' + url + '-large_1x.jpeg" width="' + width + '"></picture>'+
               '<figcaption>' + title + " (Poster designer: " + artist + "; " + x + "x" + y + ")" + '</figcaption>' +
               '<a href="#">' + title + '</a>' +
               '<div class="date-text">%data%</div>' +
               '<p class="description"><br>' + description + '</p>' +
               '<p class="website"><a href="' + www +'" target="_blank"> >>> </a></p></figure>'; */

    var Poster = function(data) {
        var portrait = 600,
            landscape = 800;

        this.artist = data.artist;
        this.director = data.director;
        this.description = data.description;
        this.src = 'dist/images/posters/' + data.src+ '-large_1x.jpeg';
        this.title_pl = data.title.PL || "";
        this.title_en = data.title.EN || "";
        this.title_ger = data.title.GER || "";
        this.website = data.website;
        this.year_movie = data.year.movie;
        this.x = data.size[0];
        this.y = data.size[1];
        this.width = this.x > this.y ? landscape : portrait;

        this.figcaption = ko.pureComputed(function() {
            return this.title_pl + ' (Poster designer: ' + this.artist + '; ' + this.x + 'x' + this.y + ')';
        }, this);

        this.altText = ko.pureComputed(function() {
            return "Picture of Polish Movie Poster " + this.title_pl;
        },this);

        this.titleText = ko.pureComputed(function() {
            return "Movie Poster " +  this.title_pl + " designed by " + this.artist;
        },this);

        this.title_all = ko.pureComputed(function() {
            var titleAll = "";

            for (var t in data.title) {
                titleAll += data.title[t] + " ";
            }

            return titleAll;
        }, this);

        this.searchQuery = ko.pureComputed(function() {
            return this.title_all() + " " + this.artist + " " + this.director + " " + this.year_movie;
        }, this);

    };

    /**
     * Build, sort and search and list
     * Synchronize the poster gallery view with user input into searchbar
     * @contructor ViewModel
     */
    var MyViewModel = function() {

        var self = this;

        // search query the user enters in the header of the main page
        self.query = ko.observable("");

        // build poster list
        self.posterList = ko.observableArray(ko.utils.arrayMap(posters, function(posterItem) {
            return new Poster(posterItem);
        }));

        // sort poster list by name property
        self.posterList().sort(function(left, right) {
            return left.title_en === right.title_en ? 0 : (left.title_en < right.title_en ? -1 : 1);
        });

        // filter poster list and return search result
        self.searchResults = ko.computed(function() {
            var search = self.query().toLowerCase();
            return ko.utils.arrayFilter(self.posterList(), function(poster) {
                return poster.searchQuery().toLowerCase().indexOf(search) >= 0;
            });
        });
    };

    loadJSON(function(response) {
        posters = JSON.parse(response);

        // initialize and activate Knockout
        viewModel = new MyViewModel();
        ko.applyBindings(viewModel);
    });

}());