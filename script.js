document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loading = document.querySelector('#loader')
        loading.remove();
    }, 154)
    
    let lang;
    if (window.navigator.language !== "fr" || "fr-FR" || "en" || "en-US") {
        lang = "en-US";
    } else {
        lang = window.navigator.language;
    }
    if (!window.localStorage.getItem('language')) {
        window.localStorage.setItem('language', lang);
    }

    document.getElementById('cb_ips').addEventListener('click', () => {
        alert("L'appui-pour-copier est indisnonible, nous essayons de régler le problème. S'il vous plaît, copier-le manuellement!")
    });

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
});