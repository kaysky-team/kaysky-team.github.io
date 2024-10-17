function wait(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

async function loop(id) {
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
        let ip = "kaysky.mine.fun";
        const targetUrl = `https://api.7games.ga/v2/server/?ip=${ip}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

        try {
            const response = await fetch(proxyUrl);
            console.warn(proxyUrl)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            let info = JSON.parse(data.contents);
            
            console.log("Fetched successfully!");
            console.log('Page web en cours de modification...');
            console.log('#players en cours de modification...');
            document.getElementById('players').textContent = info.players + "/" + info.playersmax;
            console.log('#etat en cours de modification...');
            info.online ? document.getElementById('etat').style.backgroundColor = "green" : document.getElementById('etat').style.backgroundColor = "red";
            document.getElementById('etat').style.color = "rgb(240, 240, 240)";
            document.getElementById('etat').style.borderRadius = "7px";
            if (document.getElementById('etatt')) document.getElementById('etatt').remove();
            document.getElementById('etat').style.padding = "3px";
            document.getElementById('etat').style.transform = "translateY(2px)";
            document.getElementById('etat').style.backgroundColor === "green" ? document.getElementById('etat').textContent = "ﾠEn ligneﾠ" : document.getElementById('etat').textContent = "ﾠHors ligneﾠ";
            console.log('#soft en cours de modification...');
            document.getElementById('soft').textContent = info.software;
            console.log('#ver en cours de modification...');
            document.getElementById('ver').textContent = info.version;
            console.log('#logo en cours de modification...');
            console.log('#motd en cours de modification...');
            document.getElementById('motd').innerHTML = replaceMinecraftCodes(info.motd[0]);
            console.log('#ip en cours de modification...');
            document.getElementById('ip').textContent = info.value
            console.log('#port en cours de modification...');
            document.getElementById('port').textContent = info.port
            console.log('#ping en cours de modification...');
            document.getElementById('ping').textContent = JSON.parse(data.status.response_time)

            document.getElementById('refreshcounter').textContent = "XX";
            console.log('Page web modifiée avec succès!');

            let i = 25;
            function countdown1() {
                if (i >= 0) {
                    document.getElementById('refreshcounter').textContent = i;
                    i--;
                    setTimeout(countdown1, 1000);
                }
            }
            countdown1();

        } catch (error) {
            console.error('Error fetching data:', error);
        }

        await wait(25000);
        loop('datas');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loading = document.querySelector('#loader');
        if (loading) loading.remove();
    }, 2);
    
    loop('cur');
    setTimeout(() => loop('datas'), 965);
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
        '§l': '<span style="font-weight: bold;">',
        '§n': '<span style="text-decoration: underline;">',
        '§m': '<span style="text-decoration: line-through;">',
        '§k': '<span style="font-family: monospace;">'
    };

    let formattedText = text.replace(/§[0-9a-fklmnor]/g, function(match) {
        return replacements[match] || match;
    });

    const openTagsCount = (formattedText.match(/<span/g) || []).length;
    const closeTagsCount = (formattedText.match(/<\/span>/g) || []).length;

    const diff = Math.max(openTagsCount - closeTagsCount, 0);

    return formattedText + '</span>'.repeat(diff);
}