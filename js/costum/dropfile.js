document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('dropArea');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    // Remove highlight when item is dragged away from drop area
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add('highlight');
    }

    function unhighlight() {
        dropArea.classList.remove('highlight');
    }

    function handleDrop(e) {
        const files = e.dataTransfer.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        [...files].forEach(uploadFile);
    }

    function uploadFile(file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const img = new Image();
            img.src = e.target.result;

            const deleteButton = document.createElement('div');
            deleteButton.classList.add('delete-button');
            deleteButton.innerText = 'X';
            deleteButton.onclick = function() {
                imageContainer.remove();
            };

            imageContainer.appendChild(img);
            imageContainer.appendChild(deleteButton);

            dropArea.appendChild(imageContainer);
        };

        reader.readAsDataURL(file);
    }
});
