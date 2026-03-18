const slides = document.querySelectorAll(".fm-slide");
const dots = document.querySelectorAll(".fm-dot");

let index = 0;

function showSlide(i){

slides.forEach(s => s.classList.remove("active"));
dots.forEach(d => d.classList.remove("active"));

slides[i].classList.add("active");
dots[i].classList.add("active");

}

function autoSlide(){

index++;

if(index >= slides.length){
index = 0;
}

showSlide(index);

}

dots.forEach((dot,i)=>{

dot.addEventListener("click",()=>{
index=i;
showSlide(index);
});

});

setInterval(autoSlide,4000);