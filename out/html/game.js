(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;

    // Add your custom code here.
  };

  var TITLE = "Anatolian Dawn" + '_' + "Egehan";

  // the url is a link to game.json
  // test url: https://aucchen.github.io/social_democracy_mods/v0.1.json
  // TODO; 
  window.loadMod = function(url) {
      ui.loadGame(url);
  };

  window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('library')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('library');
    }
  };

  window.showMods = function() {
    window.hideOptions();
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('mod_loader')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('mod_loader');
    }
  };
  
  window.showOptions = function() {
      var save_element = document.getElementById('options');
      window.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  window.hideOptions();
              }
          };
      }
  };

  window.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  window.disableBg = function() {
      window.dendryUI.disable_bg = true;
      document.body.style.backgroundImage = 'none';
      window.dendryUI.saveSettings();
  };

  window.enableBg = function() {
      window.dendryUI.disable_bg = false;
      window.dendryUI.setBg(window.dendryUI.dendryEngine.state.bg);
      window.dendryUI.saveSettings();
  };

  window.disableAnimate = function() {
      window.dendryUI.animate = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimate = function() {
      window.dendryUI.animate = true;
      window.dendryUI.saveSettings();
  };

  window.disableAnimateBg = function() {
      window.dendryUI.animate_bg = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimateBg = function() {
      window.dendryUI.animate_bg = true;
      window.dendryUI.saveSettings();
  };

  window.disableAudio = function() {
      window.dendryUI.toggle_audio(false);
      window.dendryUI.saveSettings();
      window.updateMusicBtn();
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
      window.updateMusicBtn();
  };

  window.updateMusicBtn = function() {
      var disabled = window.dendryUI && window.dendryUI.disable_audio;
      var onIcon = document.getElementById('music-on-icon');
      var offIcon = document.getElementById('music-off-icon');
      if (onIcon && offIcon) {
          onIcon.style.display = disabled ? 'none' : 'inline';
          offIcon.style.display = disabled ? 'inline' : 'none';
      }
  };

  window.toggleMusicButton = function() {
      if (window.dendryUI && window.dendryUI.disable_audio) {
          window.enableAudio();
      } else {
          window.disableAudio();
      }
  };

  window.enableImages = function() {
      window.dendryUI.show_portraits = true;
      window.dendryUI.saveSettings();
  };

  window.disableImages = function() {
      window.dendryUI.show_portraits = false;
      window.dendryUI.saveSettings();
  };

  window.enableLightMode = function() {
      window.dendryUI.dark_mode = false;
      document.body.classList.remove('dark-mode');
      window.dendryUI.saveSettings();
  };
  window.enableDarkMode = function() {
      window.dendryUI.dark_mode = true;
      document.body.classList.add('dark-mode');
      window.dendryUI.saveSettings();
  };

  // populates the checkboxes in the options view
  window.populateOptions = function() {
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var disable_audio = window.dendryUI.disable_audio;
    var show_portraits = window.dendryUI.show_portraits;
    if (disable_bg) {
        $('#backgrounds_no')[0].checked = true;
    } else {
        $('#backgrounds_yes')[0].checked = true;
    }
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (disable_audio) {
        $('#audio_no')[0].checked = true;
    } else {
        $('#audio_yes')[0].checked = true;
    }
    if (show_portraits) {
        $('#images_yes')[0].checked = true;
    } else {
        $('#images_no')[0].checked = true;
    }
    if (window.dendryUI.dark_mode) {
        $('#dark_mode')[0].checked = true;
    } else {
        $('#light_mode')[0].checked = true;
    }
  };

  
  // This function allows you to modify the text before it's displayed.
  // E.g. wrapping chat-like messages in spans.

    

  // This function allows you to do something in response to signals.
    

  window.handleSignal = function (signal, event, scene_id) {};

  // This function runs on a new page. Right now, this auto-saves.
  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
      window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false
    }
  };
window.displayText = function (text) {
        return applyWholesome(text);
    };
  
    //To get a value 
    function getRelationshipText(value) {
        if (value === undefined || value === null) return '';
        if (value <= 5) return '<span style="color: #FF0000;">Hostile</span>';
        if (value <= 14.9) return '<span style="color: #FF4500;">Frigid</span>';
        if (value <= 29.9) return '<span style="color: #FF8C00;">Cold</span>';
        if (value <= 39.9) return '<span style="color: #FFA500;">Cool</span>';
        if (value <= 54.9) return '<span style="color: #FFD700;">Neutral</span>';
        if (value <= 64.9) return '<span style="color: #9ACD32;">Warm</span>';
        if (value <= 74.9) return '<span style="color: #32CD32;">Friendly</span>';
        return '<span style="color: #008000;">Very friendly</span>';
    }
  
    function getMilitancyText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value <= 0.05) return '<span style="color: #008000;">Nonexistent</span>';
        if (value <= 0.14) return '<span style="color: #32CD32;">Very low</span>';
        if (value <= 0.24) return '<span style="color: #9ACD32;">Low</span>';
        if (value <= 0.44) return '<span style="color: #FFD700;">Medium-low</span>';
        if (value <= 0.69) return '<span style="color: #FFA500;">Medium</span>';
        if (value <= 1) return '<span style="color: #FF4500;">High</span>';
        return '<span style="color: #FF0000;">Very high</span>';
    }
    
    // Helper function to convert loyalty/morale number to text
    function getLoyaltyText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value <= 0.06) return '<span style="color: #FF0000;">Completely disloyal</span>';
        if (value <= 0.19) return '<span style="color: #FF4500;">Very disloyal</span>';
        if (value <= 0.31) return '<span style="color: #FF8C00;">Generally disloyal</span>';
        if (value <= 0.41) return '<span style="color: #FFA500;">Mostly disloyal</span>';
        if (value <= 0.54) return '<span style="color: #FFD700;">Divided</span>';
        if (value <= 0.71) return '<span style="color: #9ACD32;">Mostly loyal**</span>';
        if (value <= 0.95) return '<span style="color: #32CD32;">Generally loyal**</span>';
        return '<span style="color: #008000;">Completely loyal</span>';
    }

function getPartyIdeology(party, Q) {
    if (!Q) return 'Unknown';
    3
    switch(party) {
        case 'TIP':
            if (Q.TIP_party_leader === "Unorganized") return '<span style="color: #C42424;">Left Wing</span> (Disorganized)';
            if (Q.TIP_party_leader === "Behice Boran") return '<span style="color: #607808;">Far Left</span>  (Marxism-Leninism)';
            if (Q.TIP_party_leader === "Mehmet Ali Aybar") return '<span style="color: #C42424;">Left Wing</span> (Democratic Socialism)';
            return 'Unknown';
        case 'TİP':
            if (Q.TIP_party_leader === "Unorganized") return '<span style="color: #C42424;">Left Wing</span> (Disorganized)';
            if (Q.TIP_party_leader === "Behice Boran") return '<span style="color: #607808;">Far Left</span>  (Marxism-Leninism)';
            if (Q.TIP_party_leader === "Mehmet Ali Aybar") return '<span style="color: #C42424;">Left Wing</span> (Democratic Socialism)';
            return 'Unknown';
        case 'CGP':
            if (Q.CGP_party_leader === "Feyzioğlu") return '<span style="color: #484863;">Center-Center Right</span> (Right Kemalism)';
            return 'Unknown';
        case 'AP':
            if (Q.z_party_leader === "Demirel") return '<span style="color: #4344af;">Center Right-Right</span> (Conservative Liberalism)';
            return 'Unknown';
        case 'CHP':
            if (Q.CHP_party_leader === "İnönü") return '<span style="color: #803c53;">Center-Center Left</span> (Kemalism)';
            if (Q.CHP_party_leader === "Ecevit") return '<span style="color: #c76082;">Center Left</span> (Left Kemalism)';
            return 'Unknown';
        case 'DP':
            if (Q.DP_party_leader === "Bozbeyli") return '<span style="color: #342675;">Right Wing</span> (Conservative Populism)';
            return 'Unknown';
        case 'MSP':
            if (Q.MSP_party_leader === "Süleyman Arif") return '<span style="color: #3c3e4e;">Far Right</span> (Islamic Conservatism)';
            if (Q.MSP_party_leader === "Erbakan") return '<span style="color: #3c3e4e ;">Far Right</span> (Social Islamism)';
            return 'Unknown';
        case 'MHP':
            if (Q.MHP_party_leader === "Alparslan Türkeş") return '<span style="color: #3c3e4e ;">Far Right</span> (Turkic-Islamic Synthesis)';
            return 'Unknown';
        default:
            return 'Unknown';
    }
}

    //To check if extra dynamic or not
    function getDynamicTooltipContent(searchString, baseTooltip) {
        var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state ? 
                window.dendryUI.dendryEngine.state.qualities : null;
        
        if (!Q) return baseTooltip.explanationText;
        
        if (searchString === 'TIP' && Q['TIP_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['TIP_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
         if (searchString === 'TİP' && Q['TIP_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['TIP_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'DP' && Q['DP_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['DP_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'CGP' && Q['CGP_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['CGP_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'AP' && Q['z_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['z_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'MSP' && Q['MSP_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['MSP_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'MHP' && Q['MHP_relation'] !== undefined) {
            var ideology = getPartyIdeology(searchString, Q);
            var relationText = getRelationshipText(Q['MHP_relation']);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology + '<br>Relation: ' + relationText;
        }
        if (searchString === 'CHP') {
            var ideology = getPartyIdeology(searchString, Q);
            return baseTooltip.explanationText + '<br>Politics: ' + ideology;
        }
        if (searchString === 'paramilitary-name' && Q['paramilitary-name_strength'] !== undefined) {
            var strength = Q['paramilitary-name_strength'] ? Q['paramilitary-name_strength'].toFixed(1) : '0';
            var militancy = getMilitancyText(Q['paramilitary-name_militancy']);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Militarization: ' + militancy;
        }
      
        if (searchString === 'THKP-C' && Q.thkpc_strength !== undefined) {
            var strength = Q.thkpc_strength ? Q.thkpc_strength : '0';
            var morale = getMilitancyText(Q.thkpc_militancy);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Militarization' + militancy;
        }
       
        if (searchString === 'TKP/ML' && Q.tkpml_strength !== undefined) {
            var strength = Q.tkpml_strength ? Q.tkpml_strength : '0';
            var morale = getMilitancyText(Q.tkpml_militancy);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Militarization' + militancy;
        }
         if (searchString === 'Grey Wolves' && Q.grey_wolves_strength !== undefined) {
            var strength = Q.grey_wolves_strength ? Q.grey_wolves_strength : '0';
            var morale = getMilitancyText(Q.grey_wolves_militancy);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Militarization' + militancy;
        }
        if (searchString === 'Raiders' && Q.raiders_strength !== undefined) {
            var strength = Q.raiders_strength ? Q.raiders_strength : '0';
            var morale = getMilitancyText(Q.raiders_militancy);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Militarization' + militancy;
        }
        if (searchString === 'DEV-YOL' && Q.devyol_strength !== undefined) {
            var strength = Q.devyol_strength ? Q.devyol_strength : '0';
            var morale = getMilitancyText(Q.devyol_militancy);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Militarization' + militancy;
        }
        if (searchString === 'TİT' && Q.tit_strength !== undefined) {
            var strength = Q.tit_strength ? Q.tit_strength : '0';
            var morale = getMilitancyText(Q.tit_militancy);
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Militarization' + militancy;
        }
        return baseTooltip.explanationText;
    }
  
    function applyWholesome(str) {
        const allWords = new Set([
            ...tooltipList.map(t => t.searchString),
            ...colourList.map(c => c.word)
        ]);

        const regex = new RegExp(`\\b(${[...allWords].join('|')})\\b`, 'g');

        return str.replace(/(<(?:span|strong)[^>]*>.*?<\/(?:span|strong)>|<[^>]+>|[^<]+)/g, (segment) => {
            if (segment.startsWith('<')) return segment;

            return segment.replace(regex, (match) => {
                const tooltip = tooltipList.find(t => t.searchString === match);
                const colour = colourList.find(c => c.word === match);

                let style = colour ? colour.style : '';
                let innerText = match;

                if (colour && colour.img) {
                    innerText = `<img src="${colour.img}" class="p_icon" alt="">${innerText}`;
                }

                if (tooltip) {
                    var tooltipContent = getDynamicTooltipContent(match, tooltip);
                    return `<span class='mytooltip' style='${style}'>${innerText}<span  class='mytooltiptext'>${tooltipContent}</span></span>`;
                } else if (colour) {
                    return `<span style='${style}'>${innerText}</span>`;
                }

                return match;
            });
        });
    }
  // TODO: have some code for tabbed sidebar browsing.
  window.updateSidebar = function() {
      $('#qualities').empty();
      var scene = dendryUI.game.scenes[window.statusTab];
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.updatePartySidebar = function() {
      $('#party_qualities').empty();
      var scene = dendryUI.game.scenes['status.the_party'];
      if (!scene) return;
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#party_qualities').append(dendryUI.contentToHTML.convert(displayContent));
      // Render d3 parliament diagram after DOM update
      window.renderPartyParliament();
  };

  window._lastParliamentDataKey = null;
  window._cachedParliamentSVGContent = null;

  window.renderPartyParliament = function() {
      var svgEl = document.getElementById('party-parliament');
      if (!svgEl || !window.partyParliamentData || window.partyParliamentData.length === 0) return;

      // Build a key from the current data to detect changes
      var dataKey = JSON.stringify(window.partyParliamentData.map(function(p) {
          return { id: p.id, seats: p.seats, color: p.color, outline: p.outline };
      }));

      // If data hasn't changed and we have cached SVG content, reuse it
      if (dataKey === window._lastParliamentDataKey && window._cachedParliamentSVGContent) {
          svgEl.innerHTML = window._cachedParliamentSVGContent;
          return;
      }

      var isFirstRender = !window.partyParliamentRendered;

      // Always clear SVG and interrupt any running D3 transitions
      d3.select("#party-parliament").selectAll("*").interrupt().remove();

      var width = svgEl.parentElement ? svgEl.parentElement.offsetWidth : 220;
      if (width <= 0) width = 220;
      var parliament = d3.parliament();
      parliament.width(width).height(width).innerRadiusCoef(0.4);
      parliament.enter.fromCenter(isFirstRender).smallToBig(isFirstRender);
      parliament.update.animate(false);
      parliament.exit.toCenter(false).bigToSmall(false);
      d3.select("#party-parliament").datum(window.partyParliamentData).call(parliament);
      window.partyParliamentRendered = true;

      // Cache the rendered SVG content for reuse
      if (!isFirstRender) {
          window._lastParliamentDataKey = dataKey;
          window._cachedParliamentSVGContent = svgEl.innerHTML;
      } else {
          // First render has animations; cache after they complete
          setTimeout(function() {
              var el = document.getElementById('party-parliament');
              if (el) {
                  window._lastParliamentDataKey = dataKey;
                  window._cachedParliamentSVGContent = el.innerHTML;
              }
          }, 2000);
      }
  };

  window.changeTab = function(newTab, tabId) {
      if (tabId == 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
          window.alert('Polls are not available in historical mode.');
          return;
      }
      var tabButton = document.getElementById(tabId);
      var tabButtons = document.getElementById('stats_sidebar').getElementsByClassName('tab_button');
      for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
      }
      tabButton.className += ' active';
      window.statusTab = newTab;
      window.updateSidebar();
  };

  window.onDisplayContent = function() {
      window.updateSidebar();
      window.updatePartySidebar();
  };

  /*
   * This function copied from the code for Infinite Space Battle Simulator
   *
   * quality - a number between max and min
   * qualityName - the name of the quality
   * max and min - numbers
   * colors - if true/1, will use some color scheme - green to yellow to red for high to low
   * */
  window.generateBar = function(quality, qualityName, max, min, colors) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      var value = document.createElement('div');
      value.className = 'barValue';
      var width = (quality - min)/(max - min);
      if (width > 1) {
          width = 1;
      } else if (width < 0) {
          width = 0;
      }
      value.style.width = Math.round(width*100) + '%';
      if (colors) {
          value.style.backgroundColor = window.probToColor(width*100);
      }
      bar.textContent = qualityName + ': ' + quality;
      if (colors) {
          bar.textContent += '/' + max;
      }
      bar.appendChild(value);
      return bar;
  };


  window.justLoaded = true;
  window.statusTab = "status";
  window.dendryModifyUI = main;
  console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

  window.onload = function() {
    window.dendryUI.loadSettings({show_portraits: true, animate: true});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    window.pinnedCardsDescription = "Party Leadership - actions are only usable once per 6 months.";
    window.updateMusicBtn();
  };

  // Override displayPinnedCards to add gold/silver borders and sort leader > secretary > members
  window.displayPinnedCards = function(cards) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var leaderId = Q.party_leader_id || "";
    var secretaryId = Q.party_secretary_id || "";

    // Sort: leader first, then secretary, then members (alphabetically by id)
    cards.sort(function(a, b) {
      function rank(card) {
        var id = card.id || "";
        // card ids are like "advisors.inonu" — extract the part after the dot
        var shortId = id.indexOf(".") >= 0 ? id.substring(id.lastIndexOf(".") + 1) : id;
        if (shortId === leaderId) return 0;
        if (shortId === secretaryId) return 1;
        return 2;
      }
      var ra = rank(a), rb = rank(b);
      if (ra !== rb) return ra - rb;
      // Among members, sort alphabetically by id for consistent ordering
      var idA = (a.id || "").toLowerCase();
      var idB = (b.id || "").toLowerCase();
      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
    });

    // Build the pinned cards HTML using jQuery (matching the engine's approach)
    var $content = window.jQuery("#content") || window.jQuery("#main-content");
    var desc = "Pinned cards - click a card to play.";
    if (window.pinnedCardsDescription) {
      desc = window.pinnedCardsDescription;
    }
    if (Q.pinnedCardsDescription) {
      desc = Q.pinnedCardsDescription;
    }
    $content.append(window.jQuery("<hr>"));
    $content.append(window.jQuery("<p>").addClass("pinned-text-description").text(desc));

    var $ul = window.jQuery("<ul>").addClass("pinned-cards");
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var $li = window.jQuery("<li>").addClass("pinned-card");

      // Determine if this card is leader or secretary
      var cardId = card.id || "";
      var shortId = cardId.indexOf(".") >= 0 ? cardId.substring(cardId.lastIndexOf(".") + 1) : cardId;
      if (shortId === leaderId) {
        $li.addClass("leader-card");
      } else if (shortId === secretaryId) {
        $li.addClass("secretary-card");
      }

      // Add role title above the portrait (always present for vertical alignment)
      var roleLabel = "";
      if (shortId === leaderId) {
        roleLabel = "Party Leader";
      } else if (shortId === secretaryId) {
        roleLabel = "Party Secretary";
      } else if (shortId !== "shuffle_leadership_pinned") {
        roleLabel = "Member";
      }
      var $role = window.jQuery("<span>").addClass("card-role-label").html(roleLabel || "&nbsp;");
      $li.append($role);

      var $a = window.jQuery("<a>").addClass("card").attr({href: "#", "card-id": card.id, title: card.title});
      var $caption = window.jQuery("<span>").addClass("card-caption").text(card.title);

      if (card.image) {
        var $img = window.jQuery("<img>").addClass("card-img").attr({src: card.image});
        $a.append($img);
      }
      if (card.subtitle) {
        var $tooltip = window.jQuery("<span>").addClass("card-tooltip").text(card.subtitle);
        $a.append($tooltip);
      }

      $li.append($a);
      $li.append($caption);
      $ul.append($li);
    }
    $content.append($ul);
  };

}());

document.addEventListener('mousemove', e => {
    document.querySelectorAll('.mytooltiptext').forEach(el => {
        el.style.setProperty('--mouse-x', e.clientX + 'px');
        el.style.setProperty('--mouse-y', e.clientY + 'px');
    });
});
