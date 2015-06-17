var model = {
    init: function() {
        if (!localStorage.posters) {
          localStorage.posters = JSON.stringify(posters);
        }
    },
    getAll: function() {
      return JSON.parse(localStorage.posters);
    }
};

var octopus = {
  init: function() {
    model.init();
    view.init();
  },
  getPosters: function() {
    return model.getAll();
  }
};

var view = {
    init: function() {

      view.render();
    },
    render: function() {
      console.log(octopus.getPosters());
    }
};

octopus.init();

posters.display = function() {
  "use strict";
  var landscape = 800,
      portrait = 600,
      width = landscape;

  for (var poster in posters.posters) {
    $("#poster").append(HTMLposterStart);
    // var formattedPosterTitle = HTMLposterTitle.replace("%data%", posters.posters[poster].title);
    // $(".poster-entry:last").append(formattedPosterTitle);
    // var formattedPosterDates = HTMLposterDates.replace("%data%", posters.posters[poster].dates);
    // $(".poster-entry:last").append(formattedPosterDates);
    if (posters.posters[poster].size[0] > posters.posters[poster].size[1]) {
      width = landscape;
    } else {
      width = portrait;
    };
    var formattedPosterImageURL = HTMLposterImageURL.replace("%data%", posters.posters[poster].url);
    formattedPosterImageURL = formattedPosterImageURL.replace("%width%", width);
    $(".poster-entry:last").append(formattedPosterImageURL);
    var formattedPosterCaption = HTMLposterCaption.replace("%data%", posters.posters[poster].title['PL'] + " (Poster designer: " + posters.posters[poster].artist + "; " + posters.posters[poster].size[0] + "x" + posters.posters[poster].size[1] + ")");
    $(".poster-entry:last").append(formattedPosterCaption);
    var formattedPosterDescription = HTMLposterDescription.replace("%data%", posters.posters[poster].description);
    $(".poster-entry:last").append(formattedPosterDescription);
    var formattedPosterWWW = HTMLposterWWW.replace("#", posters.posters[poster].www);
    $(".poster-entry:last").append(formattedPosterWWW);
    }
};

//strips image name from filename and adds it as alt text to all images
posters.addAltText = function() {
    "use strict";
    $(document).ready(function() {
      $('img').each(function(){
        var $img = $(this),
            filename = $img.attr('data-original') || $img.attr('src'),
            imageName = filename.substring(7, filename.lastIndexOf('.'));
        $img.attr('alt', imageName);
      });
  });
};

posters.display();
posters.addAltText();
