import './style.css'

console.log("testing")
let name = 'Yashar';
console.log(`my name is ${name}`);
const a = `
<h1>
JAPAN! <br>
<label for="name">ENTER THE NAME PLEASE</label>
<input id="name" type="text" />

<br>
<br>
<div class="box"></div>
<div>
Hello <span id="zz">${name}</span>
</div>

<br>

<button id="btn">JAPAN</button>
</h1>
`;
document.getElementById('app').innerHTML = a;

function clickHandler() {
    name = document.getElementById('name').value 
    alert(`clicked by ${name}`);
    document.getElementById('zz').innerHTML = name;
}
document.getElementById('btn').addEventListener('click',clickHandler)

function changeHandler() {
    name = document.getElementById('name').value;
    document.getElementById('zz').innerHTML = name;

    if (name ==='hi'){
        document.getElementsByClassName('box')[0].classList.add('display')
    }
    else{
        document.getElementsByClassName('box')[0].classList.remove('display')
    }
}
document.getElementById('name').addEventListener('keyup',changeHandler)

