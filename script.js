document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loading = document.querySelector('#loader')
        loading.remove();
    }, 154)
    
    document.getElementById('cb_ips').addEventListener('click', () => {
        alert("L'appui-pour-copier est indisnonible, nous essayons de régler le problème. S'il vous plaît, copier-le manuellement!")
    });
});