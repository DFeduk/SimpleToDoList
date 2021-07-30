class TodosController {
  constructor($el) {
    this.initCollection();
    this.initView($el);
  }
  initCollection() {
    this.todosCollection = new TodosCollection(TODOS_URL);
    this.todosCollection.fetchTodos().then(() => this.renderList());
  }

  initView($el) {
    this.todosView = new TodosView($el, {
      onDelete: this.deleteTodo.bind(this),
      onToggle: this.toggleTodo.bind(this),
      onAdd: this.addTodo.bind(this),
    });
  }
  renderList() {
    this.todosView.renderList(this.todosCollection.todosList);
  }
  deleteTodo(id) {
    this.todosCollection.deleteTodo(id);

    this.renderList();
  }
  toggleTodo(id) {
    this.todosCollection.toggleTodo(id);

    this.renderList();
  }
  addTodo(data) {
    this.todosCollection.addTodo(data).then(() => this.renderList());
  }
}
