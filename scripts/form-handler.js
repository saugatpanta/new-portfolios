const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
         // Email Integration
        await fetch('https://formspree.io/f/xjkgeawr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        alert('Message sent successfully!');
        form.reset();
        document.querySelector('.contact-modal').style.display = 'none';
    } catch (error) {
        alert('Error sending message. Please try again.');
    }
});