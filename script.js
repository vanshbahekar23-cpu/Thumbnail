const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  document.body.style.overflow = "";
};

document.querySelectorAll(".work-card").forEach(card => {
  card.addEventListener("click", () => {
    modalImage.src = card.dataset.full;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Subtle active nav behavior.
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.remove("active"));
    const active = navLinks.find(link => link.getAttribute("href") === "#" + entry.target.id);
    if (active) active.classList.add("active");
  });
}, {rootMargin: "-35% 0px -55% 0px"});
sections.forEach(s => navObserver.observe(s));
