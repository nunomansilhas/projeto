document.addEventListener('DOMContentLoaded', function() {
    const selectCategoria = document.querySelector('.selectpicker.form-control');

    fetch('http://localhost:3000/api/tiposprodutos')
        .then(response => response.json())
        .then(data => {
            // Loop through the retrieved data and create options
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.textContent = categoria.Nome; // Assuming 'Nome' is the property name for category name
                option.value = categoria.ID; // Assuming 'ID' is the property name for category ID
                selectCategoria.appendChild(option);
            });

            // Refresh the selectpicker to display newly added options
            $(selectCategoria).selectpicker('refresh');
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
});
