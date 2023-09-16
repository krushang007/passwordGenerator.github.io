// password box
let password = document.querySelector(".password");
// copy button
let copy = document.querySelector(".copy");
// length value
let len = document.querySelector(".length");
// default value
len.innerHTML = "10";
// button
let btn = document.querySelector(".btn");
// strength indicator
let indicator = document.querySelector(".indicator");
// all check boxes
let upper = document.querySelector("#upper");
let lower = document.querySelector("#lower");
let number = document.querySelector("#number");
let symbol = document.querySelector("#symbol");
// all checks in one
let allCheck = document.querySelectorAll('input[type="checkbox"]');
// range bar
let range = document.querySelector(".range");
// count of checkbox
let count = 0;
// for success or faliur of copy password
let message = document.querySelector(".message");

// funtion for setupe range value same is length
function handleRange() {
  let length = range.value;
  len.innerHTML = length;
}
// handling range while sliding the range
range.addEventListener("input", handleRange);

// code for copy content to clipbord
async function copyPass() {
  try {
    await navigator.clipboard.writeText(password.value);
    message.innerHTML = "Copied";
} catch (e) {
    message.innerHTML = "Failed";
}
message.classList.add("active");
  setTimeout(() => {
    message.classList.remove("active");
  }, 2000);
}
// handle copypass
copy.addEventListener("click", () => {
  if (password.value) {
    copyPass();
  } else {
    return;
  }
});
// temp function to get random integer between some range
function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// funtion to get upper
function getUpper() {
  return String.fromCharCode(getRandInt(65, 91));
}
// funtion to get lower
function getLower() {
  return String.fromCharCode(getRandInt(97, 123));
}
// funtion to get random number
function getNumber() {
  return getRandInt(0, 9);
}
// funtion to get random symbol
function getSymbol() {
  let temp = "!@#$%^&*()-=_+[]{}|;:,.<>?/\\`";
  let x = getRandInt(0, temp.length);
  return temp[x];
}
// funtion to handle check howmany checkbox all checked
function getCheckCount() {
    count = 0;
  allCheck.forEach((box) => {
    if (box.checked) {
      count++;
    }
});
}
// handling check box change
allCheck.forEach((box) => {
  box.addEventListener('change', getCheckCount)
});


btn.addEventListener('click',()=>
{
    if(count<=0)
    {
        return;
    }
    else if(count>parseInt(len.innerHTML))
    {
        range.value=count;
        handleRange();
    }
    pass="";
    let functionArr=[];
    if(upper.checked)
    {
        functionArr.push(getUpper);
    }
    if(lower.checked)
    {
        functionArr.push(getLower);
    }
    if(number.checked)
    {
        functionArr.push(getNumber);
    }
    if(symbol.checked)
    {
        functionArr.push(getSymbol);
    }
    // finding password for all selected checkbox only single character of each
    // i.e 3 boxes are selected than atles one occurence of each will be there
    for(let i=0;i<count;i++)
    {
        pass+=functionArr[i]();
    }
    // for other characeters
    // i.e. 3 boxes are selected and length is 10 than for 3 charaters above funtion will work
    // and for remaining 7 charatcer we will select random numbers 
    for(let i=0;i<range.value-count;i++)
    {
        let x=getRandInt(0,count);
        pass+=functionArr[x]();
    }
// suffeling string
    pass=suffleString(pass);
// setting password to text - box
    password.value=pass;
//  setting indicator color according to strength
// this array is of color according to strength
let arr=["#FF3131","#FFF01F","#39FF14"];
let i=getStrength();
indicator.style.backgroundColor=arr[i];
indicator.style.boxShadow="0px 0px 10px 2px "+arr[i];
});



// funtion to suffle string 
function suffleString(pass)
{
    let arr=Array.from(pass);
    for(let i=0;i<arr.length;i++)

    {
        let rand=getRandInt(0,arr.length-1);
        let temp=arr[rand];
        arr[rand]=arr[i];
        arr[i]=temp;
    }
    return arr.join('');
{}}
// funtion to calculate strengtg
function getStrength()
{
    if(range.value<=5 || count==1)
    {
        return 0;
    }
    else if(range.value>=6 && range.value<=10 && count<=2)
    {
        return 1;
    }
    else if(range.value>10 && count>=3 || range.value>=8  && count>=3)
    {
        return 2;
    }
}
