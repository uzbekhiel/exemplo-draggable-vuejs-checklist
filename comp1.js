Vue.component('comp1',{
    template:"<todo :list='groceryList'></todo>",
    data:function(){
        return{
            groceryList: [
                { id: 0, text: 'Vegetables' },
                { id: 1, text: 'Cheese' },
                { id: 2, text: 'Whatever else humans are supposed to eat' }
            ]
        }
    }
})

Vue.component('todo',{
    template:'<ul class="list-reset dropzone" ref="listaCompleta"><todo-item v-for="item in list" :todo="item" :key="item.id"></todo-item></ul>',
    props:['list'],
    data:function(){
        return {
            exclusao:false
        }
    },
    mounted:function(){
        dragDrop = new Draggable.Sortable(document.querySelectorAll('.dropzone'), {
            draggable: 'li',
            dropzone:'.dropzone',
            handle: 'svg',
            mirror: {
                constrainDimensions: true,
            }
        })

        // --- Draggable events --- //
        dragDrop.on('drag:start', (evt) => {
            droppableOrigin = evt.originalSource.parentNode;
        })

        dragDrop.on('drag:stop', (evt) => {
            if(this.exclusao){
                console.log('Excluir aqui')
            }
        })

        dragDrop.on('drag:over', (evt) => {
            console.log(this.exclusao)
            if(evt.overContainer != droppableOrigin)
                if (evt.overContainer.id == 'dropZone')
                    this.exclusao = true
                else
                    this.exclusao = false
        })
    }
})

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li class="bg-white px-4" :id="todo.id" @mouseover="editar=true" @mouseleave="editar=false"><svg class="ml-2 h-4 w-4 cursor-move text-grey hover:text-grey-darkest" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M14 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/></svg><div style="display:inline-flex!important" class="flex items-center border-b border-grey-lighter"><div class="flex-grow flex items-center py-4"><input type="checkbox" class="mr-3">{{ todo.text }} </div></div><i style="float:right;cursor:pointer" v-show="editar" class="fa fa-edit"></i></li>',
    data:function(){
        return {
            editar:false
        }
    }
})

let droppableOrigin;
let dragDrop;


const vm = new Vue({
    el:'#app'
})



