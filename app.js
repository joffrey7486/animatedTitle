function animatedTitle(selector) {
    const title = document.querySelector(selector)

    if(title === null) {
        console.error("Impossible de trouver l'élément " + selector)
        return
    }

    // On construit un tableau contenant la nouvelle structure 
    const children = Array.from(title.childNodes)
    let elements = []
    children.forEach(child => {
        if(child.nodeType === Node.TEXT_NODE) {
            const words = child.textContent.split(" ")
            let spans = words.map(wrapWord)          
            elements = elements.concat(
                injectElementBetwteenItems(spans, document.createTextNode(' '))
            )
        }else {
            elements.push(child)
        }
    })
    console.log(elements)

    // on utilise ce tableau et on injecte les éléments dans title
    title.innerHTML = ''
    elements.forEach(el => {
        title.appendChild(el)
    })

    Array.from(title.querySelectorAll('span span')).forEach((span, i) => {
        span.style.animationDelay = (i * .2) + 's'
    })
}

function wrapWord (word) {
    const span = document.createElement('span')
    const span2 = document.createElement('span')
    span.appendChild(span2)
    span2.innerHTML = word
    return span
}

function injectElementBetwteenItems (arr, element) {
    return arr.map((item, i )=> {
        if(i === arr.length - 1) {
            return [item]
        }
        return [item, element.cloneNode()]
    }).reduce((acc, pair) => {
        acc = acc.concat(pair)
        return acc
    }, [])
}

animatedTitle('.title')