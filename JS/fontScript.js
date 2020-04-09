class FontClass{
    constructor(){
        this.state = {
            fonts:[],
        };
        this.getFontList();
    }

    getFontList(){
        fetch('./data/fonts.json')
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            this.state.fonts = jsonData;
            //this.generateTemplate(jsonData);
            console.log(this.state.fonts[1])
            return console.log(this.state.fonts,'state')

        })
    }

}

let fontFinder;
window.addEventListener('onload',() => {
    fontFinder = new FontClass;
})