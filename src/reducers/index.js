const initalState = {
  menu: [],
  isLoading: true,
  selectedItems: [],
  totalPrice: 0
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case 'MENU_LOADED':
      return { ...state, menu: action.payload, isLoading: false };
    case 'MENU_LOADING':
      return { ...state, isLoading: true }
    case 'ADDED_TO_CART': // в payload - объект блюда
      // тут засада: если выбрано несколько штук одного блюда, то в CartTable получатся дубликаты key
      // Задача:
      // 1) получить искомый итем из action.payload
      // 2) Если итема нет в selectedItems, то сформировать новый объект с quantity=1
      //    Если есть: в этом итеме увеличить quantity на 1
      // 3) В этом объекте сформировать key: ???            
      let item = state.selectedItems.find(i => i.id === action.payload.id);
      if (!item) { // если в списке корзины блюда еще нет, сформировать новое с количеством=1  
        const newItem = Object.assign({},state.menu.find(i => i.id === action.payload.id)); // клонируем объект, чтобы не мутировать menu[]
        newItem.quantity = 1;
        return { ...state, selectedItems: [...state.selectedItems, newItem], totalPrice: state.totalPrice+newItem.price }
      }
      // блюдо уже есть в корзине - меняем его количество
      const newItem = Object.assign({},item);
      newItem.quantity++;
      // заменить итем в существующем массиве: с помощью filter() отбираем остальное, затем добавляем item
      // 
      const newSelectedItems = state.selectedItems.filter(i => i.id !== item.id);
      return { ...state, selectedItems: [...newSelectedItems, newItem], totalPrice: state.totalPrice+item.price }
    case 'DELETE_FROM_CART': // в payload - id
      // Если кол-во > 1, то уменьшаем количество, иначе удаляем item вообще
      const deletingItem = Object.assign({},state.selectedItems.find(item => item.id === action.payload));
      if (deletingItem.quantity === 1) {
        return { ...state, selectedItems: state.selectedItems.filter(item => item.id !== action.payload),
        totalPrice: state.totalPrice-deletingItem.price }
      }
      // иначе уменьшаем quantity и возвращаем новый массив в стейте
      deletingItem.quantity--;
      return {...state, selectedItems: [...state.selectedItems.filter(item=>item.id !==action.payload), deletingItem],
        totalPrice: state.totalPrice-deletingItem.price
      }
    default:
      return state;
  }
}

export default reducer;

// test 
// const objArray = [
//   {name: 'Вася', id:1},
//   {name: 'Петя', id:2}
// ];
// const objItem = objArray.find(item => item.id===1);
// objItem.age=22;
// console.log(objItem);
// console.log(objArray);