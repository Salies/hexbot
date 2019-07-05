const iso = ['af','ax','al','dz','as','ad','ao','ai','ag','ar','am','aw','au','at','az','bs','bh','bd','bb','by','be','bz','bj','bm','bt','bo','bq','ba','bw','br','io','bn','bg','bf','bi','cv','kh','cm','ca','ky','cf','td','cl','cn','cx','cc','co','km','ck','cr','hr','cu','cw','cy','cz','ci','cd','dk','dj','dm','do','ec','eg','sv','gq','er','ee','et','fk','fo','fm','fj','fi','mk','fr','gf','pf','tf','ga','gm','ge','de','gh','gi','gr','gl','gd','gp','gu','gt','gg','gn','gw','gy','ht','va','hn','hk','hu','is','in','id','ir','iq','ie','im','il','it','jm','jp','je','jo','kz','ke','ki','xk','kw','kg','la','lv','lb','ls','lr','ly','li','lt','lu','mo','mg','mw','my','mv','ml','mt','mh','mq','mr','mu','yt','mx','md','mc','mn','me','ms','ma','mz','mm','na','nr','np','nl','nc','nz','ni','ne','ng','nu','nf','kp','mp','no','om','pk','pw','pa','pg','py','pe','ph','pn','pl','pt','pr','qa','cg','ro','ru','rw','re','bl','sh','kn','lc','mf','pm','vc','ws','sm','st','sa','sn','rs','sc','sl','sg','sx','sk','si','sb','so','za','gs','kr','ss','es','lk','ps','sd','sr','sj','sz','se','ch','sy','tw','tj','tz','th','tl','tg','tk','to','tt','tn','tr','tm','tc','tv','ug','ua','ae','gb','um','us','uy','uz','vu','ve','vn','vg','vi','wf','eh','ye','zm','zw'];

//function used by the hexbot API, as stated in https://github.com/noops-challenge/hexbot
function randomHex() {
    const hexMax = 256 * 256 * 256;
    return '#' + Math.floor(Math.random() * hexMax).toString(16).toUpperCase().padStart(6, '0');
}

fetch(`https://lipis.github.io/flag-icon-css/flags/4x3/${iso[Math.floor(Math.random() * iso.length)]}.svg`)
.then(page => page.text())
.then(text => {
    const dummy = new DOMParser().parseFromString(text, 'text/html');

    const paths = dummy.querySelectorAll('path');
    var usedColors = []; //little shenaningan to make sure same colors get the same new, random color (things may break otherwise, e.g. Denmark flag uses two paths for the white stripes, they would look odd in different colors)
    for(i=0;i<paths.length;i++){
        let fill = paths[i].getAttribute('fill');
        if(fill === null || fill === 'none'){
            continue;
        }
        else{
            let u = usedColors.find(obj => obj.previous == fill);
            if(u !== undefined){
                paths[i].setAttribute('fill', u.new);
            }
            else{
                let color = randomHex();
                paths[i].setAttribute('fill', color);
                usedColors.push({previous:fill, new:color});
            }
        }
    }
    document.querySelector('.flag').appendChild(dummy.querySelector('svg'));
});

/*TO(maybe)DO:
* create a function so that the API gets >>just the right ammount of colors<< - count the repeated fills (that would need two loops, one for count, the other for apply - they would do basically the same verification)
FORGET THAT, decided to implement the function and not use the API. but you would need that if you're going for the API and don't want to repeat loops
*/