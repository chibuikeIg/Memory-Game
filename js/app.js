window.onload = ()=>{
    if(localStorage.getItem('flippedCard') !==''){
        localStorage.clear('flippedCard');
    }
    const cardItems = [
        {id:'card-1',cardName:'a',image:'images/r.jpg'},
        {id:'card-2',cardName:'b',image:'images/superman.jpg'},
        {id:'card-3',cardName:'c',image:'images/wonderwoman.jpg'},
        {id:'card-4',cardName:'d',image:'images/hawkgirl.jpg'},
        {id:'card-5',cardName:'e',image:'images/green_lantern.jpg'},
        {id:'card-6',cardName:'b',image:'images/superman.jpg'},
        {id:'card-7',cardName:'c',image:'images/wonderwoman.jpg'},
        {id:'card-8',cardName:'d',image:'images/hawkgirl.jpg'},
        {id:'card-9',cardName:'e',image:'images/green_lantern.jpg'},
        {id:'card-10',cardName:'f',image:'images/aquaman.jpg'},
        {id:'card-11',cardName:'g',image:'images/flash.jpg'},
        {id:'card-12',cardName:'i',image:'images/martin_manhunter.jpg'},
        {id:'card-13',cardName:'f',image:'images/aquaman.jpg'},
        {id:'card-14',cardName:'g',image:'images/flash.jpg'},
        {id:'card-15',cardName:'i',image:'images/martin_manhunter.jpg'},
        {id:'card-16',cardName:'a',image:'images/r.jpg'}
        
    ];

        appendCards(cardItems)


        const  min = document.getElementById("min");
        const sec = document.getElementById("sec");
        const hr = document.getElementById('hr');
        let totalSecs = 0;

        setInterval(()=>{
            let timerIsset = localStorage.getItem('timer');
            let matched = parseInt(localStorage.getItem('allMatched'));
            if(timerIsset == 'isset'){
                ++totalSecs;
                sec.innerHTML = pad(totalSecs % 60);
                min.innerHTML = pad(parseInt(totalSecs /60));
                hr.innerHTML = pad(parseInt(totalSecs /3600));
                document.querySelector('.fa-undo').style.display='block';
                document.querySelector('.msg').innerHTML='Game On';
            }

            if (matched == 8){
                document.querySelector('.msg').innerHTML='Congrats Mate';
                localStorage.removeItem('timer');
                localStorage.removeItem('matched');
            }
        },1000);

        let pad = (val) =>{
            const  changeValueToString = val + "";
        if (changeValueToString.length < 2) {
            return "0" + changeValueToString;
        } else {
            return changeValueToString;
        }
     }

     document.querySelector('.fa-undo').addEventListener('click',()=>{
         let flipCards = document.querySelectorAll('.card');
         document.querySelector('.msg').innerHTML='Match Cards';
          
         flipCards.forEach(flipCard=>{
             flipCard.setAttribute('class','card');
         });
         localStorage.clear();
         setTimeout(()=>{
            document.querySelector('.card-container').innerHTML="";
            appendCards(cardItems)
         },1000);
         totalSecs = 0;
         sec.innerHTML ='00';
         min.innerHTML = '00';
         hr.innerHTML = '00';
         document.querySelector('.fa-undo').style.display='none';
         let stars = document.querySelectorAll('.fa-star');
         stars.forEach(star=>{
             star.style.color='#fff';
         })
     });
}

let appendCards = (cards) =>{
    let cardItem = shuffle(cards);
    let x=0;
    cardItem.forEach(card=>{

        let cardScene = document.createElement('div');
        cardScene.setAttribute('class','card-scene');
        cardScene.innerHTML = '<div class="card" id="'+card.id+'"><div class="card-face front-face"><img  src="'+card.image+'"></div> <div class="card-face back-face" onclick="flipCard(this)" data-name="'+card.cardName+'" data-id="'+card.id+'"></div></div>';
        document.querySelector('.card-container').appendChild(cardScene);
        x++;
    });
}



const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


  const flipCard = (div)=>{

    const flippedCard = JSON.parse(localStorage.getItem('flippedCard'));
    const card = document.querySelector('#'+div.dataset.id);
          card.setAttribute('class','card flipCard');
    let flippedCardInfo = {name:div.dataset.name,id:div.dataset.id};
    let checkIfTimerIsSet = localStorage.getItem('timer');
    let matchedCards=localStorage.getItem('matched');
    let allMatched=localStorage.getItem('allMatched');

       if(checkIfTimerIsSet !=='isset'){
          localStorage.setItem('timer','isset');
       } 

    if (flippedCard !== null){
        if(flippedCard.name == div.dataset.name) {
            localStorage.removeItem('flippedCard');
            if(matchedCards !== null) {
                let sum = parseInt(matchedCards) + 1;
                let sumAllMatched = parseInt(allMatched) + 1
                localStorage.setItem('matched',sum);
                localStorage.setItem('allMatched',sumAllMatched);
                if( sum <=3 ){
                    document.getElementsByClassName('fa-star')[sum-1].style.color='#f4f801';
                }
            } else {
                localStorage.setItem('matched', 1);
                localStorage.setItem('allMatched', 1);
                document.getElementsByClassName('fa-star')[0].style.color='#f4f801';
            }
        } else {
            setTimeout(()=>{
                document.querySelector('#'+div.dataset.id).setAttribute('class','card');
                document.querySelector('#'+flippedCard.id).setAttribute('class','card');
            },1000)
            localStorage.removeItem('flippedCard');
            if (matchedCards !== null && parseInt(matchedCards) !==0){
                localStorage.setItem('matched',parseInt(matchedCards)-1);
                document.getElementsByClassName('fa-star')[matchedCards-1].style.color='#fff';
            }
        }
    } else {
        localStorage.setItem('flippedCard',JSON.stringify(flippedCardInfo));
    }


}

  

  


  
