//Botao curtidas
document.addEventListener("DOMContentLoaded", () =>{
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    if (!likeBtn) return;
    const likeSvg = likeBtn.querySelector("svg");


    //localiza o contador

    let textNode = Array.from(likeBtn.childNodes).find(node) => node.nodeType
    === Node.TEXT_NODE && node.textContent.trim() !== ""
);

//zera o contador
let cont = 0;

//atualiza
if(textNode){
    textNode.textContent = `0`;
}

//coração
function applyLikedStyle (){
likeSvg.style.fill = "#ef4444";
likeSvg.style.stroke = "#ef4444";
likeSvg.style.color = "#ef4444";


//efeito curtida
likeSvg.style.transform = "scale(1.3)";
setTimeout(() => (likeSvg.style.transform = "scale(1)")150);
}

//para números acima de 1000

function formatLikes(num){
    if(num >=1000){
        return (num/1000).toFixed(1)+"K";
    }
    return num.toString();
}

//incrementar a curtida

function addLike(){
    baseLikes++;
    isLiked = true;
    likeBtn.classList.add("liked");

    if(likesCountSpan){
        likesCountSpan.textContent = formatLikes(baseLikes);
    }
}

// Efeito visual de animação (bounce) no coração.
const svg = likeBtn.querySelector("svg");
if (svg) {
svg.style.transform = "scale(1.4)";
setTimeout(() => {
svg.style.transform = "scale(1)";
}, 150);
}
}

// Evento de clique no BOTÃO DE CORAÇÃO (Curte ou Descurte)
likeBtn.addEventListener("click", (e) => {
e.stopPropagation();

if (isLiked) {
// Se já estava curtido, descurte (-1)
isLiked = false;
baseLikes = Math.max(0, baseLikes - 1);
likeBtn.classList.remove("liked");
if (likesCountSpan) {
likesCountSpan.textContent = formatLikes(baseLikes);
}
} else {
// Se não estava curtido, adiciona curtida
addLike();
}
});

// Evento de clique na IMAGEM PRINCIPAL (Sempre aumenta likes)
if (postMedia) {
postMedia.addEventListener("click", (e) => {
e.stopPropagation();
addLike();
});
}

// Evento no botão de SALVAR (Bookmark)[cite: 1]
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

