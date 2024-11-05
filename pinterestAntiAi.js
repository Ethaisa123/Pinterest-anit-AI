cururl = window.location.href
if (cururl.includes("pinterest.com/pin")){console.log("pinterest page found!")} else {throw new Error();}

//sets the description, image and hashtags codes (codes used to get elements)
descriptionCode = "X8m zDA IZT tBJ dyH iFc sAJ swG"
hashtagsCode = "X8m Oii IZT CKL tBJ dyH iFc sAJ swG"
commentCode = '.X8m.zDA.tBJ.dyH.iFc.sAJ.swG'
// goes to the first images div tag and gets the first images element
mainImageCode = document.getElementsByClassName('MIw QLY Rym ojN p6V sLG zI7 iyn Hsu')[0];
if (mainImageCode) {mainImgElement = mainImageCode.querySelectorAll('img');} else {console.log('Main Image not found.');}


//URL of AI image replacement
aiImageUrl = "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg";

//innocent until proven Guilty!
IsAi = false
bannedWords = ['Midjourney','aidrawing' ,'AI', 'Artificial intelligence', 'Machine learning', 'ai', 'nijijourney', 'aiart', 'stablediffustion', 'aidrawing', 'aiartanime', 'midjourneyart', 'aiイラスト', 'aiillustration'];


//Function that compares text against bannedWords
function contains(target, pattern){
    // value is what is returned (starts as false)
    var value = false;
    // checks through the banned words list and if a banned word is in the string then sets the returned string to true (AI is detected)
    for (var i = 0; i < pattern.length; i++)
    {if (target.includes(pattern[i])) {value = true;}}
    //returns wether AI is detected
    return (value)
  }


//Description code
descriptionElement = document.getElementsByClassName(descriptionCode)[0];
if (descriptionElement) {
description = descriptionElement.textContent;
console.log("descritption contains AI tags : " + contains(description, bannedWords))

} else {console.log('Description not found')}

//comment code
commentElements = document.querySelectorAll(commentCode);
if (commentElements) {
comments = commentElements.textContent;
console.log(comments)
comments = Array.from(commentElements).map(element => element.textContent).join(' ');
console.log(comments)
comments = comments.replace(/([A-Z])/g, ' $1').trim()
console.log("comments contains AI tags : " + contains(comments, bannedWords))
if (IsAi == false) {IsAi = contains(comments, bannedWords)}

} else {console.log('Commments not found')}

//hashtag code
hashtagElement = document.getElementsByClassName(hashtagsCode)[0];
if (hashtagElement) {
hashtags = hashtagElement.textContent;
hashtags = hashtags.replace(/([A-Z])/g, ' $1').trim()
hashtags = hashtags.replace(/#/g, ' ');
console.log("hashtags contains AI tags : " + contains(hashtags, bannedWords))

} else {console.log('hashtags not found')}





//if the test comes back true set ISAI to true (means that AI is detected)

console.log("Is AI detected : " + IsAi)
if (IsAi == true) {
    mainImgElement[0].src = aiImageUrl
}

