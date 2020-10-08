let myFullName = "Ricardo Hernandez"; // 10 characters in name...not including space
// 1 Change the content of the div with class "header" to "[Your name]'s Lab 4"
let myHeader = document.querySelector(".header");
myHeader.innerHTML = myFullName + "'s Lab 4";
// 2 Insert two paragraphs into the div with the class "content"
//  Label each paragraph with a distinct class name
var paragraph1 = document.createElement("p1"); //create new element
var paragraph2 = document.createElement("p2"); //create new element

//class names
paragraph1.className = ".content2";
paragraph2.classname = ".content1";

//add some content
var text1 = document.createTextNode("This is paragraph 1: Hello from the other side");
let text2 = document.createTextNode("This is Paragraph 2: the RIGHT paragraph");

var newParagraphs = document.querySelector(".content");

//add text node to paragraph elements
paragraph1.appendChild(text1);
paragraph2.appendChild(text2);


 // add element and content to .content
 newParagraphs.appendChild(paragraph1);
 newParagraphs.appendChild(paragraph2);


// 3 Into the first paragraph, insert the phrase "my name has " length of your name " characters"
//      (e.g. my name has 10 characters).

// 4 & 5 Into the second paragraph tag, return the 3rd character in your first name

// 6 Add a new line to your second paragraph

// 7 Return the final three characters of your last name to that new line

// 8 Substring your first and last name into two separate variables

// 9 Add the total length of your first and last names together

// 10 Display that total next to your name in your header
