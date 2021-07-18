const grid = document.querySelector('.grid');

const createGrid = () =>{
    for(let i=0;i<256;i++){
        const div = document.createElement('div');
        div.classList.add('cell');
        div.addEventListener('mouseover',(event) => {
            event.target.style.backgroundColor = 'black';

        })
        grid.appendChild(div);
    } 
}

createGrid();