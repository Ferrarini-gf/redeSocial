document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    if (!likeBtn) return;

    const likeSvg = likeBtn.querySelector("svg");

    // Localiza o nó de texto do contador dentro do botão de curtir
    let textNode = Array.from(likeBtn.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
    );

    // Estado inicial
    let baseLikes = 1200; // Começa em 1.2K
    let isLiked = false;

    // Formata números (ex: 1200 vira 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace('.0', '') + "K";
        }
        return num.toString();
    }

    // Atualiza o texto na tela
    function updateDisplay() {
        if (textNode) {
            textNode.textContent = ` ${formatLikes(baseLikes)}`;
        }
    }

    // Efeito visual de animação (bounce) no coração
    function triggerAnimation() {
        likeSvg.style.transform = "scale(1.4)";
        setTimeout(() => {
            likeSvg.style.transform = "scale(1)";
        }, 150);
    }

    // Lógica para Curtir / Descurtir
    function toggleLike() {
        if (isLiked) {
            // Se já curtiu, decrementa (mas nunca deixa ir abaixo de 0)
            baseLikes = Math.max(0, baseLikes - 1);
            isLiked = false;
            // Remove o estilo de curtida (volta a cor original)
            likeSvg.style.fill = "none";
            likeSvg.style.stroke = "currentColor";
        } else {
            // Se não curtiu, incrementa
            baseLikes++;
            isLiked = true;
            // Aplica o estilo de curtida (vermelho)
            likeSvg.style.fill = "#ef4444";
            likeSvg.style.stroke = "#ef4444";
            triggerAnimation();
        }
        updateDisplay();
    }

    // Evento de clique no BOTÃO DE CURTIR
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLike();
    });

    // Evento de clique na IMAGEM PRINCIPAL (Sempre curte ou aumenta)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!isLiked) {
                toggleLike();
            } else {
                baseLikes++; // Se já estiver curtido, acrescenta mais uma curtida ao tocar na foto
                updateDisplay();
                triggerAnimation();
            }
        });
    }

    // Evento no botão de SALVAR (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svg = bookmarkBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        });
    }

    // Inicializa o valor correto na tela ao carregar
    updateDisplay();
});