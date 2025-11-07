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
                taskCard.draggable = true;

                taskCard.addEventListener('dragstart', (e) => {
                    // Guardamos el id de la tarea que se está arrastrando
                    e.dataTransfer.setData('text/plain', tarea.id);
                    // Añadimos un feedback visual
                    e.target.classList.add('is-dragging');
                });

                taskCard.addEventListener('dragend', (e) => {
                    // Limpiamos el feedback visual
                    e.target.classList.remove('is-dragging');
                });

                column.appendChild(taskCard);
            }
        });
    }

    renderizarTablero();

    // Event listeners para las columnas (zonas de drop)
    const columnas = document.querySelectorAll('.kanban-column');
    columnas.forEach(columna => {
        columna.addEventListener('dragover', e => {
            e.preventDefault(); // Permitir el drop
            e.currentTarget.classList.add('drag-over');
        });

        columna.addEventListener('dragleave', e => {
            e.currentTarget.classList.remove('drag-over');
        });

        columna.addEventListener('drop', e => {
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over');

            const id = e.dataTransfer.getData('text/plain');
            const tarea = estado.find(t => t.id == id);

            if (tarea) {
                tarea.columna = e.currentTarget.id;
                renderizarTablero();
            }
        });
    });
});
