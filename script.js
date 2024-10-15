const input = document.querySelector('.inputs'),
      allButtons = document.querySelectorAll('.btn'),
      result = document.querySelector('.outputs');

let currentSpec='';

function checkSpec(seq, symbol){
    return (seq.value[seq.value.length-1] != `${symbol}` && seq.value !='' && seq.value != null && seq.value.indexOf('.') != seq.value.length -1
            && seq.value.indexOf('%') == -1 && seq.value.indexOf('/') == -1 && seq.value.indexOf('X') == -1 && seq.value.indexOf('+') == -1 && seq.value.indexOf('-') != seq.value.length -1 && currentSpec != '-');
}

function checkDot(seq){
    if(seq != '' && seq.indexOf(currentSpec) != seq.length - 1){
    let k = 0;
    for(let i = 0; i < seq.length; i++){
        if(seq[i] == '.')
            k++;
    }
    return k == 0 ? true : false;
    }
}

function countOfSymb(seq, symb){
    let k = 0;
    for(let i = 0; i < seq.length; i++)
        if(seq[i] == symb)
            k++;
    return k;
}

function numInputAllow(seq, symbol){
    symbol = symbol.textContent;
    const reg = new RegExp('^[0-9]+$');
    if(reg.test(symbol))
        seq.value+= symbol;
    else if(symbol == '.' && checkSpec(seq,symbol) && checkDot(seq.value) == true)
        seq.value += symbol;
    else if(symbol == '.' && checkDot(seq.value.slice(seq.value.indexOf(currentSpec))))
        seq.value += symbol;
    else if(symbol == '<' && checkSpec(seq, symbol))
        seq.value = seq.value.slice(0,seq.value.length-1);
}

function specInputAllow(seq, symbol){
    symbol = symbol.textContent;
    if(result.innerHTML != ''){
        seq.value += result.innerHTML
        result.innerHTML = '';
    }
    switch(symbol){
        case '%':
        case '/':
        case 'X':
        case '+':    
            if(checkSpec(seq, symbol)){
                seq.value += symbol;
                currentSpec = symbol;
            }
            break;
        case '-':
            {
                if(seq.value == '')
                    seq.value += '-';
                else if(seq.value != '' && currentSpec == '' && countOfSymb(seq.value, '-') == 1 && seq.value.indexOf('-') != seq.value.length - 1){
                    seq.value += symbol;
                    currentSpec = symbol;
                }
                else if(seq.value != '' && currentSpec != '-' && currentSpec != '+' && currentSpec != '')
                {
                    seq.value += symbol;
                }
                else if(seq.value != '' && currentSpec == ''){
                    seq.value += symbol;
                    currentSpec = symbol
                }
            }
            break;
    }
}

function equally(seq){
    if(currentSpec!='' && currentSpec.length != 0)
        {
            let frstInput = parseFloat(seq.value.slice(0,seq.value.indexOf(currentSpec)+1));
            let secInput = parseFloat(seq.value.slice(seq.value.indexOf(currentSpec)+1));
            if(!isNaN(frstInput) && !isNaN(secInput)){
            switch(currentSpec){
                case '%':
                    result.innerHTML = frstInput % secInput;
                    break
                case '/':
                    result.innerHTML = (frstInput / secInput).toFixed(3);
                    break
                case 'X':
                    result.innerHTML = (frstInput * secInput).toFixed(3);
                    break;
                case '+':
                    result.innerHTML = frstInput + secInput;
                    break;
                case '-':
                    result.innerHTML = frstInput - secInput; 
            }
            input.value = '';
            currentSpec = '';
            console.log(seq.value.indexOf('-'));
            console.log(seq.value.length -1);
            
        }
    }

}

allButtons.forEach(Element =>{
    Element.addEventListener('click', (event)=>{
        if(!Element.classList.contains('one') && !Element.classList.contains('c'))
            numInputAllow(input,Element);
        else if(Element.classList.contains('c')){
            input.value = '';
            result.innerHTML = '';
            currentSpec = '';
        }
        else if(Element.classList.contains('eq'))
            equally(input);
        else
            specInputAllow(input, Element)
        event.target.classList.add('btnClick');
        setTimeout(() => {
            event.target.classList.remove('btnClick')},300);
    })
})

