let myFullName = "Ricardo Hernandez"; // 10 characters in name...not including space
// 1 Change the content of the div with class "header" to "[Your name]'s Lab 4"
let myHeader = document.querySelector(".header");
myHeader.innerHTML = myFullName + "'s Lab 4";
// 2 Insert two paragraphs into the div with the class "content"
//  Label each paragraph with a distinct class name
let paragraph1 = document.createElement("p1"); //create new element
let paragraph2 = document.createElement("p2"); //create new element

//assign distinct class names
paragraph1.className = "content1";
paragraph2.className = "content2";

//assign variable to class ".content"
let newParagraphs = document.querySelector(".content");

//insert the 2 paragraphs into div with class name "content"
newParagraphs.append(paragraph1);
newParagraphs.append(paragraph2);


// 3 Into the first paragraph, insert the phrase "my name has " length of your name " characters"
//      (e.g. my name has 10 characters).
let length_of_name = document.createTextNode("My name has "+myFullName.length+" characters");
paragraph1.append(length_of_name);
 
// 4 & 5 Into the second paragraph tag, return the 3rd character in your first name
let third_char_of_name = document.createTextNode(myFullName.charAt(2).toUpperCase());
paragraph2.append(third_char_of_name);

// 6 Add a new line to your second paragraph
let linebreak = document.createElement("br");
paragraph2.append(linebreak);

// 7 Return the final three characters of your last name to that new line
let last_three_letters = document.createTextNode(myFullName.substr(-3));
paragraph2.append(last_three_letters);

// 8 Substring your first and last name into two separate variables

// 9 Add the total length of your first and last names together

// 10 Display that total next to your name in your header
