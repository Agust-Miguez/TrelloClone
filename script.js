document.addEventListener('DOMContentLoaded', () => {
    console.log('App cargada');

    const estado = [
        { id: 1, titulo: 'Revisar correos', columna: 'por-hacer' },
        { id: 2, titulo: 'Diseñar mockup', columna: 'por-hacer' },
        { id: 3, titulo: 'Implementar feature X', columna: 'por-hacer' },
    ];

    function renderizarTablero() {
        // Limpiar columnas antes de renderizar
        document.getElementById('por-hacer').innerHTML = '<h2>Por Hacer</h2>';
        document.getElementById('en-progreso').innerHTML = '<h2>En Progreso</h2>';
        document.getElementById('hecho').innerHTML = '<h2>Hecho</h2>';

        estado.forEach(tarea => {
            const column = document.getElementById(tarea.columna);
            if (column) {
                const taskCard = document.createElement('div');
                taskCard.className = 'task-card';
                taskCard.textContent = tarea.titulo;
                taskCard.dataset.id = tarea.id; // Guardar el id en el elemento
                column.appendChild(taskCard);
            }
        });
    }

    renderizarTablero();
});
