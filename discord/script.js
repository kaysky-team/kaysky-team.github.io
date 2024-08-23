document.addEventListener('DOMContentLoaded', () => {
    const id = new URLSearchParams(window.location.search).get('r');
    new URLSearchParams(window.location.search).delete('r')
    const r = document.createElement('meta');
    r.httpEquiv = "refresh";
    r.content = `0; url="https://discord.gg/${id}"`;
    document.head.appendChild(r);
});