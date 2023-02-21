document.addEventListener('DOMContentLoaded', () => {

    /* VARIABLES */
    // arrayOriginal
    const lista1 = document.querySelector('#lista1')
    const lista2 = document.querySelector('#lista2')
    const fragment = document.createDocumentFragment();

    const arrayOriginal = [
        { id: 'a-1', producto: 'mesa' },
        { id: 'a-2', producto: 'silla' },
        { id: 'a-3', producto: 'boli' },
        { id: 'a-4', producto: 'botella' },
        { id: 'a-5', producto: 'cuaderno' },
        { id: 'a-6', producto: 'tele' },
        { id: 'a-7', producto: 'gafas' },
        { id: 'a-8', producto: 'micro' },
    ]

    //arrayProductosSelecionados
    let arrayProductosSelecionados = JSON.parse(localStorage.getItem('productos')) || []

    /* EVENTOS */
    //evento boton màs  añadir a PRoductos selecionados y añadir al local y pintar lista 2
    //evento boton menos  sacar a PRoductos selecionados y añadir al local y pintar lista 2

    document.addEventListener('click', ({ target }) => {
        if (target.classList.contains('add')) {
            const id = target.parentElement.id;
            aniadirASeleccionados(id)
            pintarLista2()
        }

        if (target.matches('.remove')) {
            const id = target.parentElement.id;
            sacarDeSeleccionados(id)
            pintarLista2()
        }
    })


    /* FUNCIONES */

    //pintar lista 1
    const pintarLista1 = () => {
        console.log('pintando uno')
        arrayOriginal.forEach(({ id, producto }) => {
            const elementoLista = document.createElement('LI');
            elementoLista.id = id
            elementoLista.innerHTML = `${producto}
                                        <button class="add">añadir</button>`

            fragment.append(elementoLista)
        })
        lista1.append(fragment)
    }

    //añadir a arrayProductosSelecionados
    const aniadirASeleccionados = (id) => {

        //recorrer el array y recoger el objeto si existe
        const productoEncontrado = arrayOriginal.find((item) => { return item.id == id })
        //pushearlo al arraySeleccionados
        arrayProductosSelecionados.push(productoEncontrado);

        //añadirlo al local
        setLocal()
    }

    //sacar del arrayProductosSelecionados
    const sacarDeSeleccionados = (id) => {
        console.log('eliminando...',id)

        const indiceELemento=arrayProductosSelecionados.findIndex((item)=>item.id==id)
        console.log(indiceELemento)
        if(indiceELemento!=-1){
             arrayProductosSelecionados.splice(indiceELemento,1)
            setLocal()
        }
       
    }
    //añadir al local
    const setLocal = () => {
        console.log('seteando Local...', arrayProductosSelecionados)
        localStorage.setItem('productos', JSON.stringify(arrayProductosSelecionados))
    }

    //recoger el local
    const getLocal = () => {
        return JSON.parse(localStorage.getItem('productos')) || [];
    }

    //pintarLista 2
    const pintarLista2 = () => {
        lista2.innerHTML='';
        const productos = getLocal()

        productos.forEach(({ id, producto }) => {
            const elementoLista = document.createElement('LI');
            elementoLista.id = id
            elementoLista.innerHTML = `${producto}
                                        <button class="remove">eliminar</button>
                                        `

            fragment.append(elementoLista)
        })
        lista2.append(fragment)


    }

    const init = () => {
        pintarLista1()
        pintarLista2()
    }

    init()


})//LOAD