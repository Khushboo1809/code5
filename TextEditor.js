let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// List of Fontlist
let Fontlist = ["Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "Cursive",];

// Initial Settings
const initializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);
}

// create options for font names
Fontlist.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
});

// function for fontsize
for (let i = 1; i<= 7; i++){
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
}

// default size
    fontSizeRef.value = 3;


    // main logic
const modifyText = (command, defaultUi, value) => {
    // exeCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
};


// For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
    button.addEventListener("click", () =>  {
        modifyText(button.id, false, null);
    });
});


// options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});



// link
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    }
    else{
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
})



// Highlight clicked button 
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListner("click", () =>{
            if (needsRemoval) {
                let alreadyActive = false;

            if (button.classList.contains("active")){
                alreadyActive = true;
            }    

            highlighterRemover(className);
            if(!alreadyActive) {
                button.classList.add("active");
            }
            }
            else{
                // if other buttons can be highlighted
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};