export default class FontFainder extends HTMLElement{
    constructor(){
        super()
        this.state = {
            fonts:[],
        };
        this.innerText = this.getLoadingText();
        this.getFontList();
    }

    getLoadingText(){
        return 'Loading...';
    }

    getFontList(){
        fetch('./data/fonts.json')
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            this.state.fonts = jsonData;
            this.generateTemplate(jsonData);
            console.log(this.state.fonts[1])
            return console.log(this.state.fonts,'state')

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
    appendHTMLToShadowDOM(html){
        this.innerHTML = '';
        let shadowRoot = this.attachShadow({mode: 'open'});

        // add a text node
        shadowRoot.append(html);
    }

}
