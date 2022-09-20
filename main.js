class Animal {
    constructor(name, price, imgUrl){
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;   
    }
}

let zoo = [
    new Animal ('Tiger', 100, 'https://cdn.pixabay.com/photo/2015/12/18/13/46/tiger-1098607__340.jpg'),
    new Animal ('Elephant', 200, 'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__480.jpg'),
    new Animal ('Parrot', 30, 'https://cdn.pixabay.com/photo/2018/09/22/17/05/parrot-3695678__340.jpg'),
    new Animal ('Lemurs', 15, 'https://cdn.pixabay.com/photo/2015/10/28/15/05/lemurs-1010643__340.jpg'),
    new Animal ('Ibis', 75, 'https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147__340.jpg'),
    new Animal ('Panda', 90, 'https://cdn.pixabay.com/photo/2019/08/21/16/03/panda-4421395__340.jpg'),
    new Animal ('Zebra', 120, 'https://cdn.pixabay.com/photo/2020/10/13/10/20/zebra-5651454__480.jpg'),
    new Animal ('Rabbit', 25, 'https://cdn.pixabay.com/photo/2018/06/28/00/11/mara-mammal-3502921__340.jpg'),
    new Animal ('Giraffe', 150, 'https://cdn.pixabay.com/photo/2019/07/27/06/21/giraffe-4366005__340.jpg'),
    new Animal ('Raccoon', 45, 'https://cdn.pixabay.com/photo/2018/07/14/17/46/raccoon-3538081__340.jpg'),
    new Animal ('Frog', 5, 'https://cdn.pixabay.com/photo/2016/04/17/16/37/frog-1335022__340.jpg'),
    new Animal ('Iguana', 40, 'https://cdn.pixabay.com/photo/2017/02/05/11/43/iguana-2039719__340.jpg'),
    new Animal ('Adler', 55, 'https://cdn.pixabay.com/photo/2017/10/20/21/45/adler-2872995__340.jpg'),
    new Animal ('Wolf', 60, 'https://cdn.pixabay.com/photo/2019/09/17/14/24/wolf-4483675__340.jpg'),
    new Animal ('Crocodile', 250, 'https://cdn.pixabay.com/photo/2014/01/14/18/31/nile-crocodile-245013__340.jpg'),
    new Animal ('Ape', 20, 'https://cdn.pixabay.com/photo/2019/07/24/14/17/monkey-4360298__340.jpg'),
    new Animal ('Ostrich', 140, 'https://cdn.pixabay.com/photo/2019/09/25/15/58/ostrich-4504017__340.jpg'),
    new Animal ('Rhinoceros', 170, 'https://cdn.pixabay.com/photo/2019/09/04/09/48/rhinoceros-4451152__340.jpg'),
    new Animal ('Icebear', 210, 'https://cdn.pixabay.com/photo/2017/08/14/20/33/polar-bear-2641842__340.jpg'),
    new Animal ('Cheetah', 190, 'https://cdn.pixabay.com/photo/2018/06/14/22/22/cheetah-3475778__340.jpg'),
    new Animal ('Koala', 30, 'https://cdn.pixabay.com/photo/2013/01/14/12/21/koala-74908__340.jpg'),
    new Animal ('Penguin', 25, 'https://cdn.pixabay.com/photo/2016/09/29/16/40/king-penguin-1703294__340.jpg'),
];


let target = document.getElementById("target");

target.innerHTML = `
    <div class="vh-100 d-flex justify-content-center align-items-center">
        <div class="d-flex col-lg-8 col-md-11 col-12 bg-pink flex-wrap">
            <div id="slider" class="col-md-7 col-12 py-3 d-flex align-items-center justify-content-center">
            </div>

            <div class="col-md-5 col-12 py-2">
                <div id="infoContainer">
                </div>

                <div id="btnContainer">
                </div>
            </div>
        </div>
    </div>
`

// ボタンの作成
let btnBox = document.getElementById("btnContainer");
let total = "";
for (let i=0; i<zoo.length-1; i++){
    let formatBtn =`
    <button type="button" class="btn btn-primary btn-box" data-index="${i+1}">${i+1}</button>
    `
    total += formatBtn;
}
btnBox.innerHTML = total;


// 写真
let btnall = btnBox.querySelectorAll(".btn-box");

let sliderShow = document.createElement("div");
sliderShow.classList.add("col-12", "d-flex","flex-nowrap", "overflow-hiddens");

let main = document.createElement("div");
main.classList.add("main", "full-width", "expand-animation");
main.setAttribute("data-info", "0");

let extra = document.createElement("div");
extra.classList.add("extra", "full-width", "deplete-animation");

slider.append(sliderShow);

let beforeindex = 0;
let direction = "";
for (let i=0; i < btnall.length; i++){
    btnall[i].addEventListener("click", function(){
        let currentnum = btnall[i].getAttribute("data-index");
                
        main.setAttribute("data-info", String(currentnum));
        let currentIndex = slideJump();
        // ここで現在のインデックスとの大きさの大小を決める。
        // 前 > 後　→ right
        // 後　> 前 → left
        direction = beforeindex > currentIndex ? "right" : "left";
        
        let currentElement = document.createElement("div");
        currentElement.classList.add("d-flex", "justify-content-center");
        
        let currentImg = document.createElement("img");
        currentImg.src = zoo[beforeindex].imgUrl;
        currentImg.classList.add("col-10", "imgFit");
        currentElement.append(currentImg);

        console.log(currentElement);
        
        let nextElement = document.createElement("div");
        nextElement.classList.add("d-flex", "justify-content-center");
        
        let nextImg = document.createElement("img");
        nextImg.src = zoo[currentIndex].imgUrl;
        nextImg.classList.add("col-10", "imgFit");
        nextElement.append(nextImg);


        console.log(beforeindex, zoo[beforeindex].name, currentIndex, zoo[currentIndex].name)
        console.log("前の要素 :",currentElement);
        console.log("現在の要素 :",nextElement);
        animateMain(currentElement, nextElement, direction);
        
        beforeindex = currentIndex;        

        
        let info = document.getElementById("infoContainer");
        info.innerHTML = 
        `
        <p>Name : ${zoo[currentnum-1].name}</p>
        <p>Price : ${zoo[currentnum-1].price}</p>
        `
    })
}
// console.log(main);

function animateMain(currentElement, nextElement, animationType){
    
    main.innerHTML = "";    
    main.append(nextElement);
    
    extra.innerHTML = "";
    extra.append(currentElement);

    if (animationType == "right"){
        sliderShow.innerHTML = "";
        sliderShow.append(extra);
        sliderShow.append(main);

    } else if (animationType =="left"){
        sliderShow.innerHTML = "";
        sliderShow.append(main);
        sliderShow.append(extra);
    }
}


function slideJump(){
    // 現在の要素を
    let currentIndex = parseInt(main.getAttribute("data-info"));
    let currentElement = zoo[currentIndex-1];
    console.log(currentElement);
    return currentIndex;
}