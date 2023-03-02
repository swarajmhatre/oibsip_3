let toDoList = [];
// function to render the data
function renderItems(todo) {
  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    return;
  }

  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("tr");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
  <input id="${todo.id}" type="checkbox"/>
  <label for="${todo.id}" class="tick js-tick"></label>
  <span>${todo.title}</span>
  <span>${todo.desc}</span>
  <i class="material-icons delete-todo js-delete-todo">delete</i>
    `;
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}
// function to add new task item to the list
function addItem(title, desc) {
  const todo = {
    title,
    desc,
    checked: false,
    id: Date.now(),
  };
  toDoList.push(todo);
  renderItems(todo);
}
// function to mark the task as checkd or unchecked
function toggle(key) {
  const index = toDoList.findIndex((item) => item.id === Number(key));
  toDoList[index].checked = !toDoList[index].checked;
  renderItems(toDoList[index]);
}
// function to remove the item from the list of tasks
function deleteItem(key) {
  const index = toDoList.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...toDoList[index],
  };
  toDoList = toDoList.filter((item) => item.id !== Number(key));
  renderItems(todo);
}
// evenlistener to accept the entered task info
const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector(".js-todo-title");
  const desc = document.querySelector(".js-todo-desc");
  const text1 = title.value.trim();
  const text2 = desc.value.trim();
  if (text1 !== "" && text2 !== "") {
    addItem(text1, text2);
    title.value = "";
    desc.value = "";
    input.focus();
  }
});
// eventlisteners for deleting/marking the task as completed
const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggle(itemKey);
  }
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteItem(itemKey);
  }
});
