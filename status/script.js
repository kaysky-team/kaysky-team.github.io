function wait(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

async function loop(id, plus) {
    if (id === "cur") {
        const cursor = document.getElementById('cursor');

        document.addEventListener('mousemove', (event) => {
            const x = event.clientX - 10;
            const y = event.clientY - 10;
            
            cursor.style.top = `${y}px`;
            cursor.style.left = `${x}px`;
        });

        document.querySelectorAll('button, a, .clickable').forEach((element) => {
            element.addEventListener('mouseover', () => {
                cursor.innerHTML = "🟢";
            });
    
            element.addEventListener('mouseout', () => {
                cursor.innerHTML = "🔵";
            });
        });
    } else if (id === "datas") {
        let ip = "91.197.6.247:25570";
        const targetUrl = `https://api.7games.ga/v2/server/?ip=${ip}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

        try {
            const response = await fetch(proxyUrl);
            console.warn(proxyUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            let info = JSON.parse(data.contents);

            
            if (info.icon !== null && info.motd !== null && info.players !== null && info.playersmax !== null && info.version !== null && info.software !== null && info.port !== null) {
                console.log("Fetched successfully!");
                console.log('Page web en cours de modification...');
                console.log('#etat en cours de modification...');
                document.getElementById('etat').style.backgroundColor = "green";
                document.getElementById('etat').style.padding = "3px 20px";
                document.getElementById('etat').style.color = "rgb(240, 240, 240)";
                document.getElementById('etat').style.borderRadius = "7px";
                if (document.getElementById('etatt')) document.getElementById('etatt').remove();
                document.getElementById('etat').textContent = "En Ligne";
                console.log('#players en cours de modification...');
                document.getElementById('players').textContent = info.players + "/" + info.playersmax
                console.log('#soft en cours de modification...');
                document.getElementById('soft').textContent = info.software;
                console.log('#ver en cours de modification...');
                document.getElementById('ver').textContent = info.version;
                console.log('#logo en cours de modification...');
                document.getElementById('logo').src = info.icon.replaceAll('\\', '')
                console.log('#motd en cours de modification...');
                document.getElementById('motd').innerHTML = `${replaceMinecraftCodes(info.motd[0])}<br>${replaceMinecraftCodes(info.motd[1])}`;
                console.log('#port en cours de modification...');
                document.getElementById('port').textContent = info.port
                console.log('#ping en cours de modification...');
                document.getElementById('ping').textContent = JSON.parse(data.status.response_time) / 4
            } else {
                console.log("Fetched successfully!");
                console.log('Page web en cours de modification...');
                console.log('Suppresion des boxs en cours...');
                console.log('Suppresion de .infos en cours...');
                document.getElementsByClassName('infos').item(0).textContent = "Pending";
                if (document.getElementsByClassName('infos').item(1)) document.getElementsByClassName('infos').item(1).remove();
                const ico = document.createElement('span');
                document.getElementById('scriptjs_rescue').appendChild(ico);
                document.getElementsByClassName('infos').item(0).innerHTML = "";
                document.getElementsByClassName('infos').item(0).appendChild(ico);
                ico.textContent = "Hors Ligne"
                ico.style.backgroundColor = "red";
                ico.style.padding = "16px 0";
                ico.style.width = "95%";
                ico.style.color = "rgb(240, 240, 240)";
                ico.style.fontSize = "150%";
                ico.style.borderRadius = "7px";
                ico.style.textAlign = "center";
                ico.style.margin = "0 auto";
            }
            

            document.getElementById('refreshcounter').textContent = "XX";
            console.log('Page web modifiée avec succès!');

            let i = 15;
            document.getElementById('refreshcounter').textContent = i;
            let interval = setInterval(() => {
                if (i) {
                    i--;
                    document.getElementById('refreshcounter').textContent = i;
                } else {
                    document.getElementById('refreshcounter').textContent = i;
                    clearInterval(interval);
                }
            }, 1000);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        await wait(15000);
        loop('datas');
    } else if (id === "§k") {
        const mccode = document.querySelectorAll('span.randomchar-mcstyle'); // tous les §k

        const chars = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~",
            "é", "è", "ê", "ë", "à", "â", "ä", "ç", "ô", "ö", "ù", "û", "ü", "î", "ï", "ÿ", "œ", "æ"
        ] // array de caracteres
        
        mccode.forEach((element) => { //chaque elem
            function getRandomCharacter() { // fonction pour prendre au hasard
                const randomIndex = Math.floor(Math.random() * chars.length); // random
                return chars[randomIndex]; // returne le caractère choisi
            }
            const char = getRandomCharacter(); // appelle la fonction
            element.innerHTML = char; // mettre dans le document html!
        });
        await wait(20); // répétez pour
        loop('§k'); // faire comme mc
    } else if (id === "ipanim") {
        const txt = ["k", "a", "y", "s", "k", "y", ".", "m", "i", "n", "e", ".", "f", "u", "n"];

        const target = document.getElementById("ipshow");

        let index = 0;

        function animMeMORE() {
            if (index < txt.length) {
                target.innerHTML += txt[index];
                index++;
                setTimeout(animMeMORE, 150)
            } else {
                setTimeout(resetText, 1575);
            }
        }

        animMeMORE()

        function resetText() {
            target.innerHTML = "";
            index = 0;
            loop('ipanim');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loading = document.querySelector('#loader');
        if (loading) loading.remove();
    }, 2);
    
    loop('cur');
    loop('ipanim')
    loop('datas');
    loop('§k');
});

function replaceMinecraftCodes(text) {
    if (typeof text !== 'string') {
        console.error('Le texte fourni n\'est pas une chaîne:', text);
        return text;
    }

    const replacements = {
        '§0': '<span style="color: black;">',
        '§1': '<span style="color: darkblue;">',
        '§2': '<span style="color: darkgreen;">',
        '§3': '<span style="color: darkcyan;">',
        '§4': '<span style="color: darkred;">',
        '§5': '<span style="color: darkviolet;">',
        '§6': '<span style="color: gold;">',
        '§7': '<span style="color: lightgrey;">',
        '§8': '<span style="color: darkgrey;">',
        '§9': '<span style="color: blue;">',
        '§a': '<span style="color: green;">',
        '§b': '<span style="color: cyan;">',
        '§c': '<span style="color: red;">',
        '§d': '<span style="color: pink;">',
        '§e': '<span style="color: yellow;">',
        '§f': '<span style="color: white;">',
        '§r': '</span>',
        '§l': '<span style="font-weight: bold; color: white;">',
        '§n': '<span style="text-decoration: underline; color: white;">',
        '§m': '<span style="text-decoration: line-through; color: white;">',
        '§k': '<span class="randomchar-mcstyle" style="color: white;">'
    };

    let formattedText = text.replace(/§[0-9a-fklmnor]/g, function(match) {
        return replacements[match] || match;
    });

    const openTagsCount = (formattedText.match(/<span/g) || []).length;
    const closeTagsCount = (formattedText.match(/<\/span>/g) || []).length;

    const diff = Math.max(openTagsCount - closeTagsCount, 0);

    if (!text.match(/§/g)) {
        return `<span style="color: white;">${text}</span>`;
    } else {
        return formattedText + '</span>'.repeat(diff);
    }
}
