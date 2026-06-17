class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.init();
    }

    /**
     * Initialize the app
     */
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Add task button
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());

        // Input field - enter key
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        // Clear buttons
        document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompleted());
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAll());
    }

    /**
     * Add a new todo
     */
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (text === '') {
            alert('Please enter a task!');
            return;
        }

        if (text.length > 200) {
            alert('Task must be less than 200 characters!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toLocaleString(),
            completedAt: null
        };

        this.todos.unshift(todo);
        this.saveToStorage();
        this.render();
        input.value = '';
        input.focus();
    }

    /**
     * Toggle todo completion status
     */
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.completedAt = todo.completed ? new Date().toLocaleString() : null;
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Delete a todo
     */
    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Edit a todo
     */
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            const newText = prompt('Edit task:', todo.text);
            if (newText !== null && newText.trim() !== '') {
                todo.text = newText.trim();
                this.saveToStorage();
                this.render();
            }
        }
    }

    /**
     * Clear all completed todos
     */
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Clear all todos
     */
    clearAll() {
        if (this.todos.length === 0) {
            alert('No tasks to clear!');
            return;
        }

        if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone!')) {
            this.todos = [];
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Get filtered todos
     */
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    /**
     * Update statistics
     */
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('activeCount').textContent = active;
        document.getElementById('completedCount').textContent = completed;
    }

    /**
     * Render the todo list
     */
    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        // Update stats
        this.updateStats();

        // Show/hide empty state
        if (filteredTodos.length === 0) {
            todoList.innerHTML = '';
            emptyState.classList.add('show');
        } else {
            emptyState.classList.remove('show');
            todoList.innerHTML = filteredTodos.map(todo => this.createTodoElement(todo)).join('');

            // Add event listeners to checkboxes and buttons
            document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    this.toggleTodo(parseInt(e.target.dataset.id));
                });
            });

            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.deleteTodo(parseInt(e.target.dataset.id));
                });
            });

            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.editTodo(parseInt(e.target.dataset.id));
                });
            });
        }

        // Update button states
        this.updateButtonStates();
    }

    /**
     * Create a todo element HTML
     */
    createTodoElement(todo) {
        const date = new Date(todo.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    data-id="${todo.id}"
                    ${todo.completed ? 'checked' : ''}
                >
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <span class="todo-date">${date}</span>
                <div class="todo-actions">
                    <button class="todo-btn edit-btn" data-id="${todo.id}" title="Edit">✏️</button>
                    <button class="todo-btn delete-btn" data-id="${todo.id}" title="Delete">🗑️</button>
                </div>
            </li>
        `;
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Update button states
     */
    updateButtonStates() {
        const clearCompletedBtn = document.getElementById('clearCompletedBtn');
        const clearAllBtn = document.getElementById('clearAllBtn');

        const hasCompleted = this.todos.some(t => t.completed);
        const hasAny = this.todos.length > 0;

        clearCompletedBtn.disabled = !hasCompleted;
        clearAllBtn.disabled = !hasAny;
    }

    /**
     * Save todos to localStorage
     */
    saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    /**
     * Load todos from localStorage
     */
    loadFromStorage() {
        const stored = localStorage.getItem('todos');
        if (stored) {
            try {
                this.todos = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading todos from storage:', e);
                this.todos = [];
            }
        }
    }

    /**
     * Export todos as JSON
     */
    exportTodos() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().getTime()}.json`;
        link.click();
    }

    /**
     * Import todos from JSON
     */
    importTodos(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    this.todos = imported;
                    this.saveToStorage();
                    this.render();
                    alert('Todos imported successfully!');
                }
            } catch (error) {
                alert('Error importing todos: Invalid file format');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
