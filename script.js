document.addEventListener('DOMContentLoaded', function() {
    // Current playing audio element
    let currentAudio = null;
    let currentPlayButton = null;

    // Function to play/pause audio
    function togglePlayPause(button) {
        const audioSrc = button.getAttribute('data-audio-src');
        const icon = button.querySelector('i');

        if (currentAudio && currentAudio.src.includes(audioSrc)) {
            // If the same audio is playing/paused, toggle it
            if (currentAudio.paused) {
                currentAudio.play();
                icon.classList.remove('bi-play-fill');
                icon.classList.add('bi-pause-fill');
            } else {
                currentAudio.pause();
                icon.classList.remove('bi-pause-fill');
                icon.classList.add('bi-play-fill');
            }
        } else {
            // If a different audio is clicked, stop current and play new
            if (currentAudio) {
                currentAudio.pause();
                // Reset the icon of the previously playing button
                if (currentPlayButton) {
                    currentPlayButton.querySelector('i').classList.remove('bi-pause-fill');
                    currentPlayButton.querySelector('i').classList.add('bi-play-fill');
                }
            }
            currentAudio = new Audio(audioSrc);
            currentAudio.play();
            icon.classList.remove('bi-play-fill');
            icon.classList.add('bi-pause-fill');
            currentPlayButton = button;

            // Listen for when the audio ends to reset the button
            currentAudio.onended = function() {
                icon.classList.remove('bi-pause-fill');
                icon.classList.add('bi-play-fill');
                currentAudio = null;
                currentPlayButton = null;
            };
        }
    }

    // Add event listeners to all play buttons
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function() {
            togglePlayPause(this);
        });
    });

    // Reset audio and carousel when modal is closed
    const sentimientosModal = document.getElementById('sentimientosModal');
    if (sentimientosModal) {
        sentimientosModal.addEventListener('hidden.bs.modal', function () {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
            if (currentPlayButton) {
                currentPlayButton.querySelector('i').classList.remove('bi-pause-fill');
                currentPlayButton.querySelector('i').classList.add('bi-play-fill');
                currentPlayButton = null;
            }
            // Reset the carousel to the first slide
            const carouselInstance = bootstrap.Carousel.getInstance(document.getElementById('sentimientosCarousel'));
            if (carouselInstance) {
                carouselInstance.to(0);
            }
        });
    }

    // Add event listener for 'tuModal' to reset its carousel
    const tuModal = document.getElementById('tuModal');
    if (tuModal) {
        tuModal.addEventListener('hidden.bs.modal', function () {
            const carouselInstance = bootstrap.Carousel.getInstance(document.getElementById('tuCarousel'));
            if (carouselInstance) {
                carouselInstance.to(0);
            }
        });
    }

    // NUEVO: Añadir event listener para 'nosotrosModal' para resetear su carrusel
    const nosotrosModal = document.getElementById('nosotrosModal');
    if (nosotrosModal) {
        nosotrosModal.addEventListener('hidden.bs.modal', function () {
            const carouselInstance = bootstrap.Carousel.getInstance(document.getElementById('nosotrosCarousel'));
            if (carouselInstance) {
                carouselInstance.to(0);
            }
        });
    }

});