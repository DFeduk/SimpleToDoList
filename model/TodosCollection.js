class TodosCollection {
  constructor(url) {
    this._url = url;
    this.todosList = [];
    this.item = null;
  }
  fetchTodos() {
    return fetch(this._url).then((resp) =>
      resp.json().then((data) => this.setData(data))
    );
  }
  setData(data) {
    this.todosList = data;
  }
  addTodo(data) {
    if (data.title === ``) {
      return;
    }
    return fetch(this._url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => this.todosList.push(data));
  }
  deleteTodo(id) {
    this.todosList = this.todosList.filter((item) => item.id != id);
    return fetch(this._url + id, {
      method: "DELETE",
    }).then((resp) => resp.json());
  }
  toggleTodo(id) {
    this.item = this.todosList.find((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
        return item;
      }
    });
    return fetch(this._url + id, {
      method: "PUT",
      body: JSON.stringify(this.item),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }
}
