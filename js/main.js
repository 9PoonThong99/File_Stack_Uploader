const APIkey = "AZosHhV0SEaGoklzJCJJsz";

// Set up the picker
const client = filestack.init(APIkey);
const options = {
  onUploadDone: updateForm,
  maxSize: 10 * 1024 * 1024,
  accept: [".pdf", "image/*"],
  uploadInBackground: false
};
const picker = client.picker(options);

// Get references to the DOM elements

const form = document.getElementById("pick-form");
const fileInput = document.getElementById("fileupload");
const btn = document.getElementById("picker");
const nameBox = document.getElementById("nameBox");
const urlBox = document.getElementById("urlBox");
const inputUrl = document.getElementById("inputUrl");
const btnCopy = document.querySelector(".btn_copy");
// Add our event listeners

btn.addEventListener("click", function(e) {
  e.preventDefault();
  picker.open();
});

form.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Submitting: " + fileInput.value);
});

btnCopy.addEventListener("click", e => {
  urlClipBoard(inputUrl);
});

// Helper to overwrite the field input value

function updateForm(result) {
  const fileData = result.filesUploaded[0];
  fileInput.value = fileData.url;
  // Some ugly DOM code to show some data.
  const name = document.createTextNode("Selected: " + fileData.filename);
  const url = document.createElement("a");
  url.href = fileData.url;
  url.appendChild(document.createTextNode(fileData.url));
  nameBox.appendChild(name);
  urlBox.appendChild(document.createTextNode("Uploaded to: "));
  urlBox.appendChild(url);
  inputUrl.value = url;
}

function urlClipBoard(element) {
  /* Get the text field */
  const val = element.value;
  /* Select the text field */
  element.select();
  element.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + val);
}

/*
1. Change "copy input" to const url.value done
2. When user uploads is a success run the 

  showUrl() This will show the url if available on success may use promises
  urlClipBoard() Clicking on this will copy the url to clipboard
  shrinkUrl() Optional use or previous urlshortner this will shrink the url for users and can also be copied

*/
