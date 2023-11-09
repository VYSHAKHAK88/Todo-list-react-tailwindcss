import React,{useState} from 'react'

function Todotailwind() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [isDone, setIsDone] = useState({}); // Use an object to store done state
//add items with updation
  const addItem = () => {
    if (inputValue.trim() === '') return;
    setItems([...items, inputValue]);
    setInputValue('');
  };

// Delete button with updated index of items 
  const deleteItem = (index) => {
    const updatedTodos = items.filter((_, i) => i !== index);
    const updatedIsDone = { ...isDone };

// Update the index of remaining items in isDone after delete
for (let i = index; i < updatedTodos.length; i++) {
  updatedIsDone[i] = updatedIsDone[i + 1];
}
delete updatedIsDone[updatedTodos.length]; // Remove the last entry

    setItems(updatedTodos);
    setIsDone(updatedIsDone);
  };

  
// Done button and update

  const toggleDone = (index) => {
// Update the done state for the corresponding item
    setIsDone((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };


  return (
    <>
      <div className="mx-auto overflow-hidden bg-gradient-to-r from-cyan-700 via-yellow-200 to-cyan-700 min-h-screen text-center w-full">
        <div className='text-5xl text-red-800 w-full py-5 pt-20 font-bold'>TO DO LISTS</div>
        {/* Input task */}
        <input type="text" placeholder='Add Your Task' value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} className='h-10 text-center border w-96 bg-white shadow-md rounded me-1'/><span className='text-blue-800 text-2xl font-bold'><i className="fa-solid fa-plus fa-flip"></i></span>
        {/* Add button */}
        <button onClick={addItem} class="bg-gradient-to-r from-red-600 to-red-800 hover:from-lime-900 hover:to-lime-500 text-white font-bold py-2 px-4 rounded text-center ms-1">ADD</button>

        {/* list of items with Delete option and Done highlight */}
        {items.length === 0 ? (

        <h3 className="mt-36 text-zinc-700 text-2xl font-normal">No Item Has Been Added</h3>
      ) :(
        <ul>
        {items.map((item, index) => (
          
        <li className={`rounded flex justify-between items-center border-b mt-6 mx-10 px-2 ${isDone[index] ? 'bg-lime-500 line-through' : 'bg-yellow-50'}`} key={index}>
          {/* trim item text length if greater than 90 letters */}
          <span >{item.length > 90 ? `${item.substring(0, 90)}...` : item}</span>
        <span>
          {/* Done button */}
          <button onClick={() => toggleDone(index)} className='bg-blue-800 hover:bg-green-700 font-bold border px-2 rounded text-white text-center me-5'><i className="fa-solid fa-check"></i></button>
          {/* Delete button */}
          <button onClick={() => deleteItem(index)} className="text-red-500">
          <i className="fa-solid fa-trash hover:text-red-700" style={{color:"ff0000"}}></i>
          </button>
        </span></li>
        ))}
        </ul> )
        }

      </div>
    </>
    )
   
}

export default Todotailwind