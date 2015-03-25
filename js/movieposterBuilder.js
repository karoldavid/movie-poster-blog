var posters = {
  "posters": [
    {
      "title" : { "PL" : "Dziecko Rosemary", "EN" : "Rosemary's Baby", "GER" : "Rosemaries Baby" },
      "director": "Roman Polanski",
      "artist": "",
      "year" : 1984,
      "size" : [200, 100],
      "description" : "Rosemary's Baby is a 1968 American psychological horror film written and directed by Roman Polanski, based on the bestselling 1967 novel Rosemary's Baby by Ira Levin.",
      "url" : "images/dziecko_rosemary.svg"
    },
    {
      "title" : { "PL" : "W Mroku Nocy", "EN" : "Night Moves", "GER" : "Die heiße Spur" },
      "director": "Arthur Penn",
      "artist": "",
      "year" : 1975,
      "size" : [100, 200],
      "description" : "Night Moves is a 1975 mystery thriller film directed by Arthur Penn. It stars Gene Hackman, Jennifer Warren, Susan Clark, and features early career appearances by Melanie Griffith and James Woods.",
      "url" : "images/w_mroku_nocy.svg"
    },
    {
      "title" : { "PL" : "Zabity na śmierć", "EN" : "Murder by Death", "GER" : "Eine Leiche zum Desert" },
      "director": "Robert Moore",
      "artist": "",
      "year" : 1976,
      "size" : [200, 100],
      "description" : "Murder by Death is a 1976 American mystery comedy film with a cast featuring Eileen Brennan, Truman Capote, James Coco, Peter Falk, Alec Guinness, Elsa Lanchester, David Niven, Peter Sellers, Maggie Smith, Nancy Walker, and Estelle Winwood, written by Neil Simon and directed by Robert Moore.",
      "url": "images/zabity_na_smierc.svg"
    }]
};


posters.display = function() {
  for (poster in posters.posters) {
    $("#poster").append(HTMLposterStart);
    // var formattedPosterTitle = HTMLposterTitle.replace("%data%", posters.posters[poster].title);
    // $(".poster-entry:last").append(formattedPosterTitle);
    // var formattedPosterDates = HTMLposterDates.replace("%data%", posters.posters[poster].dates);
    // $(".poster-entry:last").append(formattedPosterDates);
    var formattedPosterImageURL = HTMLposterImageURL.replace("%data%", posters.posters[poster].url);
    $(".poster-entry:last").append(formattedPosterImageURL);
    var formattedPosterCaption = HTMLposterCaption.replace("%data%", posters.posters[poster].title['PL'] + " (" + posters.posters[poster].year + "; " + " " + posters.posters[poster].size[0] + "x" + posters.posters[poster].size[1] + ")");
    $(".poster-entry:last").append(formattedPosterCaption);
    var formattedPosterDescription = HTMLposterDescription.replace("%data%", posters.posters[poster].description);
    $(".poster-entry:last").append(formattedPosterDescription);
    }
};

posters.display();
