class FontClass{
    constructor(){
        this.state = {
            fonts:[],
            config:{
                root:null,
                rootMargin:"0px",
                threshold: 0.9
            }
        };
        this.$animateEl = document.querySelectorAll('.animateElement')
        this.$fontTest = document.querySelectorAll('.font-display')
        this.$placeholder = document.querySelector('.right-sectionMain')
        this.$formButton = document.querySelector('.right-section_formButton')
        this.getFontList();
        this.font();
        this.checkForm();
        this.trackFonts();
    }



    getFontList(){
 
        fetch('./data/fonts.json')
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            this.state.fonts = jsonData;
        })
    }

    trackFonts(){
        let observer = new IntersectionObserver(this.onchange,this.state.config);
        this.$animateEl.forEach(el => observer.observe(el))
    }
    onchange(changes,observer){
        changes.forEach(change => {
            if(change.intersectionRatio > 0.9){
                change.target.classList.add('fadeIn');
                observer.unobserve(change.target)
            }
        })
    }

    createTemplate(data){
        return `
        <link href="https://fonts.googleapis.com/css2?family=${data.google_font}&display=swap" rel="stylesheet">
        <div class="right-wrapper_main animated fadeInRight" style="font-family:${data.font_style}">                
            <h1 class="right-sectionMain_header">${data.name}</h1>
            <h4 class="right-sectionMain_subheader">${data.type}</h4>
            <p class="right-content">${data.content}</p>
        </div>
        <div class="right-sectionMain_wraperDetail animated fadeInRight">                
            <div class="right-sectionMain_wraperDetail-detail"><span class="right-sectionMain_wraperDetail-intro">YEAR RELEASED</span> ${data.year_released}</div>
            <div class="right-sectionMain_wraperDetail-detail"><span class="right-sectionMain_wraperDetail-intro">DESIGNED BY</span> ${data.disigned_by}</div>
            <div class="right-sectionMain_wraperDetail-detail"><span class="right-sectionMain_wraperDetail-intro">INSPIRED BY</span> ${data.inspired_by}</div>
        </div>
        `

    }

    font(){
        const createTemplate = this.createTemplate.bind(this);
        const testdata = this.state;

        this.$fontTest.forEach(function(value){

            value.addEventListener('click',function(){
                let test = document.querySelector('.right-sectionMain');
                test.innerHTML = createTemplate(testdata.fonts[this.dataset.font - 1])
            })

        })
    }
    checkForm(){
        const createTemplate = this.createTemplate.bind(this);
        var testdata = this.state;

        this.$formButton.addEventListener('click',function(){

            let inputSearch = document.querySelector('.right-section_formField');
            let errorMsg = document.querySelector('.msg-error')
            var match = false;

            testdata.fonts.map(value => {
                if(value.name === inputSearch.value.capitalize()){
                    let test = document.querySelector('.right-sectionMain');
                    test.innerHTML = createTemplate(value)
                    inputSearch.value = ''
                    match = true
                    errorMsg.innerHTML = " "
                }else{
                    if(match === false){
                        errorMsg.innerHTML = "Query doesn't match our data"
                    }
                }
               
            }
            )
        })
    }
}
String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}

let fontFinder;
window.addEventListener('load',() => {
    fontFinder = new FontClass();
})


