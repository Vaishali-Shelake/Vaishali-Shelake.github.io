document.addEventListener('DOMContentLoaded', () => {
    const blouseData = [
        { src: 'imgs-2025/1.webp', alt: 'New Design 1', label: 'New', description: 'New Design 1' },
        { src: 'imgs-2025/2.webp', alt: 'New Design 2', label: 'New', description: 'New Design 2' },
        { src: 'imgs-2024/8.webp', alt: 'Festival Blouse', description: 'Festival Blouse' },
        { src: 'imgs-2024/9.webp', alt: 'Festival Blouse', description: 'Festival Blouse' },
        { src: 'imgs-2024/10.webp', alt: 'Festival Blouse', description: 'Festival Blouse' },
        { src: 'imgs-2024/11.webp', alt: 'Festival Blouse', description: 'Festival Blouse' },
        { src: 'imgs-2024/12.webp', alt: 'Festival Blouse', description: 'Festival Blouse' },
        { src: 'imgs-2024/13.webp', alt: 'Festival Blouse', description: 'Festival Blouse' },
        { src: 'imgs-2024/14.webp', alt: 'Festival Blouse', description: 'Festival Blouse' },
        { src: 'imgs-2024/15.webp', alt: 'Festival Blouse', description: 'Festival Blouse' },
        { src: 'imgs-2024/1a.webp', alt: 'Traditional Blouse Front', description: 'Traditional Blouse', stack: true },
        { src: 'imgs-2024/2.webp', alt: 'Party Wear Blouse', description: 'Party Wear Blouse', info: { title: 'Silk Blouse with Embroidery', text: 'Featuring a stylish neckline' } },
        { src: 'imgs-2024/3a.webp', alt: 'Traditional Blouse Front', description: 'Traditional Blouse', stack: true, info: { title: 'Traditional Design', text: 'Featuring traditional patterns' } },
        { src: 'imgs-2024/4.webp', alt: 'Bridal Blouse', description: 'Bridal Blouse' },
        { src: 'imgs-2024/5.webp', alt: 'Casual Blouse', description: 'Casual Blouse' },
        { src: 'imgs-2024/6.webp', alt: 'Casual Blouse', description: 'Casual Blouse' },
        { src: 'imgs-2024/7.webp', alt: 'Festival Blouse', description: 'Festival Blouse' }
    ];

    const container = document.getElementById('blouse-cards-container');

    blouseData.forEach(blouse => {
        const card = document.createElement('div');
        card.className = 'blouse-card';

        if (blouse.label) {
            const badge = document.createElement('div');
            badge.className = 'new-badge';
            badge.textContent = blouse.label;
            card.appendChild(badge);
        }

        if (blouse.stack) {
            const stack = document.createElement('div');
            stack.className = 'image-stack';

            const img1 = document.createElement('img');
            img1.src = blouse.src;
            img1.alt = blouse.alt;
            img1.className = 'blouse-image active';
            img1.loading = 'lazy';
            stack.appendChild(img1);

            const img2 = document.createElement('img');
            img2.src = blouse.src.replace('a', 'b');
            img2.alt = blouse.alt.replace('Front', 'Back');
            img2.className = 'blouse-image';
            img2.loading = 'lazy';
            stack.appendChild(img2);

            const prevButton = document.createElement('button');
            prevButton.className = 'prev';
            prevButton.innerHTML = '&#10094;';
            prevButton.onclick = () => changeImage(-1);
            stack.appendChild(prevButton);

            const nextButton = document.createElement('button');
            nextButton.className = 'next';
            nextButton.innerHTML = '&#10095;';
            nextButton.onclick = () => changeImage(1);
            stack.appendChild(nextButton);

            card.appendChild(stack);
        } else {
            const img = document.createElement('img');
            img.src = blouse.src;
            img.alt = blouse.alt;
            img.className = 'blouse-image';
            img.loading = 'lazy';
            card.appendChild(img);
        }

        const shareButton = document.createElement('button');
        shareButton.className = 'share-button';
        shareButton.textContent = 'Share';
        shareButton.onclick = () => shareImage(blouse.src, blouse.description);
        card.appendChild(shareButton);

        if (blouse.info) {
            const info = document.createElement('div');
            info.className = 'blouse-info';

            const title = document.createElement('h3');
            title.textContent = blouse.info.title;
            info.appendChild(title);

            const text = document.createElement('p');
            text.textContent = blouse.info.text;
            info.appendChild(text);

            card.appendChild(info);
        }

        container.appendChild(card);
    });
});

let currentImageIndex = 0;

function changeImage(direction) {
    const images = document.querySelectorAll('.image-stack .blouse-image');
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    images[currentImageIndex].classList.add('active');
}

function shareImage(imageUrl, imageName) {
    const currentUrl = window.location.href.split('?')[0]; // Get the base URL without query parameters
    const shareUrl = `${currentUrl}?image=${encodeURIComponent(imageUrl)}`;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
        console.log('URL copied to clipboard');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });

    if (navigator.share) {
        navigator.share({
            title: 'Check out this blouse design!',
            text: `Here's a beautiful blouse design: `,
            url: shareUrl
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(console.error);
    } else {
        alert('Web Share API is not supported in your browser.');
    }
}