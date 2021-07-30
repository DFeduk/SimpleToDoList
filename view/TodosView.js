const BTN_SELECTOR = `.btn`;
const DELETE_BTN_SELECTOR = `.fa-remove`;
const ITEM_SELECTOR = `.collection-item`;
class TodosView {
  constructor($el, config = {}) {
    this._container = $el;
    this._$list = null;
    this._$todo = null;
    this._config = config;
    this.$taskInput = $(`#task`);
    this.initView();
  }
  initView() {
    this._$list = $(`<ul class = "collection"></ul>`);
    this._$list.on(`click`, DELETE_BTN_SELECTOR, this.onlistClick.bind(this));
    this._container.on(`click`, ITEM_SELECTOR, this.onItemClick.bind(this));
    this._container.on(`click`, BTN_SELECTOR, this.onAddBtnClick.bind(this));
    this._container.prepend(this._$list);
  }
  onAddBtnClick() {
    const todo = {
      isDone: false,
      title: this.$taskInput.val(),
    };

    this._config.onAdd(todo);
    this.clearInput();
  }

  clearInput() {
    this.$taskInput.val("");
  }
  onlistClick(e) {
    const id = this.getElementId($(e.target));

    this._config.onDelete(id);
  }
  onItemClick(e) {
    const id = this.getElementId($(e.target));
    this._config.onToggle(id);
  }
  renderList(list) {
    this._$list.html(list.map(this.getListItemHtml).join(""));
  }
  getListItemHtml({ id, title, isDone }) {
    return `<li class="collection-item ${
      isDone ? `green` : ``
    }" id="${id}">${title}
                <a class="remove-item secondary-content">
                    <i class="fa fa-remove" aria-hidden="true">
                    </i>
                </a>
            </li>`;
  }
  getElementId($el) {
    return $el.closest(ITEM_SELECTOR).attr("id");
  }
}
