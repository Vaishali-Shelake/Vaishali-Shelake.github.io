document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imageParam = urlParams.get('image');
    const images = document.querySelectorAll('.blouse-image');
    let imagesLoaded = 0;

    function checkAllImagesLoaded() {
        if (imagesLoaded === images.length && imageParam) {
            const targetImage = document.querySelector(`img[src="${imageParam}"]`);
            if (targetImage) {
                targetImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetImage.classList.add('highlighted');

                // Update Open Graph meta tags
                const ogImage = document.querySelector('meta[property="og:image"]');
                const ogUrl = document.querySelector('meta[property="og:url"]');
                const currentUrl = window.location.href.split('?')[0];
                if (ogImage && ogUrl) {
                    ogImage.setAttribute('content', imageParam);
                    ogUrl.setAttribute('content', `${currentUrl}?image=${encodeURIComponent(imageParam)}`);
                }
            }
        }
    }

    images.forEach((img) => {
        if (img.complete) {
            imagesLoaded++;
            checkAllImagesLoaded();
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
                checkAllImagesLoaded();
            });
        }
    });

    // Update Open Graph meta tags immediately if imageParam is present
    if (imageParam) {
        const ogImage = document.querySelector('meta[property="og:image"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        const currentUrl = window.location.href.split('?')[0];
        if (ogImage && ogUrl) {
            ogImage.setAttribute('content', imageParam);
            ogUrl.setAttribute('content', `${currentUrl}?image=${encodeURIComponent(imageParam)}`);
        }
    }
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