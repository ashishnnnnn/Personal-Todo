let date = new Date();
let time = date.getTime();
let counter = time;
const logout = document.querySelector(".log-out");
let todo_wrapper = document.querySelector(".todo-items-wrapper");

// ############################# Welcome Message ############################################

auth.onAuthStateChanged((user) => {
  if (user) {
    var email = user.email;
    var name = email.substring(0, email.lastIndexOf("@"));
    const heading = document.querySelector(".title");
    heading.innerText = "Welcome " + name;
  } else {
    alert(
      "your login session has expired or you have logged out, login again to continue"
    );
    location = "index.html";
  }
});

//  ##################################### LogOut Message ###########################

logout.addEventListener("click", function () {
  auth.signOut().then(() => {
    location = "index.html";
  });
});

function additem(event) {
  event.preventDefault();
  let text = document.querySelector(".new-todo-input input");
  //   console.log(todo_wrapper);
  //   console.log("add item ", text.value);
  //   let element = document.createElement("div");
  //   element.classList.add("todo-items");
  //   element.innerHTML = `<div class="todo-item">
  //   <div class="check">
  //     <div class="check-mark">
  //       <img src="images/icon-check.svg" />
  //     </div>
  //   </div>
  //   <div class="todo-text">${text.value}</div>
  // </div>`;
  //   text.value = "";
  //   todo_wrapper.appendChild(element);
  const value = text.value;
  if (value.lenght > 0) {
    let id = (counter += 1);
    text.value = "";
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(`${user.uid}`)
          .doc(`_${id}`)
          .set({
            id: "_" + id,
            task: value,
          })
          .then(() => {
            // console.log("todo added");
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log("user is not signed in to add todos");
      }
    });
  }
}

// ##################################### Rendering #############################

// retriving todos
function renderData(individualDoc) {
  // parent div
  let parentDiv = document.createElement("div");
  parentDiv.className = "todo-items";
  parentDiv.setAttribute("data-id", individualDoc.id);

  // Todo-Single Item
  let todo = document.createElement("div");
  todo.className = "todo-item";

  // Check Class
  let check = document.createElement("div");
  check.className = "check";
  check.innerHTML = `<div class="check-mark">
                      <img src="images/icon-check.svg" />
                    </div>`;
  todo.appendChild(check);
  // Todo Text
  let todo_text = document.createElement("div");
  todo_text.className = "todo-text";
  todo_text.textContent = individualDoc.data().task;
  todo.appendChild(todo_text);

  // button
  let delete_btn = document.createElement("i");
  delete_btn.className = "delete-mark fas fa-trash";
  todo.appendChild(delete_btn);

  parentDiv.appendChild(todo);
  todo_wrapper.appendChild(parentDiv);

  // trash clicking event
  delete_btn.addEventListener("click", (e) => {
    let id = e.target.parentElement.parentElement.getAttribute("data-id");
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(user.uid).doc(id).delete();
      }
    });
  });
}

var task_number = 0;

// #################################### Real Time Listners #############################
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection(user.uid).onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type == "added") {
          task_number += 1;
          document.querySelector(
            ".items-left"
          ).textContent = `${task_number} Task Left`;
          renderData(change.doc);
        } else if (change.type == "removed") {
          task_number -= 1;
          document.querySelector(
            ".items-left"
          ).textContent = `${task_number} Task Left`;
          let li = todo_wrapper.querySelector(
            "[data-id=" + change.doc.id + "]"
          );
          todo_wrapper.removeChild(li);
        }
      });
    });
  }
});

//  ###################### Theme Toggler     ##################
const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  const background_image = document.querySelector(".background-image");
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    background_image.children[0].src = "images/bg-desktop-light.jpg";
  } else {
    background_image.children[0].src = "images/bg-desktop-dark.jpg";
  }
});
