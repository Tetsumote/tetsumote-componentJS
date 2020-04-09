class FontClass{
    constructor(){
        this.state = {
            fonts:[],
        };
        this.$fontTest = document.querySelectorAll('.font-display')
        this.getFontList();
        this.font();
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
    generateTemplate(jsonData){
        let fonts = jsonData.map((data,index)=>{
            return this.getFont(data,index);
        });

        let font = document.createElement('div');
        font.innerHTML = fonts.join('');
        this.appendHTMLToShadowDOM(font);
    }

    getFont(data,index){
        let font = `
        <p>${data.name} ${data.type}</p>
        `
        return font;

    }
    font(){
        this.$fontTest.forEach(function(value){
            value.addEventListener('click',function(){
                
                console.log(this.dataset.font)
            })
        })
    }
}

let fontFinder;
window.addEventListener('load',() => {
    fontFinder = new FontClass();
})


