function init(){
    on('click',(e)=>{
        if(e.target===e.currentTarget) return 
        const offset = Number(I('wrapper').dataset.offset)
        const actions = {
            "goBack":() =>offset>0?app(offset - 20):"",
            "goForward":()=> app(offset + 20)
        }
        actions[e.target.id]()
    },I('controls'))
    

    app(0)
}

async function app(offset){
    const pokemonElements = (await getPokemonList(offset)).map(pokemonData=>{
        return containerElement('div','pokemonCard',[
            image(pokemonData.sprites.front_default,'pokemonCard__sprite'),
            elWithTxt('p',`#${pokemonData.id}`,'pokemonCard__id'),
            elWithTxt('p',pokemonData.name,'pokemonCard__name'),
          
        ])
    })

    updateState(attr(attr(containerElement('main','mainContent',pokemonElements),'id','wrapper'),'data-offset',offset))
}

function updateState(state){
    if(I('wrapper')) removeChild(body,I('wrapper'),false)
    append(body,state,false)
}

init()
