function reloadp() {
    // Salva a posição do scroll antes de recarregar a página
    sessionStorage.setItem('scrollPosition', window.scrollY);

    // Recarrega a página
    location.reload();
}

// Após o reload, restaura a posição do scroll
if (sessionStorage.getItem('scrollPosition')) {
    window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
    // Limpar o valor após restaurar a posição para que não seja persistido na próxima vez
    sessionStorage.removeItem('scrollPosition');
}