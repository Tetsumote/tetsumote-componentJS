class FontClass{
    constructor(){
        this.state = {
            fonts:[],
        };
        this.$fontTest = document.querySelectorAll('.font-display')
        this.$placeholder = document.querySelector('.rightMain')
        this.$formButton = document.querySelector('.searchButton')
        this.getFontList();
        this.font();
        this.checkForm();
    }

    getFontList(){
 
        fetch('./data/fonts.json')
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            this.state.fonts = jsonData;
            //this.generateTemplate(jsonData);
            return console.log('state')

        })
    }
    testFunc(){
        console.log('test from testFunc')
    }
    createTemplate(data){
        return `
        <link href="https://fonts.googleapis.com/css2?family=${data.google_font}&display=swap" rel="stylesheet">
        <div class="right-wrapper_main animated fadeInRight" style="font-family:${data.font_style}">                
            <h1 class="right-header">${data.name}</h1>
            <h4 class="right-subheader">${data.type}</h4>
            <p class="right-content">${data.content}</p>
        </div>
        <div class="right-wraper_detail animated fadeInRight">                
            <div class="right-detail"><span class="right-detail-intro">YEAR RELEASED</span> ${data.year_released}</div>
            <div class="right-detail"><span class="right-detail-intro">DESIGNED BY</span> ${data.disigned_by}</div>
            <div class="right-detail"><span class="right-detail-intro">INSPIRED BY</span> ${data.inspired_by}</div>
        </div>
        `

    }

    font(){
        const createTemplate = this.createTemplate.bind(this);
        const testdata = this.state;

        this.$fontTest.forEach(function(value){

            value.addEventListener('click',function(){
                let test = document.querySelector('.rightMain');
                test.innerHTML = createTemplate(testdata.fonts[this.dataset.font - 1])
            })

        })
    }
    checkForm(){
        const createTemplate = this.createTemplate.bind(this);
        var testdata = this.state;

        this.$formButton.addEventListener('click',function(){

            let inputSearch = document.querySelector('.searchField');
            let errorMsg = document.querySelector('.msg-error')
            var match = false;

            testdata.fonts.map(value => {
                if(value.name === inputSearch.value.capitalize()){
                    let test = document.querySelector('.rightMain');
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


