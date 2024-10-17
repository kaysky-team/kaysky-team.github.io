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
    loop('cur');

    document.getElementById("cb_ips").addEventListener("click", function() {
        const textToCopy = "kaysky.mine.fun";
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert("L'IP du serveur est enregistré dans votre presse-papier avec succès et prêt à être utiliser!");
                })
                .catch(err => {
                    console.error("Erreur lors de la copie du texte : ", err);
                    alert("Erreur lors de la copie de l'IP")
                });
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("L'IP du serveur est enregistré dans votre presse-papier avec succès et prêt à être utiliser!");
        }
    });
});