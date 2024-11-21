class MobileNavbar {
    constructor(mobileMenu, navList, navLinks, closeNav) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.closeNav = document.querySelector(closeNav);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    animatedLinks(open) {
        this.navLinks.forEach((link, index) => {
            if (open) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                link.style.animation = ""; // Remove a animação ao fechar
            }
        });
    }

    handleClick() {
        const isClosed = !this.navList.classList.contains(this.activeClass);

        if (isClosed) {
            this.navList.style.display = "flex";
            setTimeout(() => {
                this.navList.classList.add(this.activeClass);
                document.body.classList.add("active-nav");
                this.animatedLinks(true); // Adiciona animação
            }, 10);
        } else {
            this.handleClose();
        }
    }

    handleClose() {
        this.navList.classList.remove(this.activeClass);
        document.body.classList.remove("active-nav");
        this.animatedLinks(false); // Remove animação
        setTimeout(() => {
            this.navList.style.display = "none";
        }, 300);
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
        this.closeNav.addEventListener("click", this.handleClose);
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
            this.navList.style.display = "none";
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
