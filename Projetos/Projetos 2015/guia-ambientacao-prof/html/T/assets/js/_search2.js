// http://portaldoprofessor.insper.edu.br/?page_id=1588/ Guia de ambientaÃ§Ã£o

// http://portaldoprofessor.insper.edu.br/?page_id=1593/ ContrataÃ§Ã£o
// http://portaldoprofessor.insper.edu.br/?page_id=1596/ QuestÃµes operacionais
// http://portaldoprofessor.insper.edu.br/?page_id=1598/ Consulta rÃ¡pida

if (typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(
      /^\s*(\S*(?:\s+\S+)*)\s*$/,
      "$1");
  };
}


//http://javascript.crockford.com/

var walkTheDOM = function walkTheDOM (node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
      walkTheDOM(node, func);
      node = node.nextSibling;
    }
};

(function () {

  "use strict";

  var request, url, ready, response, memory, locations, dictionary, requestsArray, requests, buildSearch, processText, chars, config, results;

  chars = {
    before : function () {
      return window.outerWidth > 800 ? 10 : 5;
    },
    after : function () {
      return window.outerWidth > 800 ? 120 : 50;
    }
  };

  config = {
    ocurrences : 3
  };

  results = [];

  memory = [];

  url = "https://insper.blackboard.com/bbcswebdav/institution/DEA/guia-ambientacao/";

  locations = {
    "contratacao" : "contratacao/index.html",
    "questoes-operacionais" : "questoes-operacionais/index.html",
    "consulta-rapida" : "consulta-rapida/index.html"
  };

  dictionary = {
    "contratacao" : "ContrataÃ§Ã£o",
    "questoes-operacionais" : "QuestÃµes operacionais",
    "consulta-rapida" : "Consulta rÃ¡pida"
  };

  processText = function (input) {

    var output = input.replace(/^\s+|^\n+|(?:\s+\s+)|\n+|\n+$|\s+$/g, " ");

    return {
      makeLowerCase : function () {
        return output.toLowerCase().trim();
      },
      forDisplay : function () {
        return output;
      }
    }

  };

  buildSearch = function () {

    if (memory.length === 3) {

      var main, input, search, templates, container, lastValue;

      main = jQuery("#main");

      templates = {
        input : "<div class='input-group ajax-search'><p><h3 class='title'>O que vocÃª procura?</h3></p><input type='text' class='form-control' placeholder='faÃ§a uma busca' id='ajax-search'><span class='input-group-btn'></span></div><!-- /input-group -->",
        responseContainer : "<div id='responseContainer'></div>",
        responseList : {
          open: "<ul class='list-group'>",
          title: function (page) {
            return "<li class='list-group-title'><strong>" + dictionary[page] + ":</strong></li>";
          },
          item: function (string, link, page) {
            return "<li class='list-group-item'><a href=" + link + "/>(...) " + string + " (...)</a></li>";
          },
          itens: "",
          close: "</ul>"
        }
      };

      main.prepend(templates.responseContainer).prepend(templates.input);

      input = main.find("#ajax-search");

      container = jQuery("#responseContainer");

      search = function (term) {

        var i, length, isValid, buildOcurrences, j, k, item, content, buildText;

        isValid = (function () {

          return term.length > 2;

        }());

        content = "";

        container.html("");

        buildText = function (term, response) {

          var comparisonSource, comparisonTerm, termInSource;

          comparisonSource = processText(response).makeLowerCase();
          comparisonTerm = processText(term).makeLowerCase();

          termInSource = processText(response).forDisplay().substring(comparisonSource.indexOf(comparisonTerm), comparisonSource.indexOf(comparisonTerm) + comparisonTerm.length + 1);

          return response.substring(comparisonSource.indexOf(comparisonTerm) - chars.before(), comparisonSource.indexOf(comparisonTerm) + comparisonTerm.length + chars.after()).replace(termInSource, "<strong>" + termInSource + "</strong>");

        };

        if (isValid) {

          length = memory.length;


          container.html("");

          templates.responseList.itens = "";

          results = [];

          for (i = 0; i < memory.length; i += 1) {

            results.push([]);

            walkTheDOM(memory[i].element, function (node) {

              if ( node.nodeType === 1 && node.nodeName.toLowerCase() === "p" && node.innerText.toLowerCase().indexOf(term.toLowerCase()) !== -1 ) {

                if (results[i].length < config.ocurrences) {

                  results[i].push(node);

                }

              }

            });


          };


          container.html(templates.responseContainer);

          for (j = 0; j < results.length; j += 1) {

            if (results[j].length) {

              content += templates.responseList.open;

              content += templates.responseList.title(memory[j].id);

              for (k = 0; k < results[j].length; k += 1) {

                content += templates.responseList.item(buildText(term, results[j][k].innerText), memory[j].location, memory[j].id);

              }

              content += templates.responseList.close;

            }

          }

          jQuery(container.children()[0]).html(content);




        } else {

          container.html("");

          templates.responseList.itens = "";

          results = [];

        }

      };

      input.on("keyup", function () {

        search(jQuery(this).val());

      });

      jQuery(window).on("scroll", function () {

        if (jQuery(".menu-lateral").hasClass("fixed-menu")) {
          if (input.val().length > 0) {
            lastValue = input.val();
          }
          input.val("").trigger( "keyup" );
        } else {
          if (lastValue && lastValue !== input.val()) {
            input.val(lastValue).trigger( "keyup" );
            console.log(lastValue);
          }
        }

      });

    }

  };

  ready = function (request, location) {

    var fragment, container, select;

    if (request.readyState === 4 && request.status === 200) {

      response = request.responseText;

      if (response) {

        fragment = document.createDocumentFragment();

        container = document.createElement("div");

        container.innerHTML = response.toString();

        fragment.appendChild(container);

        select = fragment.getElementById(location);

        jQuery(select).find(".menu-global").remove();
        jQuery(select).find(".breadcrumb").remove();
        jQuery(select).find(".menu-lateral").remove();

        memory.push({ id : location, response : select.innerText, fragment : select, location: locations[location], element : select });

        buildSearch();

      }

    }

  };

  requestsArray = [new XMLHttpRequest(), new XMLHttpRequest(), new XMLHttpRequest()];

  requests = function () {

    var location, makeRequest, count;

    makeRequest = function (request, url, location) {

      request.open("GET", url, true);
      request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      request.send();
      request.onreadystatechange = function () {
        ready(request, location);
      };

    };

    count = 0;


    for (location in locations) {

      // location Ã© a key

      if (locations.hasOwnProperty(location)) {

        makeRequest(requestsArray[count], url + locations[location], location);

        count += 1;

      }

    }

  };


  requests();



}());


























