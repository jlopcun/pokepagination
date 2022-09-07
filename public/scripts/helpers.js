const I = id =>document.getElementById(id),
elem = tag => document.createElement(tag),
toArray = ls => Array.from(ls),
body = document.body


const addClass = (element,className,rtr = true) =>{
    element.classList.add(className)
    if(rtr) return element
}

const attr = (element,attribute,value,rtr = true) =>{
    element.setAttribute(attribute,value)
    if(rtr) return element
}

const append = (element,node,rtr = true)=>{
    element.append(node)
    if(rtr) return element
}

const txtContent = (element,txt,rtr = true)=>{
    element.textContent = txt
    if(rtr) return element
}

const elWithTxt = (tag,text,className)=>{
    return addClass(txtContent(elem(tag),text),className)
}

const containerElement = (tag,className,childnodes,rtr = true) =>{
    const element = addClass(elem(tag),className)
    toArray(childnodes).forEach(ch=>append(element,ch))
    if(rtr) return element
}

const image = (src,className) =>{
    return attr(addClass(attr(elem('img'),'src',src),className),'alt',className)
}


const removeChild = (element,childNode,rtr = true) =>{
    element.removeChild(childNode)
    if(rtr) return element
}


const on = (eventType,fn,element,rtr = true) =>{
    element.addEventListener(eventType,fn)
    if(rtr) return element
}

const fetchResource = async (link,options,responseType='json') =>{
    try{
        const fetching = await fetch(link,options),
        response = responseType==='json'
        ?await fetching.json()
        :responseType==='text'
        ?await fetching.text()
        :await fetching.blob()

        if(!fetching.ok) throw{
            code:fetching.status,
            statusText:fetching.statusText
        }
        else return response

    }catch(err){
        console.warn(`${err.code} : ${err.statusText}`)
    }
}


const getPokemonList = async (offset) =>{
    return fetchResource(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
    .then(response=>{
       return response.results.map(async pokemon=>fetchResource(pokemon.url))
    }).then(Promisels=>Promise.all(Promisels))
}