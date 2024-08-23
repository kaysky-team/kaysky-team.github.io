document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loading = document.querySelector('#loader')
        loading.remove();
    }, 154)
    
    let lang;
    if (!window.navigator.language !== "fr" || "fr-FR" || "en" || "en-US") {
        lang = "en-US";
    } else {
        lang = window.navigator.language;
    }
    if (!window.localStorage.getItem('language')) {
        window.localStorage.setItem('language', lang);
    }

    function loop(id) {
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
                    cursor.innerHTML = "🟢"
                });
    
                element.addEventListener('mouseout', () => {
                    cursor.innerHTML = "🔵"
                });
            });
        }
    }
    loop('cur')

    var param = new URLSearchParams(window.location.search);
    if (param.get('discord') === "") {
        if (param.get('bot') === "") {
            if (param.get('cmd') === "mc") {
                if (param.get('function') === "reload") {
                    document.getElementById('container').innerHTML = `
                    <p>Hey! Tu veux rafraîchir les informations du serveur Minecraft 🤔</p>
                    <p>Ben... Désolé!</p>
                    <p>La fonctionnalité est indisponible pour le moment</p>
                    `
                }
            }
        }
    }
});