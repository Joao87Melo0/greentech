class MobileNavbar {
    constructor(mobileMenu, navList, navLinks, closeNav) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.closeNav = document.querySelector(closeNav);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.checkResize = this.checkResize.bind(this);
    }

    animatedLinks(open) {
        this.navLinks.forEach((link, index) => {
            if (open) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                link.style.animation = "";
            }
        });
    }

    handleClick() {
        if (window.innerWidth > 768) return; // Não aplica comportamento mobile em telas maiores

        const isClosed = !this.navList.classList.contains(this.activeClass);

        if (isClosed) {
            this.navList.style.display = "flex";
            setTimeout(() => {
                this.navList.classList.add(this.activeClass);
                document.body.classList.add("active-nav");
                this.animatedLinks(true);
            }, 10);
        } else {
            this.handleClose();
        }
    }

    handleClose() {
        if (window.innerWidth > 768) return; // Não aplica comportamento mobile em telas maiores

        this.navList.classList.remove(this.activeClass);
        document.body.classList.remove("active-nav");
        this.animatedLinks(false);
        setTimeout(() => {
            this.navList.style.display = "none";
        }, 300);
    }

    checkResize() {
        if (window.innerWidth > 768) {
            // Reseta os estilos para o modo desktop
            this.navList.style.display = "flex";
            this.navList.classList.remove(this.activeClass);
            document.body.classList.remove("active-nav");
            this.animatedLinks(false);
        } else if (!this.navList.classList.contains(this.activeClass)) {
            // Em mobile, quando fechado, a lista fica oculta
            this.navList.style.display = "none";
        }
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
        this.closeNav.addEventListener("click", this.handleClose);
        window.addEventListener("resize", this.checkResize); // Verifica redimensionamento da tela
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
            this.checkResize(); // Configuração inicial para ajustar ao tamanho da tela
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
    ".close-nav"
);

mobileNavbar.init();
