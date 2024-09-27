const scroll = new LocomotiveScroll({
    el: document.querySelector('body'),
    smooth: true,
    inertia: 0.8 // Adjust this to control the smoothness
});

function tabButtons() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the parent section of the clicked button
            const parentSection = button.closest('section');
            
            // Remove active class from all buttons and contents within the parent section
            parentSection.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            parentSection.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button and corresponding content
            button.classList.add('active');
            const activeContent = parentSection.querySelector(`#${button.dataset.tab}`);
            activeContent.classList.add('active');
 });
    });

    // Load images for initially active tabs
    document.querySelectorAll('.tab-content.active').forEach(loadImages);
}

tabButtons();