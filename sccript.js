const addBox = document.querySelector(".add-box");
popBox = document.querySelector(".popup-box");
popTitle = popBox.querySelector("header p");
closeIcon = popBox.querySelector("header span");
titleTag = popBox.querySelector("input");
descriptionTag = popBox.querySelector("textarea");
addBtn = popBox.querySelector("button");

const months = [
  "January",
  "February",
  "Marc",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//getting local storage notes if exits and parsing them
// to js object else passing an empty array to notes

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
   addBtn.innerText = "Add a Note";
  popTitle.innerText = "Add a New Note";
  popBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descriptionTag.value = ""; 
  popBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span
            >${note.description}</span
          >
        </div>
        <div class="bottom-content">
          <span>${note.date} </span>
          <div class="settings">
            <span onclick="showMenu(this)" class="material-symbols-outlined"> more_horiz </span>
            <ul class="menu">
              <li onclick="updateNote(${index},'${note.title}','${note.description}')"><span class="material-symbols-outlined"> edit </span>Edit</li>
              <li onclick="deleteNote(${index})">
                <span class="material-symbols-outlined"> delete </span>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    // removing show class from the settings menu on document click
    if (e.target.tagName != "SPAN" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let conformDel = confirm("Are you sure you want to delete this note?");
  if (!conformDel) return;
  notes.splice(noteId, 1); // removing selected note from array/tasks
  localStorage.setItem("notes", JSON.stringify(notes)); // saving updated notes to localStorage
  showNotes();
}

function updateNote(noteId, title, description) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descriptionTag.value = description;
  addBtn.innerText = "Update Note";
  popTitle.innerText = "Update a Note";
 
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = descriptionTag.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date();
    (month = months[dateObj.getMonth()]),
      (day = dateObj.getDate()),
      (year = dateObj.getFullYear());

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${day}/${month}/${year}`,
    };

    if (!isUpdate) {
      notes.push(noteInfo); // adding new note to notes
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo; //updating specified note
    }

    localStorage.setItem("notes", JSON.stringify(notes)); // saving notes to localStorage
    showNotes(); // it is added to show the notes after submit button clicked
    closeIcon.click();
  }
});
