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


  };

  var TITLE = "Social Democracy: An Alternate History" + '_' + "Autumn Chen";

  window.loadMod = function(url) {
      ui.loadGame(url);
  };
  if (localStorage.getItem('dnvp_show_completed') !== '1') {
    localStorage.setItem('dnvp_show_completed', '1');
}

window._achNotifCount = 0;

window.showAchievementNotification = function(name, description, icon, id) {
    try {
        var _Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state.qualities;
        if (_Q && _Q.sandbox_mode) return;
        if (_Q && _Q.deterministic_mode) return;
        if (_Q && _Q.game_ended && id !== 'hoi4') return;
    } catch (e) {}
    if (localStorage.getItem('dnvp_achieve_' + id) === '1') return;
    localStorage.setItem('dnvp_achieve_' + id, '1');
    try {
        var achAudio = new Audio('music/achieve.mp3');
        achAudio.volume = 1.0;
        achAudio.play().catch(function(){});
    } catch (e) {}
    var offset = 60 + (window._achNotifCount * 90);
    window._achNotifCount++;
    var notif = document.createElement('div');
    notif.style.cssText = 'position:fixed; bottom:' + offset + 'px; left:50%; transform:translateX(-50%); background:#fff; border:4px solid #000; padding:10px 16px; z-index:9999; font-family:"Minion Pro",Georgia,serif; color:#3b2a1a; display:flex; align-items:center; gap:12px; box-shadow:3px 3px 12px rgba(0,0,0,0.3); width:340px; opacity:0; transition:opacity 0.4s;';
    notif.innerHTML =
        '<img src="' + icon + '" style="width:48px;height:48px;border:2px solid #876;object-fit:cover;flex-shrink:0;" onerror="this.style.background=\'#ccc\'">' +
        '<div>' +
            '<div style="font-size:1em;font-weight:bold;margin-bottom:2px;">' + name + '</div>' +
            '<div style="font-size:0.8em;color:#666;">' + description + '</div>' +
        '</div>';
    document.body.appendChild(notif);
    setTimeout(function() { notif.style.opacity = '1'; }, 50);
    setTimeout(function() { notif.style.opacity = '0'; }, 3500);
    setTimeout(function() {
        notif.parentNode && notif.parentNode.removeChild(notif);
        window._achNotifCount--;
    }, 4000);
};

function checkAchievementsState() {
    var link = document.querySelector('a[onclick*="showAchievements"]');
    if (!link) return;
    var sceneId = dendryUI.dendryEngine.state && dendryUI.dendryEngine.state.sceneId;
    var isRoot = sceneId && sceneId.startsWith('root');
    if (isRoot) {
        link.style.opacity = '1';
        link.style.pointerEvents = '';
        link.style.cursor = 'pointer';
    } else {
        link.style.opacity = '0.5';
        link.style.pointerEvents = 'none';
        link.style.cursor = 'default';
    }
}

window._dvpColorValue = function() {
    var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state && window.dendryUI.dendryEngine.state.qualities;
    if (!Q || !Q.stresemann_dead) return '#D5AC27';
    if (Q.dvp_leader === 'Curtius') return '#D5AC27';
    if (Q.dvp_leader === 'Kardorff') return '#D5AC27';
    if (Q.dvp_leader === 'Dingeldey') return '#98C22C';
    return '#8f6e00';
};
window._applyDvpColor = function() {
    try { document.documentElement.style.setProperty('--dvp-color', window._dvpColorValue()); } catch (e) {}
};
window._applyDvpColor();

window._spdColorValue = function() {
    try { var v = getComputedStyle(document.documentElement).getPropertyValue('--spd-color').trim(); return v || '#c00000'; } catch (e) { return '#c00000'; }
};
window._kpdColorValue = function() {
    try { var v = getComputedStyle(document.documentElement).getPropertyValue('--kpd-color').trim(); return v || '#8B0000'; } catch (e) { return '#8B0000'; }
};
window._applySpdColor = function() {
    try {
        var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state && window.dendryUI.dendryEngine.state.qualities;
        if (Q && Q.spd_pink) document.documentElement.style.setProperty('--spd-color', '#D47B9B');
    } catch (e) {}
};
window._applyKpdColor = function() {
    try {
        var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state && window.dendryUI.dendryEngine.state.qualities;
        if (Q && Q.kpd_line === 'Conciliator') document.documentElement.style.setProperty('--kpd-color', '#C33C87');
    } catch (e) {}
};
window._zColorValue = function() {
    var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state && window.dendryUI.dendryEngine.state.qualities;
    var L = Q && Q.z_leader;
    if (L === 'Stegerwald') return '#2b3363';
    return '#000000';
};
window._applyZColor = function() {
    try { document.documentElement.style.setProperty('--z-color', window._zColorValue()); } catch (e) {}
};
window._dnvpColorValue = function() {
    var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state && window.dendryUI.dendryEngine.state.qualities;
    var L = Q && (Q.dnvp_leader_last_name || Q.dnvp_leader);
    if (L === 'Treviranus') return '#36b0f7';
    if (L === 'Lambach')    return '#005a8f';
    if (L === 'Lehmann')    return '#095c3f';
    if (L === 'Hugenberg')  return '#181894';
    return '#3E88B3';
};
window._applyDnvpColor = function() {
    try { document.documentElement.style.setProperty('--dnvp-color', window._dnvpColorValue()); } catch (e) {}
};
window._hugenbergBgImgs = ['img/huggyback1.jpg', 'img/huggyback2.jpg'];
window._hugenbergPanel = 'rgba(14,26,56,0.95)';
window._toggleHugenbergMode = function() {
    var root = document.documentElement;
    if (!document.getElementById('hugenberg-mode-style')) {
        var P = window._hugenbergPanel;
        var st = document.createElement('style');
        st.id = 'hugenberg-mode-style';
        st.textContent =
            'html.hugenberg-mode {' +
            '  --bg-color:#0b1426 !important;' +
            '  --content-bg-color:' + P + ' !important;' +   /* the panel surfaces — the white space */
            '  --border-color:#0a111f !important;' +
            '  --text-color:#ffffff !important;' +
            '  --link-color:#ffffff !important;' +
            '  --link-hover-color:rgba(255,255,255,0.12) !important;' +
            '  --tab-bg-color:#0b1426 !important;' +
            '  --tab-color:#080f1a !important;' +
            '  --tab-hover-color:#122340 !important;' +
            '  --card-border-color:#0a111f !important;' +
            '  --card-bg-color:rgba(20,36,74,0.95) !important;' +
            '}' +
            /* force every panel surface purple (beats dark-mode rules + the newsbox's inline white) */
            'html.hugenberg-mode #content,' +
            'html.hugenberg-mode .tools,' +
            'html.hugenberg-mode #dnvp_dashboard,' +
            'html.hugenberg-mode footer,' +
            'html.hugenberg-mode #newsbox-frame { background-color:' + P + ' !important; }' +
            /* the title box stays transparent so the background image shows through */
            'html.hugenberg-mode header { background-color:transparent !important; }' +
            /* chrome dark mode also themes: the top nav strip + the status tab bar */
            'html.hugenberg-mode #header-links,' +
            'html.hugenberg-mode .tab_container,' +
            'html.hugenberg-mode .tab_button { background-color:rgba(8,15,28,0.95) !important; color:#ffffff !important; }' +
            'html.hugenberg-mode .tab_button.active { background-color:' + P + ' !important; }' +
            'html.hugenberg-mode .tab_button:hover { background-color:#122340 !important; }' +
            /* all text white (the readability compromise) — beats inline party-name colours */
            'html.hugenberg-mode #content, html.hugenberg-mode #content *,' +
            'html.hugenberg-mode .tools, html.hugenberg-mode .tools *,' +
            'html.hugenberg-mode #dnvp_dashboard, html.hugenberg-mode #dnvp_dashboard *,' +
            'html.hugenberg-mode header, html.hugenberg-mode header * { color:#ffffff !important; }';
        document.head.appendChild(st);
    }
    var on = !root.classList.contains('hugenberg-mode');
    root.classList.toggle('hugenberg-mode', on);
    if (on) window._hugenbergBgOn(); else window._hugenbergBgOff();
    return on;
};
window._hugenbergBgOn = function() {
    var box = document.getElementById('hugenberg-bg');
    if (box) { box.style.display = 'block'; return; }
    var imgs = window._hugenbergBgImgs;
    box = document.createElement('div');
    box.id = 'hugenberg-bg';
    box.style.cssText = 'position:fixed;top:-10vh;left:0;right:0;height:110vh;overflow:hidden;z-index:-50;pointer-events:none;background-color:#0b1426;';
    var ls = 'position:absolute;top:0;right:0;bottom:0;left:0;background-size:cover;background-position:center top;background-repeat:no-repeat;transition:opacity 3s ease;';
    var a = document.createElement('div'); a.style.cssText = ls + 'opacity:1;'; a.style.backgroundImage = "url('" + imgs[0] + "')";
    var b = document.createElement('div'); b.style.cssText = ls + 'opacity:0;';
    box.appendChild(a); box.appendChild(b);
    document.body.appendChild(box);
    var s = box._ss = { front: a, back: b, idx: 0, imgs: imgs };
    s.timer = setInterval(function() {
        s.idx = (s.idx + 1) % s.imgs.length;
        s.back.style.backgroundImage = "url('" + s.imgs[s.idx] + "')";
        s.back.style.opacity = '1'; s.front.style.opacity = '0';
        var t = s.front; s.front = s.back; s.back = t;
    }, 10000);
};
window._hugenbergBgOff = function() {
    var box = document.getElementById('hugenberg-bg');
    if (box) { if (box._ss && box._ss.timer) clearInterval(box._ss.timer); box.remove(); }
};
window._ddpColorValue = function() {
    var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state && window.dendryUI.dendryEngine.state.qualities;
    if (Q && Q.dfp_formed === 1) return Q.dfp_color || '#ccba2f';
    if (Q && Q.dlp_formed === 1) return Q.dlp_color || '#9c8e25';
    if (Q && Q.dstp_formed === 1) return Q.dstp_color || '#D3C24D';
    var L = Q && Q.ddp_leader;
    if (L === 'Erklenz')  return '#f09116';
    if (L === 'Bäumer')   return '#d4a900';
    if (L === 'Dietrich') return '#D3C24D';
    return '#FFCC00';
};
window._applyDdpColor = function() {
    try { document.documentElement.style.setProperty('--ddp-color', window._ddpColorValue()); } catch (e) {}
};
window._cvpRightScore = function() {
    var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state && window.dendryUI.dendryEngine.state.qualities;
    if (!Q) return 0;
    var s = 0;
    if (Q.autocratic_monarchy === 1) s += 2; else if (Q.constitutional_monarchy === 1) s += 1;
    if (Q.remilitarize === 1) s += 2; else if (Q.remilitarize === 2) s += 1;
    if (Q.cvp_economic_policy === 4 || Q.cvp_economic_policy === 5) s += 2;
    else if (Q.cvp_economic_policy === 1 || Q.cvp_economic_policy === 2) s += 1;
    if (Q.coop_nsdap === 1) s += 2;
    if (Q.cvp_leader === 1) s += 2;
    return s;
};
window._cvpColorValue = function() {
    var t = window._cvpRightScore() / 10; if (t < 0) t = 0; if (t > 1) t = 1;
    var hx = function(n){ var h = Math.round(n).toString(16); return h.length < 2 ? '0' + h : h; };
    return '#' + hx(62 * t) + hx(136 * t) + hx(179 * t);
};
window._applyCvpColor = function() {
    try {
        var c = window._cvpColorValue();
        document.documentElement.style.setProperty('--cvp-color', c);
        var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state && window.dendryUI.dendryEngine.state.qualities;
        if (Q) { Q.cvp_color = c; Q.cvp_rightwing = window._cvpRightScore(); }
    } catch (e) {}
};

window._coalitionStyledName = function(name) {
    if (!name) return '';
    var OVERRIDES = {
        'CVP Majority':      '<span style="color:var(--cvp-color);"><b>CVP</b></span> Majority',
        'Bürgerblock':       '<b><span style="color: #6fa8dc;"><span style="color: #3e88b3;"><span style="color:var(--ddp-color);"><span style="color:var(--dnvp-color);">Bür</span></span></span><span style="color: #d5ac27;">ger</span><span style="color: #ffcc00;"><span style="color: #6fa8dc;"></span></span><span style="color: #ffcc00;"><span style="color: #6fa8dc;"></span><span style="color: #6fa8dc;"><span style="color:var(--dvp-color);"><span style="color:var(--ddp-color);"><span style="color:var(--dnvp-color);"><span style="color:var(--ddp-color);">blo</span></span><span style="color:#6FA8DC;"><span style="color:var(--z-color);">ck</span></span></span></span></span></span></span></b><b><span style="color: #6fa8dc;"><span style="color:var(--ddp-color);"></span></span></b>',
        'Große Bürgerblock': '<span style="color:var(--cvp-color);">Gro<span style="color:#6FA8DC;"><span style="color:var(--cvp-color);">ße</span></span></span> <b><span style="color:var(--dnvp-color);">Bür</span><span style="color:var(--dvp-color);">ger</span><span style="color:var(--ddp-color);">blo</span><span style="color:var(--z-color);"><span style="color:#6FA8DC;">ck</span></span></b>',
        'Unholy Alliance':   '<b><span style="color: #954b00;">Unholy</span> <span style="color: var(--cvp-color);">Alliance</span></b>',
        'Hindenburg Bloc':   '<b><span style="color:var(--dnvp-color);">Hinden</span><span style="color:var(--dvp-color);">burg</span></b> <span style="color:#6FA8DC;">Bloc</span>',
        'Christian Coalition': '<b><span style="color:var(--dnvp-color);">Christian</span> </b><span style="color:var(--cvp-color);"><span style="color:var(--z-color);"><b>Coalition</b></span></span>',
        'Centre-Right Coalition': '<span style="font-weight: bold; color: var(--dvp-color);">Centre</span><b>-</b><span style="font-weight: bold; color: var(--dnvp-color);">Right</span> <span style="color: var(--z-color);"><b>Coalition</b></span>',
        'Far-Right Coalition': '<b><span style="color:var(--dnvp-color);">Far</span>-<span style="color:#954B00;">Right</span> Coalition</b>',
        'Far Right Coalition': '<b><span style="color:var(--dnvp-color);">Far</span> <span style="color:#954B00;">Right</span> Coalition</b>',
        'Weimar Coalition': '<b><span style="color:var(--z-color);"><span style="color:#000000;"><span style="color:#000000;">We</span></span></span><span style="color:#c00000;">im</span><span style="color:#FFCC00;">ar</span> Coalition</b>',
        'Grand Coalition': '<b>Grand Coalition</b>',
        'Popular Front': '<font color="#000000"><b><span style="color: #000000;">Pop</span><span style="color: #c00000;">ular</span> <span style="color: #8b0000;">Front</span></b></font>',
        'Left Coalition': '<b><span style="color:#c00000;"><span style="color:var(--spd-color);">Left</span></span> <span style="color:#8B0000;"><span style="color:var(--kpd-color);">Coalition</span></span></b>',
        'Anti-Democratic Coalition': '<b><span style="color: var(--kpd-color);">Anti</span>-<span style="color: var(--dnvp-color);"><span style="color:#954B00;">Democratic</span></span> </b><span style="color: #954b00;"><span style="color:var(--dnvp-color);">Coalition</span></span>',
        'United Left Coalition': '<b><span style="color:var(--kpd-color);"><span style="color:var(--spd-color);">United</span></span> <span style="color:var(--kpd-color);">Left</span> Coalition</b>',
        'Querfront': '<span style="color:var(--kpd-color);">Quer</span><span style="color:#954B00;">front</span>',
        'Social-Catholic Coalition': '<b><span style="color:var(--spd-color);">Social</span>-<span style="color:var(--z-color);">Catholic</span></b> <b>Coalition</b>',
        'Social-Conservative Liberal Coalition': '<b><span style="color: var(--spd-color);">Social</span>-<span style="color: #d5ac27;"><span style="color:var(--dvp-color);">Conservative</span></span> <span style="color: var(--dvp-color);"><span style="color:#6FA8DC;">Liberal</span></span> Coalition</b>',
        'Social-Agrarian Coalition': '<span style="font-weight: bold; color: var(--spd-color);">Social</span><b>-</b><span style="font-weight: bold; color: #1b8613;">Agrarian</span> <span style="color: #6fa8dc;"><b>Coalition</b></span>',
        'Social-Liberal Coalition': '<b><span style="color:var(--spd-color);">Social</span>-<span style="color:var(--ddp-color);">Liberal</span> Coalition</b>',
        'Social-Fascist Coalition': '<b><span style="color:var(--spd-color);">Social</span>-<span style="color:#954B00;">Fascist</span> Coalition</b>',
        'Catholic-Conservative Coalition': '<b><span style="color:var(--z-color);">Catholic</span>-<span style="color:var(--dvp-color);">Conservative</span> Coalition</b>',
        'Catholic Coalition': '<b><span style="color:var(--z-color);">Catholic</span> <span style="color:#6FA8DC;">Coalition</span></b>',
        'Centrist Coalition': '<b><span style="color:var(--z-color);">Centrist</span> <span style="color:#D5AC27;">Coalition</span></b>',
        'Black-Brown Coalition': '<b><span style="color:var(--z-color);">Black</span>-<span style="color:#954B00;">Brown</span> Coalition</b>',
        'Conservative-Agrarian Coalition': '<b><span style="color:#D5AC27;">Conservative</span>-<span style="color:#1b8613;">Agrarian</span> Coalition</b>',
        'Liberal Coalition': '<b><span style="color:var(--dvp-color);">Liberal</span> <span style="color:var(--ddp-color);">Coalition</span></b>',
        'Conservative Coalition': '<b><span style="color:var(--dvp-color);"><span style="color:var(--dnvp-color);">Conservative</span></span> <span style="color:var(--dvp-color);">Coalition</span></b>',
        'Industrialist Coalition': '<b><span style="color:var(--dvp-color);">Industrialist</span> <span style="color:#954B00;">Coalition</span></b>',
        'Agrarian-Liberal Coalition': '<b><span style="color:#1b8613;">Agrarian</span>-<span style="color:var(--ddp-color);">Liberal</span> Coalition</b>',
        'Nationalist-Agrarian Coalition': '<b><span style="color:var(--dnvp-color);">Nationalist</span>-<span style="color:#1b8613;">Agrarian</span> Coalition</b>',
        'Bavarian-National Coalition': '<b><span style="color:#6FA8DC;">Bavarian</span>-<span style="color:#954B00;">National</span> Coalition</b>',
        'Liberal-National Coalition': '<b><span style="color:var(--ddp-color);">Liberal</span>-<span style="color:var(--dnvp-color);">National</span> Coalition</b>',
        'Progressive Coalition': '<b><span style="color:var(--kpd-color);">Progres<span style="color:var(--spd-color);">s</span></span><span style="color:var(--spd-color);">ive Coa</span><span style="color:var(--ddp-color);">lition</span></b>',
        'National Querfront': '<b><span style="color:#954B00;">National</span> <span style="color:var(--dnvp-color);">Quer</span><span style="color:var(--kpd-color);">front</span></b>',
        'Alternate Weimar Coalition': '<b>Alternate <span style="color:var(--z-color);">We</span><span style="color:#D5AC27;">im</span><span style="color:#c00000;">ar</span> Coalition</b>',
        'Grand Social-Catholic Coalition': '<b><span style="color:#6FA8DC;">Grand</span> <span style="color:var(--z-color);"><span style="color:var(--spd-color);">Social</span></span>-<span style="color:var(--z-color);">Catholic</span> Coalition</b>',
        'Grand Social-Liberal Coalition': '<b><span style="color:var(--dvp-color);">Grand</span> <span style="color:var(--spd-color);">Social</span>-<span style="color:var(--ddp-color);">Liberal</span> Coalition</b>',
        'Social-Catholic-Liberal Coalition': '<b><span style="color:var(--spd-color);">Social</span>-<span style="color:var(--z-color);"><span style="color:#6FA8DC;">Catholic</span></span>-<span style="color:var(--ddp-color);">Liberal</span> Coalition</b>',
        'Center-Right Coalition': '<b><span style="color:var(--z-color);">Center</span>-<span style="color:var(--dvp-color);">Right</span> <span style="color:#6FA8DC;">Coalition</span></b>',
        'Catholic-Liberal Coalition': '<b><span style="color:var(--z-color);">Catholic</span>-<span style="color:var(--ddp-color);">Liberal</span> <span style="color:var(--dvp-color);">Coalition</span></b>',
        'Small Center-Right Coalition': '<b><span style="color:var(--dvp-color);">Small</span> <span style="color:var(--z-color);">Center</span>-<span style="color:var(--dnvp-color);">Right</span> Coalition</b>',
        'Black-Gold-Brown Coalition': '<b><span style="color:var(--z-color);">Black</span>-<span style="color:var(--dvp-color);">Gold</span>-<span style="color:#954B00;">Brown</span> Coalition</b>',
        'Small Center-Left Coalition': '<b><span style="color:#6FA8DC;">Small</span> <span style="color:var(--z-color);">Center</span>-<span style="color:var(--ddp-color);">Left</span> Coalition</b>',
        'Schwarzbraun Coalition': '<b><span style="color:var(--z-color);">Schwarz</span><span style="color:#954B00;">braun</span> <span style="color:var(--dvp-color);">Coalition</span></b>',
        'Christian-Jewish Coalition': '<b><span style="color:var(--z-color);">Christian</span>-<span style="color:#1a40ff;">Jewish</span> <span style="color:var(--dnvp-color);">Coalition</span></b>',
        'Schwarz-Weiß-Braun Coalition': '<b><span style="color:var(--z-color);">Schwarz</span>-<span style="color:var(--dnvp-color);">Weiß</span>-<span style="color:#954B00;">Braun</span> Coalition</b>',
        'Schwarz-Weiß-Blau Coalition': '<b><span style="color:#FFCC00;">Schwarz</span>-<span style="color:var(--dvp-color);">Weiß</span>-<span style="color:#6FA8DC;">Blau</span> Coalition</b>',
        'Right Bourgeois Coalition': '<b><span style="color:var(--dnvp-color);">Right</span> <span style="color:var(--dvp-color);">Bourgeois</span> <span style="color:#6FA8DC;">Coalition</span></b>',
        'Fascist Bourgeois Coalition': '<b><span style="color:#954B00;">Fascist</span> <span style="color:var(--dvp-color);">Bourgeois</span> <span style="color:#6FA8DC;">Coalition</span></b>',
        'National Liberal Coalition': '<b><span style="color:var(--dnvp-color);">National</span> <span style="color:var(--ddp-color);">Liberal</span> <span style="color:#D5AC27;">Coalition</span></b>',
        'National Salvation Bloc': '<b><span style="color:#954B00;">National</span> <span style="color:var(--dnvp-color);">Salvation</span> <span style="color:#D5AC27;">Bloc</span></b>',
        'Greater Popular Front': '<b><span style="color:var(--kpd-color);">Greater</span> <span style="color:var(--spd-color);">Popular</span> <span style="color:var(--z-color);">Fro</span><span style="color:var(--ddp-color);">nt</span></b>',
        'Extreme Querfront': '<b><span style="color:var(--kpd-color);">Extr</span><span style="color:var(--spd-color);">eme</span> <span style="color:var(--dnvp-color);">Quer</span><span style="color:#954B00;">front</span></b>',
        'Neoweimar Coalition': '<b><span style="color:#6FA8DC;">Neo</span><span style="color:var(--z-color);">we</span><span style="color:var(--ddp-color);">im</span><span style="color:var(--spd-color);">ar</span> Coalition</b>',
        'Bürgerliche Mitte Coalition': '<b><span style="color:var(--z-color);">Bürger</span><span style="color:var(--dvp-color);">liche</span> <span style="color:var(--ddp-color);">Mitte</span> <span style="color:#6FA8DC;">Coalition</span></b>',
        'National Right Bloc': '<b><span style="color:var(--dnvp-color);">National</span> <span style="color:#954B00;">Right</span> <span style="color:var(--dvp-color);">Bloc</span></b>',
        'Enabling Group Coalition': '<b><span style="color:var(--z-color);">Enabling</span> <span style="color:#954B00;">Group</span> <span style="color:var(--dnvp-color);">Coalition</span></b>',
        'Special Coalition': '<b>Special Coalition</b>'
    };
    if (OVERRIDES[name]) return OVERRIDES[name];
    var wordColor = function(w) {
        var l = w.toLowerCase().replace(/[^a-zäöüß]/g, '');
        if (/^(coalition|bloc|block|front|group|alliance|mitte)$/.test(l)) return '#3f7bc1';
        if (/^(christ|christian|catholic|cathol|zentrum|centre|center|black|schwarz)/.test(l)) return 'var(--z-color)';
        if (/^(social|weimar|neoweimar|grand|wholesome|greater)/.test(l)) return 'var(--spd-color)';
        if (/^(popular|left|united|querfront|progressive|red|rote|extreme|communist)/.test(l)) return 'var(--kpd-color)';
        if (/^(far|fascist|brown|braun|salvation|enabling|schwarzbraun)/.test(l)) return '#954B00';
        if (/^(liberal|liberale)/.test(l)) return 'var(--ddp-color)';
        if (/^(agrarian|agrar|bavarian|bayern|bauern)/.test(l)) return '#6FA8DC';
        if (/^(conservative|conservativ|industrialist)/.test(l)) return 'var(--dvp-color)';
        if (/^(national|nationalist|hindenburg|right|unholy|salvation)/.test(l)) return 'var(--dnvp-color)';
        return 'var(--dnvp-color)';
    };
    return String(name).split(/\s+/).map(function(w) {
        var head = w.split('-')[0];
        return '<span style="color:' + wordColor(head) + ';">' + w + '</span>';
    }).join(' ');
};

var contentEl = document.getElementById('content');
if (contentEl) {
    var achObserver = new MutationObserver(function() {
        setTimeout(checkAchievementsState, 10);
        window._applyDvpColor();
        window._applyCvpColor();
    });
    achObserver.observe(contentEl, { childList: true, subtree: true });
}

window._setupGameUI = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (window._applyDvpColor) window._applyDvpColor();
    if (window._applySpdColor) window._applySpdColor();
    if (window._applyKpdColor) window._applyKpdColor();
    if (window._applyZColor) window._applyZColor();    if (window._applyDnvpColor) window._applyDnvpColor();    if (window._applyDdpColor) window._applyDdpColor();    if (window._applyCvpColor) window._applyCvpColor();
    var sel = '.tools' + '.right';
    var rightTools = document.querySelector(sel);
    if (rightTools) {
        rightTools.style.display = 'block';
        var _arrowSvgRight = '<svg viewBox="0 0 14 8" width="32" height="18" style="image-rendering: pixelated; display: block; pointer-events: none;" shape-rendering="crispEdges"><g fill="#4a4a4a"><rect x="0" y="3" width="10" height="2"/><rect x="10" y="0" width="1" height="8"/><rect x="11" y="1" width="1" height="6"/><rect x="12" y="2" width="1" height="4"/><rect x="13" y="3" width="1" height="2"/></g></svg>';
        var _arrowSvgLeft = '<svg viewBox="0 0 14 8" width="32" height="18" style="image-rendering: pixelated; display: block; pointer-events: none; transform: scaleX(-1);" shape-rendering="crispEdges"><g fill="#4a4a4a"><rect x="0" y="3" width="10" height="2"/><rect x="10" y="0" width="1" height="8"/><rect x="11" y="1" width="1" height="6"/><rect x="12" y="2" width="1" height="4"/><rect x="13" y="3" width="1" height="2"/></g></svg>';
        rightTools.innerHTML =
            '<style>' +
              '.nb-arrow-btn { background: transparent; border: none; padding: 4px; cursor: pointer; user-select: none; outline: none; position: absolute; }' +
              '.nb-unread-dot { position: absolute; top: -2px; width: 8px; height: 8px; background: #c00; display: none; image-rendering: pixelated; }' +
            '</style>' +
            '<div id="newsbox-frame" style="padding: 1em; font-family: Georgia, serif; font-size: 0.95em; line-height: 1.6; background-color: rgba(255, 255, 255, 0.95); text-align: center; position: relative; min-height: 200px;">' +
              '<div id="news_page_external"' + (Q.news_page === 'internal' ? ' style="display: none;"' : '') + '>' +
                '<h3 style="font-family: UnifrakturMaguntia, cursive; letter-spacing: 1px; margin: 0 0 0.5em 0; font-size: 1.7em; color: #4a3728; border-bottom: 1px solid #ffffffff; padding-bottom: 0.3em;">Neue Preußische Zeitung</h3>' +
                '<p id="news_content" style="margin: 0 0 1.5em 0; color: #333; font-size: 1em; min-height: 80px; text-align: left;">' + (Q.current_news || '') + '</p>' +
                '<div style="text-align: center; margin-top: 0.5em;"><img src="img/crossed.png" style="width: 60px; opacity: 0.7;"></div>' +
                '<button class="nb-arrow-btn" onclick="window._toggleNewsPage(1)" title="Magazin der Wirtschaft" style="bottom: 6px; right: 8px;">' +
                  '<span id="nb_unread_internal" class="nb-unread-dot" style="right: -2px;"></span>' +
                  _arrowSvgRight +
                '</button>' +
              '</div>' +
              '<div id="news_page_internal"' + (Q.news_page === 'internal' ? '' : ' style="display: none;"') + '>' +
                '<h3 style="font-family: UnifrakturMaguntia, cursive; letter-spacing: 1px; margin: 0 0 0.5em 0; font-size: 1.7em; color: #4a3728; border-bottom: 1px solid #ffffffff; padding-bottom: 0.3em;">Magazin der Wirtschaft</h3>' +
                '<p id="news_content_internal" style="margin: 0 0 1.5em 0; color: #333; font-size: 1em; min-height: 80px; text-align: left;">' + (Q.internal_news || '') + '</p>' +
                '<div style="text-align: center; margin-top: 0.5em;"><img src="img/crossed.png" style="width: 60px; opacity: 0.7;"></div>' +
                '<button class="nb-arrow-btn" onclick="window._toggleNewsPage(0)" title="Neue Preußische Zeitung" style="bottom: 6px; left: 8px;">' +
                  '<span id="nb_unread_external" class="nb-unread-dot" style="left: -2px;"></span>' +
                  _arrowSvgLeft +
                '</button>' +
              '</div>' +
            '</div>';
        if (Q.news_page === 'internal') {
            Q.internal_news_seen = Q.internal_news || '';
            Q.internal_news_unread = 0;
        } else {
            Q.current_news_seen = Q.current_news || '';
            Q.current_news_unread = 0;
        }
        if (window._refreshNewsBadges) window._refreshNewsBadges();
    }

    var dashboard = document.getElementById('dnvp_dashboard');
    if (dashboard) {
        dashboard.style.display = 'block';
        var _q = Q;
        var total = (_q.authoritarian_conservative_strength || 0) + (_q.christian_social_strength || 0) + (_q.volkisch_strength || 0) + (_q.volkskonservativ_strength || 0);
        var authPct = total ? Math.round((_q.authoritarian_conservative_strength / total) * 100) : 0;
        var csPct = total ? Math.round((_q.christian_social_strength / total) * 100) : 0;
        var volkPct = total ? Math.round((_q.volkisch_strength / total) * 100) : 0;
        var jkPct = 100 - authPct - csPct - volkPct;
        var svgArc = (function() {
            var cx = 200, cy = 180, r1 = 80, r2 = 140;
            var sections = [
                { pct: jkPct, color: '#90D5FF' },
                { pct: csPct, color: '#DAB1DA' },
                { pct: authPct, color: '#000435' },
                { pct: volkPct, color: '#06402B' }
            ];
            var startAngle = Math.PI;
            var paths = '';
            sections.forEach(function(s) {
                var angle = (s.pct / 100) * Math.PI;
                var endAngle = startAngle + angle;
                var x1 = cx + r2 * Math.cos(startAngle), y1 = cy + r2 * Math.sin(startAngle);
                var x2 = cx + r2 * Math.cos(endAngle), y2 = cy + r2 * Math.sin(endAngle);
                var x3 = cx + r1 * Math.cos(endAngle), y3 = cy + r1 * Math.sin(endAngle);
                var x4 = cx + r1 * Math.cos(startAngle), y4 = cy + r1 * Math.sin(startAngle);
                var large = angle > Math.PI ? 1 : 0;
                paths += '<path class="arc-segment" d="M ' + x1 + ' ' + y1 + ' A ' + r2 + ' ' + r2 + ' 0 ' + large + ' 1 ' + x2 + ' ' + y2 + ' L ' + x3 + ' ' + y3 + ' A ' + r1 + ' ' + r1 + ' 0 ' + large + ' 0 ' + x4 + ' ' + y4 + ' Z" fill="' + s.color + '" stroke="#fff" stroke-width="1"/>';
                startAngle = endAngle;
            });
            return '<svg width="400" height="145" viewBox="0 30 400 145" style="width:100%;max-width:400px;display:block;margin:0 auto;">' + paths + '</svg>';
        })();

        var _isLehmann = _q.dnvp_leader === 'Annagrete Lehmann';
        var _kr = _q.kaiser_restored || 0;
        var _kn = _q.kaiser_name || '';
        var _kaiserBlock = '';
        var _leaderImg = _q.dnvp_leader_img;
        if (window._lambachImg && /Lambach/.test(String(_q.dnvp_leader || ''))) _leaderImg = window._lambachImg(_q.dnvp_leader_img || 'img/portraits/lambach.jpg');
        if (_kr > 0 && _kn !== '' && _kn !== 'none') {
            _kaiserBlock =
            '<div style="display:flex;align-items:flex-start;gap:12px;justify-content:center;margin-bottom:0.5em;">' +
            '<div style="text-align:center;">' +
            '<img src="img/portraits/' + _kn.toLowerCase() + '.jpg" style="width:120px;height:150px;object-fit:cover;object-position:top;border:2px solid #888;">' +
            '<div style="font-size:0.75em;color:#888;margin-top:4px;font-style:italic;">' + (_kn === 'Viktoria' ? 'Kaiserin' : 'Kaiser') + '</div>' +
            '<div style="font-size:0.8em;color:#888;font-weight:bold;">' + _kn + '</div>' +
            '</div>' +
            '<div style="text-align:center;">' +
            '<img src="' + _leaderImg + '" style="width:170px;height:210px;object-fit:cover;object-position:top;border:1px solid #8B7355;">' +
            '<div style="font-weight:bold;color:#4a3728;margin-top:0.4em;font-size:0.9em;">' + _q.dnvp_leader + '</div>' +
            '<div style="font-size:0.85em;color:#666;">' + (_isLehmann ? 'Parteiführerin' : 'Parteiführer') + '</div>' +
            '</div>' +
            '</div>';
        } else {
            _kaiserBlock =
            '<img src="' + _leaderImg + '" style="width:170px;height:210px;object-fit:cover;object-position:top;border:1px solid #8B7355;">' +
            '<div style="font-weight:bold;color:#4a3728;margin-top:0.4em;font-size:0.9em;">' + _q.dnvp_leader + '</div>' +
            '<div style="font-size:0.85em;color:#666;">' + (_isLehmann ? 'Parteiführerin' : 'Parteiführer') + '</div>';
        }
        var partyName = (Q.cvp_formed === 1)
            ? '<span style="font-family:Georgia,serif;font-size:1.3em;color:#4a3728;">Christliche Volkspartei (<b style="color:var(--dnvp-color);">CVP</b>)</span>'
            : '<span style="font-family:Georgia,serif;font-size:1.3em;color:#4a3728;">Deutschnationale Volkspartei (<b style="color:var(--dnvp-color);">DNVP</b>)</span>';

        dashboard.innerHTML =
        '<div style="text-align:center;padding-bottom:0.5em;margin-bottom:0.7em;border-bottom:1px solid #8B7355;letter-spacing:0.05em;">' +
            partyName +
        '</div>' +
            '<div style="text-align:center;">' +
            _kaiserBlock +
            (Q.congress_authcon > 0 ?
            '<div style="font-weight:bold;color:#4a3728;font-size:1em;margin:0.8em 0 0.2em 0;letter-spacing:0.05em;text-transform:uppercase;">Party Congress</div>' +
            svgArc +
            '<div style="display:flex;gap:0.6em;font-size:0.75em;flex-wrap:nowrap;margin-top:0.5em;justify-content:center;">' +
            '<span><span style="display:inline-block;width:10px;height:10px;background:#90D5FF;border-radius:50%;"></span> <b style="color:#90D5FF;">Volkskons.</b></span>' +
            '<span><span style="display:inline-block;width:10px;height:10px;background:#DAB1DA;border-radius:50%;"></span> <b style="color:#DAB1DA;">Chr. Sozial</b></span>' +
            '<span><span style="display:inline-block;width:10px;height:10px;background:#000435;border-radius:50%;"></span> <b style="color:#000435;">Auth. Kons.</b></span>' +
            '<span><span style="display:inline-block;width:10px;height:10px;background:#06402B;border-radius:50%;"></span> <b style="color:#06402B;">Völkisch</b></span>' +
            '</div>'
            : '') +
            '</div>';
    }
};

window._refreshNewsBadges = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var dotInt = document.getElementById('nb_unread_internal');
    var dotExt = document.getElementById('nb_unread_external');
    if (dotInt) dotInt.style.display = Q.internal_news_unread ? 'block' : 'none';
    if (dotExt) dotExt.style.display = Q.current_news_unread ? 'block' : 'none';
    var dotFab = document.getElementById('news-fab-dot');
    if (dotFab) {
        var extDiff = (Q.current_news  || '') !== '' && (Q.current_news  || '') !== (Q.current_news_seen  || '');
        var intDiff = (Q.internal_news || '') !== '' && (Q.internal_news || '') !== (Q.internal_news_seen || '');
        dotFab.style.display = (Q.internal_news_unread || Q.current_news_unread || extDiff || intDiff) ? 'block' : 'none';
    }
};

window._toggleNewsModal = function() {
    var isOpening = !document.body.classList.contains('news-open');
    document.body.classList.toggle('news-open');
    if (isOpening) {
        var Q = window.dendryUI.dendryEngine.state.qualities;
        Q.current_news_seen   = Q.current_news  || '';
        Q.internal_news_seen  = Q.internal_news || '';
        Q.current_news_unread = 0;
        Q.internal_news_unread = 0;
        if (window._refreshNewsBadges) window._refreshNewsBadges();
    }
};

window._toggleNewsPage = function(page) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var ext = document.getElementById('news_page_external');
    var int = document.getElementById('news_page_internal');
    if (!ext || !int) return;
    if (page === 1) {
        ext.style.display = 'none';
        int.style.display = 'block';
        Q.news_page = 'internal';
        Q.internal_news_seen = Q.internal_news || '';
        Q.internal_news_unread = 0;
    } else {
        ext.style.display = 'block';
        int.style.display = 'none';
        Q.news_page = 'external';
        Q.current_news_seen = Q.current_news || '';
        Q.current_news_unread = 0;
    }
    if (window._refreshNewsBadges) window._refreshNewsBadges();
};

window._stateActions = {
    prussia: {
        title: 'State Affairs',
        timer_var: 'prussia_action_timer',
        actions: [
            { flag: 'prussia_students_in_prog', label: 'Student Self-Government', description: 'The Prussian government is now restoring the rights of the independent <span style="color:#3E88B3;">right</span>-<span style="color:var(--dvp-color);">wing</span> student organizations to carry out autonomous political activity.', img: 'img/prusstudents.jpg', person: 'Friedrich von Winterfeld', person_party: 'DNVP', duration: 6 },
            { flag: 'prussia_civil_servants_in_prog', label: 'Restoring the Civil Service', description: 'The <b style="color:var(--dnvp-color);">DNVP</b> is restoring the positions of hundreds of civil servants, magistrates, and political officials who were forced to resign by the decade of <span style="color:#c00000;">Socialist</span> rule.', img: 'img/pruscivilservants.jpg', person: 'Friedrich von Winterfeld', person_party: 'DNVP', duration: 8 },
            { flag: 'prussia_dnvp_police_in_prog', label: 'Reforming the Prussian Police', description: 'The <b style="color:var(--dnvp-color);">DNVP</b> is enforcing the loyalty of the Prussian police to the state of law and to the national government also, through means of our own political appointments to high police positions.', img: 'img/prusdnvppolice.jpg', person: 'Wolfgang von Kries', person_party: 'DNVP', duration: 8 },
            { flag: 'prussia_church_in_prog', label: 'Ecclesiastical Treaties', description: 'The Prussian government is finalizing an ecclesiastical treaty with the Protestant regional churches, recognizing them as an inseparable pillar of Prussian society and guaranteeing state funding for their continued operation.', img: 'img/pruschurch.jpg', person: 'Friedrich von Winterfeld', person_party: 'DNVP', duration: 6 },
            { flag: 'prussia_flag_in_prog', label: 'Restoring the <span style="color:#000000;">Schwarz</span>-<span style="color:#888888;">Weiß</span>-<span style="color:var(--spd-color);">Rot</span>', description: 'The right of private businesses and homes to display the imperial <span style="color:#000000;">black</span>-<span style="color:#888888;">white</span>-<span style="color:var(--spd-color);">red</span> flag is being restored, an overdue cultural correction.', img: 'img/prusflag.jpg', person: 'Wolfgang von Kries', person_party: 'DNVP', duration: 4 },
            { flag: 'prussia_police_in_prog', label: '<span style="color:#000000;">Repub</span><span style="color:#DD0000;">lican</span><span style="color:#FFCC00;">ization</span> of the Police', description: 'The <b style="color:var(--spd-color);">SPD</b> is undergoing extensive efforts to replace both the leadership of the police and lower-ranked officers to strengthen its <b style="color:#000000;">Rep</b><b style="color:#DD0000;">ubl</b><b style="color:#FFCC00;">ican</b> sympathies and political loyalty.', img: 'img/pruspolice.jpg', person: 'Carl Severing', person_party: 'SPD', person_img: 'img/portraits/SeveringCarl.jpg', duration: 4 },
            { flag: 'prussia_secondary_schooling_in_prog', label: 'Secondary Schooling Funding', description: 'The <span style="color:#c00000;">Socialists</span> are funnelling hundreds of thousands of ℛ︁ℳ︁ on advancing secondary educational opportunities for workers, broadly increasing their own popularity at the <span class="state-tip-wrap">state\'s expense<span class="state-tip">This will cost the national government some budget!</span></span>.', img: 'img/prusschooling.jpg', person: 'Adolf Grimme', person_party: 'SPD', duration: 12 },
            { flag: 'prussia_swr_boycott_in_prog', label: 'Boycott of the <span style="color:#000000;">Schwarz</span>-<span style="color:#888888;">Weiß</span>-<span style="color:var(--spd-color);">Rot</span>', description: 'The <b style="color:var(--spd-color);">SPD</b> is boycotting Prussian hotels and places of business for displaying the <span style="color:#000000;">black</span>-<span style="color:#888888;">white</span>-<span style="color:var(--spd-color);">red</span> flag of the old Kaiserreich, which is intended to be a provocative move against the Hotel Managers\' Association.', img: 'img/prusswr.jpg', person: 'Otto Braun', person_party: 'SPD', duration: 6 },
            { flag: 'prussia_manor_districts_in_prog', label: 'Abolishing Manor Districts', description: 'The <span style="color:#c00000;">Socialists</span> are dismantling the old manor system, whereby agricultural workers receive part of their wages in housing, food, or land use, earning them support with the state\'s rural population and weakening the power of our <i>Junker</i> interests.', img: 'img/prusmanor.jpg', person: 'Albert Grzesinski', person_party: 'SPD', duration: 12 },
            { flag: 'prussia_democratization_in_prog', label: 'Democratization of State Admin', description: 'The <b style="color:var(--spd-color);">SPD</b> is systematically purging the old bureaucrats with <span style="color:#3E88B3;">nationalist</span> sympathies, replacing them with their loyalists through the introduction of political tests and forced retirements.', img: 'img/prusdem.jpg', person: 'Otto Braun', person_party: 'SPD', duration: 18 },
            { flag: 'prussia_concordat_in_prog', label: 'Signing the Prussian Concordat', description: 'As a conciliatory move between the <b style="color:var(--spd-color);">SPD</b> and the <b style="color:var(--z-color);">Zentrum</b> Party, the <b style="color:var(--spd-color);">SPD</b> is leading efforts to sign a state Concordat to enshrine the rights of the Catholic population in Prussia.', img: 'img/prusconcordat.jpg', person: 'Otto Braun', person_party: 'SPD', duration: 18 },
            { flag: 'prussia_sa_crackdown_in_prog', label: 'Crackdown on the <b style="color:#5A2E0C;">SA</b>', description: 'The Prussian government is in the process of banning the <b style="color:#5A2E0C;">SA</b> in the state, making it clear that the only tolerable paramilitaries there will be the <span style="color:#c00000;">Socialist</span> <i><span style="color:#000000;">Reichsbanner</span> <span style="color:#000000;">Schwarz</span>-<span style="color:var(--spd-color);">Rot</span>-<span style="color:#FFCC00;">Gold</span></i> and the <span style="color:var(--kpd-color);">Communist</span> <b style="color:#8B0000;">RFB</b>.', img: 'img/prussa.jpg', person: 'Carl Severing', person_party: 'SPD', duration: 9 }
        ]
    },
    bavaria: {
        title: 'State Affairs',
        timer_var: 'bavaria_action_timer',
        actions: [
            { flag: 'bavaria_saargrenzdarlehen_in_prog', label: 'Saar Border Loans', description: 'The <b style="color:#6FA8DC;">BVP</b> is spearheading efforts to extend emergency credit to the <i>Mittelstand</i> and farmers of the Bavarian Pfalz exclave to save them from financial ruin.', img: 'img/bavfarmers.jpg', person: 'Hans Hamm', person_party: 'BVP', duration: 9 },
            { flag: 'bavaria_rfb_crackdown_in_prog', label: 'Crackdown on the Munich Left', description: 'The Bavarian Interior Ministry, led by the <b style="color:#6FA8DC;">BVP</b>, is moving against the <span style="color:var(--kpd-color);">Communist</span> <b style="color:#8B0000;">RFB</b> and the <span style="color:#c00000;">Socialist</span> <i><span style="color:#000000;">Reichsbanner</span> <span style="color:#000000;">Schwarz</span>-<span style="color:var(--spd-color);">Rot</span>-<span style="color:#FFCC00;">Gold</span></i> in Munich, in order to restore order on the streets.', img: 'img/bavrfb.jpg', person: 'Franz Gürtner', person_party: 'BMP', duration: 12 },
            { flag: 'bavaria_stuermer_crackdown_in_prog', label: 'Suppressing <i>Der Stürmer</i>', description: 'Streicher\'s tabloid in Franconia is being targeted by the interior ministry for incitement and misinformation, reducing the influence of his media network in Upper Bavaria.', img: 'img/bavstuermer.jpg', person: 'Karl Stützel', person_party: 'BVP', duration: 9 },
            { flag: 'bavaria_bvp_federalism_in_prog', label: 'Federalism Pledge to the BVP', description: 'The DNVP is promising the <b style="color:#6FA8DC;">BVP</b> that Bavarian autonomy will be respected and unimpeded by Reich centralism, which is greatly facilitating cooperation between our parties here.', img: 'img/bavfederalism.jpg', person: 'Heinrich Held', person_party: 'BVP', duration: 18 },
            { flag: 'bavaria_stahlhelm_bayernwacht_in_prog', label: '<b style="color:#3E88B3;">Stahlhelm</b>–<b style="color:#69A2BE;">Bayernwacht</b> Cooperation', description: 'The Bavarian government is facilitating closer cooperation between the <b style="color:#69A2BE;">Bayernwacht</b> and the <b style="color:#3E88B3;">Stahlhelm</b>, in order to present a unified paramilitary front against the <b style="color:#5A2E0C;">SA</b>\'s encroachment into Bavaria and the leftist street fighters of Munich.', img: 'img/bavstahlhelm.jpg', person: 'Hans Ritter von Lex', person_party: 'BVP', duration: 12 },
            { flag: 'bavaria_restore_kingdom_in_prog', label: 'The Wittelsbach Question', description: '<span style="color:#888888;">Crown Prince Rupprecht</span> is being reinstated to his rightful place on the Bavarian throne, the last step in the restoration of the Kingdom of Bavaria.', img: 'img/bavrupprecht.jpg', person: 'Heinrich Held', person_party: 'BVP', duration: 24 }
        ]
    },
    wurttemburg: {
        title: 'State Affairs',
        timer_var: 'wurttemburg_action_timer',
        actions: [
            { flag: 'wurttemburg_winegrowers_in_prog', label: 'Winegrower and Farmer Subsidies', description: 'By providing subsidies to the local <b style="color:#4A7A2E;">WBWB</b>, we can improve relations with the farmers and lay the groundwork for a further national cooperation between the <b style="color:var(--dnvp-color);">DNVP</b> and agrarian interests.', img: 'img/wrtwine.jpg', person: 'Dehlinger', person_party: 'DNVP', duration: 12 },
            { flag: 'wurttemburg_concordat_in_prog', label: 'Concordat with Catholic Church', description: 'By formalizing a state concordat with the <span style="color:#B8860B;">Holy See</span>, we can secure the rights of the Catholic Church in Württemberg and deepen our alliance with the <b style="color:var(--z-color);">Zentrum</b>.', img: 'img/wrtconcordat.jpg', person: 'Bolz', person_party: 'Z', duration: 18 },
            { flag: 'wurttemburg_tagwacht_in_prog', label: 'Crack down on the <i>Tagewacht</i>', description: 'We have directed the police force to move against the <i>Schwäbische Tagwacht</i>, in order to silence one of Stuttgart\'s longest-running <b style="color:#000000;">rep</b><b style="color:#DD0000;">ubl</b><b style="color:#FFCC00;">ican</b> mouthpieces and undermine the <b style="color:var(--spd-color);">SPD</b>\'s hold on the city\'s political culture.', img: 'img/wrttagwacht.jpg', person: 'Bazille', person_party: 'DNVP', duration: 12 },
            { flag: 'wurttemburg_kpd_crackdown_in_prog', label: 'Local <b style="color:var(--kpd-color);">KPD</b> crackdown', description: 'By directing the Stuttgart police force against <b style="color:var(--kpd-color);">KPD</b> gatherings, we can suppress public Bolshevik commemorations on German soil and reassure the bourgeois public that order is being restored.', img: 'img/wrtkpd.jpg', person: 'Bazille', person_party: 'DNVP', duration: 9 },
            { flag: 'wurttemburg_christian_party_in_prog', label: '<span style="color:#000000;">Schwarz</span>-<span style="color:#3E88B3;">Blau</span> Experimentation', description: 'By coordinating closely with the <b style="color:var(--z-color);">Zentrum</b>, we can lay the foundations of a unified nondenominational Christian party, coined a <i><span style="color:#000000;">Schwarz</span>-<span style="color:#3E88B3;">Blau</span></i> project, which if scaled to the Reich, could become the unstoppable force of German conservatism.', img: 'img/wrtchristian.jpg', person: [{name: 'Bazille', party: 'DNVP'}, {name: 'Bolz', party: 'Z'}], duration: 24 }
        ]
    },
    meckschwer: {
        title: 'State Affairs',
        timer_var: 'meck_action_timer',
        actions: [
            { flag: 'schwerin_junker_estates_in_prog', label: 'Defending the Junker Estates', description: 'The <b style="color:var(--dnvp-color);">DNVP</b>, as the party defending <i>Junkertum</i>, will protect private property by fortifying the legal rights of the estate owners against unlawful land redistribution.', img: 'img/meckjunker.jpg', person: 'Joachim von Brandenstein', person_party: 'DNVP', duration: 18 },
            { flag: 'schwerin_rye_subsidies_in_prog', label: 'Rye Price Supports', description: 'Because the international grain market has seen a recent downturn, government intervention is necessary to stabilize rye prices with subsidies and prevent the estates\' collapse.', img: 'img/meckrye.jpg', person: 'Dietrich von Oertzen', person_party: 'DNVP', duration: 12 },
            { flag: 'schwerin_centralization_in_prog', label: 'Resisting Berlin', description: 'The <b style="color:var(--dnvp-color);">DNVP</b> together with the <b style="color:#C4A484;">DVFP</b> are defending Mecklenburg\'s local governance and fiscal autonomy against the encroachment of federal statutes targeting large landowners.', img: 'img/meckfederalism.jpg', person: 'Joachim von Brandenstein', person_party: 'DNVP', duration: 18 },
            { flag: 'schwerin_agricultural_unions_in_prog', label: 'Suppressing Agricultural Unions', description: 'The <span style="color:#c00000;">Socialists</span> are successfully organizing the estate laborers of Mecklenburg, much to the disgust of the estate owners. Organized agriculture poses a direct threat to our Junker backers, so we must oppose it.', img: 'img/meckunions.jpg', person: 'Dietrich von Oertzen', person_party: 'DNVP', duration: 15 },
            { flag: 'schwerin_grand_duke_in_prog', label: 'Restoring the Grand Duke', description: 'We\'ll restore the title of the former Grand Duke, <span style="color:#888888;">Friedrich Franz IV</span>, so that he may return to his ancestral estates in a ceremonial capacity with his family.', img: 'img/meckduke.jpg', person: 'Joachim von Brandenstein', person_party: 'DNVP', duration: 24 }
        ]
    },
    saxony: {
        title: 'State Affairs',
        timer_var: 'saxony_action_timer',
        actions: [
            { flag: 'saxony_parliamentary_chaos_in_prog', label: 'Parliamentary Chaos', description: 'The Saxon government is being paralyzed by an internal split in the <b style="color:var(--spd-color);">SPD</b>, whereby the majority of their members in the Landtag were expelled for cooperation with the <b style="color:var(--dvp-color);">DVP</b>.', img: 'img/chaos1.jpg' },
            { flag: 'saxony_trade_unions_in_prog', label: 'Restricting <span style="color:#c00000;">Socialist</span> Trade Unions', description: 'The Saxon government is targeting <span style="color:#c00000;">Socialist</span> trade unions by restricting their recruitment and influence in factories, and by reducing worker protections, particularly for striking.', img: 'img/saxunions.jpg', person: 'Wilhelm Bünger', person_party: 'DNVP', duration: 12 },
            { flag: 'saxony_volkshaus_in_prog', label: 'Shutting the Leipzig <i>Volkshaus</i>', description: 'The Saxon government is shutting down the <i>Volkshaus</i>, the trade union headquarters of the city of Leipzig.', img: 'img/saxvolkshaus.jpg', person: 'Wilhelm Bünger', person_party: 'DNVP', duration: 12 },
            { flag: 'saxony_reichsbanner_in_prog', label: 'Crackdown on the Saxon Left', description: 'The Saxon <span style="color:var(--spd-color);">Reichsbanner</span> and <b style="color:#8B0000;">RFB</b> are being suppressed through the legal and extrajudicial disruption of their events.', img: 'img/saxreichsbanner.jpg', person: 'Wilhelm Bünger', person_party: 'DNVP', duration: 9 }
        ]
    },
    thuringia: {
        title: 'State Affairs',
        timer_var: 'thuringia_action_timer',
        actions: [
            { flag: 'thuringia_kpd_prosecutions_in_prog', label: 'Prosecuting the 1923 <b style="color:var(--kpd-color);">KPD</b> Plot', description: 'The Thuringian government is continuing the prosecutions for the 1923 plot by the <b style="color:var(--kpd-color);">KPD</b> to overthrow the government of the <b><span style="color:#000000;">We</span><span style="color:#DD0000;">im</span><span style="color:#FFCC00;">ar</span></b> Republic, an effort that was concentrated in Thuringia.', img: 'img/thurkpd.jpg', person: 'Erwin Baum', person_party: function(Q) { return Q.rlb_integrated === 1 ? 'DNVP' : 'ThLB'; }, duration: 12 },
            { flag: 'thuringia_nsdap_gau_in_prog', label: 'Closing the <b style="color:#954B00;">NSDAP</b>-<i>Gau Thüringen</i>', description: 'Thuringian authorities are moving to close the <b style="color:#954B00;">NSDAP</b>-<i>Gau Thüringen</i>, significantly weakening the <b style="color:#954B00;">NSDAP</b>\'s activities in this state.', img: 'img/thurnsdap.jpg', person: 'Erwin Baum', person_party: function(Q) { return Q.rlb_integrated === 1 ? 'DNVP' : 'ThLB'; }, duration: 24 },
            { flag: 'thuringia_agriculture_in_prog', label: 'State-Backed Credit for Farmers', description: 'The state government is appeasing Thuringian agricultural interest groups by guaranteeing state-backed credit relief for indebted farmers.', img: 'img/thuragri.jpg', person: 'Erwin Baum', person_party: function(Q) { return Q.rlb_integrated === 1 ? 'DNVP' : 'ThLB'; }, duration: 12 },
            { flag: 'thuringia_bauhaus_in_prog', label: '<i>Bauhaus</i> Crackdown', description: 'The Thuringian government is cracking down on the <i>Bauhaus</i> movement in Weimar, cutting state funding and restricting its ability to display degenerate art in public spaces.', img: 'img/thurbauhaus.jpg', person: 'Erwin Baum', person_party: function(Q) { return Q.rlb_integrated === 1 ? 'DNVP' : 'ThLB'; }, duration: 9 }
        ]
    },
    baden: {
        title: 'State Affairs',
        timer_var: 'baden_action_timer',
        actions: [
            { flag: 'baden_concordat_in_prog', label: 'Concordat with the <span style="color:#B8860B;">Holy See</span>', description: 'The Baden government is negotiating a state concordat with the <span style="color:#B8860B;">Holy See</span>, guaranteeing the rights of the Catholic Church in Baden and cementing the alliance with the <b style="color:var(--z-color);">Centre Party</b>.', img: 'img/badconcordat.jpg', person: 'Gustav Trunk', person_party: 'Z', duration: 18 },
            { flag: 'baden_civil_servants_in_prog', label: 'Purging the Baden Civil Service', description: 'The Baden government is purging the office of senior civil servants to reduce the <span style="color:#000000;">rep</span><span style="color:#DD0000;">ubl</span><span style="color:#FFCC00;">ican</span> bias inside the bureaucracy and reverse years of <span style="color:#c00000;">Socialist</span> rule.', img: 'img/badcivilservants.jpg', person: 'Ernst-Christoph Brühler', person_party: 'DNVP', duration: 12 },
            { flag: 'baden_confessional_schools_in_prog', label: 'Restoring Confessional Schools', description: 'Confessional schooling is being restored in Baden by mobilizing Catholic parents councils and guaranteeing state funding for parochial schools as a measure of pushing back against the <b style="color:var(--spd-color);">SPD</b>\'s <i>Einheitsschule</i> reforms.', img: 'img/badschools.jpg', person: 'Gustav Trunk', person_party: 'Z', duration: 12 },
            { flag: 'baden_austerity_in_prog', label: 'Emergency Austerity Ordinance', description: 'An emergency ordinance is being issued in Baden to reduce wages, salaries, and pensions in the public service, in response to the economic crisis.', img: 'img/badausterity.jpg', person: 'Ernst-Christoph Brühler', person_party: 'DNVP', duration: 9 }
        ]
    }
};

window._partyColor = function(p) {
    var map = { 'SPD': (window._spdColorValue ? window._spdColorValue() : '#c00000'), 'KPD': (window._kpdColorValue ? window._kpdColorValue() : '#8B0000'), 'Z': (window._zColorValue ? window._zColorValue() : '#000000'), 'Zentrum': (window._zColorValue ? window._zColorValue() : '#000000'), 'BVP': '#6FA8DC', 'DDP': (window._ddpColorValue ? window._ddpColorValue() : '#FFCC00'), 'DVP': (window._dvpColorValue ? window._dvpColorValue() : '#D5AC27'), 'DNVP': (window._dnvpColorValue ? window._dnvpColorValue() : '#3E88B3'), 'BMP': '#4A6680', 'CVP': (window._dnvpColorValue ? window._dnvpColorValue() : '#3E88B3'), 'NSDAP': '#5A2E0C', 'NDNP': '#0e2345', 'KVP': '#90D5FF', 'ThLB': '#2D5A1B', 'Landbund': '#2D5A1B', 'I': '#888888', 'Independent': '#888888' };
    return map[p] || '#555';
};

window._presBoost = function(party, amt) {
    if (!party) return;
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var cls = ['workers','old_middle','new_middle','rural','unemployed','catholics'];
    for (var i=0;i<cls.length;i++){ var k = cls[i]+'_'+party; Q[k] = (Q[k]||0) + amt; }
};

window._renderStatePanel = function(stateKey) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (stateKey === 'prussia' && window._normalizePrussiaState) window._normalizePrussiaState();
    var def = window._stateActions[stateKey];
    if (!def) return;
    window._currentStateKey = stateKey;
    var newsboxFrame = document.getElementById('newsbox-frame');
    if (newsboxFrame) newsboxFrame.style.display = 'none';
    var rightTools = document.querySelector('.tools.right');
    if (!rightTools) return;
    rightTools.classList.add('state-mode');
    var statePanel = document.getElementById('state-action-panel');
    if (!statePanel) {
        statePanel = document.createElement('div');
        statePanel.id = 'state-action-panel';
        statePanel.style.cssText = 'padding: 1em; font-family: Georgia, serif; font-size: 0.95em; line-height: 1.6; background-color: rgba(255, 255, 255, 0.95); text-align: center;';
        rightTools.appendChild(statePanel);
    }
    statePanel.style.display = 'block';
    var active = null;
    if (def.actions && def.actions.length) {
        for (var i = 0; i < def.actions.length; i++) {
            if (Q[def.actions[i].flag] === 1) { active = def.actions[i]; break; }
        }
    }
    var t = Q[def.timer_var] || 0;
    var panelTitle = def.title;
    if (stateKey === 'bavaria' && Q.bavaria_kingdom_restored === 1) panelTitle = 'Royal Affairs';
    var html = '<div style="font-family: Georgia, serif; font-weight: bold; text-transform: uppercase; letter-spacing: 0.04em; font-size: 1.2em; color: #4a3728; margin: 0 0 0.15em 0;">' + panelTitle + '</div>';
    var isUntimed = active && (active.duration === undefined);
    if (active && (t > 0 || isUntimed)) {
        html += '<div style="text-align:center; margin: 0; font-size: 1.05em;">' + active.label + '</div>';
        if (active.person) {
            var personHtml;
            if (Array.isArray(active.person)) {
                personHtml = active.person.map(function(p) {
                    var c = window._partyColor(p.party);
                    return p.name + ' (<b style="color:' + c + ';">' + p.party + '</b>)';
                }).join(' & ');
            } else {
                var pp = (typeof active.person_party === 'function') ? active.person_party(Q) : active.person_party;
                var pColor = window._partyColor(pp);
                personHtml = active.person + ' (<b style="color:' + pColor + ';">' + pp + '</b>)';
            }
            html += '<div style="text-align:center; margin: 0.1em 0 0 0; font-size: 0.9em;">' + personHtml + '</div>';
        }
        if (!isUntimed) {
            html += '<div style="text-align:center; margin: 0 0 0.3em 0; font-style: italic; color: #000; font-size: 0.85em;">' + t + ' month' + (t === 1 ? '' : 's') + '</div>';
        }
        html += '<div style="margin: 0.3em 0; text-align: center;"><img src="' + active.img + '" style="width: 100%; max-width: 270px; border: 3px solid #000;" onerror="this.style.display=\'none\'"></div>';
        html += '<div style="text-align:center; margin: 0.4em 0; font-size: 0.95em; color: #333;">' + active.description + '</div>';
    } else {
        html += '<div style="text-align:center; margin: 0.6em 0; font-size: 0.95em; color: #333;">Currently, no initiative is being undertaken in this state.</div>';
    }
    statePanel.innerHTML = html;
};

window._restoreNewsbox = function() {
    var newsboxFrame = document.getElementById('newsbox-frame');
    if (newsboxFrame) newsboxFrame.style.display = '';
    var rightTools = document.querySelector('.tools.right');
    if (rightTools) rightTools.classList.remove('state-mode');
    var statePanel = document.getElementById('state-action-panel');
    if (statePanel) statePanel.style.display = 'none';
};

window._stateActionRegistry = {
    prussia: {
        timer_var: 'prussia_action_timer', seat_pct_var: 'prus_seat_pct_dnvp',
        actions: {
            'students':       { flag: 'prussia_students_in_prog',       done: 'prussia_students_done', effort: 0.6, bonuses: function(Q) { Q.volkisch_strength = (Q.volkisch_strength || 0) + 3; Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) + 2; Q.ddp_relation = (Q.ddp_relation || 0) - 4; Q.nationalism = (Q.nationalism || 0) + 3; Q.pro_republic = (Q.pro_republic || 0) - 2; Q.unemployed_dnvp = (Q.unemployed_dnvp || 0) + 1; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) + 1; Q.rural_dnvp = (Q.rural_dnvp || 0) + 1; window._blocBump(2,4); window._blocBump(3,-3); window._blocBump(4,16); } },
            'civil_servants': { flag: 'prussia_civil_servants_in_prog', effort: 1.1, bonuses: function(Q) {
                if ((Q.prussia_civil_servants_count || 0) === 0) {
                    var f = 0.6 * (Q.prussia_democratization_count || 0);
                    Q.new_middle_spd  = (Q.new_middle_spd  || 0) - 2 * f;
                    Q.workers_spd     = (Q.workers_spd     || 0) - 1 * f;
                    Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) + 2 * f;
                    Q.new_middle_dvp  = (Q.new_middle_dvp  || 0) + 1 * f;
                    Q.pro_republic    = (Q.pro_republic    || 0) - 4 * f;
                    Q.nationalism     = (Q.nationalism     || 0) + 4 * f;
                    Q.suspicion       = (Q.suspicion       || 0) - 4 * f;
                } else {
                    Q.pro_republic = (Q.pro_republic || 0) - 3;
                    Q.nationalism  = (Q.nationalism  || 0) + 3;
                    Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) + 2;
                    Q.new_middle_spd  = (Q.new_middle_spd  || 0) - 2;
                    Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 3;
                    Q.new_middle_dvp = (Q.new_middle_dvp || 0) + 1;
                    Q.workers_spd = (Q.workers_spd || 0) - 1;
                }
                Q.prussia_civil_servants_count = (Q.prussia_civil_servants_count || 0) + 1;
                window._blocBump(1,4); window._blocBump(2,6); window._blocBump(3,-5); window._blocBump(4,20);
            } },
            'police':         { flag: 'prussia_dnvp_police_in_prog', effort: 1.0, bonuses: function(Q) {
                if ((Q.prussia_dnvp_police_count || 0) === 0) {
                    var f = 0.6 * (Q.prussia_spd_police_count || 0);
                    Q.nationalism      = (Q.nationalism      || 0) + 4 * f;
                    Q.new_middle_spd   = (Q.new_middle_spd   || 0) - 2 * f;
                    Q.new_middle_dnvp  = (Q.new_middle_dnvp  || 0) + 1 * f;
                    Q.new_middle_dvp   = (Q.new_middle_dvp   || 0) + 1 * f;
                    Q.pro_republic     = (Q.pro_republic     || 0) - 4 * f;
                    Q.workers_spd      = (Q.workers_spd      || 0) - 1 * f;
                    Q.spd_left_strength = (Q.spd_left_strength || 0) + 1 * f;
                } else {
                    Q.pro_republic = (Q.pro_republic || 0) - 3;
                    Q.nationalism  = (Q.nationalism  || 0) + 3;
                    Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) + 2;
                    Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) + 1;
                    Q.new_middle_spd  = (Q.new_middle_spd  || 0) - 1;
                    Q.new_middle_dvp  = (Q.new_middle_dvp  || 0) + 1;
                    Q.workers_spd = (Q.workers_spd || 0) - 1;
                    Q.spd_left_strength = (Q.spd_left_strength || 0) + 1;
                    Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 3;
                }
                Q.prussia_dnvp_police_count = (Q.prussia_dnvp_police_count || 0) + 1;
                window._blocBump(1,6); window._blocBump(2,10); window._blocBump(3,-10); window._blocBump(4,10);
            } },
            'church':         { flag: 'prussia_church_in_prog',         done: 'prussia_church_done', effort: 0.8, bonuses: function(Q) { Q.catholics_dnvp = (Q.catholics_dnvp || 0) - 3; Q.rural_dnvp = (Q.rural_dnvp || 0) + 4; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) + 3; Q.z_relation = (Q.z_relation || 0) - 8; Q.christian_social_strength = (Q.christian_social_strength || 0) + 5; Q.nationalism = (Q.nationalism || 0) + 2; Q.pro_republic = (Q.pro_republic || 0) - 1; window._blocBump(1,16); window._blocBump(3,-2); window._blocBump(4,10); } },
            'flag':           { flag: 'prussia_flag_in_prog',           done: 'prussia_flag_done', effort: 0.2, bonuses: function(Q) { Q.volkisch_strength = (Q.volkisch_strength || 0) + 3; Q.nationalism = (Q.nationalism || 0) + 4; Q.pro_republic = (Q.pro_republic || 0) - 3; Q.spd_relation = (Q.spd_relation || 0) - 4; Q.ddp_relation = (Q.ddp_relation || 0) - 12; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) + 3; Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) - 1; window._blocBump(1,10); window._blocBump(2,6); window._blocBump(3,-5); window._blocBump(4,6); } }
        },
        extra_clear: ['prussia_police_in_prog', 'prussia_secondary_schooling_in_prog', 'prussia_swr_boycott_in_prog', 'prussia_manor_districts_in_prog', 'prussia_democratization_in_prog', 'prussia_concordat_in_prog', 'prussia_sa_crackdown_in_prog']
    },
    bavaria: {
        timer_var: 'bavaria_action_timer', seat_pct_var: 'bav_seat_pct_dnvp',
        actions: {
            'rfb_crackdown':         { flag: 'bavaria_rfb_crackdown_in_prog',         done: 'bavaria_rfb_crackdown_done',         effort: 0.7, bonuses: function(Q) { Q.workers_kpd = (Q.workers_kpd || 0) - 1; Q.unemployed_kpd = (Q.unemployed_kpd || 0) - 1; Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 2; Q.workers_spd = (Q.workers_spd || 0) - 1; window._blocBump(1,6); window._blocBump(2,10); window._blocBump(3,-3); window._blocBump(4,10); } },
            'stuermer_crackdown':    { flag: 'bavaria_stuermer_crackdown_in_prog',    done: 'bavaria_stuermer_crackdown_done',    effort: 0.7, bonuses: function(Q) { Q.rural_nsdap = (Q.rural_nsdap || 0) - 1; Q.old_middle_nsdap = (Q.old_middle_nsdap || 0) - 1; Q.new_middle_nsdap = (Q.new_middle_nsdap || 0) - 1; window._blocBump(1,-3); window._blocBump(2,4); window._blocBump(4,4); } },
            'bvp_federalism':        { flag: 'bavaria_bvp_federalism_in_prog',        done: 'bavaria_bvp_federalism_done',        effort: 0.5, bonuses: function(Q) { Q.catholics_dnvp = (Q.catholics_dnvp || 0) + 2; Q.z_relation = (Q.z_relation || 0) + 4; Q.volkisch_dissent = (Q.volkisch_dissent || 0) + 2; window._blocBump(1,6); window._blocBump(4,10); } },
            'stahlhelm_bayernwacht': { flag: 'bavaria_stahlhelm_bayernwacht_in_prog', done: 'bavaria_stahlhelm_bayernwacht_done', effort: 0.9, bonuses: function(Q) { Q.stahlhelm_integration = (Q.stahlhelm_integration || 0) + 7; Q.suspicion = (Q.suspicion || 0) + 1; Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 3; Q.z_relation = (Q.z_relation || 0) + 4; window._blocBump(1,10); window._blocBump(2,6); window._blocBump(3,-5); window._blocBump(4,6); } },
            'restore_kingdom':       { flag: 'bavaria_restore_kingdom_in_prog',       done: 'bavaria_restore_kingdom_done',       fixed_duration: 4, bonuses: function(Q) { Q.nationalism = (Q.nationalism || 0) + 3; Q.pro_republic = (Q.pro_republic || 0) - 4; Q.suspicion = (Q.suspicion || 0) + 3; Q.workers_dnvp = (Q.workers_dnvp || 0) + 1; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) + 2; window._blocBump(1,20); window._blocBump(2,10); window._blocBump(3,-10); window._blocBump(4,6); }, on_complete: function(Q) { Q.bavaria_kingdom_restored = 1; } }
        },
        extra_clear: ['bavaria_saargrenzdarlehen_in_prog']
    },
    saxony: {
        timer_var: 'saxony_action_timer', seat_pct_var: 'sax_seats_pct_dnvp',
        actions: {
            'trade_unions': { flag: 'saxony_trade_unions_in_prog', done: 'saxony_trade_unions_done', effort: 1.1, bonuses: function(Q) { Q.workers_dnvp = (Q.workers_dnvp || 0) - 1; Q.workers_spd = (Q.workers_spd || 0) - 3; Q.workers_kpd = (Q.workers_kpd || 0) + 2; Q.industry_support = (Q.industry_support || 0) + 8; Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 3; window._blocBump(1,6); window._blocBump(2,20); window._blocBump(3,-10); window._blocBump(4,4); } },
            'volkshaus':    { flag: 'saxony_volkshaus_in_prog',    done: 'saxony_volkshaus_done',    effort: 0.5, bonuses: function(Q) { Q.industry_support = (Q.industry_support || 0) + 5; Q.workers_spd = (Q.workers_spd || 0) - 2; Q.unemployed_kpd = (Q.unemployed_kpd || 0) + 1; Q.volkisch_strength = (Q.volkisch_strength || 0) + 2; Q.unemployed_spd = (Q.unemployed_spd || 0) - 2; window._blocBump(2,10); window._blocBump(3,-8); } },
            'reichsbanner': { flag: 'saxony_reichsbanner_in_prog', done: 'saxony_reichsbanner_done', effort: 0.8, bonuses: function(Q) { Q.pro_republic = (Q.pro_republic || 0) - 3; Q.volkisch_strength = (Q.volkisch_strength || 0) + 3; Q.suspicion = (Q.suspicion || 0) + 2; Q.spd_left_strength = (Q.spd_left_strength || 0) + 3; Q.workers_kpd = (Q.workers_kpd || 0) + 1; Q.nationalism = (Q.nationalism || 0) + 2; Q.workers_spd = (Q.workers_spd || 0) - 2; window._blocBump(1,4); window._blocBump(2,6); window._blocBump(3,-5); window._blocBump(4,4); } }
        },
        extra_clear: ['saxony_parliamentary_chaos_in_prog']
    },
    thuringia: {
        timer_var: 'thuringia_action_timer', seat_pct_var: 'thur_seats_pct_dnvp',
        actions: {
            'kpd_prosecutions': { flag: 'thuringia_kpd_prosecutions_in_prog', done: 'thuringia_kpd_prosecutions_done', effort: 0.8, bonuses: function(Q) { Q.workers_kpd = (Q.workers_kpd || 0) - 2; Q.unemployed_kpd = (Q.unemployed_kpd || 0) - 1; Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 3; Q.volkisch_strength = (Q.volkisch_strength || 0) + 2; Q.pro_republic = (Q.pro_republic || 0) - 1; Q.workers_spd = (Q.workers_spd || 0) + 2; window._blocBump(1,6); window._blocBump(2,10); window._blocBump(3,-3); window._blocBump(4,10); } },
            'nsdap_gau':        { flag: 'thuringia_nsdap_gau_in_prog',        done: 'thuringia_nsdap_gau_done',        effort: 0.6, bonuses: function(Q) { Q.rural_nsdap = (Q.rural_nsdap || 0) - 1; Q.old_middle_nsdap = (Q.old_middle_nsdap || 0) - 1; Q.new_middle_nsdap = (Q.new_middle_nsdap || 0) - 1; Q.volkisch_strength = (Q.volkisch_strength || 0) - 3; Q.christian_social_strength = (Q.christian_social_strength || 0) + 2; Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 2; Q.dvp_relation = (Q.dvp_relation || 0) + 2; window._blocBump(1,-2); window._blocBump(2,4); window._blocBump(4,4); } },
            'agriculture':      { flag: 'thuringia_agriculture_in_prog',      done: 'thuringia_agriculture_done',      effort: 0.7, bonuses: function(Q) { Q.rural_dnvp = (Q.rural_dnvp || 0) + 4; Q.rlb_relation = (Q.rlb_relation || 0) + 3; Q.agri_policy_progress = (Q.agri_policy_progress || 0) + 1; window._blocBump(1,20); window._blocBump(4,4); } },
            'bauhaus':          { flag: 'thuringia_bauhaus_in_prog',          done: 'thuringia_bauhaus_done',          effort: 0.4, bonuses: function(Q) { Q.christian_social_strength = (Q.christian_social_strength || 0) + 3; Q.volkisch_strength = (Q.volkisch_strength || 0) + 3; Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) + 2; Q.ddp_relation = (Q.ddp_relation || 0) - 5; Q.pro_republic = (Q.pro_republic || 0) - 2; window._blocBump(1,4); window._blocBump(3,-3); window._blocBump(4,6); } }
        }
    },
    wurttemburg: {
        timer_var: 'wurttemburg_action_timer', seat_pct_var: 'wrt_seats_pct_dnvp',
        actions: {
            'winegrowers':     { flag: 'wurttemburg_winegrowers_in_prog',     done: 'wurttemburg_winegrowers_done',     effort: 0.5, bonuses: function(Q) { Q.rural_dnvp = (Q.rural_dnvp || 0) + 3; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) + 1; Q.agri_policy_progress = (Q.agri_policy_progress || 0) + 1; window._blocBump(1,16); window._blocBump(4,4); } },
            'concordat':       { flag: 'wurttemburg_concordat_in_prog',       done: 'wurttemburg_concordat_done',       effort: 0.8, bonuses: function(Q) { Q.z_relation = (Q.z_relation || 0) + 6; Q.catholics_dnvp = (Q.catholics_dnvp || 0) + 2; Q.bvp_relation = (Q.bvp_relation || 0) + 2; Q.christian_social_strength = (Q.christian_social_strength || 0) + 2; Q.volkisch_dissent = (Q.volkisch_dissent || 0) + 3; window._blocBump(1,6); window._blocBump(4,10); }, on_complete: function(Q) { Q.concordat_done_dnvp = 1; } },
            'tagwacht':        { flag: 'wurttemburg_tagwacht_in_prog',        done: 'wurttemburg_tagwacht_done',        effort: 0.4, bonuses: function(Q) { Q.workers_spd = (Q.workers_spd || 0) - 1; Q.pro_republic = (Q.pro_republic || 0) - 3; Q.volkisch_strength = (Q.volkisch_strength || 0) + 2; Q.ddp_relation = (Q.ddp_relation || 0) - 3; Q.workers_ddp = (Q.workers_ddp || 0) - 1; window._blocBump(1,4); window._blocBump(2,6); window._blocBump(3,-5); window._blocBump(4,4); } },
            'kpd_crackdown':   { flag: 'wurttemburg_kpd_crackdown_in_prog',   done: 'wurttemburg_kpd_crackdown_done',   effort: 0.6, bonuses: function(Q) { Q.workers_kpd = (Q.workers_kpd || 0) - 2; Q.unemployed_kpd = (Q.unemployed_kpd || 0) - 1; Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 2; Q.christian_social_strength = (Q.christian_social_strength || 0) + 2; window._blocBump(1,6); window._blocBump(2,10); window._blocBump(3,-3); window._blocBump(4,10); } },
            'christian_party': { flag: 'wurttemburg_christian_party_in_prog', done: 'wurttemburg_christian_party_done', effort: 1.0, bonuses: function(Q) { Q.z_relation = (Q.z_relation || 0) + 8; Q.christian_social_strength = (Q.christian_social_strength || 0) + 5; Q.catholics_dnvp = (Q.catholics_dnvp || 0) + 1; Q.volkisch_dissent = (Q.volkisch_dissent || 0) + 4; Q.bvp_relation = (Q.bvp_relation || 0) + 2; window._blocBump(1,10); window._blocBump(4,16); } }
        }
    },
    baden: {
        timer_var: 'baden_action_timer', seat_pct_var: 'bad_seats_pct_dnvp',
        actions: {
            'concordat':            { flag: 'baden_concordat_in_prog',            done: 'baden_concordat_done',            effort: 0.8, bonuses: function(Q) { Q.z_relation = (Q.z_relation || 0) + 5; Q.catholics_dnvp = (Q.catholics_dnvp || 0) + 3; Q.christian_social_strength = (Q.christian_social_strength || 0) + 3; Q.volkisch_dissent = (Q.volkisch_dissent || 0) + 2; Q.bvp_relation = (Q.bvp_relation || 0) + 1; window._blocBump(1,6); window._blocBump(4,10); }, on_complete: function(Q) { Q.concordat_done_dnvp = 1; } },
            'civil_servants':       { flag: 'baden_civil_servants_in_prog',       done: 'baden_civil_servants_done',       effort: 1.1, bonuses: function(Q) { Q.pro_republic = (Q.pro_republic || 0) - 3; Q.nationalism = (Q.nationalism || 0) + 3; Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) + 2; Q.new_middle_spd = (Q.new_middle_spd || 0) - 1; Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 3; window._blocBump(1,4); window._blocBump(2,6); window._blocBump(3,-5); window._blocBump(4,20); } },
            'confessional_schools': { flag: 'baden_confessional_schools_in_prog', done: 'baden_confessional_schools_done', effort: 0.9, bonuses: function(Q) { Q.christian_social_strength = (Q.christian_social_strength || 0) + 4; Q.catholics_dnvp = (Q.catholics_dnvp || 0) + 3; Q.z_relation = (Q.z_relation || 0) + 3; Q.ddp_relation = (Q.ddp_relation || 0) - 3; Q.workers_z = (Q.workers_z || 0) + 1; window._blocBump(1,6); window._blocBump(4,10); } },
            'austerity':            { flag: 'baden_austerity_in_prog',            done: 'baden_austerity_done',            effort: 0.7, bonuses: function(Q) { Q.budget = (Q.budget || 0) + 1; Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) - 3; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) - 2; Q.rural_dnvp = (Q.rural_dnvp || 0) - 1; Q.workers_spd = (Q.workers_spd || 0) + 2; Q.unemployed_kpd = (Q.unemployed_kpd || 0) + 2; Q.industry_support = (Q.industry_support || 0) + 5; window._blocBump(1,-3); window._blocBump(2,16); window._blocBump(3,-5); window._blocBump(4,-10); } }
        }
    },
    meck: {
        timer_var: 'meck_action_timer', seat_pct_var: 'meck_seats_pct_dnvp',
        actions: {
            'junker_estates':      { flag: 'schwerin_junker_estates_in_prog',      done: 'schwerin_junker_estates_done',      effort: 0.6, bonuses: function(Q) { Q.industry_support = (Q.industry_support || 0) + 5; Q.rural_dnvp = (Q.rural_dnvp || 0) - 2; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) + 2; Q.authoritarian_conservative_strength = (Q.authoritarian_conservative_strength || 0) + 3; Q.rlb_relation = (Q.rlb_relation || 0) + 3; window._blocBump(1,20); window._blocBump(2,6); window._blocBump(3,-3); window._blocBump(4,4); } },
            'rye_subsidies':       { flag: 'schwerin_rye_subsidies_in_prog',       done: 'schwerin_rye_subsidies_done',       effort: 0.5, bonuses: function(Q) { Q.rural_dnvp = (Q.rural_dnvp || 0) + 4; Q.rlb_relation = (Q.rlb_relation || 0) + 2; window._blocBump(1,16); } },
            'centralization':      { flag: 'schwerin_centralization_in_prog',      done: 'schwerin_centralization_done',      effort: 0.4, bonuses: function(Q) { Q.z_relation = (Q.z_relation || 0) + 3; Q.bvp_relation = (Q.bvp_relation || 0) + 2; Q.volkskonservativ_dissent = (Q.volkskonservativ_dissent || 0) - 3; Q.christian_social_dissent = (Q.christian_social_dissent || 0) - 2; Q.authoritarian_conservative_dissent = (Q.authoritarian_conservative_dissent || 0) - 2; Q.industry_support = (Q.industry_support || 0) + 6; Q.fundraising_support = (Q.fundraising_support || 0) + 6; window._blocBump(1,4); window._blocBump(2,16); window._blocBump(4,6); } },
            'agricultural_unions': { flag: 'schwerin_agricultural_unions_in_prog', done: 'schwerin_agricultural_unions_done', effort: 0.6, bonuses: function(Q) { Q.rural_spd = (Q.rural_spd || 0) - 2; Q.rural_dnvp = (Q.rural_dnvp || 0) + 1; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) + 2; Q.workers_dnvp = (Q.workers_dnvp || 0) - 1; Q.rlb_relation = (Q.rlb_relation || 0) + 3; Q.industry_support = (Q.industry_support || 0) + 2; window._blocBump(1,10); window._blocBump(2,6); window._blocBump(3,-3); } },
            'grand_duke':          { flag: 'schwerin_grand_duke_in_prog',          done: 'schwerin_grand_duke_done',          effort: 0.3, bonuses: function(Q) { Q.volkisch_strength = (Q.volkisch_strength || 0) + 3; Q.rural_dnvp = (Q.rural_dnvp || 0) + 2; Q.pro_republic = (Q.pro_republic || 0) - 2; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) + 1; Q.nationalism = (Q.nationalism || 0) + 2; window._blocBump(1,16); window._blocBump(2,6); window._blocBump(3,-5); window._blocBump(4,4); }, on_complete: function(Q) { Q.meck_grand_duke_returned = 1; } }
        }
    }
};

window._startStateAction = function(stateKey, actionName) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var data = window._stateActionRegistry[stateKey];
    if (!data) return;
    var action = data.actions[actionName];
    if (!action) return;
    Object.keys(data.actions).forEach(function(k) { Q[data.actions[k].flag] = 0; });
    if (data.extra_clear) data.extra_clear.forEach(function(f) { Q[f] = 0; });
    Q[action.flag] = 1;
    if (action.done) Q[action.done] = 1;
    if (action.bonuses) action.bonuses(Q);
    if (typeof action.fixed_duration === 'number') {
        Q[data.timer_var] = action.fixed_duration;
    } else {
        var base = Math.max(6, 24 - Math.floor((Q[data.seat_pct_var] || 0) * 0.4));
        Q[data.timer_var] = Math.max(2, Math.min(30, Math.round(base * (action.effort || 1.0))));
    }
};

window._lambachImg = function(normalSrc) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var t = (Q.year || 0) * 12 + (Q.month || 0);
    if (t < 1928 * 12 + 6) return 'img/youngerlambach.png';
    if (t > 1930 * 12 + 6) return 'img/oldlambach.png';
    return normalSrc;
};

(function(){
    function _lamSwap(){
        if (!window._lambachImg) return;
        var want = window._lambachImg('img/portraits/lambach.jpg');
        var imgs = document.querySelectorAll('img[src$="portraits/lambach.jpg"]');
        for (var i = 0; i < imgs.length; i++) { if (imgs[i].getAttribute('src') !== want) imgs[i].src = want; }
    }
    function _lamInit(){ try { _lamSwap(); new MutationObserver(_lamSwap).observe(document.body, { childList: true, subtree: true }); } catch (e) {} }
    if (document.body) _lamInit(); else document.addEventListener('DOMContentLoaded', _lamInit);
})();

window._updateChancellorImage = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var map = window._chancellorPortraits = {
        'Luther':     'img/luther1.png',
        'Marx':       'img/marx.jpg',
        'Müller':     'img/portraits/MüllerHermann.jpg',
        'Brüning':    'img/bruningchancport.png',
        'Scholz':     'img/portraits/ernst_scholz.jpg',
        'Wildau':     'img/portraits/wildauport.png',
        'Goerdeler':  'img/portraits/goerdeler.jpg',
        'Dingeldey':  'img/portraits/dingeldey.jpg',
        'Kardorff':   'img/portraits/kardorff.jpg',
        'Stegerwald': 'img/portraits/stegerwald.jpg',
        'Wirth':      'img/portraits/wirth.jpg',
        'Joos':       'img/portraits/joos.jpg',
        'Kaas':       'img/portraits/kaas.jpg',
        'Papen':      'img/portraits/PapenFranz.jpg',
        'Schleicher': 'img/portraits/schleicher.jpg',
        'Hitler':     'img/portraits/hitler2.jpg',
        'Hugenberg':  'img/portraits/AlfredHugenberg.jpg',
        'Hergt':      'img/portraits/OskarHergt.jpg',
        'Westarp':    'img/portraits/westarp.png',
        'Lambach':    'img/portraits/LambachWalther.jpg',
        'Treviranus': 'img/portraits/trevy1.png',
        'Wels':       'img/portraits/WelsOtto.jpg',
        'Wels-Müller':'img/portraits/WelsOtto.jpg',
        'Breitscheid':'img/portraits/BreitscheidRudolf.jpg',
        'Jarres':     'img/portraits/jarres.jpg',
        'Dietrich':   'img/dietrichport.png',
        'Koch-Weser': 'img/kochweserport.png',
        'Bäumer':     'img/baumerport.png',
        'Erklenz':    'img/erklenzport.png',
        'Curtius':    'img/curtiusport.png',
        'Heuss':      'img/heussport.png',
        'Frick':      'img/portraits/frick.jpg',
        'Göring':     'img/portraits/goring.jpg',
        'Goering':    'img/portraits/goring.jpg',
        'Röhm':       'img/portraits/rohm.jpg',
        'Roehm':      'img/portraits/rohm.jpg',
        'Strasser':   'img/portraits/strasser.jpg'
    };
    var c = Q.chancellor || '', csn = String(c).split(' ').pop();
    Q.chancellor_image = (csn === 'Lambach') ? window._lambachImg('img/portraits/LambachWalther.jpg') : (map[c] || map[csn] || '');
};

window._tamperHashExclude = {
    'integrity_check': 1,
    'current_news': 1,
    'internal_news': 1,
    'post_event_count': 1,
    'last_auto_ym': 1
};

window._computeStateHash = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var excl = window._tamperHashExclude;
    var keys = [];
    for (var k in Q) {
        if (k.charAt(0) === '_') continue;
        if (excl[k]) continue;
        if (/_label$|_color$|_display$|_dlt$/.test(k)) continue;
        keys.push(k);
    }
    keys.sort();
    var str = '';
    for (var i = 0; i < keys.length; i++) {
        var v = Q[keys[i]];
        if (typeof v === 'number') v = Math.round(v * 1000) / 1000;
        str += keys[i] + '=' + (v == null ? '' : String(v)) + '|';
    }
    var h = 5381;
    for (var j = 0; j < str.length; j++) {
        h = ((h << 5) + h + str.charCodeAt(j)) | 0;
    }
    return h;
};

window._fireTamperAchievement = function() {
    if (localStorage.getItem('dnvp_achieve_gezinkte_karten') === '1') return;
    if (window.showAchievementNotification) {
        window.showAchievementNotification(
            'Mit gezinkten Karten',
            "You edited the save file, didn't you?",
            'img/ach_gezinkten.jpg',
            'gezinkte_karten'
        );
    }
};

window._checkLoadedIntegrity = function() {
    try {
        var Q = window.dendryUI.dendryEngine.state.qualities;
        if (Q.integrity_check == null) return;
        if (Q.integrity_check === window._computeStateHash()) return;
        window._fireTamperAchievement();
    } catch (e) {}
};

(function installSaveLoadHooks() {
    if (!window.dendryUI || typeof window.dendryUI.saveSlot !== 'function' ||
        !window.dendryUI.dendryEngine ||
        typeof window.dendryUI.dendryEngine.setState !== 'function') {
        setTimeout(installSaveLoadHooks, 200);
        return;
    }
    if (window._tamperHooksInstalled) return;
    window._tamperHooksInstalled = true;

    var origSave = window.dendryUI.saveSlot;
    var engine = window.dendryUI.dendryEngine;
    var origSetState = engine.setState;

    window.dendryUI.saveSlot = function() {
        try {
            var Q = window.dendryUI.dendryEngine.state.qualities;
            if (Q) Q.integrity_check = window._computeStateHash();
        } catch (e) {}
        return origSave.apply(this, arguments);
    };

    engine.setState = function() {
        var r = origSetState.apply(this, arguments);
        try { window._checkLoadedIntegrity(); } catch (e) {}
        return r;
    };
})();

window._clearCoalitionAction = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    Q.current_coalition_action = '';
    Q.current_coalition_action_party = '';
    Q.current_coalition_action_ministry = '';
    Q.current_coalition_action_image = '';
    Q.current_coalition_action_description = '';
    Q.current_coalition_action_timeout = 0;
};

window._applyCoalitionEffects = function(allowed) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (!allowed) {
        var party = Q.current_coalition_action_party;
        var relMap = {
            'DVP':   'dvp_relation',
            'Z':     'z_relation',
            'CVP':   'z_relation',
            'DDP':   'ddp_relation',
            'BVP':   'bvp_relation',
            'SPD':   'spd_relation',
            'NSDAP': 'nsdap_relation',
            'KPD':   'kpd_relation'
        };
        var key = relMap[party];
        if (key) Q[key] = (Q[key] || 0) - 5;
        Q.coalition_enthusiasm = Math.max(0, (Q.coalition_enthusiasm || 0) - 10);
        return;
    }
    var act = Q.current_coalition_action;
    switch (act) {
        case 'Privatizing state companies':
            Q.industry_support = (Q.industry_support || 0) + 5;
            Q.bloc_industrialist_meter = Math.min(100, (Q.bloc_industrialist_meter || 0) + 3);
            window._blocBump(3, -3);
            Q.workers_dnvp = (Q.workers_dnvp || 0) - 1;
            Q.workers_spd = (Q.workers_spd || 0) + 2;
            break;
        case 'Cutting upper-bracket taxes':
            Q.industry_support = (Q.industry_support || 0) + 5;
            Q.fundraising_support = (Q.fundraising_support || 0) + 3;
            Q.upper_tax_rates = (Q.upper_tax_rates || 0) - 1;
            Q.capital_strike_progress = Math.max(0, (Q.capital_strike_progress || 0) - 1);
            Q.bloc_industrialist_meter = Math.min(100, (Q.bloc_industrialist_meter || 0) + 4);
            Q.bloc_mittelstand_meter = Math.min(100, (Q.bloc_mittelstand_meter || 0) + 1);
            Q.new_middle_dvp = (Q.new_middle_dvp || 0) + 2;
            Q.workers_spd = (Q.workers_spd || 0) + 2;
            break;
        case 'Supporting employers':
            Q.industry_support = (Q.industry_support || 0) + 4;
            Q.bloc_industrialist_meter = Math.min(100, (Q.bloc_industrialist_meter || 0) + 5);
            window._blocBump(3, -10);
            Q.workers_spd = (Q.workers_spd || 0) + 3;
            Q.workers_kpd = (Q.workers_kpd || 0) + 2;
            break;
        case 'Reduce unemployment insurance payouts':
            Q.industry_support = (Q.industry_support || 0) + 3;
            Q.bloc_industrialist_meter = Math.min(100, (Q.bloc_industrialist_meter || 0) + 3);
            window._blocBump(3, -5);
            Q.unemployed_spd = (Q.unemployed_spd || 0) + 3;
            Q.unemployed_kpd = (Q.unemployed_kpd || 0) + 3;
            Q.unemployed_nsdap = (Q.unemployed_nsdap || 0) + 2;
            Q.christian_social_dissent = (Q.christian_social_dissent || 0) + 3;
            break;
        case 'Renegotiating reparations':
            Q.reichswehr_preparedness = Math.max(0, (Q.reichswehr_preparedness || 0) - 10);
            Q.war_industry = Math.max(0, (Q.war_industry || 0) - 8);
            Q.ussr_munitions = Math.max(0, (Q.ussr_munitions || 0) - 6);
            Q.stahlhelm_integration = Math.max(0, (Q.stahlhelm_integration || 0) - 4);
            break;
        case 'Negotiate a Reichskonkordat with the Vatican':
            Q.catholics_z = (Q.catholics_z || 0) + 5;
            Q.catholics_dnvp = (Q.catholics_dnvp || 0) - 2;
            Q.z_relation = (Q.z_relation || 0) + 3;
            Q.bloc_mittelstand_meter = Math.min(100, (Q.bloc_mittelstand_meter || 0) + 2);
            Q.pro_republic = (Q.pro_republic || 0) + 1;
            break;
        case 'Defending confessional schools':
            Q.catholics_z = (Q.catholics_z || 0) + 3;
            Q.new_middle_z = (Q.new_middle_z || 0) + 2;
            Q.bloc_mittelstand_meter = Math.min(100, (Q.bloc_mittelstand_meter || 0) + 2);
            Q.ddp_relation = (Q.ddp_relation || 0) - 2;
            break;
        case 'Family subsidies':
            Q.welfare_expanded = 1;
            Q.catholics_z = (Q.catholics_z || 0) + 3;
            Q.workers_z = (Q.workers_z || 0) + 2;
            Q.bloc_labor_meter = Math.min(100, (Q.bloc_labor_meter || 0) + 3);
            Q.bloc_mittelstand_meter = Math.min(100, (Q.bloc_mittelstand_meter || 0) + 2);
            Q.christian_social_dissent = (Q.christian_social_dissent || 0) - 2;
            break;
        case 'Moderate land reform':
            Q.rural_z = (Q.rural_z || 0) + 3;
            Q.rural_dnvp = (Q.rural_dnvp || 0) - 3;
            Q.bloc_agrarian_meter = Math.max(0, (Q.bloc_agrarian_meter || 0) - 5);
            Q.dvp_relation = (Q.dvp_relation || 0) - 2;
            Q.catholics_z = (Q.catholics_z || 0) + 2;
            break;
        case 'Blocking secular civil marriage expansion':
            Q.catholics_z = (Q.catholics_z || 0) + 3;
            Q.ddp_relation = (Q.ddp_relation || 0) - 3;
            Q.bloc_mittelstand_meter = Math.min(100, (Q.bloc_mittelstand_meter || 0) + 1);
            Q.pro_republic = (Q.pro_republic || 0) - 2;
            Q.nationalism = (Q.nationalism || 0) + 1;
            break;
        case 'Mittelstand protection':
            Q.bloc_mittelstand_meter = Math.min(100, (Q.bloc_mittelstand_meter || 0) + 8);
            Q.bloc_industrialist_meter = Math.max(0, (Q.bloc_industrialist_meter || 0) - 3);
            Q.old_middle_z = (Q.old_middle_z || 0) + 3;
            Q.dvp_relation = (Q.dvp_relation || 0) - 2;
            break;
        case 'Tax breaks for large families and churches':
            Q.catholics_z = (Q.catholics_z || 0) + 2;
            Q.lower_tax_rates = (Q.lower_tax_rates || 0) - 1;
            Q.bloc_mittelstand_meter = Math.min(100, (Q.bloc_mittelstand_meter || 0) + 3);
            Q.christian_social_dissent = (Q.christian_social_dissent || 0) - 2;
            break;
        case 'Mild land reform':
            Q.rural_ddp = (Q.rural_ddp || 0) + 2;
            Q.rural_dnvp = (Q.rural_dnvp || 0) - 1;
            Q.bloc_agrarian_meter = Math.max(0, (Q.bloc_agrarian_meter || 0) - 3);
            Q.economic_growth = (Q.economic_growth || 0) + 0.1;
            Q.pro_republic = (Q.pro_republic || 0) + 1;
            break;
        case 'Free trade stance':
            Q.tariffs = (Q.tariffs || 0) - 1;
            Q.inflation = (Q.inflation || 0) - 0.5;
            Q.international_relation = (Q.international_relation || 0) + 2;
            Q.rural_dnvp = (Q.rural_dnvp || 0) - 3;
            Q.industry_support = (Q.industry_support || 0) - 2;
            Q.bloc_agrarian_meter = Math.max(0, (Q.bloc_agrarian_meter || 0) - 5);
            Q.bloc_industrialist_meter = Math.max(0, (Q.bloc_industrialist_meter || 0) - 2);
            break;
        case 'Pro-labor arbitration':
            Q.bloc_labor_meter = Math.min(100, (Q.bloc_labor_meter || 0) + 8);
            Q.bloc_industrialist_meter = Math.max(0, (Q.bloc_industrialist_meter || 0) - 5);
            Q.spd_relation = (Q.spd_relation || 0) + 3;
            Q.industry_support = (Q.industry_support || 0) - 3;
            Q.pro_republic = (Q.pro_republic || 0) + 2;
            break;
        case 'Judicial reform':
            Q.pro_republic = (Q.pro_republic || 0) + 5;
            Q.nationalism = (Q.nationalism || 0) - 2;
            Q.authoritarian_conservative_dissent = (Q.authoritarian_conservative_dissent || 0) + 3;
            Q.volkisch_dissent = (Q.volkisch_dissent || 0) + 3;
            break;
        case 'Republicanization of the civil-service':
            Q.pro_republic = (Q.pro_republic || 0) + 5;
            Q.nationalism = (Q.nationalism || 0) - 3;
            Q.authoritarian_conservative_dissent = (Q.authoritarian_conservative_dissent || 0) + 4;
            Q.volkisch_dissent = (Q.volkisch_dissent || 0) + 5;
            break;
        case 'Civilian oversight of the Reichswehr':
            Q.pro_republic = (Q.pro_republic || 0) + 4;
            Q.reichswehr_preparedness = Math.max(0, (Q.reichswehr_preparedness || 0) - 3);
            Q.stahlhelm_integration = Math.max(0, (Q.stahlhelm_integration || 0) - 3);
            Q.bloc_agrarian_meter = Math.max(0, (Q.bloc_agrarian_meter || 0) - 2);
            Q.authoritarian_conservative_dissent = (Q.authoritarian_conservative_dissent || 0) + 3;
            break;
        case 'Progressive taxation':
            Q.upper_tax_rates = (Q.upper_tax_rates || 0) + 1;
            Q.workers_ddp = (Q.workers_ddp || 0) + 2;
            Q.industry_support = (Q.industry_support || 0) - 3;
            Q.capital_strike_progress = (Q.capital_strike_progress || 0) + 1;
            Q.bloc_industrialist_meter = Math.max(0, (Q.bloc_industrialist_meter || 0) - 4);
            Q.bloc_labor_meter = Math.min(100, (Q.bloc_labor_meter || 0) + 3);
            break;
    }
};

window._applyCoalitionHit = function(amount) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (!Q) return;
    if (Q.sandbox_mode) return;
    if (Q.dnvp_in_government !== 1) return;
    if (Q.dnvp_majority === 1) return;
    var cur = (Q.coalition_enthusiasm == null) ? 80 : Q.coalition_enthusiasm;
    Q.coalition_enthusiasm = Math.max(0, Math.min(100, cur - amount));
};

window._cycleCoalitionAction = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var list = window._coalitionActions || [];
    if (!list.length) return;
    window._coalitionActionCycleIdx = ((window._coalitionActionCycleIdx == null) ? -1 : window._coalitionActionCycleIdx) + 1;
    if (window._coalitionActionCycleIdx >= list.length) window._coalitionActionCycleIdx = 0;
    var pick = list[window._coalitionActionCycleIdx];
    Q.current_coalition_action = pick.action;
    Q.current_coalition_action_party = pick.party;
    Q.current_coalition_action_ministry = pick.ministry;
    Q.current_coalition_action_image = '';
    Q.current_coalition_action_description = pick.description || '';
    Q.current_coalition_action_timeout = 999;
    Q.coalition_last_ym = (Q.year || 0) * 12 + (Q.month || 0);
    if (window._renderGovernmentTab) window._renderGovernmentTab();
    try { console.log('[coalition action ' + (window._coalitionActionCycleIdx + 1) + '/' + list.length + ']', pick.party, pick.ministry, '-', pick.action); } catch (e) {}
};

window._forceCoalitionAction = function(actionTitle) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var pick = null;
    if (actionTitle) {
        pick = (window._coalitionActions || []).filter(function(a) { return a.action === actionTitle; })[0];
    }
    if (!pick) {
        pick = (window._coalitionActions || []).filter(function(a) { return a.action === 'Renegotiating reparations'; })[0];
    }
    if (!pick) return;
    Q.current_coalition_action = pick.action;
    Q.current_coalition_action_party = pick.party;
    Q.current_coalition_action_ministry = pick.ministry;
    Q.current_coalition_action_image = '';
    Q.current_coalition_action_description = pick.description || '';
    Q.current_coalition_action_timeout = 3;
    if (window._renderGovernmentTab) window._renderGovernmentTab();
};

window._allowCoalitionAction = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (!Q.current_coalition_action) return;
    window._applyCoalitionEffects(true);
    window._clearCoalitionAction();
    Q.coalition_action_cooldown = 4;
    if (window._renderGovernmentTab) window._renderGovernmentTab();
};

window._vetoCoalitionAction = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (!Q.current_coalition_action) return;
    window._applyCoalitionEffects(false);
    window._clearCoalitionAction();
    Q.coalition_action_cooldown = 4;
    if (window._renderGovernmentTab) window._renderGovernmentTab();
};

window._tickCoalitionAction = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (!Q.current_coalition_action) return;
    Q.current_coalition_action_timeout = (Q.current_coalition_action_timeout || 0) - 1;
    if (Q.current_coalition_action_timeout <= 0) {
        window._allowCoalitionAction();
    }
};

window._maybeFireCoalitionAction = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (!Q || Q.dnvp_in_government !== 1) return;
    if (Q.current_coalition_action) return;
    if ((Q.coalition_action_cooldown || 0) > 0) {
        Q.coalition_action_cooldown = (Q.coalition_action_cooldown || 0) - 1;
        return;
    }

    var ministries = ['foreign', 'interior', 'finance', 'economic', 'labor', 'justice', 'agriculture', 'reichswehr'];
    var partners = window._coalitionPartnerSet();
    var dnvpSelf = (Q.cvp_formed === 1) ? 'CVP' : 'DNVP';

    var lastIdx = ministries.indexOf(Q.coalition_action_last_ministry || '');
    for (var i = 1; i <= ministries.length; i++) {
        var tryMin = ministries[(lastIdx + i) % ministries.length];
        var holder = Q[tryMin + '_minister_party'];
        if (!holder || holder === dnvpSelf) continue;
        if (!partners[holder]) continue;

        var matches = (window._coalitionActions || []).filter(function(a) {
            return a.party === holder && a.ministry === tryMin;
        });
        if (!matches.length) continue;

        var subKey = 'coalition_action_sub_idx_' + holder + '_' + tryMin;
        var nextSub = ((Q[subKey] == null) ? -1 : Q[subKey]) + 1;
        if (nextSub >= matches.length) nextSub = 0;
        var pick = matches[nextSub];
        Q[subKey] = nextSub;
        Q.coalition_action_last_ministry = tryMin;

        Q.current_coalition_action = pick.action;
        Q.current_coalition_action_party = pick.party;
        Q.current_coalition_action_ministry = pick.ministry;
        Q.current_coalition_action_image = '';
        Q.current_coalition_action_description = pick.description || '';
        Q.current_coalition_action_timeout = 3;
        return;
    }
};

window._ministerCatalog = {
    foreign: {
        DVP:  ['Stresemann'],
        Z:    ['Brüning'],
        DDP:  ['Koch-Weser'],
        DNVP: ['von Hassell'],
        CVP:  ['Stegerwald'],
        NSDAP:['von Ribbentrop'],
        I:    ['Neurath']
    },
    interior: {
        DVP:  ['Jarres'],
        Z:    ['Wirth'],
        DDP:  ['Külz'],
        DNVP: ['von Gayl'],
        SPD:  ['Severing'],
        NSDAP:['Frick'],
        I:    ['Bracht']
    },
    finance: {
        DVP:  ['Moldenhauer'],
        Z:    ['Köhler'],
        DDP:  ['Reinhold'],
        DNVP: ['von Schlieben'],
        SPD:  ['Hilferding'],
        NSDAP:['Reinhardt'],
        I:    ['Luther']
    },
    economic: {
        DVP:  ['Curtius'],
        Z:    ['Schmidt'],
        DNVP: ['Neuhaus'],
        NDNP: ['Hugenberg'],
        NSDAP:['Funk'],
        I:    ['Warmbold']
    },
    labor: {
        Z:    ['Brauns'],
        DVP:  ['Thiel'],
        DNVP: ['Seldte'],
        SPD:  ['Wissell'],
        NSDAP:['Ley'],
        I:    ['Syrup']
    },
    justice: {
        SPD:  ['Radbruch'],
        Z:    ['Marx'],
        DDP:  ['Koch-Weser'],
        DVP:  ['Scholz'],
        DNVP: ['Gürtner'],
        NSDAP:['Frank'],
        I:    ['Joël']
    },
    agriculture: {
        Z:    ['Hermes', 'Haslinde'],
        DDP:  ['Dietrich'],
        DNVP: ['Schiele'],
        NSDAP:['Darré'],
        NDNP: ['Hugenberg'],
        DVP:  ['von Kanitz'],
        I:    ['Kanitz']
    },
    reichswehr: {
        DDP:  ['Gessler'],
        DVP:  ['von Seeckt'],
        DNVP: ['von Blomberg'],
        NSDAP:['von Reichenau'],
        I:    ['Groener']
    }
};

window._getMinister = function(ministry, party) {
    var cat = window._ministerCatalog[ministry] || {};
    if (ministry === 'foreign' && party === 'DDP' &&
        window.dendryUI.dendryEngine.state.qualities.ddp_leader === 'Curtius') return 'Curtius';
    var slot = cat[party];
    if (slot && slot.length) return slot[0];
    if (party === 'CVP' && cat['DNVP'] && cat['DNVP'].length) return cat['DNVP'][0];
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var pid = String(party).toLowerCase();
    var lead = Q[pid + '_leader'] || Q[pid + '_leader_last_name'];
    return (typeof lead === 'string' && lead) ? lead : '—';
};

window._assignMinister = function(ministry, party) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    Q[ministry + '_minister_party'] = party;
    if (window._getMinister) {
        var name = window._getMinister(ministry, party);
        if (name && name !== '—') {
            Q[ministry + '_minister'] = name;
        }
    }
};

window._coalitionActions = [
    { party: 'DVP', ministry: 'economic',    action: 'Privatizing state companies',
      description: 'The <span style="color:var(--dvp-color);font-weight:bold;">DVP</span> is leading efforts to expand the sale of state-owned railways and mining concerns to private capital.' },
    { party: 'DVP', ministry: 'finance',     action: 'Cutting upper-bracket taxes',
      description: 'The <span style="color:var(--dvp-color);font-weight:bold;">DVP</span> is pushing legislation to slash corporate and upper-bracket tax rates, in the pursuit of increased industrialist investment in the German economy.' },
    { party: 'DVP', ministry: 'labor',       action: 'Supporting employers',
      description: 'In ongoing wage arbitration cases, particularly around the Ruhr industrial region, the <span style="color:var(--dvp-color);font-weight:bold;">DVP</span> is pushing the Reich to side with employers and overrule pro-worker awards.' },
    { party: 'DVP', ministry: 'labor',       action: 'Reduce unemployment insurance payouts',
      description: 'The <span style="color:var(--dvp-color);font-weight:bold;">DVP</span> is attacking unemployment insurance, blaming it for upsetting the budget and demanding tighter eligibility as well as lower payouts.' },
    { party: 'DVP', ministry: 'foreign',     action: 'Renegotiating reparations',
      description: 'Gustav Stresseman is negotiating with the Western powers on Versailles, and has pressured the Reichswehr to cease the most flagrant violations of the treaty in pursuit of his goal.' },
    { party: 'DVP', ministry: 'justice',     action: 'Strengthen property law',
      description: 'The <span style="color:var(--dvp-color);font-weight:bold;">DVP</span> pushes judicial reforms to fortify property rights and limit state intervention in commercial contracts, making it extremely difficult for the <span style="color:#c00000;">Socialists</span> to push pro-labor legislation.' },

    { party: 'Z',   ministry: 'foreign',     action: 'Negotiate a Reichskonkordat with the Vatican',
      description: 'The <b style="color:var(--z-color);">Zentrum</b> is working towards a Reichskonkordat, an agreement between the Reich and the Catholic Church. For them, it\'s an opportunity to formalize Germany\'s relationship with Rome through a binding agreement protecting Catholic interests.' },
    { party: 'Z',   ministry: 'interior',    action: 'Defending confessional schools',
      description: '<b style="color:var(--z-color);">Zentrum</b> is demanding the legal protection of Catholic confessional schooling against the secular school reform lobby.' },
    { party: 'Z',   ministry: 'labor',       action: 'Family subsidies',
      description: 'The <b style="color:var(--z-color);">Zentrum</b> is proposing moderate child subsidies and family wage supplements in line with their doctrine of Catholic social teaching.' },
    { party: 'Z',   ministry: 'agriculture', action: 'Moderate land reform',
      description: 'The <b style="color:var(--z-color);">Zentrum</b> party is moving towards modest land distribution from large estates, leaning on the idea of a <i>Siedlungspolitik</i>, the settlement of rural families on parceled-out estates.' },
    { party: 'Z',   ministry: 'justice',     action: 'Blocking secular civil marriage expansion',
      description: 'In line with their views on the sacramental status of marriage, the <b style="color:var(--z-color);">Zentrum</b> party is blocking proposed expansions to civil marriage law.' },
    { party: 'Z',   ministry: 'economic',    action: 'Mittelstand protection',
      description: '<b style="color:var(--z-color);">Zentrum</b> is advancing guild protections for artisans and small shopkeepers against the expansion of industrialists and other larger retail economic forces.' },
    { party: 'Z',   ministry: 'finance',     action: 'Tax breaks for large families and churches',
      description: '<b style="color:var(--z-color);">Zentrum</b> is pushing for targeted tax relief for families with three or more children, as well as for church properties.' },

    { party: 'DDP', ministry: 'agriculture', action: 'Mild land reform',
      description: 'The <b style="color:var(--ddp-color);">DDP</b>, working to compromise between the positions of the <b style="color:var(--spd-color);">SPD</b> and Junkers, is working on modest land redistribution, primarily focused on consolidating smaller holdings.' },
    { party: 'DDP', ministry: 'economic',    action: 'Free trade stance',
      description: 'The <b style="color:var(--ddp-color);">DDP</b> is lowering tariffs to boost trade and lower consumer prices.' },
    { party: 'DDP', ministry: 'labor',       action: 'Pro-labor arbitration',
      description: 'The <b style="color:var(--ddp-color);">DDP</b> is pushing for labor arbitration that favors workers, strengthening collective bargaining rights, and making wage awards toward labor in industrial disputes more substantive.' },
    { party: 'DDP', ministry: 'justice',     action: 'Judicial reform',
      description: 'The <b style="color:var(--ddp-color);">DDP</b> is launching a judicial reform program to replace monarchist-leaning judges with committed <span style="color:#000;">re</span><span style="color:#DD0000;">pub</span><span style="color:#FFCC00;">licans</span>.' },
    { party: 'DDP', ministry: 'interior',    action: 'Republicanization of the civil-service',
      description: 'The <b style="color:var(--ddp-color);">DDP</b> is leading a systematic republicanization of the civil service, vetting and removing anti-<span style="color:#000;">re</span><span style="color:#DD0000;">pub</span><span style="color:#FFCC00;">lican</span> officials to entrench loyalty to the Weimar Republic.' },
    { party: 'DDP', ministry: 'reichswehr',  action: 'Civilian oversight of the Reichswehr',
      description: 'The <b style="color:var(--ddp-color);">DDP</b> wants the Reichswehr Ministry to be staffed by civilians and answerable to the Reichstag, breaking the tradition of the Reichswehr as an institution operating as a "state within a state".' },
    { party: 'DDP', ministry: 'finance',     action: 'Progressive taxation',
      description: 'The <b style="color:var(--ddp-color);">DDP</b> is working towards a mild progressive-tax adjustment, which raising upper brackets modestly while lowering middle-class and working-class burdens.' }
];

window._coalitionPartnerSet = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var cvp = (Q.cvp_formed === 1);
    var set = {};
    if (Q.in_grand_coalition === 1)        { set.SPD = 1; if (cvp) set.CVP = 1; else { set.Z = 1; set.DDP = 1; set.DVP = 1; } }
    else if (Q.burgerblock_coalition === 1)   { if (cvp) { set.CVP = 1; set.BVP = 1; } else { set.Z = 1; set.BVP = 1; set.DVP = 1; set.DDP = 1; } }
    else if (Q.centre_right_coalition === 1)  { if (cvp) { set.CVP = 1; set.BVP = 1; } else { set.Z = 1; set.BVP = 1; set.DVP = 1; } }
    else if (Q.christian_coalition === 1)     { if (cvp) { set.CVP = 1; set.BVP = 1; } else { set.Z = 1; set.BVP = 1; } }
    else if (Q.hindenburg_coalition === 1)    { set.DVP = 1; set.BVP = 1; }
    else if (Q.in_far_right_coalition === 1)  { set.NSDAP = 1; if (cvp) { set.CVP = 1; set.BVP = 1; } }
    else if (Q.in_right_coalition === 1)      { set.DVP = 1; }
    else if (Q.in_national_bloc === 1)        { set.NSDAP = 1; }
    return set;
};

window._refreshNsdapInGov = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var mins = ['economic', 'agriculture', 'finance', 'foreign', 'interior', 'justice', 'labor', 'reichswehr'];
    for (var c = 0; c < mins.length; c++) {
        if (Q[mins[c] + '_minister_party'] === 'CVP') Q[mins[c] + '_minister_party'] = 'DNVP';
    }
    var inGov = (Q.chancellor_party === 'NSDAP') ? 1 : 0;
    for (var i = 0; i < mins.length; i++) {
        if (Q[mins[i] + '_minister_party'] === 'NSDAP') inGov = 1;
    }
    Q.nsdap_in_government = inGov;
    if (Q.foreign_minister === 'Curtius' && !((Q.curtius_fm_abs || 0) > 0)) {
        Q.curtius_fm_abs = (Q.year || 0) * 12 + (Q.month || 0);
    }
    return inGov;
};

window._setCabinet = function(chancellorLastName) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var key = 'cabinet_count_' + String(chancellorLastName).toLowerCase();
    Q[key] = (Q[key] || 0) + 1;
    var n = Q[key];
    var roman = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    var suffix = chancellorLastName + ' ' + (roman[n] || String(n));
    Q.cabinet_name = 'Kabinett ' + suffix;
    Q.cabinet_name_short = suffix;
};

window._updatePresidentImage = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var map = window._presidentPortraits = {
        'Hindenburg': 'img/hindenburg1.png',
        'Hitler':     'img/portraits/hitler2.jpg',
        'Thälmann':   'img/portraits/thalmann.jpg',
        'Braun':      'img/portraits/braun.jpg',
        'Rosenfeld':  'img/portraits/rosenfeld.jpg',
        'Brüning':    'img/portraits/bruning.jpg',
        'Stegerwald': 'img/portraits/stegerwald.jpg',
        'Luther':     'img/luther1.png',
        'Westarp':    'img/portraits/westarp.png',
        'Hugenberg':  'img/portraits/AlfredHugenberg.jpg',
        'Hergt':      'img/portraits/OskarHergt.jpg',
        'Lambach':        'img/portraits/LambachWalther.jpg',
        'Adenauer':       'img/portraits/adenauer.jpg',
        'Lettow-Vorbeck': 'img/portraits/lettowvorbeck.jpg',
        'Hammerstein':    'img/portraits/hammerstein.jpg',
        'Wilhelm III':    'img/portraits/wilhelm%20iii.jpg',
        'Frick':          'img/portraits/frick.jpg',
        'Göring':         'img/portraits/goring.jpg',
        'Goering':        'img/portraits/goring.jpg',
        'Röhm':           'img/portraits/rohm.jpg',
        'Roehm':          'img/portraits/rohm.jpg',
        'Strasser':       'img/portraits/strasser.jpg',
        'Treviranus':     'img/portraits/treviranus.jpg',
        'Wirth':          'img/portraits/wirth.jpg',
        'Heuss':          'img/heussport.png',
        'Held':           'img/heldpres.png',
        'Lehmann':        'img/portraits/lehmann1.png'
    };
    var p = Q.president || '', psn = String(p).split(' ').pop();
    var pimg = (psn === 'Lambach') ? window._lambachImg('img/portraits/LambachWalther.jpg') : (map[p] || map[psn] || '');
    if (!pimg && p && p === Q.dnvp_leader && Q.dnvp_leader_img) pimg = Q.dnvp_leader_img;
    Q.president_image = pimg;
};

/* Heads of state the game can assign but for which no portrait file exists yet.
   These show red in the dev gallery as an "add an image" to-do list. */
window._portraitCandidates = {
    'Goebbels (pres)': 'img/portraits/goebbels.jpg',
    'Pieck (pres)':    'img/portraits/pieck.jpg',
    'Hess (leader)':   'img/portraits/hess.jpg'
};

/* Dev tool: full-screen gallery of every wired + candidate portrait.
   Green border = file rendered, red "MISSING" = file failed to load. */
window._checkPortraits = function() {
    var existing = document.getElementById('dev-portrait-check');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    if (!window._chancellorPortraits || !window._presidentPortraits) {
        try { window._updateChancellorImage(); window._updatePresidentImage(); } catch (e) {}
    }
    var overlay = document.createElement('div');
    overlay.id = 'dev-portrait-check';
    overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.93); z-index:100000; overflow:auto; padding:20px 24px 48px; box-sizing:border-box; font-family:Georgia,serif; color:#fff;';

    var close = document.createElement('button');
    close.textContent = '✕ Close';
    close.style.cssText = 'position:fixed; top:14px; right:18px; font-size:15px; padding:6px 14px; cursor:pointer; background:#c33; color:#fff; border:none; border-radius:4px; z-index:1;';
    close.onclick = function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); };
    overlay.appendChild(close);

    var head = document.createElement('div');
    head.innerHTML = '<div style="font-size:26px; text-align:center; margin-bottom:4px;">Portrait Render Check</div>'
        + '<div style="text-align:center; color:#aaa; font-size:12px; margin-bottom:8px;">green border = renders &nbsp;·&nbsp; red = MISSING file</div>';
    overlay.appendChild(head);

    function section(title, map) {
        var wrap = document.createElement('div');
        var keys = Object.keys(map);
        var titleEl = document.createElement('div');
        titleEl.style.cssText = 'font-size:18px; text-transform:uppercase; letter-spacing:0.08em; margin:18px 0 8px; border-bottom:1px solid #555; padding-bottom:6px;';
        titleEl.textContent = title + ' (' + keys.length + ')';
        wrap.appendChild(titleEl);
        var grid = document.createElement('div');
        grid.style.cssText = 'display:flex; flex-wrap:wrap; gap:10px;';
        keys.forEach(function (name) {
            var path = map[name];
            var cell = document.createElement('div');
            cell.style.cssText = 'width:116px; text-align:center; font-size:11px;';
            var frame = document.createElement('div');
            frame.style.cssText = 'width:116px; height:146px; background:#222; border:2px solid #666; display:flex; align-items:center; justify-content:center; overflow:hidden; box-sizing:border-box;';
            var img = document.createElement('img');
            img.style.cssText = 'max-width:100%; max-height:100%; display:block;';
            img.onload = function () { frame.style.borderColor = '#3a3'; };
            img.onerror = function () { frame.style.borderColor = '#d33'; frame.innerHTML = '<span style="color:#f66; font-size:12px; font-weight:bold;">MISSING</span>'; };
            img.src = path;
            frame.appendChild(img);
            cell.appendChild(frame);
            var nm = document.createElement('div');
            nm.style.cssText = 'margin-top:4px; font-weight:bold;';
            nm.textContent = name;
            cell.appendChild(nm);
            var pa = document.createElement('div');
            pa.style.cssText = 'color:#999; word-break:break-all; font-size:9px; line-height:1.2;';
            pa.textContent = path;
            cell.appendChild(pa);
            grid.appendChild(cell);
        });
        wrap.appendChild(grid);
        return wrap;
    }

    overlay.appendChild(section('Presidents — wired', window._presidentPortraits || {}));
    overlay.appendChild(section('Chancellors — wired', window._chancellorPortraits || {}));
    overlay.appendChild(section('Game-settable — NO portrait file yet', window._portraitCandidates));
    document.body.appendChild(overlay);
};

window._checkActionCompletions = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    Object.keys(window._stateActionRegistry).forEach(function(stateKey) {
        var data = window._stateActionRegistry[stateKey];
        if ((Q[data.timer_var] || 0) > 0) return;
        Object.keys(data.actions).forEach(function(actionKey) {
            var action = data.actions[actionKey];
            if (Q[action.flag] !== 1) return;
            if (action.on_complete) action.on_complete(Q);
            Q[action.flag] = 0;
        });
    });
};

window._cyclePanelPreview = function(stateKey) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var def = window._stateActions[stateKey];
    if (!def || !def.actions || !def.actions.length) return;
    def.actions.forEach(function(a) { Q[a.flag] = 0; });
    var idxKey = stateKey + '_preview_idx';
    Q[idxKey] = ((Q[idxKey] || 0) % def.actions.length) + 1;
    var nextAction = def.actions[Q[idxKey] - 1];
    Q[nextAction.flag] = 1;
    Q[def.timer_var] = nextAction.duration || 0;
    window._renderStatePanel(stateKey);
};

window._refreshBulletin = function() {
};

window._ecoParams = {
  confBase:88, confDebtSvc:1.4, confCover:0.5, coverComfort:50, confDrift:0.15, confRef:70,
  flightThreshold:75, flightGain:1.8, flightDrift:0.2, creditDrift:0.15, recallThreshold:50, recallGain:1.0,
  stCapBase:0.99, stCapGain:0.03, ltCapBase:1.16, creditBase:75,
  infNoteGain:0.4, infCoverGain:0.06, infDrift:0.15, commodityRef:95, commodityInfl:0.18,
  fearBase:30, fearInfGain:2.5, fearCoverGain:0.7, fearDrift:0.15,
  labourForce:19.9, employedBase:18.0, employedMin:11, employedMax:19.4, empConfGain:0.06, empDrift:0.1, fiscalEmp:0.6, fiscalNeutral:-0.3, phillips:0.5, unempNeutral:1.9, deficitTol:3.0, deficitInfl:0.25, secEmpGain:0.16, secProfitRef:41, creditEmp:0.08, creditEmpRef:75, worldEmp:0.06, worldEmpRef:70, secEmpCap:12, classWorkersBase:48, classNewMidBase:14, unempBasePct:9.5, joblessFromWorkers:0.75, joblessFromNewMid:0.25,
  secDebtDrag:0.25, secConfGain:0.3, secDrift:0.1, secBreakeven:20, secDebtDelta:0.05,
  genadminBase:0.8, reichswehrBase:0.6, transfersBase:1.5,
  domConfBase:80, domConfInf:3, domConfCover:0.3, domConfFlight:0.6, domConfDrift:0.15, domConfRef:70,
  bankDepConfGain:0.006, bankForFlight:0.008, bankForDrift:0.2, bankDrift:0.15, bankLiqDep:2.0, bankLiqFor:1.5,
  taxUpperRev:0.05, taxLowerRev:0.05, taxLowerEmp:0.1, taxUpperEmp:0.08, taxUpperFlight:2.0, tariffCustoms:0.22, tariffAgri:6, tariffInfl:0.3, tariffRetalTariff:8, tariffRetalRel:5, tariffRetalDrift:0.15, treatyTariff:8, treatyRel:5, treatyAgriHit:1.5,
  polJobsEmp:0.4, polJobsCost:0.6, welfareEmp:0.3, welfareNeutral:2.3, welfareInfl:0.1, polFAReich:0.5, polFAConstruction:7, polDebtStCap:0.35, polDebtFlight:6,
  polCartelHeavy:7, polCartelEmp:0.35, polExportSec:8, polExportTrade:0.6, polExportCost:0.4,
  polSubsidyHeavy:8, polSubsidyCost:0.4, subsidyBase:0.6, polDeregMittel:12, polDeregLight:6, polNatEmp:0.6, polNatProfit:10,
  tradeExportSec:20,
  discFlight:1.2, discEmp:0.12, flightNY:2.5,
  rateConverge:0.34, rateNeutral:8.3, noteInflAccom:0.5, discInfl:0.5,
  planSpendCap:6, planMatureMonths:20, planRamp:0.075, planLautEmp:0.55, planLautCost:0.45, planLautInfl:0.40, planLautSec:2.5, planAustEmp:0.30, planAustCut:0.5, planAustInfl:0.35, planCorpEmp:0.55, planCorpCost:0.4, planCorpInfl:0.35, planCorpSec:3.0, planRedisMult:0.3, planWageMult:0.15, planRedisOffBudget:0.6
};
window._ecoTick = function(Q) {
  var P = window._ecoParams;
  var clamp = function(lo,hi,v){ return Math.max(lo, Math.min(hi, v)); };
  var drift = function(c,t,r){ return c + (t - c) * r; };
  var r2 = function(v){ return Math.round(v * 100) / 100; };
  var sgn = function(d){ return d > 0.0001 ? 1 : (d < -0.0001 ? -1 : 0); };
  var n = function(k){ return +Q[k] || 0; };
  var SECS = ['heavy','export','light','estates','peasants','mittelstand','construction'];
  var BANKS = ['deutsche','dresdner','danat','commerz'];
  var oldU = n('eco_unemployment'), oldI = n('eco_inflation');
  var _rbTgt = n('eco_rb_discount_target') || 6.5;
  Q.eco_rb_discount = (Math.abs(n('eco_rb_discount') - _rbTgt) < 0.1) ? _rbTgt : r2(drift(n('eco_rb_discount'), _rbTgt, P.rateConverge));
  Q.eco_rb_lombard = r2(n('eco_rb_discount') + 1);
  var _ry = n('year');
  Q.eco_exp_reparations = Q.lausanne_done ? 0 : (Q.rep_moratorium ? 0 : (Q.young_plan_active ? r2(clamp(1.7, 2.1, 1.7 + (_ry - 1930) * 0.04)) : (_ry <= 1926 ? 1.5 : (_ry === 1927 ? 1.75 : 2.5))));
  var _ps = clamp(0, P.planSpendCap, n('plan_spend')), _planEmp = 0, _planExp = 0, _planInfl = 0, _planSecH = 0, _planSecC = 0;
  if (_ps > 0 && n('plan_enacted')) {
    var _credMult = 1 + n('plan_rediscount') * P.planRedisMult + n('plan_wagemann') * P.planWageMult;
    var _offB = 1 - n('plan_rediscount') * P.planRedisOffBudget;
    var _mat = Math.max(0, ((n('year') * 12 + n('month')) - n('plan_enacted_abs')) / P.planMatureMonths);
    var _matCost = Math.max(-0.4, 1 - _mat);
    if (n('embraced_lautenbach')) { _planEmp = _ps * P.planLautEmp * _credMult; _planExp = _ps * P.planLautCost * _offB * _matCost; _planInfl = _ps * P.planLautInfl * _credMult; _planSecH = _ps * P.planLautSec; _planSecC = _ps * P.planLautSec; }
    else if (n('austerity_embraced')) { _planEmp = -_ps * P.planAustEmp; _planExp = -_ps * P.planAustCut; _planInfl = -_ps * P.planAustInfl; }
    else if (n('embraced_corporatism')) { _planEmp = _ps * P.planCorpEmp * _credMult; _planExp = _ps * P.planCorpCost * _offB * _matCost; _planInfl = _ps * P.planCorpInfl * _credMult; _planSecH = _ps * P.planCorpSec; }
    var _pcm = n('plan_cost_mult') || 1;
    _planEmp *= _pcm; _planExp *= _pcm; _planInfl *= _pcm; _planSecH *= _pcm; _planSecC *= _pcm;
  }
  var _peSecH = (n('_eco_plan_sech_prev') || 0) + (_planSecH - (n('_eco_plan_sech_prev') || 0)) * P.planRamp; Q._eco_plan_sech_prev = _peSecH;
  var _peSecC = (n('_eco_plan_secc_prev') || 0) + (_planSecC - (n('_eco_plan_secc_prev') || 0)) * P.planRamp; Q._eco_plan_secc_prev = _peSecC;
  var dDom = n('eco_debt_domestic'), dFor = n('eco_debt_foreign_lt') + n('eco_debt_foreign_st');
  var intDom = dDom * n('eco_debt_domestic_rate') / 100, intFor = dFor * n('eco_debt_foreign_rate') / 100;
  var employed = n('eco_lab_employed_total');
  var taxU = n('upper_tax_rates'), taxL = n('lower_tax_rates'), taxFU = 1 + taxU * P.taxUpperRev, taxFL = 1 + taxL * P.taxLowerRev;
  var TAR = [['us',0.18,60,75],['uk',0.18,25,70],['nl',0.09,20,78],['fr',0.12,47,50],['pl',0.05,53,35],['su',0.07,75,55]];
  var tarCust = 0, tarSum = 0;
  for (var tci = 0; tci < TAR.length; tci++) { var tv = Math.max(0, n('eco_tar_' + TAR[tci][0])); tarCust += tv * TAR[tci][1]; tarSum += tv; }
  var tarAvg = tarSum / TAR.length;
  var _wmk = (n('year') || 1926) * 12 + (n('month') || 1);
  var WKF = [[1926*12+1,70,65,95],[1928*12+1,82,78,100],[1929*12+9,85,81,102],[1929*12+11,59,64,87],[1931*12+6,41,55,75],[1932*12+4,29,47,65],[1933*12+6,36,53,72],[1934*12+6,50,62,84]];
  var _ws;
  if (_wmk <= WKF[0][0]) _ws = WKF[0];
  else if (_wmk >= WKF[WKF.length-1][0]) _ws = WKF[WKF.length-1];
  else { for (var _wi = 0; _wi < WKF.length-1; _wi++) { if (_wmk <= WKF[_wi+1][0]) { var _wf = (_wmk - WKF[_wi][0]) / (WKF[_wi+1][0] - WKF[_wi][0]); _ws = [_wmk, WKF[_wi][1]+(WKF[_wi+1][1]-WKF[_wi][1])*_wf, WKF[_wi][2]+(WKF[_wi+1][2]-WKF[_wi][2])*_wf, WKF[_wi][3]+(WKF[_wi+1][3]-WKF[_wi][3])*_wf]; break; } } }
  Q.eco_for_world = r2(_ws[1]); Q.eco_for_export_demand = r2(_ws[2]); Q.eco_for_commodity = r2(_ws[3]);
  var NYK = [[1926*12+1,4.0],[1927*12+7,3.5],[1928*12+1,3.5],[1928*12+12,5.0],[1929*12+7,6.0],[1929*12+10,6.0],[1930*12+10,2.5],[1931*12+5,1.5],[1931*12+10,3.5],[1932*12+6,2.5],[1932*12+12,1.5],[1933*12+2,1.5],[1933*12+3,3.5],[1933*12+6,2.5],[1934*12+6,1.5]];
  var _ny;
  if (_wmk <= NYK[0][0]) _ny = NYK[0][1];
  else if (_wmk >= NYK[NYK.length-1][0]) _ny = NYK[NYK.length-1][1];
  else { for (var _ni = 0; _ni < NYK.length-1; _ni++) { if (_wmk <= NYK[_ni+1][0]) { var _nf = (_wmk - NYK[_ni][0]) / (NYK[_ni+1][0] - NYK[_ni][0]); _ny = NYK[_ni][1] + (NYK[_ni+1][1] - NYK[_ni][1]) * _nf; break; } } }
  Q.eco_for_ny_rate = r2(_ny);
  var demandFactor = n('eco_for_export_demand') / 65;
  var priceFactor = n('eco_for_commodity') / 95;
  var TRADE = [['uk',0.12],['us',0.09],['nl',0.09],['fr',0.07],['su',0.03],['pl',0.03]];
  var acc = 0.57 * 0.65;
  for (var ti = 0; ti < TRADE.length; ti++) {
    var pAcc = clamp(0, 1, 0.5 * (n('eco_for_' + TRADE[ti][0] + '_rel') / 100) + 0.5 * (1 - n('eco_for_' + TRADE[ti][0] + '_tariff') / 100));
    acc += TRADE[ti][1] * pAcc;
  }
  var accessFactor = acc / 0.628;
  Q.eco_bop_exports = r2(10.42 * demandFactor * priceFactor * accessFactor);
  Q.eco_bop_imports = r2(-9.78 * (0.7 + 0.3 * (employed / P.employedBase)));
  Q.eco_rev_turnover = r2(1.0 * (employed / P.employedBase) * taxFL);
  Q.eco_rev_customs = r2(1.0 * (n('eco_bop_exports') / 10.42) + tarCust * P.tariffCustoms);
  var SECW = [['heavy',12],['export',18],['light',15],['estates',5],['peasants',10],['mittelstand',12],['construction',5]];
  var shNum = 0, shDen = 0;
  for (var sh = 0; sh < SECW.length; sh++) { shNum += n('eco_sec_' + SECW[sh][0] + '_profit') * SECW[sh][1]; shDen += SECW[sh][1]; }
  var secHealth = shDen > 0 ? shNum / shDen : 50;
  if (Q.eco_sec_health_base === undefined) Q.eco_sec_health_base = secHealth;
  var corpFactor = clamp(0.5, 1.6, secHealth / Math.max(1, n('eco_sec_health_base')));
  var revWages = 2.2 * 0.6 * (employed / P.employedBase) * taxFU, revCorp = 2.2 * 0.4 * corpFactor * taxFU;
  Q.eco_rev_income = r2(revWages + revCorp);
  Q.eco_rev_income_wages = r2(revWages); Q.eco_rev_income_corp = r2(revCorp);
  Q.eco_rev_property = r2(1.0 * corpFactor * taxFU);
  var rev = n('eco_rev_income') + n('eco_rev_turnover') + n('eco_rev_customs') + n('eco_rev_excise') + n('eco_rev_property') + n('eco_rev_admin') + n('pol_finanzausgleich') * P.polFAReich;
  if (!n('eco_welfare_split')) { var wT = n('eco_exp_pensions') || 2.3; Q.eco_exp_veterans = r2(wT * 0.304); Q.eco_exp_unemployment = r2(wT * 0.217); Q.eco_exp_disabled = r2(wT * 0.174); Q.eco_exp_housing = r2(wT * 0.174); Q.eco_exp_relief = r2(wT * 0.130); Q.eco_welfare_split = 1; }
  Q.eco_exp_pensions = r2(n('eco_exp_veterans') + n('eco_exp_unemployment') + n('eco_exp_disabled') + n('eco_exp_housing') + n('eco_exp_relief'));
  var _pl0 = n('eco_price_level') || 1;
  Q.eco_exp_genadmin = r2(P.genadminBase * _pl0); Q.eco_exp_reichswehr = r2(P.reichswehrBase * _pl0); Q.eco_exp_transfers = r2(P.transfersBase * _pl0);
  Q.eco_exp_subsidies = r2(P.subsidyBase + n('pol_subsidy') * P.polSubsidyCost);
  var exp = n('eco_exp_pensions') + n('eco_exp_transfers') + n('eco_exp_reparations') + n('eco_exp_genadmin') + n('eco_exp_reichswehr') + n('eco_exp_subsidies') + intDom + n('pol_export') * P.polExportCost + _planExp;
  var bal = rev - exp;
  Q.eco_exp_debt = r2(intDom); Q.eco_budget = r2(bal);
  Q.eco_rev_total = r2(rev); Q.eco_exp_total = r2(exp);
  Q.eco_rev_lander = r2(n('pol_finanzausgleich') * P.polFAReich);
  Q.eco_exp_export = r2(n('pol_export') * P.polExportCost);
  var _mBal = bal / 12, _dDom = dDom, _dSt = n('eco_debt_foreign_st'), _dLt = n('eco_debt_foreign_lt'), _treas = n('eco_treasury');
  var _fShare = clamp(0, 0.6, (n('eco_for_credit_access') - 50) / 50);
  if (_mBal < 0) { var _need = -_mBal; var _ft = Math.min(_treas, _need); _treas -= _ft; _need -= _ft; _dSt += _need * _fShare; _dDom += _need * (1 - _fShare); }
  else { var _pay = _mBal, _p; _p = Math.min(_dSt, _pay); _dSt -= _p; _pay -= _p; _p = Math.min(_dDom, _pay); _dDom -= _p; _pay -= _p; _p = Math.min(_dLt, _pay); _dLt -= _p; _pay -= _p; _treas += _pay; }
  var _recall = Math.min(_dSt, Math.max(0, P.recallThreshold - n('eco_for_credit_access')) * P.recallGain * _dSt / 100);
  if (_recall > 0) { _dSt -= _recall; var _fxA = n('eco_rb_fx') - _recall; if (_fxA < 0) { Q.eco_rb_gold = Math.max(0, r2(n('eco_rb_gold') + _fxA)); _fxA = 0; } Q.eco_rb_fx = r2(_fxA); }
  Q.eco_debt_domestic = Math.max(0, r2(_dDom)); Q.eco_debt_foreign_st = Math.max(0, r2(_dSt)); Q.eco_debt_foreign_lt = Math.max(0, r2(_dLt)); Q.eco_treasury = Math.max(0, r2(_treas));
  var dsr = rev > 0 ? (intDom + intFor) / rev : 0;
  var cover = n('eco_rb_notes') > 0 ? (n('eco_rb_gold') + n('eco_rb_fx')) / n('eco_rb_notes') * 100 : 0;
  var conf = drift(n('eco_for_investor_conf'), clamp(0, 100, P.confBase - dsr * 100 * P.confDebtSvc - Math.max(0, P.coverComfort - cover) * P.confCover), P.confDrift);
  Q.eco_for_investor_conf = r2(conf);
  Q.eco_for_capflight = r2(drift(n('eco_for_capflight'), clamp(0, 100, (P.flightThreshold - conf) * P.flightGain + n('pol_debt_mode') * P.polDebtFlight + (8.3 - n('eco_rb_discount')) * P.discFlight + taxU * P.taxUpperFlight + (n('eco_for_ny_rate') - 4) * P.flightNY), P.flightDrift));
  Q.eco_for_credit_access = r2(drift(n('eco_for_credit_access'), conf * clamp(0.4, 1, n('eco_for_world') / 70), P.creditDrift));
  Q.eco_bop_stcapital = r2(P.stCapBase - n('eco_for_capflight') * P.stCapGain + n('pol_debt_mode') * P.polDebtStCap);
  Q.eco_bop_ltcapital = r2(P.ltCapBase * (n('eco_for_credit_access') / P.creditBase) * clamp(0.3, 1.2, P.coverComfort / Math.max(1, cover)));
  var svc = n('eco_bop_services_base') - intFor;
  var reserves = n('eco_bop_exports') + n('eco_bop_imports') + svc - n('eco_exp_reparations') + n('eco_bop_ltcapital') + n('eco_bop_stcapital') + n('eco_bop_errors') + n('pol_export') * P.polExportTrade;
  var dRes = reserves / 12, fx = n('eco_rb_fx') + dRes;
  if (fx < 0) { Q.eco_rb_gold = Math.max(0, r2(n('eco_rb_gold') + fx)); fx = 0; }
  Q.eco_rb_fx = r2(fx);
  var oldNotes = n('eco_rb_notes'); Q.eco_rb_notes = Math.max(0.1, r2(oldNotes * (1 + n('eco_inflation') * P.noteInflAccom / 100 / 12) + dRes));
  var ng = oldNotes > 0 ? (Q.eco_rb_notes - oldNotes) / oldNotes * 100 : 0;
  var nc = Q.eco_rb_notes > 0 ? (n('eco_rb_gold') + Q.eco_rb_fx) / Q.eco_rb_notes * 100 : 0;
  var _piP = n('_eco_plan_infl_prev') || 0, _piNow = _piP + (_planInfl - _piP) * P.planRamp;
  Q.eco_inflation = r2(drift(n('eco_inflation') - _piP, clamp(-15, 30, ng) * P.infNoteGain + Math.max(0, P.coverComfort - nc) * P.infCoverGain + tarAvg * P.tariffInfl - (n('eco_unemployment') - P.unempNeutral) * P.phillips + Math.max(0, (-n('eco_budget')) - P.deficitTol) * P.deficitInfl + (n('eco_for_commodity') - P.commodityRef) * P.commodityInfl - (n('eco_rb_discount') - P.rateNeutral) * P.discInfl, P.infDrift) + _piNow); Q._eco_plan_infl_prev = _piNow;
  Q.eco_price_level = Math.round(Math.max(0.3, Math.min(50, _pl0 * (1 + n('eco_inflation') / 100 / 12))) * 10000) / 10000;
  Q.german_inflation_scared = r2(clamp(0, 100, drift(n('german_inflation_scared'), P.fearBase + n('eco_inflation') * P.fearInfGain + Math.max(0, P.coverComfort - nc) * P.fearCoverGain, P.fearDrift)));
  Q.eco_domestic_conf = r2(drift(n('eco_domestic_conf'), clamp(0, 100, P.domConfBase - Math.max(0, n('eco_inflation')) * (n('german_inflation_scared') / 50) * P.domConfInf - Math.max(0, P.coverComfort - nc) * P.domConfCover - Math.max(0, n('eco_for_capflight') - 10) * P.domConfFlight), P.domConfDrift));
  var avgIndProfit = (n('eco_sec_heavy_profit') + n('eco_sec_export_profit') + n('eco_sec_light_profit') + n('eco_sec_mittelstand_profit') + n('eco_sec_construction_profit')) / 5;
  var _peP = n('_eco_plan_emp_prev') || 0, _peNow = _peP + (_planEmp - _peP) * P.planRamp;
  Q.eco_lab_employed_total = r2(Math.min(P.labourForce - 0.2, drift(employed - _peP, clamp(P.employedMin, P.employedMax, P.employedBase - (bal - P.fiscalNeutral) * P.fiscalEmp + (conf - P.confRef) * P.empConfGain + Math.min(P.secEmpCap, avgIndProfit - P.secProfitRef) * P.secEmpGain + (n('eco_for_credit_access') - P.creditEmpRef) * P.creditEmp + (n('eco_for_world') - P.worldEmpRef) * P.worldEmp + (n('eco_exp_pensions') - P.welfareNeutral) * P.welfareEmp - n('pol_cartel') * P.polCartelEmp - (n('eco_rb_discount') - 8.3) * P.discEmp + n('pol_nationalize') * P.polNatEmp), P.empDrift) + _peNow)); Q._eco_plan_emp_prev = _peNow;
  Q.eco_unemployment = Math.max(0, r2(P.labourForce - n('eco_lab_employed_total')));
  if (Q.workers_base === undefined) Q.workers_base = P.classWorkersBase;
  if (Q.new_middle_base === undefined) Q.new_middle_base = P.classNewMidBase;
  var unempPct = clamp(0, 45, Q.eco_unemployment / P.labourForce * 100);
  var jobless = unempPct - P.unempBasePct;
  Q.unemployed = r2(unempPct);
  Q.workers = r2(Math.max(5, n('workers_base') - jobless * P.joblessFromWorkers));
  Q.new_middle = r2(Math.max(3, n('new_middle_base') - jobless * P.joblessFromNewMid));
  var SECEMP = { heavy:1.9, export:2.4, light:2.0, estates:1.8, peasants:7.5, mittelstand:3.5, construction:1.0 };
  for (var s = 0; s < SECS.length; s++) { var pre = 'eco_sec_' + SECS[s], sn = SECS[s], secAdj = 0;
    if (sn === 'estates' || sn === 'peasants') secAdj = tarAvg * P.tariffAgri - (n('treaty_west') + n('treaty_atlantic') + n('treaty_east')) * P.treatyAgriHit;
    else if (sn === 'export') secAdj = n('pol_export') * P.polExportSec + (accessFactor - 1) * P.tradeExportSec + (demandFactor - 1) * P.tradeExportSec - n('pol_nationalize') * P.polNatProfit;
    else if (sn === 'heavy') secAdj = n('pol_cartel') * P.polCartelHeavy + n('pol_subsidy') * P.polSubsidyHeavy - n('pol_nationalize') * P.polNatProfit + _peSecH;
    else if (sn === 'mittelstand') secAdj = n('pol_dereg') * P.polDeregMittel;
    else if (sn === 'light') secAdj = n('pol_dereg') * P.polDeregLight;
    else if (sn === 'construction') secAdj = -n('pol_finanzausgleich') * P.polFAConstruction + _peSecC;
    Q[pre + '_profit'] = r2(drift(n(pre + '_profit'), clamp(0, 100, n(pre + '_prod') - n(pre + '_debt') * P.secDebtDrag + (conf - P.confRef) * P.secConfGain + secAdj), P.secDrift));
    Q[pre + '_debt'] = r2(clamp(0, 100, n(pre + '_debt') - (n(pre + '_profit') - P.secBreakeven) * P.secDebtDelta));
    Q[pre + '_output'] = r2(clamp(0, 100, n(pre + '_prod') * clamp(0.4, 1.1, n(pre + '_profit') / 50)));
    Q[pre + '_employed'] = r2((SECEMP[sn] || 0) * employed / P.employedBase); }
  var dconf = n('eco_domestic_conf');
  for (var b = 0; b < BANKS.length; b++) { var bp = 'eco_' + BANKS[b];
    var dep = n(bp + '_deposits'), oldFor = n(bp + '_foreign');
    var newDep = Math.max(0, r2(drift(dep, dep * (1 + (dconf - P.domConfRef) * P.bankDepConfGain), P.bankDrift)));
    if (Q[bp + '_foreign_base'] === undefined) Q[bp + '_foreign_base'] = oldFor;
    var forTarget = n(bp + '_foreign_base') * clamp(0.2, 1.5, n('eco_for_credit_access') / P.creditBase) * clamp(0.3, 1, 1 - Math.max(0, n('eco_for_capflight') - 10) * P.bankForFlight);
    var newFor = r2(drift(oldFor, forTarget, P.bankForDrift));
    Q[bp + '_deposits'] = newDep; Q[bp + '_deposits_trend'] = sgn(newDep - dep);
    Q[bp + '_foreign'] = newFor;
    Q[bp + '_liquidity'] = Math.max(0, r2(n(bp + '_liquidity') + (newDep - dep) * P.bankLiqDep + (newFor - oldFor) * P.bankLiqFor)); }
  for (var rci = 0; rci < TAR.length; rci++) { var rc = TAR[rci][0], rt = Math.max(0, n('eco_tar_' + rc)), tb = Math.max(0, n('eco_treaty_' + rc));
    Q['eco_for_' + rc + '_tariff'] = r2(drift(n('eco_for_' + rc + '_tariff'), clamp(0, 100, TAR[rci][2] + rt * P.tariffRetalTariff - tb * P.treatyTariff), P.tariffRetalDrift));
    Q['eco_for_' + rc + '_rel'] = r2(drift(n('eco_for_' + rc + '_rel'), clamp(0, 100, TAR[rci][3] - rt * P.tariffRetalRel + tb * P.treatyRel), P.tariffRetalDrift)); }
  Q.eco_unemployment_trend = sgn(n('eco_unemployment') - oldU);
  Q.eco_inflation_trend = sgn(n('eco_inflation') - oldI);
  var _debtTot = n('eco_debt_domestic') + n('eco_debt_foreign_lt') + n('eco_debt_foreign_st'); Q.eco_debt_total = r2(_debtTot);
  var hUnemp = clamp(0, 100, 100 - Math.max(0, n('eco_unemployment') - 1.0) * 22);
  var hInfl  = clamp(0, 100, 100 - Math.abs(n('eco_inflation') - 1.5) * 7);
  var hFin   = clamp(0, 100, 100 - Math.max(0, -n('eco_budget') - 1.0) * 11 - Math.max(0, _debtTot - 16) * 1.6);
  var hExt   = clamp(0, 100, nc * 1.1 - Math.max(0, n('eco_for_capflight') - 10) * 1.4);
  var hConf  = clamp(0, 100, (n('eco_for_investor_conf') + n('eco_domestic_conf')) / 2);
  var hSec   = clamp(0, 100, (n('eco_sec_heavy_profit') + n('eco_sec_export_profit') + n('eco_sec_light_profit') + n('eco_sec_estates_profit') + n('eco_sec_peasants_profit') + n('eco_sec_mittelstand_profit') + n('eco_sec_construction_profit')) / 7);
  var _health = hUnemp * 0.33 + hInfl * 0.16 + hFin * 0.17 + hExt * 0.12 + hConf * 0.10 + hSec * 0.12;
  Q.eco_health = r2(clamp(0, 100, _health));
  Q.eco_health_label = _health >= 82 ? 'Booming' : _health >= 67 ? 'Healthy' : _health >= 52 ? 'Stable' : _health >= 37 ? 'Strained' : _health >= 22 ? 'In Crisis' : 'Collapsing';
  if (Q.eco_hist_start === undefined) Q.eco_hist_start = (n('year') || 1926) * 12 + (n('month') || 1);
  Q.eco_hist_unemp = (Q.eco_hist_unemp || '') + r2(n('eco_unemployment')) + ',';
  Q.eco_hist_infl = (Q.eco_hist_infl || '') + r2(n('eco_inflation')) + ',';
  Q.eco_hist_budget = (Q.eco_hist_budget || '') + r2(n('eco_budget')) + ',';
};
(function(){
  var PID = 'dev-debug-panel';
  function eng(){ return window.dendryUI && window.dendryUI.dendryEngine; }
  function QQ(){ var e = eng(); return e && e.state && e.state.qualities; }
  function getScene(id){ var e = eng(); return e && e.game && e.game.scenes && e.game.scenes[id]; }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function titleText(t){ if(t==null) return ''; if(typeof t==='string') return t; if(t.length!=null){ var s=''; for(var i=0;i<t.length;i++){ var x=t[i]; s += (typeof x==='string')?x:((x&&x.content)||''); } return s; } return String(t); }
  function stripTags(s){ return String(s==null?'':s).replace(/<span[^>]*opt-tip[\s\S]*?<\/span>/gi,'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(); }
  function magicHtml(t){ if(t==null) return ''; if(typeof t==='string') return t.replace(/\{!|!\}/g,''); if(t.length!=null){ var s=''; for(var i=0;i<t.length;i++){ var x=t[i]; s += (typeof x==='string')?esc(x):((x&&x.content)||''); } return s; } return esc(String(t)); }
  function mClose(s,i){ var d=0; for(var j=i;j<s.length;j++){ if(s.charAt(j)==='(')d++; else if(s.charAt(j)===')'){ if(--d===0) return j; } } return -1; }
  function stripP(s){ s=s.trim(); while(s.length>1 && s.charAt(0)==='(' && mClose(s,0)===s.length-1) s=s.slice(1,-1).trim(); return s; }
  function splitTopAnd(s){ try{ s=stripP(s); var d=0; for(var i=0;i<s.length-1;i++){ var c=s.charAt(i); if(c==='(')d++; else if(c===')')d--; else if(d===0 && c==='&' && s.charAt(i+1)==='&') return splitTopAnd(s.slice(0,i)).concat(splitTopAnd(s.slice(i+2))); } return [s]; }catch(e){ return [s]; } }
  function evalClause(cl){ var e=eng(), q=QQ(); try{ return !!(new Function('state','Q','return ('+cl+');'))(e.state,q); }catch(x){ return null; } }

  function diffEffects(arr){
    var e = eng(), q = QQ(); if(!e || !q || !arr || !arr.length) return [];
    var snap = {}, k; for(k in q) snap[k] = q[k];
    try{ e.runActions(arr); }
    catch(err){ for(var i=0;i<arr.length;i++){ var it=arr[i]; try{ if(typeof it==='function') it(e.state, q); else if(it&&it.fn) it.fn(e.state, q); else if(it&&it.$code) (new Function('state','Q', it.$code))(e.state, q); }catch(x){} } }
    var out = [];
    for(k in q){ var a=snap[k], b=q[k]; if(b!==a && !(a!==a && b!==b)) out.push({k:k, from:(k in snap?a:undefined), to:b}); }
    for(k in q){ if(!(k in snap)) delete q[k]; }
    for(k in snap){ q[k] = snap[k]; }
    return out;
  }
  function fmtDiff(d){ var s=esc(d.k)+': '+esc(String(d.from))+' → '+esc(String(d.to)); if(typeof d.from==='number'&&typeof d.to==='number'){ var dl=Math.round((d.to-d.from)*1000)/1000; s+=' <b style="color:'+(dl>=0?'#6f6':'#f66')+';">('+(dl>=0?'+':'')+dl+')</b>'; } return s; }
  function evalPred(p){
    if(!p) return null;
    var e = eng(), q = QQ(), ok=null, fn=null, src=(p&&p.$code)||null;
    if(typeof p==='function') fn=p; else if(p&&p.fn) fn=p.fn;
    if(!src && fn){ try{ var s=fn.toString(), a=s.indexOf('{'), b=s.lastIndexOf('}'); if(a>=0&&b>a) src=s.slice(a+1,b).trim(); }catch(x){} }
    try{ if(fn) ok=!!fn(e.state,q); else if(src) ok=!!(new Function('state','Q', src))(e.state,q); }catch(x){ ok=null; }
    var qual=[]; if(src){ var names={}, m, re=/Q(?:\[['"]([A-Za-z0-9_]+)['"]\]|\.([A-Za-z0-9_]+))/g; while((m=re.exec(src))){ names[m[1]||m[2]]=1; } qual=Object.keys(names).map(function(n){ return {n:n, v:q?q[n]:undefined}; }); }
    return { ok:ok, src: src?src.replace(/^return\s*/,'').replace(/;\s*$/,''):'(compiled predicate)', qual:qual };
  }
  function predLine(label,p){
    if(!p) return '';
    var c=p.ok===null?'#fc6':p.ok?'#6f6':'#f66', tag=p.ok===null?'?':p.ok?'TRUE':'false';
    var head='<div style="margin-top:3px;"><span style="color:#fc6;">'+label+'</span> <b style="color:'+c+';">['+tag+']</b></div>';
    var cls = (p.src && p.src!=='(compiled predicate)') ? splitTopAnd(p.src) : [];
    var body;
    if(cls.length>1){ body='<div style="margin-left:6px;">'+cls.map(function(cl){ var r=evalClause(cl); var col=r===null?'#fc6':r?'#6f6':'#f66', mk=r===null?'?':r?'✓':'✗'; return '<div style="color:#9ab;"><b style="color:'+col+';">'+mk+'</b> '+esc(stripP(cl))+'</div>'; }).join('')+'</div>'; }
    else { body='<div style="color:#9ab;margin-left:6px;">'+esc(p.src)+'</div>'; }
    var qs=p.qual.length?'<div style="color:#bcd;font-size:0.9em;margin:2px 0 0 8px;">'+p.qual.map(function(x){return esc(x.n)+'=<b style="color:#fff;">'+esc(x.v)+'</b>';}).join('   ')+'</div>':'';
    return head+body+qs;
  }
  function effList(arr){ var eff=diffEffects(arr); return eff.length?'<ul style="margin:2px 0 0 14px;padding:0;list-style:square;">'+eff.map(function(d){return '<li>'+fmtDiff(d)+'</li>';}).join('')+'</ul>':'<div style="color:#888;margin-left:8px;">(none)</div>'; }
  function srcOf(arr){ if(!arr||!arr.length) return ''; var out=[]; for(var i=0;i<arr.length;i++){ var it=arr[i], s=(it&&it.$code)||null; if(!s){ var fn=(typeof it==='function')?it:(it&&it.fn); if(fn){ try{ var t=fn.toString(), a=t.indexOf('{'), b=t.lastIndexOf('}'); if(a>=0&&b>a) s=t.slice(a+1,b).trim(); }catch(e){} } } if(s) out.push(s); } return out.join('\n'); }
  function valHtml(v){ if(v===undefined) return '<span style="color:#c84;">undefined</span>'; if(typeof v==='boolean') return '<b style="color:'+(v?'#6f6':'#f66')+';">'+v+'</b>'; if(typeof v==='number'&&isNaN(v)) return '<span style="color:#c84;">NaN (input unset)</span>'; var col=(typeof v==='number')?(v>0?'#6f6':(v<0?'#f66':'#ccc')):'#9cf'; return '<b style="color:'+col+';">'+esc(String(v))+'</b>'; }
  function extractBranches(src){ var out=[], i=0, n=src.length; while(i<n){ var idx=src.indexOf('if', i); if(idx<0) break; var bb=idx>0?src.charAt(idx-1):' ', aa=src.charAt(idx+2); if(/[A-Za-z0-9_$]/.test(bb)||/[A-Za-z0-9_$]/.test(aa)){ i=idx+2; continue; } var j=idx+2; while(j<n&&/\s/.test(src.charAt(j))) j++; if(src.charAt(j)!=='('){ i=idx+2; continue; } var depth=0,k=j; for(;k<n;k++){ var c=src.charAt(k); if(c==='(')depth++; else if(c===')'){depth--; if(depth===0){k++;break;}} } var cond=src.slice(j+1,k-1).trim(); var rest=src.slice(k).replace(/^\s+/,''); var sp=rest.search(/[;\n{]/); var stmt=(sp<0?rest:rest.slice(0,sp)).trim(); out.push({cond:cond, stmt:stmt}); i=k; } return out; }
  function traceLocals(arr){ var e=eng(), st=(e&&e.state)||null, Q=QQ(); if(!Q||!arr||!arr.length) return null; var src=srcOf(arr); if(!src) return null; var names=[], qn=[], written={}, m, SKIP={Q:1,state:1,window:1,document:1}; var re=/\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)/g; while((m=re.exec(src))){ if(!SKIP[m[1]]&&names.indexOf(m[1])<0) names.push(m[1]); } var qre=/Q(?:\.([A-Za-z_$][\w$]*)|\[['"]([^'"]+)['"]\])/g; while((m=qre.exec(src))){ var nm=m[1]||m[2]; if(qn.indexOf(nm)<0) qn.push(nm); } var wre=/Q(?:\.([A-Za-z_$][\w$]*)|\[['"]([^'"]+)['"]\])\s*=(?!=)/g; while((m=wre.exec(src))){ written[m[1]||m[2]]=1; } var branches=extractBranches(src); var snap={}, k; for(k in Q) snap[k]=Q[k]; var ret=null; try{ var instr=src+'\n;return {__l:{'+names.map(function(n){return JSON.stringify(n)+':(typeof '+n+'!=="undefined"?'+n+':undefined)';}).join(',')+'},__c:['+branches.map(function(b){return '(function(){try{return !!('+b.cond+');}catch(_e){return null;}})()';}).join(',')+']};'; ret=(new Function('state','Q',instr))(st,Q); }catch(err){ ret=null; } for(k in Q){ if(!(k in snap)) delete Q[k]; } for(k in snap){ Q[k]=snap[k]; } var locals=ret&&ret.__l, cvals=(ret&&ret.__c)||[]; var firedAt=-1; for(var bi=0;bi<cvals.length;bi++){ if(cvals[bi]===true){ firedAt=bi; break; } } var brOut=branches.map(function(b,ix){ return { cond:b.cond, stmt:b.stmt, val:cvals[ix], fired:(ix===firedAt), reached:(firedAt<0||ix<=firedAt) }; }); var inputs=qn.filter(function(n){return !written[n];}).map(function(n){ return {k:n, v:snap[n]}; }); return { inputs: inputs, locals: names.map(function(n){ return {k:n, v:locals?locals[n]:undefined}; }), branches: brOut }; }
  function traceHtml(arr){ var t=traceLocals(arr); if(!t) return ''; var h=''; if(t.inputs.length){ h+='<div style="color:#888;margin-top:3px;">reads (values in current state):</div><ul style="margin:1px 0 0 14px;padding:0;list-style:square;color:#bbb;">'+t.inputs.slice(0,16).map(function(d){return '<li>'+esc(d.k)+' = '+valHtml(d.v)+'</li>';}).join('')+'</ul>'; } if(t.locals.length){ h+='<div style="color:#888;margin-top:3px;">computes:</div><ul style="margin:1px 0 0 14px;padding:0;list-style:square;">'+t.locals.map(function(d){return '<li>'+esc(d.k)+' = '+valHtml(d.v)+'</li>';}).join('')+'</ul>'; } if(t.branches&&t.branches.length){ h+='<div style="color:#888;margin-top:3px;">decision (first true branch wins):</div><ul style="margin:1px 0 0 12px;padding:0;list-style:none;">'+t.branches.map(function(b){ var mark,col,dim=''; if(b.fired){ mark='&#10004;'; col='#6f6'; } else if(!b.reached){ mark='&middot;'; col='#777'; dim='opacity:0.5;'; } else if(b.val===null){ mark='!'; col='#fc6'; } else { mark='&#10007;'; col='#f66'; } return '<li style="margin-top:1px;'+dim+'"><span style="color:'+col+';font-weight:bold;">'+mark+'</span> <span style="color:#ddd;">'+esc(b.cond)+'</span> <span style="color:#777;">&rarr; '+esc(b.stmt)+'</span>'+(b.fired?' <b style="color:#6f6;">[taken]</b>':(!b.reached?' <span style="color:#777;">(not reached)</span>':''))+'</li>'; }).join('')+'</ul>'; } return h; }
  function effBlock(arr){ var src=srcOf(arr), t=traceHtml(arr); return t+(t?'<div style="color:#888;margin-top:3px;">sets:</div>':'')+effList(arr)+(src?'<details style="margin-top:4px;"><summary style="color:#666;cursor:pointer;">raw source</summary><pre style="margin:1px 0 0 8px;padding:3px 5px;background:#181818;color:#9c9;white-space:pre-wrap;max-height:13em;overflow:auto;font-size:0.9em;line-height:1.3;">'+esc(src)+'</pre></details>':''); }
  function resolveTarget(sceneId,optId){ var t=String(optId||'').replace(/^@/,''); if(t.indexOf('.')<0) t=String(sceneId).split('.')[0]+'.'+t; return t; }
  function options(sc){ var o=sc.options; if(o&&o.options) o=o.options; return (o&&o.length)?o:[]; }

  var tip;
  function showTip(el,tid){
    var tsc=getScene(tid), h='<div style="color:#9cf;font-weight:bold;">'+esc(tid)+'</div>';
    if(tsc){ h+=predLine('view-if',evalPred(tsc.viewIf)); h+=predLine('choose-if',evalPred(tsc.chooseIf)); h+='<div style="color:#fc6;margin-top:3px;">effects on click:</div>'+effBlock(tsc.onArrival); }
    else h+='<div style="color:#888;">(target scene not found)</div>';
    if(!tip){ tip=document.createElement('div'); tip.style.cssText='position:fixed;z-index:100001;background:#0c0c0c;color:#eee;border:1px solid #666;padding:6px 8px;font-family:monospace;line-height:1.4;max-width:34em;box-shadow:2px 2px 10px rgba(0,0,0,0.7);'; document.body.appendChild(tip); }
    var pf=document.getElementById(PID); tip.style.fontSize=(pf&&pf.style.fontSize)||'11px';
    tip.innerHTML=h; tip.style.display='block'; var r=el.getBoundingClientRect();
    tip.style.left=Math.max(4,Math.min(r.right+6,window.innerWidth-tip.offsetWidth-8))+'px'; tip.style.top=Math.max(4,Math.min(r.top,window.innerHeight-tip.offsetHeight-8))+'px';
  }
  function hideTip(){ if(tip) tip.style.display='none'; }

  function analyze(id){
    var out=document.getElementById(PID+'-out'); if(!out) return;
    var sc=getScene(id);
    if(!sc){ out.innerHTML='<div style="color:#f88;">no scene &quot;'+esc(id)+'&quot;</div>'; return; }
    var h='<div style="background:#e9e7e0;color:#2a2418;font-weight:bold;font-size:1.18em;padding:2px 5px;">'+(magicHtml(sc.title)||esc(id))+'</div>';
    if(sc.subtitle) h+='<div style="background:#e9e7e0;color:#5a4a30;font-style:italic;padding:1px 5px;border-top:1px solid #cfc9ba;">'+magicHtml(sc.subtitle)+'</div>';
    h+='<div style="color:#888;margin-top:2px;">'+esc(id)+(sc.tags?'   ['+esc([].concat(sc.tags).join(','))+']':'')+(sc.maxVisits?'   max-visits '+sc.maxVisits:'')+'</div>';
    if(sc.viewIf) h+=predLine('fires when',evalPred(sc.viewIf));
    h+='<div style="color:#fc6;margin-top:6px;">on-arrival effects:</div>'+effBlock(sc.onArrival);
    var opts=options(sc);
    if(opts.length){
      h+='<div style="color:#fc6;margin-top:6px;">options ('+opts.length+') &mdash; hover for detail, click to open:</div>';
      opts.forEach(function(o){
        var tid=resolveTarget(id,o.id), tsc=getScene(tid);
        var cv=tsc&&evalPred(tsc.viewIf), cc=tsc&&evalPred(tsc.chooseIf);
        var avail=(!cv||cv.ok!==false)&&(!cc||cc.ok!==false);
        var raw=stripTags(titleText(o.title!=null?o.title:(tsc&&tsc.title)))||o.id;
        h+='<div class="dbgo" data-t="'+esc(tid)+'" style="margin:2px 0;padding:2px 5px;border-left:3px solid '+(avail?'#5a5':'#a44')+';'+(avail?'':'opacity:.5;text-decoration:line-through;')+'cursor:help;">'+esc(raw)+'</div>';
      });
    }
    out.innerHTML=h;
    Array.prototype.forEach.call(out.querySelectorAll('.dbgo'),function(el){ el.addEventListener('mouseenter',function(){ showTip(el,el.getAttribute('data-t')); }); el.addEventListener('mouseleave',hideTip); el.addEventListener('click',function(){ var t=el.getAttribute('data-t'); var inp=document.getElementById(PID+'-in'); if(inp) inp.value=t; hideTip(); analyze(t); out.scrollTop=0; }); });
  }

  function build(){
    if(document.getElementById(PID)) return;
    var p=document.createElement('div'); p.id=PID;
    p.style.cssText='position:fixed;top:6px;left:6px;z-index:100000;width:360px;min-width:230px;max-height:94vh;overflow:auto;resize:both;background:rgba(12,12,12,0.95);color:#eee;border:1px solid #555;font-family:monospace;font-size:11px;line-height:1.45;padding:7px;display:none;';
    p.innerHTML='<div style="display:flex;gap:4px;align-items:center;margin-bottom:5px;"><b style="color:#9cf;">DEV</b><input id="'+PID+'-in" list="'+PID+'-dl" autocomplete="off" placeholder="scene id, e.g. hitler_demands" style="flex:1;background:#1b1b1b;color:#eee;border:1px solid #555;padding:2px 4px;font:1em monospace;"><datalist id="'+PID+'-dl"></datalist><button id="'+PID+'-go" style="background:#2a2a2a;color:#eee;border:1px solid #555;cursor:pointer;">go</button><button id="'+PID+'-jmp" title="render this event live (applies its effects)" style="background:#2a2a2a;color:#fa8;border:1px solid #555;cursor:pointer;">jump</button></div><div id="'+PID+'-out" style="color:#888;">type a scene id and press Enter</div>';
    document.body.appendChild(p);
    var inp=document.getElementById(PID+'-in');
    try{ var dl=document.getElementById(PID+'-dl'), gs=eng()&&eng().game&&eng().game.scenes; if(dl&&gs){ var ids=Object.keys(gs).sort(); for(var di=0;di<ids.length;di++){ var op=document.createElement('option'); op.value=ids[di]; dl.appendChild(op); } } }catch(e){}
    try{ if(window.ResizeObserver){ new ResizeObserver(function(){ p.style.fontSize=Math.max(8,Math.min(28, p.offsetWidth/360*11)).toFixed(1)+'px'; }).observe(p); } }catch(e){}
    inp.addEventListener('keydown',function(e){ e.stopPropagation(); if(e.key==='Enter') analyze(inp.value.trim()); });
    document.getElementById(PID+'-go').addEventListener('click',function(){ analyze(inp.value.trim()); });
    document.getElementById(PID+'-jmp').addEventListener('click',function(){ var e=eng(); if(e&&e.goToScene){ try{ e.goToScene(inp.value.trim()); }catch(err){ alert('jump failed: '+err); } } });
  }
  function toggle(){ build(); var p=document.getElementById(PID); var show=p.style.display==='none'; p.style.display=show?'block':'none'; if(show){ var i=document.getElementById(PID+'-in'); if(i) i.focus(); } }
})();

window._optTipInit = function() {
  if (!document.getElementById('opt-tip-style')) {
    var st = document.createElement('style'); st.id = 'opt-tip-style';
    st.textContent = 'ul.choices li .opt-tip{display:none;position:fixed;left:-9999px;top:0;background:#fff;border:2px solid #999;padding:8px 12px;min-width:150px;font-size:0.95em;font-weight:normal;font-style:normal;color:#000;text-align:left;line-height:1.7;white-space:nowrap;z-index:100;box-shadow:2px 2px 6px rgba(0,0,0,0.2);pointer-events:none;} ul.choices li:not(.unavailable):hover .opt-tip{display:block;}';
    document.head.appendChild(st);
  }
  if (!window._optTipMove) {
    window._optTipMove = function(e) {
      var t = e.target, li = (t && t.closest) ? t.closest('ul.choices li') : null; if (!li) return;
      if (li.className && li.className.indexOf('unavailable') >= 0) return;
      var tip = li.querySelector ? li.querySelector('.opt-tip') : null; if (!tip) return;
      var x = e.clientX + 14, y = e.clientY - tip.offsetHeight - 14;
      if (x + tip.offsetWidth > window.innerWidth - 8) x = window.innerWidth - tip.offsetWidth - 8;
      if (y < 8) y = e.clientY + 18;
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
    };
    document.addEventListener('mousemove', window._optTipMove);
  }
};

window._startBavariaAction = function(actionName) { window._startStateAction('bavaria', actionName); };

window._blocBump = function(blocNum, delta) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var keys = {1:'bloc_agrarian_meter', 2:'bloc_industrialist_meter',
                3:'bloc_labor_meter', 4:'bloc_mittelstand_meter'};
    var k = keys[blocNum]; if (!k) return;
    if (blocNum === 3 && delta < 0 && (Q.hartwig_advisor === 1 || Q.hartwig_leader_advisor === 1)) delta = delta / 3;
    Q[k] = Math.max(0, Math.min(100, (Q[k] || 0) + delta));
};

window._taxEffect = function(rich, poor) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    function bump(k, d) { Q[k] = Math.max(0, Math.min(100, (Q[k] || 0) + d)); }
    if (rich < 0)      { bump('old_middle_dnvp', 3);  bump('new_middle_dnvp', 1.5);  bump('industry_support', 6);    window._blocBump(2, 36); }
    else if (rich > 0) { bump('old_middle_dnvp', -3); bump('new_middle_dnvp', -1.5); bump('industry_support', -7.5); window._blocBump(2, -42); }
    if (poor < 0)      { bump('workers_dnvp', 3);  bump('unemployed_dnvp', 1.5);  bump('fundraising_support', 6);  window._blocBump(3, 24); }
    else if (poor > 0) { bump('workers_dnvp', -3); bump('unemployed_dnvp', -1.5); bump('fundraising_support', -6); window._blocBump(3, -24); }
};

window._welfareEffect = function(dir) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    function bump(k, d) { Q[k] = Math.max(0, Math.min(100, (Q[k] || 0) + d)); }
    if (dir < 0) {
        bump('workers_dnvp', -1); bump('workers_spd', 0.6);
        bump('industry_support', 2); bump('fundraising_support', -2);
        window._blocBump(2, 12); window._blocBump(3, -12);
    } else if (dir > 0) {
        bump('industry_support', -2); bump('fundraising_support', 2);
        window._blocBump(2, -12); window._blocBump(3, 12);
    }
};

window._govActionEffects = {
    'raise_progressive':  [ -2,-15, 10, -3],
    'raise_rich':         [ -2,-18, 10, -2],
    'raise_poor':         [  0,  6, -8, -5],
    'cut_overall':        [  6, 10,  4,  6],
    'cut_poor':           [  0, -2, 20,  6],
    'cut_rich':           [  4, 24, -3,  4],
    'raise_overall':      [ -3, -8, -3, -5],
    'regressive':         [ -2, 24, -8, -5],
    'raise_tariffs':      [ 16,  6, -2,  4],
    'lower_tariffs':      [-30, 10,  4,  0],
    'slash_unemployment': [  0, 10,-10, -3],
    'cut_house_building': [  0,  6, -5, -5],
    'slash_disabled':     [  0,  6, -5, -3],
    'cut_veterans_benefits':[ -3, -3, -3, -5],
    'reparations_refusal':[  6,  6,  6,  6],
    'osthilfe':           [ 20,  4,  0,  0],
    'organized_agri':     [ 10,  4,  0,  0],
    'settle_farmers_1':   [ 10,  0,  0,  6],
    'settle_farmers_2':   [ 10,  0,  0,  6],
    'price_floors':       [ 16, -2, -2, -2],
    'targeted_nationalizations':[  0,-18,  6, -3],
    'support_heavy_industry':   [  4, 20, -2,  4],
    'deregulate_smes':          [  4,  6, -2, 16],
    'unemployment_insurance':   [  0,-12, 30,  4],
    'promote_dhv':              [  0,  0, 16,  6],
    'curtail_unions':           [  4, 16,-10,  4],
    'vocational_training':      [  0,  6, 10, 10],
    'la_support_labor':         [  0,-15, 24,  4],
    'la_support_employers':     [  4, 20,-10,  4],
    'la_balance':               [  0, -2,  6,  2],
    'negotiate_west':           [  0,  0,  0,  0],
    'negotiate_italy':          [  0,  0,  0,  0],
    'negotiate_austria':        [  0,  0,  0,  0],
    'reparations':              [  0,  0,  0,  0],
    'anschluss_ultimatum':      [ 20, 20, 20, 20],
    'czechoslovakia_revision':  [ 20, 20, 20, 20],
    'poland_revision':          [ 20, 20, 20, 20],
    'reform_judiciary':         [  0,  6, -2, 10],
    'nationalize_state_courts': [  0,  4,  0,  6],
    'persecute_left':           [  4, 10, -8,  4],
    'rollback_liberal_reforms': [  6,  6, -3, 10],
    'hide_rearmament':          [  0,  6,  0,  0],
    'nationalist_education':    [  4,  4, -2, 16],
    'emergency_powers':         [  4, 10, -3,  4],
    'crackdown_left':           [  4, 10, -8,  4],
    'crackdown_weltbuhne':      [  0,  4, -2,  4],
    'truppenamt':               [  4, 16, -2,  6],
    'black_reichswehr':         [  4,  6, -2,  4],
    'krupp_contracts':          [  4, 20, -2,  6],
    'kama_school':              [  4, 10, -2,  4],
    'lipetsk_school':           [  4, 10, -2,  4],
    'lautenbach_implement':     [  4,  4, 16,  6],
    'austerity_implement':      [ -3, 16, -8,-10],
    'corporatist_implement':    [ 10, 10, -3, 16]
};

window._applyGovActionEffects = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var key = Q.pending_gov_action;
    if (!key) return;
    var v = window._govActionEffects[key];
    if (v) {
        if (v[0]) window._blocBump(1, v[0]);
        if (v[1]) window._blocBump(2, v[1]);
        if (v[2]) window._blocBump(3, v[2]);
        if (v[3]) window._blocBump(4, v[3]);
    }
    Q.pending_gov_action = '';
};

window._growthMilestoneTable = {
    1: { workers: 2.0, unemployed: 2.0, new_middle: 0.8, old_middle: 0.8, rural: 0.6, catholics: 0.4, bloc: 2  },
    2: { workers: 2.4, unemployed: 2.4, new_middle: 1.0, old_middle: 1.0, rural: 0.8, catholics: 0.4, bloc: 3  },
    3: { workers: 3.0, unemployed: 3.0, new_middle: 1.2, old_middle: 1.2, rural: 1.0, catholics: 0.6, bloc: 4  },
    4: { workers: 3.6, unemployed: 3.6, new_middle: 1.6, old_middle: 1.6, rural: 1.2, catholics: 0.6, bloc: 5  },
    5: { workers: 4.4, unemployed: 4.4, new_middle: 2.0, old_middle: 2.0, rural: 1.4, catholics: 0.8, bloc: 6  },
    6: { workers: 5.2, unemployed: 5.2, new_middle: 2.4, old_middle: 2.4, rural: 1.8, catholics: 1.0, bloc: 7  },
    7: { workers: 6.0, unemployed: 6.0, new_middle: 3.0, old_middle: 3.0, rural: 2.2, catholics: 1.2, bloc: 8  },
    8: { workers: 7.0, unemployed: 7.0, new_middle: 3.6, old_middle: 3.6, rural: 2.6, catholics: 1.4, bloc: 10 }
};

window._checkGrowthMilestones = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (Q.dnvp_in_government !== 1) return;
    var growth = Q.economic_growth || 0;
    var groups = ['workers', 'unemployed', 'new_middle', 'old_middle', 'rural', 'catholics'];
    for (var t = 1; t <= 8; t++) {
        if (growth >= t && Q['growth_milestone_' + t] !== 1) {
            Q['growth_milestone_' + t] = 1;
            var row = window._growthMilestoneTable[t];
            for (var i = 0; i < groups.length; i++) {
                var g = groups[i];
                var dnvpKey = g + '_dnvp';
                var otherKey = g + '_other';
                Q[dnvpKey] = (Q[dnvpKey] || 0) + row[g];
                Q[otherKey] = (Q[otherKey] || 0) - row[g];
            }
            window._blocBump(1, row.bloc);
            window._blocBump(2, row.bloc);
            window._blocBump(3, row.bloc);
            window._blocBump(4, row.bloc);
        }
    }
};

window._tickGoodConditions = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (Q.dnvp_in_government !== 1) return;
    var growth = Q.economic_growth || 0;
    var unemp = Q.unemployed || 0;
    var infl = Q.inflation || 0;
    if (infl <= -2 || infl >= 5) return;
    var mult = 0;
    if (growth >= 8 && unemp < 6) mult = 2.5;
    else if (growth >= 6 && unemp < 8) mult = 2.0;
    else if (growth > 4 && unemp < 10) mult = 1.5;
    else if (growth > 2 && unemp < 12) mult = 1.0;
    else if (growth > 1 && unemp < 14) mult = 0.5;
    if (mult === 0) return;
    var base = { workers: 0.05, new_middle: 0.075, old_middle: 0.075, rural: 0.05, unemployed: 0.025, catholics: 0.025 };
    var blocBase = 0.25;
    var groups = ['workers', 'unemployed', 'new_middle', 'old_middle', 'rural', 'catholics'];
    for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var amt = base[g] * mult;
        Q[g + '_dnvp']  = (Q[g + '_dnvp']  || 0) + amt;
        Q[g + '_other'] = (Q[g + '_other'] || 0) - amt;
    }
    var bloc = blocBase * mult;
    window._blocBump(1, bloc);
    window._blocBump(2, bloc);
    window._blocBump(3, bloc);
    window._blocBump(4, bloc);
};

window._applyBlocEffects = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (Q.dnvp_in_government !== 1 || Q.gov_priorities_picked !== 1) return;
    var meterFor = {
        1: 'bloc_agrarian_meter',
        2: 'bloc_industrialist_meter',
        3: 'bloc_labor_meter',
        4: 'bloc_mittelstand_meter'
    };
    var tiers = { 1: 3, 2: 3, 3: 3, 4: 3 };
    if (Q.gov_priority_primary)     tiers[Q.gov_priority_primary] = 1;
    if (Q.gov_priority_secondary_1) tiers[Q.gov_priority_secondary_1] = 2;
    if (Q.gov_priority_secondary_2) tiers[Q.gov_priority_secondary_2] = 2;
    function nudge(blocNum, d) {
        if (blocNum === 1) {
            Q.rural_dnvp         = (Q.rural_dnvp         || 0) + d;
            Q.fundraising_support= (Q.fundraising_support|| 0) + d * 0.3;
        } else if (blocNum === 2) {
            Q.industry_support = (Q.industry_support || 0) + d * 4;
            Q.old_middle_dnvp  = (Q.old_middle_dnvp  || 0) + d * 1.0;
            Q.new_middle_dnvp  = (Q.new_middle_dnvp  || 0) + d * 0.25;
        } else if (blocNum === 3) {
            Q.workers_dnvp        = (Q.workers_dnvp        || 0) + d;
            Q.fundraising_support = (Q.fundraising_support || 0) + d;
        } else if (blocNum === 4) {
            Q.old_middle_dnvp  = (Q.old_middle_dnvp  || 0) + d * 0.5;
            Q.new_middle_dnvp  = (Q.new_middle_dnvp  || 0) + d * 0.5;
            Q.industry_support = (Q.industry_support || 0) + d * 1.0;
        }
    }
    [1, 2, 3, 4].forEach(function(n) {
        var v = (Q[meterFor[n]] == null) ? 100 : Q[meterFor[n]];
        var tier = tiers[n];
        if (v > 70) {
            if (tier === 1) nudge(n, 0.5);
            else if (tier === 2) nudge(n, 0.2);
        } else if (v < 35) {
            nudge(n, -1.0);
        }
    });
};

window._resetMinistries = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var mins = ['economic', 'agriculture', 'finance', 'foreign', 'interior', 'justice', 'labor', 'reichswehr'];
    for (var i = 0; i < mins.length; i++) {
        Q[mins[i] + '_minister_party'] = "I";
        var cat = (window._ministerCatalog && window._ministerCatalog[mins[i]]) || {};
        Q[mins[i] + '_minister'] = (cat.I && cat.I.length) ? cat.I[0] : '—';
    }
};

window._distributeSpdCabinet = function(parties) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (window._resetMinistries) window._resetMinistries();
    if (Q.dfp_formed || Q.dlp_formed || Q.dvp_merged_cvp) {
        parties = (parties || []).filter(function(p){ return p !== 'DVP'; });
        if (parties.indexOf('DDP') < 0) parties.push('DDP');
    }
    var prefs = {
        labor:       ['SPD', 'Z', 'DVP'],
        interior:    ['SPD', 'Z', 'DDP'],
        finance:     ['SPD', 'Z', 'DVP', 'DDP'],
        economic:    ['DVP', 'Z'],
        justice:     ['DDP', 'Z', 'DVP'],
        foreign:     ['DVP', 'Z', 'DDP'],
        agriculture: ['Z', 'DDP', 'DVP'],
        reichswehr:  ['DDP']
    };
    var inSet = {};
    for (var i = 0; i < (parties || []).length; i++) inSet[parties[i]] = 1;
    var mins = ['labor', 'interior', 'finance', 'economic', 'justice', 'foreign', 'agriculture', 'reichswehr'];
    for (var m = 0; m < mins.length; m++) {
        var min = mins[m], list = prefs[min] || [], chosen = 'I';
        for (var p = 0; p < list.length; p++) {
            if (!inSet[list[p]]) continue;
            var cat = window._ministerCatalog && window._ministerCatalog[min];
            if (!cat || !cat[list[p]] || !cat[list[p]].length) continue;
            chosen = list[p]; break;
        }
        Q[min + '_minister_party'] = chosen;
        var nm = window._getMinister ? window._getMinister(min, chosen) : '—';
        Q[min + '_minister'] = nm || '—';
    }
    if (window._refreshNsdapInGov) window._refreshNsdapInGov();
};

window._toggleOthersBreakdown = function(btn) {
    var rows = document.querySelectorAll('tr.others-sub');
    var show = btn.textContent.indexOf('+') !== -1;
    for (var i = 0; i < rows.length; i++) { rows[i].style.display = show ? 'table-row' : 'none'; }
    btn.textContent = show ? '−' : '+';
};

window._fireAchievement = function(name, desc, icon, id) {
    if (localStorage.getItem('dnvp_achieve_' + id) === '1') return;
    if (window.showAchievementNotification) {
        window.showAchievementNotification(name, desc, icon, id);
    }
};

window._checkRunningAchievements = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;

    var prefix = (Q.cvp_formed === 1) ? 'cvp' : 'dnvp';
    var blocs = ['workers','old_middle','new_middle','rural','catholics','unemployed'];
    var allHigh = blocs.every(function(b) { return (Q[b + '_' + prefix] || 0) >= 30; });
    if (allHigh) {
        window._fireAchievement('Wahre Volksgemeinschaft',
            'The DNVP/CVP has at least 30% support with all classes.',
            'img/ach_volksgemeinschaft.png', 'wahre_volksgemeinschaft');
    }

    var ruralParties = ['dnvp','cvp','spd','kpd','z','bvp','ddp','dvp','nsdap','wp','other'];
    var ruralTotal = 0;
    ruralParties.forEach(function(p) { ruralTotal += (Q['rural_' + p] || 0); });
    var ruralShare = ruralTotal > 0 ? (Q['rural_' + prefix] || 0) / ruralTotal : 0;
    if (ruralShare >= 0.75 && (Q.dnvp_r || 0) >= 30) {
        window._fireAchievement('Bauernstaat',
            'The DNVP holds at least 75% of the rural vote and 30% of Reichstag seats.',
            'img/ach_bauernstaat.png', 'bauernstaat');
    }

    if (Q.embraced_corporatism === 1
        && Q.empowered_faction === 4
        && (Q.workers_dnvp || 0) >= 40
        && Q.welfare_expanded === 1) {
        window._fireAchievement('Konservativer Sozialismus',
            'Fully enact the corporatist plan under the Völkisch wing, expand welfare and worker protections, and DNVP urban worker support is at least 40%.',
            'img/ach_konservativer_sozialismus.png', 'konservativer_sozialismus');
    }

    if (Q.embraced_corporatism === 1
        && Q.dnvp_leader_last_name === 'Lambach'
        && (Q.workers_dnvp || 0) >= 40
        && Q.welfare_expanded === 1) {
        window._fireAchievement('Christlicher Sozialismus',
            'Fully enact the corporatist plan under Lambach, expand welfare and worker protections, and DNVP urban worker support is at least 40%.',
            'img/ach_christlicher_sozialismus.png', 'christlicher_sozialismus');
    }

    if ((Q.year || 0) >= 1933
        && Q.empowered_faction === 4
        && (Q.dnvp_votes || 0) > (Q.nsdap_votes || 0)
        && (Q.dnvp_r || 0) > (Q.nsdap_r || 0)) {
        window._fireAchievement('Alternative für Deutschland',
            'As the Völkisch DNVP, win more votes and Reichstag seats than the NSDAP in 1933 or later.',
            'img/ach_afd.png', 'alternative_fuer_deutschland');
    }

    if (Q.cvp_formed === 1 && ((Q.cvp_r || 0) + (Q.spd_r || 0)) >= 75) {
        window._fireAchievement('Tories und Labour',
            'The SPD and Tory Democratic CVP make up 75% of the Reichstag.',
            'img/ach_toriesundlabor.png', 'tories_und_labour');
    }

    if ((Q.reichswehr_preparedness || 0) >= 80) {
        window._fireAchievement('Gott mit uns',
            'The Reichswehr reaches an extremely high level of strength.',
            'img/ach_gott_mit_uns.png', 'gott_mit_uns');
    }

    if (Q.in_weimar_coalition === 1 && Q.president_party === 'SPD') {
        window._fireAchievement('Wahre Katastrophe',
            'As the DNVP, have a Weimar coalition and SPD president.',
            'img/ach_truecatastrophe.png', 'wahre_katastrophe');
    }

    if (Q.kaiser_restored === 1
        && (Q.year || 0) >= 1932
        && Q.president_party === 'DNVP'
        && (Q.unemployed || 0) < 4
        && (Q.inflation || 0) < 5
        && (Q.budget || 0) > 0) {
        window._fireAchievement('Deutschnationale Revolution',
            'Have the Kaiser or Kaiserin restored, win the 1932 presidential election, and achieve the requirements of Wirtschaftswunder.',
            'img/ach_deutschnationale_revolution.png', 'deutschnationale_revolution');
    }

    if (Q.cvp_formed === 1) {
        window._fireAchievement('Ein Ende des Kulturkampfes?',
            'Form a Christian people\'s party with the Zentrum and BVP.',
            'img/ach_kulturkampf.png', 'kulturkampf');
    }

    var weimarShare = ((Q.spd_normalized || 0) + (Q.z_normalized || 0) + (Q.ddp_normalized || 0)) * 100;
    if (weimarShare > 0 && weimarShare < 25) {
        window._fireAchievement('Nationalist oder Sozialist',
            'Have the Weimar parties get less than 25% of the vote.',
            'img/ach_nationalist.png', 'nationalist_oder_sozialist');
    }

    if ((Q.spd_r || 0) > 50) {
        window._fireAchievement('Rote Flut',
            'The SPD achieves a majority in the Reichstag.',
            'img/ach_rote_flut.png', 'rote_flut');
    }

    if (Q.cvp_formed === 1
        && Q.dnvp_leader_last_name === 'Lambach'
        && Q.z_leader === 'Stegerwald'
        && Q.autocratic_monarchy === 1
        && Q.remilitarize === 1
        && Q.embraced_corporatism === 1
        && Q.coop_nsdap === 1
        && Q.cvp_leader === 1) {
        window._fireAchievement('Der neue Chef ist wie der alte',
            'Form the most right-wing CVP possible.',
            'img/ach_triff_den_neuen_chef.png', 'triff_den_neuen_chef');
    }
};

window._checkEndGameAchievements = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;

    if ((Q.unemployed || 0) < 4 && (Q.eco_inflation || 0) < 5 && (Q.eco_budget || 0) > 0) {
        window._fireAchievement('Wirtschaftswunder',
            'At game end, have unemployment <4%, inflation <5%, and a budget surplus.',
            'img/ach_wirtschaftswunder.png', 'wirtschaftswunder');
    }

    var dnvpR = Q.dnvp_r || 0;
    var others = [Q.spd_r||0, Q.kpd_r||0, Q.z_r||0, Q.bvp_r||0, Q.dvp_r||0,
                  Q.ddp_r||0, Q.nsdap_r||0, Q.wp_r||0, Q.rlb_r||0];
    var dnvpLargest = others.every(function(v) { return dnvpR > v; });
    if ((Q.unemployed || 0) > 20 && (Q.eco_health || 100) < 30 && dnvpLargest && dnvpR > 25) {
        window._fireAchievement('Verbrannte Erde',
            'Unemployment above 20%, economic growth below -5%, and the DNVP is largest Reichstag party with >25% at game\'s end.',
            'img/ach_verbrannte_erde.png', 'verbrannte_erde');
    }

    if (Q.embraced_corporatism === 1 && (Q.plan_enact_count || 0) >= 3 && Q.empowered_faction === 4 && Q.welfare_expanded === 1 && (Q.workers_dnvp || 0) >= 40) {
        window._fireAchievement('Konservativer Sozialismus',
            'Fully enact the corporatist plan under the Völkisch wing, expand welfare and worker protections, and DNVP urban worker support is at least 40%.',
            'img/ach_konservativer_sozialismus.png', 'konservativer_sozialismus');
    }
    if (Q.embraced_corporatism === 1 && (Q.plan_enact_count || 0) >= 3 && (Q.empowered_faction === 2 || Q.lambach_won === 1) && Q.welfare_expanded === 1 && (Q.workers_dnvp || 0) >= 40) {
        window._fireAchievement('Christlicher Sozialismus',
            'Fully enact the corporatist plan under Lambach, expand welfare and worker protections, and DNVP urban worker support is at least 40%.',
            'img/ach_christlicher_sozialismus.png', 'christlicher_sozialismus');
    }

    if (Q.dnvp_no_splits === 1 && Q.kvp_formed !== 1 && Q.ndnp_formed !== 1 && Q.cnbl_formed !== 1 && Q.csvd_formed !== 1) {
        window._fireAchievement('Gute Freunde kann niemand trennen',
            'No faction splits from the DNVP for the entire game.',
            'img/ach_gute_freunde.png', 'gute_freunde');
    }

    if (Q.dnvp_left_after_entry === 0 && Q.was_in_government_last_month === 1) {
        window._fireAchievement('Deutschnationale Dominanz',
            'Never leave government after the first time entering.',
            'img/ach_dominanz.png', 'deutschnationale_dominanz');
    }
};

window._tickBlocMeters = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var meterFor = {
        1: 'bloc_agrarian_meter',
        2: 'bloc_industrialist_meter',
        3: 'bloc_labor_meter',
        4: 'bloc_mittelstand_meter'
    };
    var tiers = { 1: 3, 2: 3, 3: 3, 4: 3 };
    if (Q.gov_priority_primary)     tiers[Q.gov_priority_primary] = 1;
    if (Q.gov_priority_secondary_1) tiers[Q.gov_priority_secondary_1] = 2;
    if (Q.gov_priority_secondary_2) tiers[Q.gov_priority_secondary_2] = 2;
    var rate = { 1: -5, 2: -3.3, 3: -2 };
    var mult = (Q.dnvp_in_government === 1) ? 1 : (3 / 5);
    Object.keys(meterFor).forEach(function(n) {
        var key = meterFor[n];
        var current = (Q[key] == null) ? 100 : Q[key];
        Q[key] = Math.max(0, Math.min(100, current + rate[tiers[n]] * mult));
    });
};

window._recomputeBvpFactor = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var f = 1.0;

    if (Q.bavaria_kingdom_restored === 1)     f += 0.40;
    if (Q.bavaria_bvp_federalism_done)        f += 0.14;
    if (Q.bavaria_rfb_crackdown_done)         f += 0.05;
    if (Q.bavaria_stuermer_crackdown_done)    f += 0.05;
    if (Q.bavaria_stahlhelm_bayernwacht_done) f += 0.05;

    var spdV   = Q.spd_votes   || 0;
    var nsdapV = Q.nsdap_votes || 0;
    var spdMult   = Math.max(0.6, Math.min(1.3, 1.0 + (26 - spdV)   * 0.010));
    var nsdapMult = Math.max(0.5, Math.min(1.2, 1.0 + (5  - nsdapV) * 0.012));

    f *= spdMult * nsdapMult;

    Q.bvp_vote_factor = Math.round(f * 100) / 100;
    Q.bvp_votes = Math.max(2.0, Math.min(7.0, Math.round(3.0 * f * 10) / 10));
};

window._normalizePrussiaState = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (Q.last_dnvp_in_prussia === Q.dnvp_in_prussia) return;
    if (Q.dnvp_in_prussia === 1) {
        Q.prussia_police_in_prog = 0;
        Q.prussia_secondary_schooling_in_prog = 0;
        Q.prussia_swr_boycott_in_prog = 0;
        Q.prussia_manor_districts_in_prog = 0;
        Q.prussia_democratization_in_prog = 0;
        Q.prussia_concordat_in_prog = 0;
        Q.prussia_sa_crackdown_in_prog = 0;
        Q.prussia_action_timer = 0;
    } else {
        Q.prussia_students_in_prog = 0;
        Q.prussia_civil_servants_in_prog = 0;
        Q.prussia_dnvp_police_in_prog = 0;
        Q.prussia_church_in_prog = 0;
        Q.prussia_flag_in_prog = 0;
        Q.prussia_action_timer = 0;
        Q.prussia_spd_started = 0;
    }
    Q.last_dnvp_in_prussia = Q.dnvp_in_prussia;
};

window._normalizeDnvpStateExit = function() {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var states = [
        { key: 'bavaria', flag: 'dnvp_in_bavaria', timer: 'bavaria_action_timer', actions: ['rfb_crackdown','stuermer_crackdown','bvp_federalism','stahlhelm_bayernwacht','restore_kingdom','saargrenzdarlehen'] },
        { key: 'saxony', flag: 'dnvp_in_saxony', timer: 'saxony_action_timer', actions: ['trade_unions','volkshaus','reichsbanner','parliamentary_chaos'] },
        { key: 'thuringia', flag: 'dnvp_in_thuringia', timer: 'thuringia_action_timer', actions: ['kpd_prosecutions','nsdap_gau','agriculture','bauhaus'] },
        { key: 'wurttemburg', flag: 'dnvp_in_wurttemburg', timer: 'wurttemburg_action_timer', actions: ['winegrowers','concordat','tagwacht','kpd_crackdown','christian_party'] },
        { key: 'baden', flag: 'dnvp_in_baden', timer: 'baden_action_timer', actions: ['concordat','civil_servants','confessional_schools','austerity'] },
        { key: 'meck', flag: 'dnvp_in_meck', timer: 'meck_action_timer', prefix: 'schwerin', actions: ['junker_estates','rye_subsidies','centralization','agricultural_unions','grand_duke'] }
    ];
    states.forEach(function(s) {
        var lastK = 'last_' + s.flag;
        if (Q[lastK] === Q[s.flag]) return;
        if (Q[s.flag] !== 1) {
            var prefix = s.prefix || s.key;
            s.actions.forEach(function(a) { Q[prefix + '_' + a + '_in_prog'] = 0; });
            Q[s.key + '_queued_action'] = '';
            Q[s.timer] = 0;
        }
        Q[lastK] = Q[s.flag];
    });
};

window._prussiaSpdActions = [
    { flag: 'prussia_police_in_prog',              key: 'prussia_police_done',              dur: 3, regular: true,  news: '<p style="text-indent:1.3em;margin:0;">The <b style="color:var(--spd-color);">SPD</b>\'s <span style="color:#000000;">repub</span><span style="color:#DD0000;">lican</span><span style="color:#FFCC00;">ization</span> of the Prussian police is completed under Carl Severing. An increasing number of officers are being replaced by politically loyal personnel.</p>', bonuses: function(Q) { Q.nationalism = (Q.nationalism || 0) - 4; Q.new_middle_spd = (Q.new_middle_spd || 0) + 2; Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) - 1; Q.new_middle_dvp = (Q.new_middle_dvp || 0) - 1; Q.pro_republic = (Q.pro_republic || 0) + 4; Q.workers_spd = (Q.workers_spd || 0) + 1; Q.spd_left_strength = (Q.spd_left_strength || 0) - 1; Q.prussia_spd_police_count = (Q.prussia_spd_police_count || 0) + 1; } },
    { flag: 'prussia_secondary_schooling_in_prog', key: 'prussia_secondary_schooling_done', dur: 5, regular: true,  news: '<p style="text-indent:1.3em;margin:0;">The Prussian Education Ministry has finished its expansion of secondary schooling for working-class students.</p>', bonuses: function(Q) { Q.budget = (Q.budget || 0) - 1; Q.workers_spd = (Q.workers_spd || 0) + 3; Q.workers_dnvp = (Q.workers_dnvp || 0) - 1; Q.workers_dvp = (Q.workers_dvp || 0) - 1; Q.new_middle_spd = (Q.new_middle_spd || 0) + 1; Q.pro_republic = (Q.pro_republic || 0) + 2; Q.nationalism = (Q.nationalism || 0) - 2; } },
    { flag: 'prussia_swr_boycott_in_prog',         key: 'prussia_swr_boycott_done',         dur: 2, regular: false, news: '<p style="text-indent:1.3em;margin:0;">The <b style="color:var(--spd-color);">SPD</b>\'s boycott campaign against businesses displaying the <span style="color:#000000;">black</span>-<span style="color:#888888;">white</span>-<span style="color:var(--spd-color);">red</span> flag is over, scoring an important cultural victory.</p>', start_key: 'prussia_swr_boycott_start', start_news: '<p style="text-indent:1.3em;margin:0;">Ahead of the Constitution Day celebrations, Otto Braun has declared a unilateral boycott against the Prussian hotels that would display the <span style="color:#000000;">schwarz</span>-<span style="color:#888888;">weiß</span>-<span style="color:var(--spd-color);">rot</span> flag.</p>', bonuses: function(Q) { Q.nationalism = (Q.nationalism || 0) - 3; Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) - 1; Q.suspicion = (Q.suspicion || 0) + 2; } },
    { flag: 'prussia_manor_districts_in_prog',     key: 'prussia_manor_districts_done',     dur: 5, regular: true,  news: '<style>.guts-wrap{position:relative;display:inline;cursor:help;text-decoration:underline dotted;}.guts-wrap .guts-tip{display:none;position:absolute;top:125%;left:50%;transform:translateX(-50%);background:#fff;border:2px solid #000;padding:8px;width:240px;font-size:0.85em;text-align:center;z-index:100;box-shadow:2px 2px 6px rgba(0,0,0,0.2);font-style:normal;}.guts-wrap:hover .guts-tip{display:block;}</style><p style="text-indent:1.3em;margin:0;">Prussia\'s <span class="guts-wrap"><i>Gutsbezirke</i><span class="guts-tip">Manor districts are those rural estates governed directly by the landowner.</span></span> are being dissolved under Albert Grzesinski, ending the manorial system and absorbing the estates into ordinary municipal districts.</p>', bonuses: function(Q) { Q.old_middle_dnvp = (Q.old_middle_dnvp || 0) - 1; Q.rural_kpd = (Q.rural_kpd || 0) + 1; Q.rural_spd = (Q.rural_spd || 0) + 3; Q.rural_dnvp = (Q.rural_dnvp || 0) - 1; Q.nationalism = (Q.nationalism || 0) - 2; Q.industry_support = (Q.industry_support || 0) - 6; } },
    { flag: 'prussia_democratization_in_prog',     key: 'prussia_democratization_done',     dur: 6, regular: true,  news: '<p style="text-indent:1.3em;margin:0;">The <b style="color:var(--spd-color);">SPD</b>-led purge of the Prussian civil service concludes, with <span style="color:#3E88B3;">nationalist</span> bureaucrats replaced by <span style="color:#000000;">re</span><span style="color:#DD0000;">pub</span><span style="color:#FFCC00;">lican</span> appointees.</p>', bonuses: function(Q) { Q.new_middle_spd = (Q.new_middle_spd || 0) + 2; Q.workers_spd = (Q.workers_spd || 0) + 1; Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) - 2; Q.new_middle_dvp = (Q.new_middle_dvp || 0) - 1; Q.pro_republic = (Q.pro_republic || 0) + 4; Q.nationalism = (Q.nationalism || 0) - 4; Q.suspicion = (Q.suspicion || 0) + 4; Q.prussia_democratization_count = (Q.prussia_democratization_count || 0) + 1; } },
    { flag: 'prussia_concordat_in_prog',           key: 'prussia_concordat_done',           dur: 8, regular: false, news: '<p style="text-indent:1.3em;margin:0;">The Prussian Concordat is signed, formalizing the rights of the Catholic Church in Prussia and binding the <b style="color:var(--spd-color);">SPD</b> closer to the <b style="color:var(--z-color);">Zentrum</b>.</p>', start_key: 'prussia_concordat_start', start_news: '<p style="text-indent:1.3em;margin:0;">The Prussian government has begun negotiations with the <span style="color:#DAA520;">Holy See</span> for a state concordat, marking a rapprochement between the <b style="color:var(--spd-color);">SPD</b> and the <b style="color:var(--z-color);">Zentrum</b>.</p>', bonuses: function(Q) { Q.z_relation = (Q.z_relation || 0) - 12; Q.catholics_dnvp = (Q.catholics_dnvp || 0) - 3; Q.catholics_spd = (Q.catholics_spd || 0) + 4; Q.catholics_z = (Q.catholics_z || 0) + 1; Q.pro_republic = (Q.pro_republic || 0) + 4; Q.nationalism = (Q.nationalism || 0) - 4; } },
    { flag: 'prussia_sa_crackdown_in_prog',        key: 'prussia_sa_crackdown_done',        dur: 3, regular: false, news: '<p style="text-indent:1.3em;margin:0;">The Prussian Interior Ministry under Carl Severing completes its ban on the <b style="color:#5A2E0C;">SA</b>, with state police now actively suppressing brownshirt activity.</p>', start_key: 'prussia_sa_crackdown_start', start_news: '<p style="text-indent:1.3em;margin:0;">Carl Severing has issued an order to the Prussian Interior Ministry to begin proceedings against the <b style="color:#5A2E0C;">SA</b>, in response to escalating brownshirt violence on the streets.</p>' }
];

window._nsdapStateActions = [
    { id: 'nazification', label: 'Civil Service Nazification', img: 'img/nsdap_nazification.jpg', dur: 3, description: 'The <b style="color:#954B00;">Nazis</b> are purging <span style="color:#000;">re</span><span style="color:#DD0000;">pub</span><span style="color:#FFCC00;">lican</span> officials from the state bureaucracy, and replacing them with loyalists answering to the <i>Gauleitung</i>.', bonuses: function(Q) { Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) - 2; Q.new_middle_nsdap = (Q.new_middle_nsdap || 0) + 3; Q.new_middle_dvp = (Q.new_middle_dvp || 0) - 1; Q.new_middle_ddp = (Q.new_middle_ddp || 0) - 1; Q.pro_republic = (Q.pro_republic || 0) - 3; Q.nationalism = (Q.nationalism || 0) + 3; } },
    { id: 'ordinances', label: 'Anti-Jewish Ordinances', img: 'img/nsdap_ordinances.jpg', dur: 4, description: 'The <b style="color:#954B00;">Nazi</b> state governments are issuing ordinances targeting Jewish populations, which include barring lawyers from their occupations and enforcing kosher slaughter bans.', bonuses: function(Q) { Q.new_middle_ddp = (Q.new_middle_ddp || 0) - 3; Q.old_middle_nsdap = (Q.old_middle_nsdap || 0) + 2; Q.rural_nsdap = (Q.rural_nsdap || 0) + 1; Q.volkisch_strength = (Q.volkisch_strength || 0) + 4; Q.pro_republic = (Q.pro_republic || 0) - 3; Q.suspicion = (Q.suspicion || 0) + 3; } },
    { id: 'arrests', label: 'Anti-Marxist Arrests', img: 'img/nsdap_arrests.jpg', dur: 4, description: 'State police under <b style="color:#954B00;">Nazi</b> directives are systematically rounding up <span style="color:var(--kpd-color);">Communist</span> and <span style="color:#c00000;">Socialist</span> organizers.', bonuses: function(Q) { Q.workers_kpd = (Q.workers_kpd || 0) - 1; Q.workers_spd = (Q.workers_spd || 0) - 1; Q.workers_nsdap = (Q.workers_nsdap || 0) + 1; Q.unemployed_nsdap = (Q.unemployed_nsdap || 0) + 2; Q.spd_left_strength = (Q.spd_left_strength || 0) + 2; Q.volkisch_strength = (Q.volkisch_strength || 0) + 2; Q.pro_republic = (Q.pro_republic || 0) - 3; } },
    { id: 'university', label: 'Anti-University Action', img: 'img/nsdap_university.jpg', dur: 4, description: 'The <b style="color:#954B00;">Nazi</b>-led state governments are dismissing known <span style="color:#000;">re</span><span style="color:#DD0000;">pub</span><span style="color:#FFCC00;">lican</span> professors from the state universities and forcefully dissolving <span style="color:var(--spd-color);">leftist</span> student associations.', bonuses: function(Q) { Q.new_middle_dnvp = (Q.new_middle_dnvp || 0) - 2; Q.new_middle_nsdap = (Q.new_middle_nsdap || 0) + 3; Q.new_middle_ddp = (Q.new_middle_ddp || 0) - 2; Q.volkisch_strength = (Q.volkisch_strength || 0) + 3; Q.pro_republic = (Q.pro_republic || 0) - 3; } }
];

(function() {
    var stateFlagPrefix = { prussia: 'prussia', bavaria: 'bavaria', saxony: 'saxony', thuringia: 'thuringia', wurttemburg: 'wurttemburg', baden: 'baden', meckschwer: 'meck' };
    var gauleiter = {
        prussia: 'Hermann Göring',
        bavaria: 'Ritter von Epp',
        saxony: 'Martin Mutschmann',
        thuringia: 'Wilhelm Frick',
        wurttemburg: 'Wilhelm Murr',
        baden: 'Heinrich Wagner',
        meckschwer: 'Walter Granzow'
    };
    Object.keys(stateFlagPrefix).forEach(function(sKey) {
        if (!window._stateActions[sKey]) return;
        var prefix = stateFlagPrefix[sKey];
        var person = gauleiter[sKey] || 'NSDAP Gauleitung';
        window._nsdapStateActions.forEach(function(act) {
            window._stateActions[sKey].actions.push({
                flag: prefix + '_nsdap_' + act.id + '_in_prog',
                label: act.label,
                description: act.description,
                img: act.img,
                person: person,
                person_party: 'NSDAP',
                duration: act.dur
            });
        });
    });
})();

window._nsdapInCoalition = function(state) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    if (Q['in_nsdap_coalition_' + state] === 1) return true;
    if (state === 'prussia' && (Q.in_far_right_coalition_prussia === 1 || Q.in_far_right_coalition_prussia_dvp === 1)) return true;
    if (state === 'bavaria' && Q.in_far_right_coalition_bavaria === 1) return true;
    if (state === 'thuringia' && Q.in_right_coalition_thuringia === 1) return true;
    if (state === 'wurttemburg' && Q.in_right_bloc_wurttemburg === 1) return true;
    var _bp = { prussia: 'prussia', bavaria: 'bav', saxony: 'sax', wurttemburg: 'wrt', baden: 'bad' };
    var _pre = _bp[state];
    if (_pre && Q['in_custom_coalition_' + state] === 1) {
        var _list = String(Q[_pre + '_builder_partners'] || '').split(',');
        for (var _k = 0; _k < _list.length; _k++) { if (_list[_k] === 'nsdap') return true; }
    }
    return false;
};

if (!window._consoleCmdInit) {
    window._consoleCmdInit = true;
    var _isLocal = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '');
    if (_isLocal) {
        document.addEventListener('keydown', function(e) {
            if (e.key !== '`' && e.key !== '\\') return;
            var t = e.target;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
            e.preventDefault();
            var Q = window.dendryUI.dendryEngine.state.qualities;
            if (e.key === '`') {
                var v = prompt('Q variable name:');
                if (!v) return;
                v = v.trim();
                var current = Q[v];
                var disp = (current === undefined ? '(undefined)' : String(current));
                var n = prompt(v + ' = ' + disp + '\n\nEnter new value (or Cancel to leave unchanged):', current === undefined ? '' : String(current));
                if (n === null) return;
                var parsed = (n === '' ? '' : (isNaN(Number(n)) ? n : Number(n)));
                Q[v] = parsed;
                if (window._currentStateKey && window._renderStatePanel) window._renderStatePanel(window._currentStateKey);
                if (window._refreshBulletin) window._refreshBulletin();
                alert(v + ' set to ' + parsed);
            } else if (e.key === '\\') {
                var sceneId = prompt('Jump to scene id:');
                if (!sceneId) return;
                try { window.dendryUI.dendryEngine.goToScene(sceneId.trim()); }
                catch (err) { alert('Failed: ' + err.message); }
            }
        });
    }
}

window._triggerPrussiaSpecial = function(key) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var special = window._prussiaSpdActions.filter(function(a) { return a.key === key; })[0];
    if (!special || special.regular) return;
    if (Q[special.flag] === 1) return;
    var running = window._prussiaSpdActions.filter(function(a) { return Q[a.flag] === 1 && a.regular; })[0];
    if (running) {
        Q.prussia_paused_flag = running.flag;
        Q.prussia_paused_timer = Q.prussia_action_timer || 0;
        Q[running.flag] = 0;
    }
    Q[special.flag] = 1;
    Q.prussia_action_timer = special.dur;
    Q['news_' + special.start_key] = special.start_news;
    Q['news_' + special.start_key + '_month'] = (Q.year || 0) * 100 + (Q.month || 0);
};
window._updatePrussiaReform = function() {
    var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state && window.dendryUI.dendryEngine.state.qualities;
    if (!Q) return 0;
    var done = (Q.prussia_students_done ? 1 : 0) + (Q.prussia_civil_servants_done ? 1 : 0) + (Q.prussia_police_done ? 1 : 0) + (Q.prussia_church_done ? 1 : 0) + (Q.prussia_flag_done ? 1 : 0);
    Q.prussia_reform_count = done;
    Q.prussia_system = (done >= 4) ? 2 : (done >= 2 ? 1 : 0);
    return done;
};

  window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('library')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('library');
    }
  };
  var inAchievements = false;

window.showAchievements = function() {
    if (inAchievements) return;
    inAchievements = true;
    var link = document.querySelector('#achievements-link');
    if (link) {
        link.style.opacity = '0.5';
        link.style.pointerEvents = 'none';
        link.style.cursor = 'default';
    }
    window.dendryUI.dendryEngine.goToScene('achievements');
};

window.enableAchievementsLink = function() {
    inAchievements = false;
    var link = document.querySelector('#achievements-link');
    if (link) {
        link.style.opacity = '1';
        link.style.pointerEvents = '';
        link.style.cursor = 'pointer';
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
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
  };

  window.enableImages = function() {
      window.dendryUI.show_portraits = true;
      window.dendryUI.saveSettings();
  };

  window.disableImages = function() {
      window.dendryUI.show_portraits = false;
      window.dendryUI.saveSettings();
  };

  window.enableGermanPop = function() {
      if (localStorage.getItem('dnvp_pop_unlocked') !== '1') return;
      localStorage.setItem('dnvp_music_german_pop', '1');
      if (window._setMusicCategory) window._setMusicCategory('german_pop');
  };
  window.disableGermanPop = function() {
      if (localStorage.getItem('dnvp_pop_unlocked') !== '1') return;
      localStorage.setItem('dnvp_music_german_pop', '0');
      if (window._setMusicCategory) window._setMusicCategory('patriotic');
  };

  window.enableLightMode = function() {
      window.dendryUI.dark_mode = false;
      document.body.classList.remove('dark-mode');
      window.dendryUI.saveSettings();
      try { localStorage.setItem('dnvp_dark_mode', '0'); } catch (e) {}
  };

  window._kbDefaults = { enabled: true, executive: 'E', laender: 'L', skip: 'S' };
  window._kbLoad = function() {
      try {
          var raw = localStorage.getItem('dnvp_keybinds');
          if (!raw) return Object.assign({}, window._kbDefaults);
          var s = JSON.parse(raw);
          return {
              enabled: s.enabled !== false,
              executive: (s.executive || 'E').toUpperCase().slice(0, 1),
              laender: (s.laender || 'L').toUpperCase().slice(0, 1),
              skip: (s.skip || 'S').toUpperCase().slice(0, 1)
          };
      } catch (e) {
          return Object.assign({}, window._kbDefaults);
      }
  };
  window._kbSave = function(s) {
      try { localStorage.setItem('dnvp_keybinds', JSON.stringify(s)); } catch (e) {}
  };
  window._kbSettings = window._kbLoad();
  window._kbUpdateRowVisibility = function() {
      var on = !!(window._kbSettings && window._kbSettings.enabled);
      var rowE = document.getElementById('row_kb_executive');
      var rowL = document.getElementById('row_kb_laender');
      var rowS = document.getElementById('row_kb_skip');
      if (rowE) rowE.style.display = on ? '' : 'none';
      if (rowL) rowL.style.display = on ? '' : 'none';
      if (rowS) rowS.style.display = on ? '' : 'none';
  };
  window.enableKeybinds = function() {
      window._kbSettings.enabled = true;
      window._kbSave(window._kbSettings);
      window._kbUpdateRowVisibility();
  };
  window.disableKeybinds = function() {
      window._kbSettings.enabled = false;
      window._kbSave(window._kbSettings);
      window._kbUpdateRowVisibility();
  };
  window.setExecutiveKey = function(v) {
      var k = (v || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 1);
      if (!k) return;
      window._kbSettings.executive = k;
      window._kbSave(window._kbSettings);
      var el = document.getElementById('kb_executive_input');
      if (el && el.value !== k) el.value = k;
  };
  window.setLaenderKey = function(v) {
      var k = (v || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 1);
      if (!k) return;
      window._kbSettings.laender = k;
      window._kbSave(window._kbSettings);
      var el = document.getElementById('kb_laender_input');
      if (el && el.value !== k) el.value = k;
  };
  window.setSkipKey = function(v) {
      var k = (v || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 1);
      if (!k) return;
      window._kbSettings.skip = k;
      window._kbSave(window._kbSettings);
      var el = document.getElementById('kb_skip_input');
      if (el && el.value !== k) el.value = k;
  };
  window.enableDarkMode = function() {
      window.dendryUI.dark_mode = true;
      document.body.classList.add('dark-mode');
      window.dendryUI.saveSettings();
      try { localStorage.setItem('dnvp_dark_mode', '1'); } catch (e) {}
  };

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
    var kb = window._kbSettings || window._kbLoad();
    if ($('#keybinds_yes')[0]) $('#keybinds_yes')[0].checked = !!kb.enabled;
    if ($('#keybinds_no')[0]) $('#keybinds_no')[0].checked = !kb.enabled;
    var kbe = document.getElementById('kb_executive_input');
    if (kbe) kbe.value = kb.executive || 'E';
    var kbl = document.getElementById('kb_laender_input');
    if (kbl) kbl.value = kb.laender || 'L';
    var kbs = document.getElementById('kb_skip_input');
    if (kbs) kbs.value = kb.skip || 'S';
    if (window._kbUpdateRowVisibility) window._kbUpdateRowVisibility();

    var popUnlocked = localStorage.getItem('dnvp_pop_unlocked') === '1';
    var popRow = document.getElementById('row_germanpop');
    if (popRow) popRow.style.display = popUnlocked ? '' : 'none';
    if (popUnlocked) {
        if (localStorage.getItem('dnvp_music_german_pop') === '1') {
            if ($('#germanpop_yes')[0]) $('#germanpop_yes')[0].checked = true;
        } else {
            if ($('#germanpop_no')[0]) $('#germanpop_no')[0].checked = true;
        }
    } else {
        if (localStorage.getItem('dnvp_music_german_pop') === '1') {
            localStorage.setItem('dnvp_music_german_pop', '0');
        }
    }
  };


  window._customSaves = (function() {
      var META_KEY = 'dnvp_save_meta';
      var MANUAL_SLOTS = 24;
      var SLOTS_PER_PAGE = 8;
      var AUTO_SLOTS = ['auto_a', 'auto_b', 'auto_c', 'auto_d'];
      var LAST_EVENT_SLOT = 'auto_a';
      var TIMED_AUTO_SLOTS = ['auto_b', 'auto_c', 'auto_d'];
      var AUTO_INTERVAL_MONTHS = 4;
      var MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      function manualSlotId(i) { return 'm' + i; }
      function loadMeta() {
          try {
              var raw = localStorage.getItem(META_KEY);
              if (!raw) return { manual: {}, auto: {}, auto_next: 0, last_auto_ym: 0 };
              var m = JSON.parse(raw);
              m.manual = m.manual || {};
              m.auto = m.auto || {};
              if (typeof m.auto_next !== 'number') m.auto_next = 0;
              if (typeof m.last_auto_ym !== 'number') m.last_auto_ym = 0;
              return m;
          } catch (e) {
              return { manual: {}, auto: {}, auto_next: 0, last_auto_ym: 0 };
          }
      }
      function saveMeta(m) { localStorage.setItem(META_KEY, JSON.stringify(m)); }
      function currentYM() {
          var q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state ? window.dendryUI.dendryEngine.state.qualities : null;
          if (!q) return 0;
          return (q.year || 0) * 12 + (q.month || 0);
      }
      function writeSlot(slotId, name) {
          var state = window.dendryUI.dendryEngine.state;
          var q = state.qualities;
          var scene = state.sceneId || '';
          window.dendryUI.saveSlot(slotId);
          return { name: name, year: q.year || 0, month: q.month || 0, scene: scene, ts: Date.now() };
      }
      function clearSlot(slotId) {
          var prefix = window.dendryUI && window.dendryUI.save_prefix;
          if (prefix) localStorage.removeItem(prefix + '_' + slotId);
      }
      function monthLabel(m) { return MONTH_NAMES[m] || '?'; }

      return {
          MANUAL_SLOTS: MANUAL_SLOTS,
          SLOTS_PER_PAGE: SLOTS_PER_PAGE,
          AUTO_SLOTS: AUTO_SLOTS,
          monthLabel: monthLabel,
          list: function() {
              var meta = loadMeta();
              var manual = [];
              for (var i = 0; i < MANUAL_SLOTS; i++) manual.push(meta.manual[manualSlotId(i)] || null);
              var auto = AUTO_SLOTS.map(function(s) { return meta.auto[s] || null; });
              return { manual: manual, auto: auto };
          },
          saveManual: function(i, name) {
              if (i < 0 || i >= MANUAL_SLOTS) return;
              var slotId = manualSlotId(i);
              var entry = writeSlot(slotId, name);
              var meta = loadMeta();
              meta.manual[slotId] = entry;
              saveMeta(meta);
          },
          loadManual: function(i) {
              var slotId = manualSlotId(i);
              var meta = loadMeta();
              if (!meta.manual[slotId]) return false;
              window.dendryUI.loadSlot(slotId);
              try {
                  var q = window.dendryUI.dendryEngine.state.qualities;
                  meta.last_auto_ym = (q && q.year && q.month) ? q.year * 12 + q.month : 0;
                  if (q) { q.current_news = ''; q.internal_news = ''; }
              } catch (e) { meta.last_auto_ym = 0; }
              saveMeta(meta);
              if (window._setupGameUI) { try { window._setupGameUI(); } catch (e) {} }
              return true;
          },
          deleteManual: function(i) {
              var slotId = manualSlotId(i);
              var meta = loadMeta();
              delete meta.manual[slotId];
              saveMeta(meta);
              clearSlot(slotId);
          },
          renameManual: function(i, name) {
              var slotId = manualSlotId(i);
              var meta = loadMeta();
              if (meta.manual[slotId]) { meta.manual[slotId].name = name; saveMeta(meta); }
          },
          loadAuto: function(i) {
              var slotId = AUTO_SLOTS[i];
              var meta = loadMeta();
              if (!meta.auto[slotId]) return false;
              window.dendryUI.loadSlot(slotId);
              try {
                  var q = window.dendryUI.dendryEngine.state.qualities;
                  meta.last_auto_ym = (q && q.year && q.month) ? q.year * 12 + q.month : 0;
                  if (q) { q.current_news = ''; q.internal_news = ''; }
              } catch (e) { meta.last_auto_ym = 0; }
              saveMeta(meta);
              if (window._setupGameUI) { try { window._setupGameUI(); } catch (e) {} }
              return true;
          },
          deleteAuto: function(i) {
              var slotId = AUTO_SLOTS[i];
              var meta = loadMeta();
              delete meta.auto[slotId];
              saveMeta(meta);
              clearSlot(slotId);
          },
          renameAuto: function(i, name) {
              var slotId = AUTO_SLOTS[i];
              var meta = loadMeta();
              if (meta.auto[slotId]) { meta.auto[slotId].name = name; saveMeta(meta); }
          },
          exportSlot: function(slotId, name) {
              var prefix = window.dendryUI && window.dendryUI.save_prefix;
              if (!prefix) { alert('No save prefix'); return; }
              var data = localStorage.getItem(prefix + '_' + slotId);
              if (!data) { alert('No save data in this slot'); return; }
              var blob = new Blob([data], { type: 'application/json' });
              var url = URL.createObjectURL(blob);
              var a = document.createElement('a');
              a.href = url;
              a.download = (name || 'save') + '.json';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
          },
          clearAll: function() {
              var prefix = window.dendryUI && window.dendryUI.save_prefix;
              for (var i = 0; i < MANUAL_SLOTS; i++) {
                  if (prefix) localStorage.removeItem(prefix + '_' + manualSlotId(i));
              }
              for (var k = 0; k < AUTO_SLOTS.length; k++) {
                  if (prefix) localStorage.removeItem(prefix + '_' + AUTO_SLOTS[k]);
              }
              localStorage.removeItem(META_KEY);
          },
          autosaveIfDue: function() {
              var note = function(msg) {
                  window._lastAutosaveAttempt = { ts: Date.now(), result: msg };
                  try { console.log('[autosave]', msg); } catch (e) {}
              };
              if (!window.dendryUI || !window.dendryUI.dendryEngine) { note('no engine'); return; }
              var q = window.dendryUI.dendryEngine.state.qualities;
              if (!q || !q.year || !q.month) { note('no year/month'); return; }
              var curYM = q.year * 12 + q.month;
              var meta = loadMeta();
              var hasTimed = false;
              for (var ck = 0; ck < TIMED_AUTO_SLOTS.length; ck++) {
                  if (meta.auto[TIMED_AUTO_SLOTS[ck]]) { hasTimed = true; break; }
              }
              if (!hasTimed) meta.last_auto_ym = 0;
              var diff = curYM - meta.last_auto_ym;
              if (meta.last_auto_ym && diff < 0) {
                  note('time went backward (' + diff + ' months); resetting counter');
                  meta.last_auto_ym = 0;
              } else if (meta.last_auto_ym && diff < AUTO_INTERVAL_MONTHS) {
                  note('not due (' + diff + ' months since last)');
                  return;
              }
              var slotIdx = -1;
              for (var ai = 0; ai < TIMED_AUTO_SLOTS.length; ai++) {
                  if (!meta.auto[TIMED_AUTO_SLOTS[ai]]) { slotIdx = ai; break; }
              }
              if (slotIdx < 0) {
                  var oldestTs = Infinity;
                  for (var bi = 0; bi < TIMED_AUTO_SLOTS.length; bi++) {
                      var e = meta.auto[TIMED_AUTO_SLOTS[bi]];
                      if (e && (e.ts || 0) < oldestTs) { oldestTs = e.ts || 0; slotIdx = bi; }
                  }
                  if (slotIdx < 0) slotIdx = 0;
              }
              var slotId = TIMED_AUTO_SLOTS[slotIdx];
              var entry;
              try { entry = writeSlot(slotId, monthLabel(q.month) + ' ' + q.year); }
              catch (e2) { note('save threw: ' + (e2 && e2.message)); return; }
              meta.auto[slotId] = entry;
              meta.last_auto_ym = curYM;
              saveMeta(meta);
              note('saved to ' + slotId);
          },
          saveLastEvent: function() {
              if (!window.dendryUI || !window.dendryUI.dendryEngine) return;
              var state = window.dendryUI.dendryEngine.state;
              var scene = state.sceneId || '';
              if (!scene) return;
              var meta = loadMeta();
              try {
                  var entry = writeSlot(LAST_EVENT_SLOT, scene);
                  meta.auto[LAST_EVENT_SLOT] = entry;
                  saveMeta(meta);
              } catch (e) {}
          },
          forceAutosave: function() {
              var meta = loadMeta();
              meta.last_auto_ym = 0;
              saveMeta(meta);
              this.autosaveIfDue();
          }
      };
  })();

  window._customSavesCurrentPage = 0;

  window._renderCustomSavesDialog = function() {
      var data = window._customSaves.list();
      var page = window._customSavesCurrentPage;
      if (page === 'auto') page = 0;
      var SPP = window._customSaves.SLOTS_PER_PAGE;
      var tabsEl = document.getElementById('custom_save_pages');
      var tableEl = document.getElementById('custom_saves_table');
      if (!tabsEl || !tableEl) return;

      var tabsHtml = '';
      for (var p = 0; p < 3; p++) {
          var active = (page === p);
          tabsHtml += '<button class="b" style="' + (active ? 'font-weight:bold;' : '') + '" onclick="window._customSavesCurrentPage=' + p + ';window._renderCustomSavesDialog();">' + (p + 1) + '</button>';
      }
      tabsEl.innerHTML = tabsHtml;

      function fmtTs(ts) {
          if (!ts) return '';
          try { return new Date(ts).toLocaleString(); } catch (e) { return ''; }
      }
      function escAttr(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
      function buildRow(label, save, primaryBtn, deleteBtn, exportBtn, renameHandler) {
          var info;
          var cellTitle = '';
          if (save) {
              var titleSrc;
              var label2;
              var sceneTip = save.scene || '';
              var igTip = save.year ? (window._customSaves.monthLabel(save.month) + ' ' + save.year) : '';
              var customNamed = save.name && save.name !== sceneTip;
              if (customNamed) {
                  label2 = String(save.name);
                  titleSrc = sceneTip || '';
              } else {
                  label2 = sceneTip || (save.name || '(unnamed)');
                  titleSrc = '';
              }
              cellTitle = titleSrc;
              var realDate = save.ts ? ' (' + fmtTs(save.ts) + ')' : '';
              var onclickAttr = renameHandler ? ' onclick="' + escAttr(renameHandler) + '"' : '';
              var hoverAttr = renameHandler ? ' style="cursor:pointer;"' : '';
              var dataTipAttr = cellTitle ? ' data-tip="' + escAttr(cellTitle) + '"' : '';
              info = '<span class="save-info-text"' + hoverAttr + dataTipAttr + onclickAttr + '>' + label2 + realDate + '</span>';
          } else {
              info = 'Empty';
          }
          return '<tr>'
               + '<td style="min-width:60px;white-space:nowrap;">' + label + '</td>'
               + '<td>' + primaryBtn + '</td>'
               + '<td>' + deleteBtn + '</td>'
               + '<td class="save_info" style="width:100%;">' + info + '</td>'
               + '<td style="text-align:right;">' + exportBtn + '</td>'
               + '</tr>';
      }
      var rowsHtml = '';

      for (var i = 0; i < data.auto.length; i++) {
          var save = data.auto[i];
          var primary, del, exp, rename;
          if (save) {
              var nameJson = JSON.stringify(save.name || '');
              var expName = JSON.stringify(save.name || ('auto_' + (i + 1)));
              primary = '<button class="b" onclick="window._customSaves.loadAuto(' + i + ');">Load</button>';
              del = '<button class="b" onclick="window._customSaves.deleteAuto(' + i + ');window._renderCustomSavesDialog();">Delete</button>';
              exp = '<button class="b" onclick="' + escAttr('window._customSaves.exportSlot(window._customSaves.AUTO_SLOTS[' + i + '], ' + expName + ');') + '">Export</button>';
              rename = 'var n=prompt(\'New name:\',' + nameJson + ');if(n!==null){window._customSaves.renameAuto(' + i + ',n);window._renderCustomSavesDialog();}';
          } else {
              primary = '<button class="b" disabled>Save</button>';
              del = '<button class="b" disabled>Delete</button>';
              exp = '<button class="b" disabled>Export</button>';
              rename = null;
          }
          rowsHtml += buildRow('Auto-' + (i + 1), save, primary, del, exp, rename);
      }

      var start = page * SPP;
      for (var j = start; j < start + SPP; j++) {
          var save = data.manual[j];
          var primary, del, exp, rename;
          if (save) {
              var nameJson = JSON.stringify(save.name || '');
              var expName = JSON.stringify(save.name || ('save_' + (j + 1)));
              primary = '<button class="b" onclick="window._customSaves.loadManual(' + j + ');">Load</button>';
              del = '<button class="b" onclick="window._customSaves.deleteManual(' + j + ');window._renderCustomSavesDialog();">Delete</button>';
              exp = '<button class="b" onclick="' + escAttr('window._customSaves.exportSlot(\'m' + j + '\', ' + expName + ');') + '">Export</button>';
              rename = 'var n=prompt(\'New name:\',' + nameJson + ');if(n!==null){window._customSaves.renameManual(' + j + ',n);window._renderCustomSavesDialog();}';
          } else {
              primary = '<button class="b" onclick="var def=(window.dendryUI&&window.dendryUI.dendryEngine&&window.dendryUI.dendryEngine.state.sceneId)||\'\';var n=prompt(\'Save name:\',def);if(n!==null){window._customSaves.saveManual(' + j + ',n);window._renderCustomSavesDialog();}">Save</button>';
              del = '<button class="b" disabled>Delete</button>';
              exp = '<button class="b" disabled>Export</button>';
              rename = null;
          }
          rowsHtml += buildRow(String(j + 1), save, primary, del, exp, rename);
      }
      tableEl.innerHTML = rowsHtml;
  };

  (function() {
      var tryHook = function() {
          if (!window.dendryUI || !window.dendryUI.showSaveSlots) {
              setTimeout(tryHook, 50);
              return;
          }
          var orig = window.dendryUI.showSaveSlots.bind(window.dendryUI);
          window.dendryUI.showSaveSlots = function() {
              orig();
              window._renderCustomSavesDialog();
          };
      };
      tryHook();
  })();

  window.displayText = function(text) {
      return text;
  };

  window.handleSignal = function(signal, event, scene_id) {
  };

  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
        window.dendryUI.autosave();
        if (window._customSaves && window._customSaves.saveLastEvent) {
            try { window._customSaves.saveLastEvent(); } catch (e) {}
        }
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
  };

  window.updateSidebar = function() {
      $('#qualities').empty();
      var scene = dendryUI.game.scenes[window.statusTab];
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.changeTab = function(newTab, tabId) {
      if (tabId == 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
          window.alert('Polls are not available in historical mode.');
          return;
      }
      var tabButton = document.getElementById(tabId);
      var tabButtons = document.getElementsByClassName('tab_button');
      for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
      }
      tabButton.className += ' active';
      window.statusTab = newTab;
      window.updateSidebar();
  };

  window.onDisplayContent = function() {
      window.updateSidebar();

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
window._decorateChoices = function() {
    (function() {
        var state = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state;
        var sid = state && state.sceneId;
        if (sid && sid !== window._lastSeenSceneId) {
            window._lastSeenSceneId = sid;
            document.body.classList.remove('news-open');
            document.body.classList.remove('advisors-open');
        }
    })();

    var criticalTitles = {
        'The Second World War': 'ww2-notification'
    };
    var rows = document.querySelectorAll('ul.choices li');
    rows.forEach(function(li) {
        var text = li.textContent || '';
        Object.keys(criticalTitles).forEach(function(title) {
            if (text.indexOf(title) !== -1 && !li.classList.contains(criticalTitles[title])) {
                li.classList.add(criticalTitles[title]);
            }
        });
    });


    (function() {
        var _state = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state;
        if (!_state || _state.sceneId !== 'laender_menu') return;
        var _Q = _state.qualities;
        if (!_Q) return;
        var stateMatchers = [
            { match: 'Prussia',             control: 'dnvp_in_prussia',     timer: 'prussia_action_timer' },
            { match: 'Bavaria',             control: 'dnvp_in_bavaria',     timer: 'bavaria_action_timer' },
            { match: 'Saxony',              control: 'dnvp_in_saxony',      timer: 'saxony_action_timer' },
            { match: 'Thuringia',           control: 'dnvp_in_thuringia',   timer: 'thuringia_action_timer' },
            { match: 'Württemberg',         control: 'dnvp_in_wurttemburg', timer: 'wurttemburg_action_timer' },
            { match: 'Baden',               control: 'dnvp_in_baden',       timer: 'baden_action_timer' },
            { match: 'Mecklenburg-Schwerin',control: 'dnvp_in_meck',        timer: 'meck_action_timer' }
        ];
        document.querySelectorAll('ul.choices > li').forEach(function(li) {
            var text = li.textContent || '';
            for (var i = 0; i < stateMatchers.length; i++) {
                var s = stateMatchers[i];
                if (text.indexOf(s.match) === -1) continue;
                var ready = _Q[s.control] === 1 && (_Q[s.timer] || 0) === 0;
                li.classList.toggle('state-action-available', ready);
                li.classList.toggle('state-action-unavailable', !ready);
                break;
            }
        });
    })();

    var q = window.dendryUI && window.dendryUI.dendryEngine
        ? window.dendryUI.dendryEngine.state.qualities
        : null;
    if (!q) return;

    var factionClass = {
        1: 'empowered-authcon',
        2: 'empowered-christsoc',
        3: 'empowered-volkskons',
        4: 'empowered-volkisch'
    }[q.empowered_faction] || 'empowered-authcon';
    if (!document.body.classList.contains(factionClass)) {
        document.body.className = document.body.className
            .replace(/\bempowered-\w+\b/g, '')
            .trim();
        document.body.classList.add(factionClass);
    }

    var advisorMap = {
    'westarp':           ['authcon',    'leader'],
    'hugenberg':         ['authcon',    'leader'],
    'thyssen':           ['authcon',    'deputy', 'right'],
    'schmidt_hannover':  ['authcon',    'deputy', 'left'],
    'hugenberg_volkisch': ['volkisch',   'deputy'],
    'quaatz':            ['authcon',    'deputy', 'right'],
    'lambach':           ['christsoc',  'leader'],
    'treviranus':        ['volkskons',  'leader'],
    'lejeune_jung':      ['volkskons',  'leader'],
    'lejeune_jung_deputy': ['volkskons', 'deputy', 'right'],
    'gayl':              ['volkskons',  'leader'],
    'hartwig':           ['christsoc',  'deputy', 'right'],
    'hartwig_leader':    ['christsoc',  'leader'],
    'annegrete':         ['volkisch',   'leader'],
    'hugenberg_authcon': ['authcon', 'deputy', 'right'],
    'hergt':             ['authcon',    'leader'],
    'seldte':            ['authcon',    'leader'],
    'behm':              ['christsoc',  'leader'],
    'ullmann':           ['volkskons',  'leader'],
    'class':             ['volkisch',   'leader'],
    'bang':              ['volkisch',   'leader'],

    };

    document.querySelectorAll('a.card[card-id]').forEach(function(card) {
    var id = card.getAttribute('card-id');
    var entry = advisorMap[id];
    if (entry) {
        if (card.getAttribute('data-faction') !== entry[0]) {
            card.setAttribute('data-faction', entry[0]);
        }
        if (card.getAttribute('data-role') !== entry[1]) {
            card.setAttribute('data-role', entry[1]);
        }
        if (entry[2] && card.getAttribute('data-deputy-side') !== entry[2]) {
            card.setAttribute('data-deputy-side', entry[2]);
        }
        if (card.parentElement && card.parentElement.tagName === 'LI') {
            if (card.parentElement.getAttribute('data-faction') !== entry[0]) {
                card.parentElement.setAttribute('data-faction', entry[0]);
            }
            if (card.parentElement.getAttribute('data-role') !== entry[1]) {
                card.parentElement.setAttribute('data-role', entry[1]);
            }
            if (entry[2] && card.parentElement.getAttribute('data-deputy-side') !== entry[2]) {
                card.parentElement.setAttribute('data-deputy-side', entry[2]);
            }
        }
    }

    var switcher = document.querySelector('ul.pinned-cards li.pinned-card:has(a.card[card-id="advisor_switcher"])');
var decksUl = document.querySelector('ul.decks');
if (switcher && decksUl && switcher.parentElement !== decksUl) {
    switcher.className = 'deck';
    decksUl.appendChild(switcher);
}

window._injectExecutiveCard = function() {
    var handUl = document.querySelector('ul.hand');
    if (!handUl) return;
    if (handUl.querySelector('li.executive-fixed')) {
        handUl.classList.add('has-executive');
        return;
    }
    var stale = document.querySelector('ul.pinned-cards li.pinned-card:has(a.card[card-id="executive"])');
    if (stale) stale.remove();
    var li = document.createElement('li');
    li.className = 'card-in-hand executive-fixed';
    var a = document.createElement('a');
    a.className = 'card';
    a.setAttribute('href', '#');
    a.setAttribute('card-id', 'executive');
    a.setAttribute('title', 'Executive');
    var img = document.createElement('img');
    img.className = 'card-img';
    img.src = 'img/executive1.png';
    img.style.filter = 'grayscale(100%)';
    a.appendChild(img);
    var caption = document.createElement('span');
    caption.className = 'card-caption';
    caption.textContent = 'Executive';
    li.appendChild(a);
    li.appendChild(caption);
    handUl.appendChild(li);
    handUl.classList.add('has-executive');
    a.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (window.dendryUI && window.dendryUI.dendryEngine) {
            window.dendryUI.dendryEngine.goToScene('execute');
        }
    });
};
window._injectExecutiveCard();

var switcherCard = document.querySelector('a.card[card-id="advisor_switcher"]');
if (switcherCard && !switcherCard.dataset.clickAttached) {
    switcherCard.dataset.clickAttached = 'true';
    switcherCard.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.dendryUI.dendryEngine.goToScene('advisor_switcher');
    });
}


});

    document.querySelectorAll('ul.pinned-cards a.card[data-role="deputy"]').forEach(function(a) {
        if (!a.hasAttribute('data-click-disabled')) {
            a.setAttribute('data-click-disabled', '1');
            a.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
    });
    ;

    document.querySelectorAll('ul.pinned-cards').forEach(function(ul) {
        var empFactionMatch = document.body.className.match(/empowered-(\w+)/);
        if (!empFactionMatch) return;
        var empFaction = empFactionMatch[1];

        var deputyLi = ul.querySelector('li.pinned-card[data-faction="' + empFaction + '"][data-role="deputy"]');
        var leaderLi = ul.querySelector('li.pinned-card[data-faction="' + empFaction + '"][data-role="leader"]');
        var anchorLi = deputyLi || leaderLi;
        if (!anchorLi) return;

        var nextEl = anchorLi.nextElementSibling;
        if (nextEl && nextEl.classList && nextEl.classList.contains('advisor-row-break')) {
            ul.querySelectorAll('li.advisor-row-break').forEach(function(br) {
                if (br !== nextEl) br.remove();
            });
            return;
        }

        ul.querySelectorAll('li.advisor-row-break').forEach(function(br) {
            br.remove();
        });

        var br = document.createElement('li');
        br.className = 'advisor-row-break';
        anchorLi.parentNode.insertBefore(br, anchorLi.nextSibling);
    });
    var deputyTooltips = {
        'thyssen': {
            body: 'A baron of the steel and iron industry in Germany and a board member of the Reichsbank, Thyssen provides financial support to the <b style="color:var(--dnvp-color);">DNVP</b> and discreetly contributes to the Reichswehr\'s rearmament.<br><br><i>+1 party resource annually</i><br><i>War industry passively increases</i>'
        },
        'lejeune_jung_deputy': {
            body: `Paul Lejeune-Jung is a <span style="color:#000000;">Catholic</span> member of the <b style="color:var(--dnvp-color);">DNVP</b> and economics expert from Silesia, who shares the <span style="color:#90D5FF;">People's Conservatives'</span> support of constructive participation in the Republic.<br><br><i>Actions targeting Catholic <b style="color:var(--dnvp-color);">DNVP</b> support are strengthened.</i><br><i>The Lautenbach Plan is easier to adopt.</i><br><i>Passive boost to <b style="color:var(--z-color);">Zentrum</b> relations.</i>`
        },
            'schmidt_hannover': {
    body: `Otto Schmidt-Hannover is Hugenberg's closest ally and most trusted advisor. As a member of the <b><span style="color:#3E88B3;">Stahlhelm</span></b>, he has deep ties to the <i>Reichswehr</i> and anti-<span style="color:var(--kpd-color);">Communist</span> groups, and ultimately seeks to advance the goal of an authoritarian German government.<br><br><i>Permanent increase in <b><span style="color:#3E88B3;">Stahlhelm</span></b> strength.</i><br><i>Actions targeting <span style="color:var(--kpd-color);">Communist</span> support and militias will be more effective.</i><br><i>The Corporatist Plan will be more effective.</i>`
},
'hartwig': {
    body: `Emil Hartwig is a longtime member of the <b><span style="color:var(--dnvp-color);">DNVP</span></b> and a trade unionist who has been involved in various <span style="color:#DAB1DA;">Christian unions</span> and blue-collar associations throughout his career.<br><br><i>Actions undertaken by the Labor Ministry will be more effective.</i><br><i>Grassroots donations have been permanently increased!</i><br><i>Campaigning among workers is now free.</i><br><i>The labor bloc loses support at a third of the normal rate.</i>`
},
    'quaatz': {
    body: `Reinhold Quaatz was a director of military transport during the Great War and now represents one of Hugenberg's closest associates. As an industrialist and financier, he also brings financial backing to the movement, and supports cooperation with the <b><span style="color:#954B00;">NSDAP</span></b>.<br><br><i>Permanent increase in <b><span style="color:#954B00;">NSDAP</span></b> relations.</i><br><i>+1 party resource per year.</i><br><i><b><span style="color:#06402B;">Völkisch</span></b> dissent ticks down to a low floor.</i>`
},
'hugenberg_volkisch': {
    body: `Alfred Hugenberg, well, is Alfred Hugenberg. Although he is not technically the party chairman, he wields significant power over the <b><span style="color:var(--dnvp-color);">DNVP</span></b></b>'s affairs, and he is able to mobilize his vast media empire in order to serve the party.<br><br><i>+3 resources per year.</i><br><i>Relations with the <b style="color:var(--dvp-color);">DVP</b> and <b style="color:var(--z-color);">Zentrum</b> steadily deteriorate.</i>`
},
'hugenberg_authcon': {
    body: `Alfred Hugenberg, well, is Alfred Hugenberg. Although he is not technically the party chairman, he wields significant power over the <b><span style="color:var(--dnvp-color);">DNVP</span></b></b>'s affairs, and he is able to mobilize his vast media empire in order to serve the party.<br><br><i>+3 resources per year.</i><br><i>Relations with the <b style="color:var(--dvp-color);">DVP</b> and <b style="color:var(--z-color);">Zentrum</b> steadily deteriorate.</i>`
},
'advisor_switcher': {
        body: `We can manually change our advisors once every twenty months, or by <b>event</b>.`
    }
    };

    document.querySelectorAll('ul.pinned-cards a.card[card-id]').forEach(function(card) {
        var id = card.getAttribute('card-id');
        var tooltipData = deputyTooltips[id];
        if (!tooltipData) return;

        if (card.querySelector('.card-passive-tip')) return;
        card.removeAttribute('title');

        var tip = document.createElement('span');
        tip.className = 'card-passive-tip';
        tip.innerHTML = tooltipData.body;
        card.appendChild(tip);
    });
    (function() {
        var swCard = document.querySelector('a.card[card-id="advisor_switcher"]');
        if (!swCard) return;
        if (swCard.querySelector('.card-passive-tip')) return;
        if (!deputyTooltips['advisor_switcher']) return;
        swCard.removeAttribute('title');
        var tip = document.createElement('span');
        tip.className = 'card-passive-tip';
        tip.innerHTML = deputyTooltips['advisor_switcher'].body;
        swCard.appendChild(tip);
    })();
    (function() {
        var pinnedHeaders = document.querySelectorAll('p, div, h1, h2');
        var target = null;
        pinnedHeaders.forEach(function(el) {
            if (!target && el.textContent && el.textContent.trim().startsWith('Advisors')) {
                var next = el.nextElementSibling;
                if (next && next.classList && next.classList.contains('pinned-cards')) {
                    target = el;
                }
            }
        });
        if (!target) return;

        var COOLDOWN_MONTHS = 12;
        var factions = [
            { key: 'volkskons', color: '#90D5FF', invert: true,  bg: '#6a6a6a', timer: q.volkskons_action_timer || 0 },
            { key: 'christsoc', color: '#DAB1DA', invert: true,  bg: '#919191', timer: q.christsoc_action_timer || 0 },
            { key: 'authcon',   color: '#000435', invert: false, bg: '#b9b9b9', timer: q.authcon_action_timer   || 0 },
            { key: 'volkisch',  color: '#06402B', invert: false, bg: '#e0e0e0', timer: q.volkisch_action_timer  || 0 }
        ];
        if (q.left_split === 1) {
            factions = factions.filter(function(f) { return f.key !== 'volkskons'; });
        }
        if (q.csvd_formed === 1) {
            factions = factions.filter(function(f) { return f.key !== 'christsoc'; });
        }

        var segmentsHtml = '';
        var labelsHtml = '';
        factions.forEach(function(f, idx) {
            var filledPct = Math.round(((COOLDOWN_MONTHS - f.timer) / COOLDOWN_MONTHS) * 100);
            var filled = f.timer === 0;
            var useWhite = f.invert ? !filled : filled;
            var divColor = useWhite ? '#fff' : '#000';
            var nextF = factions[idx + 1];
            if (nextF && f.invert && !nextF.invert) divColor = '#000';
            var segStyle = '--divider-color: ' + divColor + '; --divider-width: 2px; background: ' + f.bg + ';';
            segmentsHtml += '<div class="advisor-timer-segment' + (f.invert ? ' invert' : '') + '" style="' + segStyle + '">'
                          +   '<div class="advisor-timer-fill" style="width:' + filledPct + '%; --w:' + Math.max(filledPct, 1) + '; background:' + f.color + ';"></div>'
                          + '</div>';
            labelsHtml += '<div class="advisor-timer-label">'
                        +   (f.timer === 0 ? '<span class="advisor-ready">Available</span>' : '')
                        + '</div>';
        });

        var html = '<div class="advisor-header">Advisors</div>'
                 + '<div class="advisor-timer-conjoined">' + segmentsHtml + '</div>'
                 + '<div class="advisor-timer-labels">' + labelsHtml + '</div>';

        if (target.innerHTML !== html) {
            target.innerHTML = html;
        }
        target.classList.add('advisor-panel-head');

        var pinnedUl = target.nextElementSibling;
        if (pinnedUl && pinnedUl.classList && pinnedUl.classList.contains('pinned-cards')
            && (!target.parentElement || !target.parentElement.classList.contains('advisor-panel-wrap'))) {
            var wrap = document.createElement('div');
            wrap.className = 'advisor-panel-wrap';
            target.parentNode.insertBefore(wrap, target);
            wrap.appendChild(target);
            wrap.appendChild(pinnedUl);
        }

    })();

    (function() {
        var dotAdv = document.getElementById('advisors-fab-dot');
        if (!dotAdv) return;
        var timerList = [
            { key: 'volkskons', t: q.volkskons_action_timer || 0 },
            { key: 'christsoc', t: q.christsoc_action_timer || 0 },
            { key: 'authcon',   t: q.authcon_action_timer   || 0 },
            { key: 'volkisch',  t: q.volkisch_action_timer  || 0 }
        ];
        if (q.left_split === 1) timerList = timerList.filter(function(x) { return x.key !== 'volkskons'; });
        if (q.csvd_formed === 1) timerList = timerList.filter(function(x) { return x.key !== 'christsoc'; });
        var anyReady = timerList.some(function(x) { return x.t === 0; });
        dotAdv.style.display = anyReady ? 'block' : 'none';
    })();

    var switcher = document.querySelector('ul.pinned-cards li.pinned-card:has(a.card[card-id="advisor_switcher"])');
    var decksUl = document.querySelector('ul.decks');
    if (switcher && decksUl && switcher.parentElement !== decksUl) {
        switcher.className = 'deck';
        decksUl.appendChild(switcher);
    }
    if (window._injectExecutiveCard) window._injectExecutiveCard();
    var cabDeck = document.querySelector('ul.decks a.card[card-id="main.cabinet"]')
               || document.querySelector('ul.decks a.card[card-id="cabinet"]');
    if (cabDeck && !cabDeck._cabDirectBound) {
        cabDeck._cabDirectBound = true;
        cabDeck.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            if (window.dendryUI && window.dendryUI.dendryEngine) {
                window.dendryUI.dendryEngine.goToScene('cabinet_decisions');
            }
        }, true);
    }
    document.querySelectorAll('ul.pinned-cards, ul.choices, ul.decks').forEach(function(ul) {
        ul.classList.add('decorated');
    });
};

function initDecorator() {
    var contentEl = document.getElementById('content');
    console.log('[decorator init] contentEl:', contentEl);
    if (!contentEl) {
        setTimeout(initDecorator, 100);
        return;
    }
    var decoObserver = new MutationObserver(function() {
        decoObserver.disconnect();
        try {
            window._decorateChoices();
        } catch (e) {
            console.error('[decorator error]', e);
        }
        if (window._applyDvpColor) window._applyDvpColor();
        if (window._applyZColor) window._applyZColor();        if (window._applyDnvpColor) window._applyDnvpColor();        if (window._applyDdpColor) window._applyDdpColor();
        decoObserver.observe(contentEl, { childList: true, subtree: true });
    });
    decoObserver.observe(contentEl, { childList: true, subtree: true });
    console.log('[decorator init] observer attached');
    window._decorateChoices();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDecorator);
} else {
    initDecorator();
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
    if (!window.dendryUI || !window.dendryUI.dendryEngine) return;
    var kb = window._kbSettings || (window._kbLoad && window._kbLoad());
    if (!kb || !kb.enabled) return;
    var engine = window.dendryUI.dendryEngine;
    var sceneId = engine.state && engine.state.sceneId;

    var skipKey = (kb.skip || 'S');
    var pressedSkip = (e.key && e.key.toUpperCase()) === skipKey;
    if (pressedSkip) {
        var choices = document.querySelectorAll('ul.choices > li');
        var clickable = [];
        var discardLink = null;
        choices.forEach(function(li) {
            if (li.classList.contains('unavailable-card')) return;
            var a = li.querySelector('a');
            if (!a) return;
            clickable.push(a);
            var t = (a.textContent || '').trim().toLowerCase();
            if (t.indexOf('return card to hand') !== -1) discardLink = a;
        });
        if (clickable.length === 1) {
            e.preventDefault();
            clickable[0].click();
            return;
        }
        var onEventsList = sceneId && (sceneId === 'events_choice' || sceneId.indexOf('events_choice') !== -1);
        if (onEventsList && clickable.length > 0) {
            e.preventDefault();
            clickable[0].click();
            return;
        }
        if (discardLink) {
            e.preventDefault();
            discardLink.click();
            return;
        }
    }

    var isHand = (sceneId === 'main' || sceneId === 'main.main_easy' || sceneId === 'main.main_hugenberg'
               || sceneId === 'main_easy' || sceneId === 'main_hugenberg');
    var isExecute = (sceneId === 'execute');
    var isLaender = (sceneId === 'laender_menu');
    if (!isHand && !isExecute && !isLaender) return;
    var k = e.key && e.key.toUpperCase();
    var execKey = (kb.executive || 'E');
    var laenKey = (kb.laender || 'L');
    if (k === execKey) {
        if (isHand) {
            e.preventDefault();
            engine.goToScene('execute');
        } else if (isExecute) {
            e.preventDefault();
            engine.goToScene('root');
        }
    } else if (k === laenKey) {
        if (isHand) {
            var q = engine.state && engine.state.qualities;
            var year = (q && q.year) || 0;
            var month = (q && q.month) || 0;
            if (year > 1928 || (year === 1928 && month >= 3)) {
                e.preventDefault();
                engine.goToScene('laender_menu');
            }
        } else if (isLaender) {
            e.preventDefault();
            engine.goToScene('root');
        }
    }
});
  window.onload = function() {
    window.dendryUI.loadSettings({show_portraits: false});
    try { if (localStorage.getItem('dnvp_dark_mode') === '1') window.dendryUI.dark_mode = true; } catch (e) {}
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
  };

  document.addEventListener('click', function(e) {
      if (e.target && e.target.closest && e.target.closest('.advisor-panel-wrap a')) {
          document.body.classList.remove('advisors-open');
      }
  });

}());

window._ceSetup = function(cfg) {
    var Q = window.dendryUI.dendryEngine.state.qualities;
    var _ceWrap = document.getElementById(cfg.wrapId || 'coalition-explorer-wrap');
    if (!_ceWrap) return;

    window._ceFixedRel = { nsvp: 55, dap: 15, dnrk: 20, drdp: 30, rspd: 20, sapd: 5 };

    window._ceParties = cfg.getParties;
    window._ceUs = cfg.us;
    window._ceLogos = { kpd:'img/kpdlogo.png', spd:'img/spdlogo.png', sapd:'img/sapdlogo.png', rspd:'img/newrspdlogo.png', z:'img/zentrumlogo.png', fakecvp:'img/zentrumlogo.png', ddp:'img/ddplogo.png', drdp:'img/drdplogo.png', bvp:'img/bavarialogo.png', dvp:'img/dvplogo.png', dnvp:'img/dnvplogo.png', nsdap:'img/nsdaplogo.png', dap:'img/daplogo.png', dnrk:'img/dnrklogo.png', nsvp:'img/nsvplogo.png', wp:'img/wplogo.png', vrp:'img/vrplogo.png', guelph:'img/dhplogo.png', rlb:'img/reichslandbund.png', bauern:'img/reichslandbund.png', cnbl:'img/cnbllogo.png', csvd:'img/csvdlogo.png', kvp:'img/kvplogo.png', polish:'img/polishlogo.png', cvp:'img/cvplogo.png', peasants:'img/reichslandbund.png', bbmb:'img/bbmblogo.png', wbwb:'img/wbwblogo.png' };
    window._ceRelKey = { cnbl:'lvp' };
    window._ceRelation = function(id){ var k = window._ceRelKey[id] || id; var v = Q[k + '_relation']; if (typeof v === 'number') return v; if (window._ceFixedRel && window._ceFixedRel[id] != null) return window._ceFixedRel[id]; return null; };
    window._ceCensored = function(){ try { var v = localStorage.getItem('nsdap_censorship'); if (v === '0') return false; if (v === '1') return true; } catch (e) {} return (Q.nsdap_censorship !== 0); };
    window._ceCoalThreshold = function(id){ var T = { z:40, dvp:40, nsdap:50, bvp:0, ddp:50, nsvp:50, dap:50, dnrk:50, peasants:0, bbmb:0, wbwb:0 }; return (T[id] != null) ? T[id] : null; };
    window._ceRelWord = function(id, rv){ var T = window._ceCoalThreshold(id); if (T == null) return { w:'Not a Chance', c:'ce-rel-none' }; if (rv == null) rv = 0; if (rv >= T + 15) return { w:'Enthusiastic', c:'ce-rel-enth' }; if (rv >= T) return { w:'Willing', c:'ce-rel-will' }; if (rv >= T - 15) return { w:'Unwilling', c:'ce-rel-unwill' }; return { w:'Not a Chance', c:'ce-rel-none' }; };
    window._ceKnownCoalitions = function(){ function key(a){ return a.slice().sort().join(','); } var K = {}, cvp = (Q.cvp_formed == 1); if (cvp) { K[key(['cvp','bvp'])] = 'CVP Majority'; K[key(['cvp','dvp','bvp'])] = 'Bürgerblock'; K[key(['cvp','dvp','bvp','ddp'])] = 'Große Bürgerblock'; K[key(['cvp','nsdap','bvp'])] = 'Unholy Alliance'; } else { K[key(['dnvp','dvp','bvp'])] = 'Hindenburg Bloc'; K[key(['dnvp','z','bvp'])] = 'Christian Coalition'; K[key(['dnvp','z','bvp','dvp'])] = 'Centre-Right Coalition'; K[key(['dnvp','z','bvp','dvp','ddp'])] = 'Bürgerblock'; K[key(['dnvp','nsdap'])] = 'Far-Right Coalition'; } K[key(['spd','z','ddp'])] = 'Weimar Coalition'; K[key(['spd','z','ddp','dvp'])] = 'Grand Coalition'; K[key(['spd','kpd','z','ddp'])] = 'Popular Front'; K[key(['kpd','spd'])] = 'Left Coalition'; K[key(['kpd','nsdap','dnvp'])] = 'Anti-Democratic Coalition'; return K; };
    window._ceCsvCoalitions = function(){ function key(a){ return a.slice().sort().join(','); } var K = {}; K[key(['kpd','spd'])]='United Left Coalition'; K[key(['kpd','dnvp'])]='Querfront'; K[key(['kpd','nsdap'])]='Querfront'; K[key(['spd','z'])]='Social-Catholic Coalition'; K[key(['spd','dvp'])]='Social-Conservative Liberal Coalition'; K[key(['spd','bvp'])]='Social-Agrarian Coalition'; K[key(['spd','ddp'])]='Social-Liberal Coalition'; K[key(['spd','nsdap'])]='Social-Fascist Coalition'; K[key(['z','dvp'])]='Catholic-Conservative Coalition'; K[key(['z','bvp'])]='Catholic Coalition'; K[key(['z','ddp'])]='Centrist Coalition'; K[key(['z','dnvp'])]='Christian Coalition'; K[key(['z','nsdap'])]='Black-Brown Coalition'; K[key(['dvp','bvp'])]='Conservative-Agrarian Coalition'; K[key(['dvp','ddp'])]='Liberal Coalition'; K[key(['dvp','dnvp'])]='Conservative Coalition'; K[key(['dvp','nsdap'])]='Industrialist Coalition'; K[key(['bvp','ddp'])]='Agrarian-Liberal Coalition'; K[key(['bvp','dnvp'])]='Nationalist-Agrarian Coalition'; K[key(['bvp','nsdap'])]='Bavarian-National Coalition'; K[key(['ddp','dnvp'])]='Liberal-National Coalition'; K[key(['dnvp','nsdap'])]='Far Right Coalition'; K[key(['kpd','spd','z'])]='Popular Front'; K[key(['kpd','spd','ddp'])]='Progressive Coalition'; K[key(['kpd','dnvp','nsdap'])]='National Querfront'; K[key(['spd','z','dvp'])]='Alternate Weimar Coalition'; K[key(['spd','z','bvp'])]='Grand Social-Catholic Coalition'; K[key(['spd','z','ddp'])]='Weimar Coalition'; K[key(['spd','dvp','bvp'])]='Social-Conservative Liberal Coalition'; K[key(['spd','dvp','ddp'])]='Grand Social-Liberal Coalition'; K[key(['spd','bvp','ddp'])]='Social-Catholic-Liberal Coalition'; K[key(['z','dvp','bvp'])]='Center-Right Coalition'; K[key(['z','dvp','ddp'])]='Catholic-Liberal Coalition'; K[key(['z','dvp','dnvp'])]='Small Center-Right Coalition'; K[key(['z','dvp','nsdap'])]='Black-Gold-Brown Coalition'; K[key(['z','bvp','ddp'])]='Small Center-Left Coalition'; K[key(['z','bvp','dnvp'])]='Christian Coalition'; K[key(['z','bvp','nsdap'])]='Schwarzbraun Coalition'; K[key(['z','ddp','dnvp'])]='Christian-Jewish Coalition'; K[key(['z','dnvp','nsdap'])]='Schwarz-Weiß-Braun Coalition'; K[key(['dvp','bvp','ddp'])]='Schwarz-Weiß-Blau Coalition'; K[key(['dvp','bvp','dnvp'])]='Right Bourgeois Coalition'; K[key(['dvp','bvp','nsdap'])]='Fascist Bourgeois Coalition'; K[key(['dvp','ddp','dnvp'])]='National Liberal Coalition'; K[key(['dvp','dnvp','nsdap'])]='National Salvation Bloc'; K[key(['bvp','ddp','dnvp'])]='National Liberal Coalition'; K[key(['bvp','dnvp','nsdap'])]='Far-Right Coalition'; K[key(['kpd','spd','z','ddp'])]='Greater Popular Front'; K[key(['kpd','spd','dnvp','nsdap'])]='Extreme Querfront'; K[key(['spd','z','dvp','bvp'])]='Grand Coalition'; K[key(['spd','z','dvp','ddp'])]='Grand Coalition'; K[key(['spd','z','bvp','ddp'])]='Neoweimar Coalition'; K[key(['spd','dvp','bvp','ddp'])]='Grand Coalition'; K[key(['z','dvp','bvp','ddp'])]='Bürgerliche Mitte Coalition'; K[key(['z','dvp','bvp','dnvp'])]='Bürgerblock'; K[key(['z','dvp','bvp','nsdap'])]='Schwarzbraun Coalition'; K[key(['z','dvp','ddp','dnvp'])]='Grand Coalition'; K[key(['z','dvp','dnvp','nsdap'])]='Schwarzbraun Coalition'; K[key(['z','bvp','dnvp','nsdap'])]='National Right Bloc'; K[key(['dvp','bvp','dnvp','nsdap'])]='National Right Bloc'; K[key(['spd','z','dvp','bvp','ddp'])]='Grand Coalition'; K[key(['z','dvp','bvp','ddp','dnvp'])]='Bürgerblock'; K[key(['z','dvp','bvp','dnvp','nsdap'])]='Enabling Group Coalition'; K[key(['spd','z','dvp','bvp','ddp','dnvp'])]='Wholesome Coalition'; return K; };
    window._ceDerivAlias = { ndnp:'dnvp', sapd:'spd', rspd:'spd', drdp:'ddp', dap:'nsdap', dnrk:'nsdap', nsvp:'nsdap' };
    if (Q.best_coalition_id == 11) {
        var _ps11 = (Q.builder_coalition_partners || '').split(',').filter(function(x){ return x; });
        var _sel11 = {}; _sel11[window._ceUs()] = 1;
        for (var _pi11 = 0; _pi11 < _ps11.length; _pi11++) _sel11[_ps11[_pi11]] = 1;
        var _pl11 = window._ceParties(); var _lab11 = [], _tot11 = 0, _mIn11 = [];
        var _MAJ11 = { kpd:1, spd:1, z:1, dvp:1, bvp:1, ddp:1, nsdap:1, dnvp:1, cvp:1, sapd:1, rspd:1, drdp:1, dap:1, dnrk:1, nsvp:1, ndnp:1 };
        for (var _pj11 = 0; _pj11 < _pl11.length; _pj11++) {
            var _pp11 = _pl11[_pj11]; if (!_sel11[_pp11.id]) continue;
            _tot11 += _pp11.rt;
            _lab11.push('<b style="color:' + _pp11.color + ';">' + _pp11.label + '</b>');
            if (_MAJ11[_pp11.id]) { var _c11 = (_pp11.id === 'cvp') ? 'dnvp' : (window._ceDerivAlias[_pp11.id] || _pp11.id); if (_mIn11.indexOf(_c11) < 0) _mIn11.push(_c11); }
        }
        var _K11 = window._ceCsvCoalitions();
        Q.builder_coalition_title = _K11[_mIn11.slice().sort().join(',')] || 'Special Coalition';
        Q.builder_coalition_subtitle = _lab11.join(' + ') + ' (' + (Math.round(_tot11 * 10) / 10) + '%)';
    }
    window._ceCoalitionName = function(parties, sel, total){ var REL = { kpd:1, spd:1, z:1, dvp:1, bvp:1, ddp:1, dnvp:1, cvp:1, nsdap:1, sapd:1, rspd:1, drdp:1, dap:1, dnrk:1, nsvp:1, ndnp:1 }; var A = window._ceDerivAlias || {}; var ids = [], seen = {}, i; for (i = 0; i < parties.length; i++) { var pid = parties[i].id; if (sel[pid] && REL[pid]) { var cid = A[pid] || pid; if (!seen[cid]) { seen[cid] = 1; ids.push(cid); } } } if (!ids.length) return ''; var k1 = ids.slice().sort().join(','); var t1 = window._ceKnownCoalitions(); if (t1[k1]) return t1[k1]; var nids = [], seen2 = {}; for (i = 0; i < ids.length; i++) { var nid = ids[i] === 'cvp' ? 'dnvp' : ids[i]; if (!seen2[nid]) { seen2[nid] = 1; nids.push(nid); } } var k2 = nids.slice().sort().join(','); var t2 = window._ceCsvCoalitions(); if (t2[k2]) return t2[k2]; if (nids.length === 1) return ''; var L = { kpd:1, spd:1 }, RT = { dnvp:1, cvp:1, nsdap:1 }; var nL = 0, nR = 0, nC = 0, hasKPD = false, hasNSDAP = false; for (i = 0; i < nids.length; i++) { var id = nids[i]; if (id === 'kpd') hasKPD = true; if (id === 'nsdap') hasNSDAP = true; if (L[id]) nL++; else if (RT[id]) nR++; else nC++; } if (hasKPD && hasNSDAP) return 'Querfront'; if (nL === 0 && nC === 0) return 'National Bloc'; if (nL === 0 && nR === 0) return 'Bourgeois Coalition'; if (nL === 0) return 'Bourgeois Bloc'; if (nR === 0 && hasKPD) return 'Left Bloc'; if (nR === 0) return 'Centre-Left Coalition'; return ''; };
    window._cePie = function(parties, sel){
        var cx = 50, cy = 50, r = 44;
        function pt(a){ var rad = a * Math.PI / 180; return [ (cx + r * Math.sin(rad)).toFixed(2), (cy - r * Math.cos(rad)).toFixed(2) ]; }
        function wedge(a1, a2, fill, pid){ if (a2 - a1 <= 0.02) return ''; if (a2 - a1 >= 359.99) a2 = a1 + 359.99; var q1 = pt(a1), q2 = pt(a2); var large = (a2 - a1 > 180) ? 1 : 0; var attr = pid ? ' class="ce-pie-wedge" data-pid="' + pid + '" style="cursor:pointer;"' : ''; return '<path d="M ' + cx + ' ' + cy + ' L ' + q1[0] + ' ' + q1[1] + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + q2[0] + ' ' + q2[1] + ' Z" fill="' + fill + '"' + attr + '/>'; }
        var ang = 0, out = '', i, p;
        for (i = 0; i < parties.length; i++) { p = parties[i]; if (sel[p.id]) { var a2 = ang + p.rt * 3.6; out += wedge(ang, a2, p.color, p.id); ang = a2; } }
        var hatchStart = (ang > 180) ? ang : 180;
        if (hatchStart < 360) out += wedge(hatchStart, 360, 'url(#ceHatch)');
        var defs = '<defs><pattern id="ceHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#999" stroke-width="1.4"/></pattern></defs>';
        var ring = '<circle cx="50" cy="50" r="44" fill="none" stroke="#888" stroke-width="1.4"/>';
        var dash = '<line x1="50" y1="5" x2="50" y2="95" stroke="#666" stroke-width="1.2" stroke-dasharray="3,3"/>';
        return '<svg viewBox="0 0 100 100" class="ce-pie-svg">' + defs + out + ring + dash + '</svg>';
    };
    window._ceUpdate = function(){
        var parties = window._ceParties(), us = window._ceUs();
        if (!window._ceSel) { window._ceSel = {}; }
        var sel = window._ceSel, total = 0, i, p;
        var anySel = false; for (var kk in sel) { if (sel[kk]) { anySel = true; break; } }
        var pnl = document.getElementById('ce-panel'); if (pnl) { if (anySel) { pnl.classList.remove('ce-noselect'); } else { pnl.classList.add('ce-noselect'); } }
        for (i = 0; i < parties.length; i++) { if (sel[parties[i].id]) total += parties[i].rt; }
        total = Math.round(total * 10) / 10;
        var maj = total >= 50, shortBy = Math.round((50 - total) * 10) / 10;
        var svg = document.getElementById('ce-parl-svg');
        if (svg) { var seats = svg.querySelectorAll('.seat'); for (i = 0; i < seats.length; i++) { var cls = (seats[i].getAttribute('class') || ''); var sid = cls.replace('seat', '').trim().split(/\s+/)[0]; seats[i].style.opacity = sel[sid] ? '1' : '0.2'; } }
        var majorSet = { kpd:1, spd:1, ddp:1, z:1, dvp:1, dnvp:1, cvp:1, nsdap:1 };
        var censored = window._ceCensored();
        var lgMaj = '', lgMin = '';
        var _listDone = false;
        var _inList = (Q.cnbl_formed == 1 && sel.cnbl && sel.guelph);
        for (i = 0; i < parties.length; i++) {
            p = parties[i]; if (!sel[p.id]) continue;
            if (_inList && (p.id === 'cnbl' || p.id === 'guelph')) {
                if (!_listDone) {
                    _listDone = true;
                    lgMin += '<div class="ce-logo" onclick="window._ceToggle(&quot;cnbl&quot;)" style="border:1px dashed #000; border-radius:4px; padding:3px 5px;"><img src="' + (window._ceLogos.cnbl || '') + '" alt="CNBL" style="max-height:32px; max-width:58px;"><img src="' + (window._ceLogos.guelph || '') + '" alt="Guelph" style="max-height:32px; max-width:58px;"></div>';
                }
                continue;
            }
            var isMaj = !!majorSet[p.id]; var sz = isMaj ? 58 : 32;
            var src = window._ceLogos[p.id]; if (p.id === 'nsdap') src = censored ? 'img/censorednsdap.png' : 'img/nsdaplogo.png';
            var item;
            if (src) { item = '<div class="ce-logo" onclick="window._ceToggle(&quot;' + p.id + '&quot;)"><img src="' + src + '" alt="' + p.label + '" style="max-height:' + sz + 'px;max-width:' + (sz + 26) + 'px;"></div>'; }
            else { item = '<div class="ce-logo" onclick="window._ceToggle(&quot;' + p.id + '&quot;)"><div class="ce-badge" style="width:' + sz + 'px;height:' + sz + 'px;background:' + p.color + ';"><span>' + p.label + '</span></div></div>'; }
            if (isMaj) { lgMaj += item; } else { lgMin += item; }
        }
        var lgmEl = document.getElementById('ce-logos-major'); if (lgmEl) lgmEl.innerHTML = lgMaj;
        var lgnEl = document.getElementById('ce-logos-minor'); if (lgnEl) { lgnEl.innerHTML = lgMin; lgnEl.style.alignItems = 'center'; }
        var rel = '';
        for (i = 0; i < parties.length; i++) { p = parties[i]; if (p.id === us || p.id === 'bvp' || p.id === 'wp' || p.id === 'rlb' || p.id === 'cnbl' || p.id === 'csvd' || p.id === 'kvp' || p.id === 'vrp' || p.id === 'guelph' || p.id === 'polish' || p.id === 'peasants' || p.id === 'bbmb' || p.id === 'wbwb') continue; var rv = window._ceRelation(p.id); var rw = window._ceRelWord(p.id, rv); if (rv == null && window._ceCoalThreshold(p.id) == null) continue; rel += '<div class="ce-rel-row"><span class="ce-rel-name" style="color:' + p.color + ';">' + p.label + ':</span><span class="ce-rel-val ' + rw.c + '">' + rw.w + '</span></div>'; }
        if (!rel) rel = '<div class="ce-rel-empty">No parties to negotiate with.</div>';
        var rl = document.getElementById('ce-relations'); if (rl) rl.innerHTML = rel;
        var cn = document.getElementById('ce-coalname'); if (cn) { var _cnm = window._ceCoalitionName(parties, sel, total); cn.innerHTML = (_cnm && window._coalitionStyledName) ? window._coalitionStyledName(_cnm) : _cnm; }
        var pieEl = document.getElementById('ce-pie'); if (pieEl) { pieEl.innerHTML = window._cePie(parties, sel); if (!pieEl._ceClickBound) { pieEl._ceClickBound = true; pieEl.addEventListener('click', function(e){ var t = e.target; while (t && t !== pieEl && !(t.getAttribute && t.getAttribute('data-pid'))) t = t.parentNode; if (t && t.getAttribute) { var pid = t.getAttribute('data-pid'); if (pid && window._ceToggle) window._ceToggle(pid); } }); } }
        var st = document.getElementById('ce-pie-status'); if (st) { st.className = 'ce-pie-status' + (total >= 50 ? ' ce-maj' : ''); st.innerHTML = '<span class="ce-pct">' + total.toFixed(1) + '%</span>'; }
        var aul = document.getElementById('ce-adopt-ul'); var pnl2 = document.getElementById('ce-panel');
        var _rfx = document.getElementById('ce-refusal-text'); if (_rfx && _rfx.parentNode) _rfx.parentNode.removeChild(_rfx);
        if (aul) {
            if (sel[us] && total >= 50) {
                aul.style.display = ''; if (pnl2) pnl2.classList.add('ce-has-adopt');
                aul.innerHTML = '<li id="ce-adopt-li"><a href="javascript:void(0)" onclick="if(event){event.stopPropagation();event.preventDefault();} window._ceAdopt && window._ceAdopt(); return false;">Can we have this coalition instead?</a></li>';
            } else if (sel[us]) {
                aul.style.display = ''; if (pnl2) pnl2.classList.add('ce-has-adopt');
                aul.innerHTML = '<li id="ce-adopt-li" class="unavailable">Can we have this coalition instead?<div class="subtitle">This hypothetical governmental arrangement does not have enough seats.</div></li>';
            } else { aul.style.display = 'none'; if (pnl2) pnl2.classList.remove('ce-has-adopt'); aul.innerHTML = '<li id="ce-adopt-li"></li>'; }
        }
    };
    window._ceParlInit = function(){
        var svg = document.getElementById('ce-parl-svg');
        if (!svg || typeof d3 === 'undefined' || !d3.parliament) return;
        var pdata = (typeof cfg.buildPData === 'function') ? cfg.buildPData(true) : ((typeof window._buildPData === 'function' && cfg.reichstag) ? window._buildPData(true) : window._ceParties().map(function(p){ return { id: p.id, name: p.label, legend: p.label, seats: Math.max(1, Math.round(p.rt * 5)) }; }));
        var w = Math.round(svg.getBoundingClientRect().width) || (svg.parentElement ? svg.parentElement.clientWidth : 240); if (!w || w < 180) w = 180; if (w > 420) w = 420;
        svg.style.height = (w / 2) + 'px';
        var pl = d3.parliament(); pl.width(w).height(w).innerRadiusCoef(0.4);
        pl.enter.fromCenter(false).smallToBig(false);
        try { d3.select('#ce-parl-svg').datum(pdata).call(pl); } catch (e) {}
        svg.style.cursor = 'pointer';
        svg.addEventListener('click', function(e){ var ss = svg.querySelectorAll('.seat'); var bestD = Infinity, bestId = null, r = 8, j; for (j = 0; j < ss.length; j++) { var bb = ss[j].getBoundingClientRect(); if (bb.width) r = bb.width / 2; var cx = bb.left + bb.width / 2, cy = bb.top + bb.height / 2; var dx = e.clientX - cx, dy = e.clientY - cy, dd = dx * dx + dy * dy; if (dd < bestD) { bestD = dd; var cls = (ss[j].getAttribute('class') || ''); bestId = cls.replace('seat', '').trim().split(/\s+/)[0]; } } var maxD = r * 3; if (bestId && bestD <= maxD * maxD) window._ceToggle(bestId); });
    };
    window._ceNdnpTip = function(){
        var old = document.getElementById('ndnp-refuse-tip'); if (old && old.parentNode) old.parentNode.removeChild(old);
        var t = document.createElement('div');
        t.id = 'ndnp-refuse-tip';
        t.style.cssText = 'position:fixed; z-index:10001; background:#fff; border:2px solid #999; box-shadow:2px 2px 6px rgba(0,0,0,0.2); padding:8px 12px; width:260px; box-sizing:border-box; text-align:center; color:#000; pointer-events:none; opacity:1; transition:opacity 0.4s;';
        t.innerHTML = 'Hugenberg, the obstinate man, will not agree to a coalition under any circumstances.';
        var e = window.event;
        var x = (e && e.clientX) ? e.clientX + 12 : (window.innerWidth / 2 - 130);
        var y = (e && e.clientY) ? e.clientY - 70 : 120;
        if (x + 268 > window.innerWidth - 8) x = window.innerWidth - 276;
        if (y < 8) y = (e && e.clientY) ? e.clientY + 18 : 8;
        t.style.left = x + 'px'; t.style.top = y + 'px';
        document.body.appendChild(t);
        setTimeout(function(){ t.style.opacity = '0'; }, 1600);
        setTimeout(function(){ if (t.parentNode) t.parentNode.removeChild(t); }, 2000);
    };
    window._ceToggle = function(id){
        if (id === 'ndnp') { window._ceNdnpTip(); return; }
        if (!window._ceSel) window._ceSel = {};
        var group = [id];
        if (Q.cnbl_formed == 1 && (id === 'cnbl' || id === 'guelph')) group = ['cnbl', 'guelph'];
        var on = !window._ceSel[id];
        for (var _gi = 0; _gi < group.length; _gi++) { if (on) { window._ceSel[group[_gi]] = 1; } else { delete window._ceSel[group[_gi]]; } }
        window._ceUpdate();
    };
    window._ceReset = function(){ window._ceSel = {}; window._ceUpdate(); };
    window._ceStyleHrs = function(root){
        var rm = document.getElementById('read-marker'); if (!rm || !root) return;
        var cs; try { cs = window.getComputedStyle(rm); } catch (e) { return; }
        if (!cs) return;
        var props = ['width','max-width','height','margin-top','margin-bottom','margin-left','margin-right','border-top-width','border-top-style','border-top-color','border-bottom-width','border-bottom-style','border-bottom-color','border-left-width','border-left-style','border-right-width','border-right-style','background-color','color','opacity'];
        var hrs = root.querySelectorAll('hr');
        for (var _h = 0; _h < hrs.length; _h++) {
            for (var _p = 0; _p < props.length; _p++) {
                try { hrs[_h].style.setProperty(props[_p], cs.getPropertyValue(props[_p])); } catch (e) {}
            }
        }
    };
    window._ceProblems = function(){
        var sel = window._ceSel || {}; var us = window._ceUs(); var parties = window._ceParties();
        var probs = [], total = 0, i;
        for (i = 0; i < parties.length; i++) { if (sel[parties[i].id]) total += parties[i].rt; }
        var MINOR = { wp:1, rlb:1, cnbl:1, csvd:1, kvp:1, vrp:1, guelph:1, polish:1, peasants:1, bbmb:1, wbwb:1 };
        var _nm = function(id){ for (var _k = 0; _k < parties.length; _k++) { if (parties[_k].id === id) { var lbl = (id === 'z') ? 'Zentrum Party' : parties[_k].label; return '<b style="color:' + parties[_k].color + ';">' + lbl + '</b>'; } } return id.toUpperCase(); };
        if (total < 50) probs.push('This hypothetical governmental arrangement does not have enough seats.');
        if (cfg.reichstag) {
            if ((Q.best_coalition_id || 0) === 0 && ((Q.weimar_coalition || 0) >= 50 || (Q.grand_coalition || 0) >= 50)) {
                probs.push('The mandate to form a government has passed to the <b style="color:var(--spd-color);">SPD</b>.');
            }
        }
        for (i = 0; i < parties.length; i++) {
            var ap = parties[i];
            if (!sel[ap.id] || ap.id === us) continue;
            if (MINOR[ap.id]) continue;
            var T = window._ceCoalThreshold(ap.id);
            if (T == null) { probs.push('The ' + _nm(ap.id) + ' will never enter a government with us.'); continue; }
            var rv = window._ceRelation(ap.id); if (rv == null) rv = 0;
            if (rv < T) probs.push('Right now, the ' + _nm(ap.id) + ' isn&rsquo;t willing to work with us.');
        }
        var _frBlock = ['z','ddp','bvp'], _frRefuse = ['nsdap','nsvp','dap','dnrk'], INC = []; for (var _ia = 0; _ia < _frBlock.length; _ia++) for (var _ib = 0; _ib < _frRefuse.length; _ib++) INC.push([_frBlock[_ia], _frRefuse[_ib]]);
        for (i = 0; i < INC.length; i++) { if (sel[INC[i][0]] && sel[INC[i][1]]) probs.push('The ' + _nm(INC[i][0]) + ' would refuse to sit in a cabinet with the ' + _nm(INC[i][1]) + '.'); }
        return probs;
    };
    window._ceAdopt = function(){
        var sel = window._ceSel || {}; var us = window._ceUs();
        var majors = ['kpd', 'spd', 'z', 'dvp', 'bvp', 'ddp', 'nsdap', us]; var all8 = true; for (var mi = 0; mi < majors.length; mi++) { if (!sel[majors[mi]]) { all8 = false; break; } }
        if (all8) { window._ceFriends(); return; }
        if (sel.kpd && sel[us]) { window._ceWhatRUDoing(); return; }
        var probs = window._ceProblems();
        if (probs.length) {
            var aul2 = document.getElementById('ce-adopt-ul');
            var old = document.getElementById('ce-refusal-text'); if (old && old.parentNode) old.parentNode.removeChild(old);
            var d = document.createElement('div');
            d.id = 'ce-refusal-text';
            d.style.cssText = 'margin:0.9em 0 0.4em;';
            var html = '<hr>'; for (var _pi3 = 0; _pi3 < probs.length; _pi3++) html += '<p style="margin:0.35em 0;">' + probs[_pi3] + '</p>'; html += '<ul class="choices decorated" style="margin-top:0.6em;"><li id="ce-reset-li"><a href="javascript:void(0)" onclick="if(event){event.stopPropagation();event.preventDefault();} window._ceReset && window._ceReset(); return false;">Let&rsquo;s try another coalition.</a></li></ul>';
            d.innerHTML = html;
            if (aul2 && aul2.parentNode) aul2.parentNode.insertBefore(d, aul2.nextSibling);
            if (window._ceStyleHrs) window._ceStyleHrs(d);
            return;
        }
        if (cfg.reichstag) {
            var _bid = Q.best_coalition_id || 0;
            var _MAPB = { 1:[], 2:['z','bvp'], 3:['z','bvp','dvp'], 4:['z','bvp','dvp','ddp'], 5:['dvp','bvp'], 6:['nsdap'], 7:['bvp'], 8:['dvp','bvp'], 9:['dvp','bvp','ddp'], 10:['nsdap','bvp'] };
            var _bestPtn = (_bid >= 11) ? (Q.builder_coalition_partners || '').split(',').filter(function(x){ return x; }) : _MAPB[_bid];
            if (_bestPtn) {
                var _plA = window._ceParties(); var _selPtn = [];
                for (var _si = 0; _si < _plA.length; _si++) { if (sel[_plA[_si].id] && _plA[_si].id !== us) _selPtn.push(_plA[_si].id); }
                if (_selPtn.slice().sort().join(',') === _bestPtn.slice().sort().join(',')) {
                    var aulS = document.getElementById('ce-adopt-ul');
                    var oldS = document.getElementById('ce-refusal-text'); if (oldS && oldS.parentNode) oldS.parentNode.removeChild(oldS);
                    var dS = document.createElement('div');
                    dS.id = 'ce-refusal-text';
                    dS.style.cssText = 'margin:0.9em 0 0.4em;';
                    dS.innerHTML = '<hr><p style="margin:0.35em 0;">This is literally the exact same government that&rsquo;s suggested by the game.</p>';
                    if (aulS && aulS.parentNode) aulS.parentNode.insertBefore(dS, aulS.nextSibling);
                    if (window._ceStyleHrs) window._ceStyleHrs(dS);
                    return;
                }
            }
        }
        else if (typeof cfg.suggestedSets === 'function') {
            var _setsL = cfg.suggestedSets() || [];
            if (_setsL.length) {
                var _plL = window._ceParties(), _selL = [];
                for (var _sl = 0; _sl < _plL.length; _sl++) { if (sel[_plL[_sl].id] && _plL[_sl].id !== us) _selL.push(_plL[_sl].id); }
                var _selKeyL = _selL.slice().sort().join(','), _matchedL = false;
                for (var _ml = 0; _ml < _setsL.length; _ml++) { if ((_setsL[_ml] || []).slice().sort().join(',') === _selKeyL) { _matchedL = true; break; } }
                if (_matchedL) {
                    var aulL = document.getElementById('ce-adopt-ul');
                    var oldL = document.getElementById('ce-refusal-text'); if (oldL && oldL.parentNode) oldL.parentNode.removeChild(oldL);
                    var dL = document.createElement('div');
                    dL.id = 'ce-refusal-text';
                    dL.style.cssText = 'margin:0.9em 0 0.4em;';
                    dL.innerHTML = '<hr><p style="margin:0.35em 0;">This is literally the exact same government that&rsquo;s suggested by the game.</p>';
                    if (aulL && aulL.parentNode) aulL.parentNode.insertBefore(dL, aulL.nextSibling);
                    if (window._ceStyleHrs) window._ceStyleHrs(dL);
                    return;
                }
            }
        }
        var aul3 = document.getElementById('ce-adopt-ul');
        var old3 = document.getElementById('ce-refusal-text'); if (old3 && old3.parentNode) old3.parentNode.removeChild(old3);
        var d3 = document.createElement('div');
        d3.id = 'ce-refusal-text';
        d3.style.cssText = 'margin:0.9em 0 0.4em;';
        var firstTime = (Q.best_coalition_id != 99);
        var msg = firstTime
            ? 'This government works. But some complicated algorithm did the math to find the most optimal coalition. Do you think you&rsquo;re better than the computer?'
            : 'This government works.';
        var optText = firstTime ? 'Yes, I am smarter than the computer!' : 'Let&rsquo;s have this coalition instead.';
        d3.innerHTML = '<hr><p style="margin:0.35em 0;">' + msg + '</p><ul class="choices decorated" style="margin-top:0.6em;"><li id="ce-confirm-li"><a href="javascript:void(0)" onclick="if(event){event.stopPropagation();event.preventDefault();} window._ceConfirmAdopt && window._ceConfirmAdopt(); return false;">' + optText + '</a></li></ul>';
        if (aul3 && aul3.parentNode) aul3.parentNode.insertBefore(d3, aul3.nextSibling);
        if (window._ceStyleHrs) window._ceStyleHrs(d3);
    };
    window._ceConfirmAdopt = function(){
        var sel = window._ceSel || {}; var us = window._ceUs();
        var parties = window._ceParties(); var partners = [], labels = [], total = 0, i;
        for (i = 0; i < parties.length; i++) {
            var p = parties[i]; if (!sel[p.id]) continue;
            total += p.rt;
            if (p.id !== us) partners.push(p.id);
            labels.push('<b style="color:' + p.color + ';">' + p.label + '</b>');
        }
        var K = window._ceCsvCoalitions(); var MAJ = { kpd:1, spd:1, z:1, dvp:1, bvp:1, ddp:1, nsdap:1, dnvp:1, cvp:1, sapd:1, rspd:1, drdp:1, dap:1, dnrk:1, nsvp:1, ndnp:1 }; var _A2 = window._ceDerivAlias || {};
        var majorsIn = [], _seenMI = {};
        for (i = 0; i < parties.length; i++) { var id2 = parties[i].id; if (!sel[id2] || !MAJ[id2]) continue; var _ci = (id2 === 'cvp') ? 'dnvp' : (_A2[id2] || id2); if (!_seenMI[_ci]) { _seenMI[_ci] = 1; majorsIn.push(_ci); } }
        var title = K[majorsIn.slice().sort().join(',')] || 'Special Coalition';
        var subtitle = labels.join(' + ') + ' (' + (Math.round(total * 10) / 10) + '%)';
        window._ceClose();
        cfg.onConfirmAdopt(partners, total, title, subtitle);
    };
    window._ceFriends = function(){
        var pn = document.getElementById('ce-panel'); if (!pn) return;
        if (document.getElementById('ce-vid-overlay')) return;
        var ov = document.createElement('div'); ov.id = 'ce-vid-overlay';
        ov.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;background:#000;z-index:50;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:inherit;overflow:hidden;';
        var im = document.createElement('img');
        im.src = 'img/friends.png';
        im.style.cssText = 'max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;';
        ov.appendChild(im);
        if (getComputedStyle(pn).position === 'static') { pn.setAttribute('data-ce-pos', '1'); pn.style.position = 'relative'; }
        pn.appendChild(ov);
        var t = null;
        var done = function(){ if (t) { clearTimeout(t); t = null; } if (ov.parentNode) ov.parentNode.removeChild(ov); if (pn.getAttribute('data-ce-pos')) { pn.style.position = ''; pn.removeAttribute('data-ce-pos'); } };
        ov.addEventListener('click', done);
        t = setTimeout(done, 3000);
    };
    window._ceWhatRUDoing = function(){
        var pn = document.getElementById('ce-panel'); if (!pn) return;
        if (document.getElementById('ce-vid-overlay')) return;
        var radio = document.getElementById('dnvp-audio');
        if (radio && !radio.paused) { window._ceRadioWasPlaying = true; radio.pause(); } else { window._ceRadioWasPlaying = false; }
        var ov = document.createElement('div'); ov.id = 'ce-vid-overlay';
        ov.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;background:#000;z-index:50;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:inherit;overflow:hidden;';
        var v = document.createElement('video');
        v.src = 'img/whatareudoing.mp4';
        v.style.cssText = 'width:100%;height:100%;object-fit:contain;background:#000;';
        v.setAttribute('playsinline', ''); v.controls = false; v.autoplay = true; v.muted = false; v.volume = 1;
        ov.appendChild(v);
        if (getComputedStyle(pn).position === 'static') { pn.setAttribute('data-ce-pos', '1'); pn.style.position = 'relative'; }
        pn.appendChild(ov);
        var done = function(){ if (ov.parentNode) ov.parentNode.removeChild(ov); if (pn.getAttribute('data-ce-pos')) { pn.style.position = ''; pn.removeAttribute('data-ce-pos'); } var rd = document.getElementById('dnvp-audio'); if (rd && window._ceRadioWasPlaying) { rd.play().catch(function(){}); } window._ceRadioWasPlaying = false; };
        v.addEventListener('ended', done);
        ov.addEventListener('click', function(){ try { v.pause(); } catch (e) {} done(); });
        try { var pr = v.play(); if (pr && pr.catch) pr.catch(function(){}); } catch (e) {}
    };
    window._ceOpen = function(){
        var pn = document.getElementById('ce-panel');
        if (!pn) return;
        pn.style.display = 'block';
        if (window._ceList) window._ceList.classList.add('ce-attached');
        if (!window._ceSel) window._ceSel = {};
        pn.innerHTML = '<div class="ce-head"><span class="ce-title">Coalition Builder</span></div>'
            + '<div class="ce-cols">'
            + '<div class="ce-col-left">'
            + '<svg id="ce-parl-svg" class="ce-parl"></svg>'
            + '<div id="ce-logos" class="ce-logos"><div id="ce-logos-major" class="ce-logos-row"></div><div id="ce-logos-minor" class="ce-logos-row ce-logos-minor"></div></div>'
            + '<div class="ce-sec ce-sec-name"><div id="ce-coalname" class="ce-coalname"></div></div>'
            + '</div>'
            + '<div class="ce-col-right">'
            + '<div class="ce-sec"><div class="ce-sec-h">Inter-Party Relations</div><div id="ce-relations"></div></div>'
            + '<div class="ce-sec ce-sec-pie"><div id="ce-pie" class="ce-pie"></div><div id="ce-pie-status" class="ce-pie-status"></div></div>'
            + '</div>'
            + '</div>';
        var tl = document.getElementById('ce-trigger-li'); if (tl) { var ta = tl.querySelector('a'); if (ta) ta.textContent = 'Hide the coalition builder.'; }
        window._ceParlInit();
        window._ceUpdate();
    };
    window._ceClose = function(){ var pn = document.getElementById('ce-panel'); if (pn) { pn.style.display = 'none'; pn.classList.remove('ce-has-adopt'); } var au = document.getElementById('ce-adopt-ul'); if (au) au.style.display = 'none'; var rfx = document.getElementById('ce-refusal-text'); if (rfx && rfx.parentNode) rfx.parentNode.removeChild(rfx); if (window._ceList) window._ceList.classList.remove('ce-attached'); var tl = document.getElementById('ce-trigger-li'); if (tl) { var ta = tl.querySelector('a'); if (ta) ta.textContent = 'Are there any other coalition options?'; } };
    window._cePanelToggle = function(){ var pn = document.getElementById('ce-panel'); if (pn && pn.style.display === 'block') { window._ceClose(); } else { window._ceOpen(); } };
    if (!window._ceAutoHideBound) {
        window._ceAutoHideBound = true;
        document.addEventListener('click', function(e){
            var li = (e.target && e.target.closest) ? e.target.closest('ul.choices li') : null;
            if (!li) return;
            if (li.id === 'ce-trigger-li' || li.id === 'ce-adopt-li' || li.id === 'ce-confirm-li' || li.id === 'ce-reset-li') return;
            if (window._ceClose) window._ceClose();
        }, true);
    }
    window._ceSel = null;
    _ceWrap.innerHTML = '<div id="ce-panel" style="display:none"></div>';
    window._ceInject = function(){
        var lists = document.querySelectorAll('#content ul.choices'); if (!lists.length) return;
        var last = null, _li; for (_li = 0; _li < lists.length; _li++) { if (lists[_li].id !== 'ce-adopt-ul') last = lists[_li]; }
        if (!last) return; window._ceList = last;
        if (!document.getElementById('ce-trigger-li')) { var li = document.createElement('li'); li.id = 'ce-trigger-li'; li.innerHTML = '<a href="javascript:void(0)" onclick="if(event){event.stopPropagation();event.preventDefault();} window._cePanelToggle(); return false;">Are there any other coalition options?</a>'; last.appendChild(li); }
        var pn = document.getElementById('ce-panel'); if (pn && last.nextSibling !== pn && last.parentNode) last.parentNode.insertBefore(pn, last.nextSibling);
        if (!document.getElementById('ce-adopt-ul')) { var aul = document.createElement('ul'); aul.id = 'ce-adopt-ul'; aul.className = 'choices decorated'; aul.style.display = 'none'; aul.innerHTML = '<li id="ce-adopt-li"></li>'; if (pn && pn.parentNode) pn.parentNode.insertBefore(aul, pn.nextSibling); }
        var au = document.getElementById('ce-adopt-ul'); if (au && pn && pn.nextSibling !== au && pn.parentNode) pn.parentNode.insertBefore(au, pn.nextSibling);
    };
    window._ceInject();
    setTimeout(window._ceInject, 0);
    setTimeout(window._ceInject, 90);
    setTimeout(window._ceInject, 320);
};
