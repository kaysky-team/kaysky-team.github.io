document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loading = document.querySelector('#loader')
        loading.remove();
    }, 154)
    
    document.getElementById('cb_ips').addEventListener('click', () => {
        new Clipboard().writeText("kaysky.mine.fun");
    });
});