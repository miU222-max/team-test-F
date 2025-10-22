document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.transform = 'scale(1.05)';
            section.style.transition = 'transform 0.3s';
        });

        section.addEventListener('mouseleave', () => {
            section.style.transform = 'scale(1)';
        });
    });
});