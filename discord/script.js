document.addEventListener('DOMContentLoaded', () => {
    const r = document.createElement('meta');
    const id = new URLSearchParams(window.location.search).get('r');
    r.httpEquiv = "refresh";
    r.content = `0; url="https://discord.gg/${id}"`;
    document.head.appendChild(r);
});