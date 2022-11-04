import './App.css';
import { useState } from "react";

// product categories will be used in the dropdown button
const categories = [
  { value: "Apple"},
  { value: "Cherries"},
  { value: "Bannana"},
  { value: "Cantalope"},
];


function App() {
  // array of items added to cart
  const [cartList, setCartList] = useState([]);

  // it holds the item selected by the dropdown button, which, eventually, will be added to the cartList array
  const [item, setItem] = useState("");
  

  // function to add product, receives e only for prevent the button default behavior
  // it adds item to cartList
  const addProduct = e => {
    e.preventDefault();

    if (item !== "") {
      setCartList([...cartList, item]);
    }
  }


  // function to update the list of products placed in the cartList
  const UpdateCartList = () => {
    // makes an object that contains every cartList array item with their respective counter
    let result = { };
    for (let i = 0; i < cartList.length; i++) {
      if (!result[cartList[i]])
        result[cartList[i]] = 0;

      result[cartList[i]]++;
    }

    // transforms that object in an array
    let tempCart = [];
    for (const key in result) 
      tempCart.push({
        product: key,
        qtd: result[key]
      });
      
    // use the array to build the li items
    const lis = tempCart.map((e, i) => 
          <li 
            key = {i}
            className = "li-settings"
          > 
            {e.product} {e.qtd > 1 ? `X ${e.qtd}` : ""}
          </li>)

    return(
      <ul>
        { lis }
      </ul>
    )
  }


  // receives value which will set item
  const handleProductChange = e => {
    setItem("");
    setItem(e.target.value);
  }


  return (
    <div className="App">
      <h1 className = "title">Shopping Cart</h1>

      <form>
        <label className = "prod-name-label"> Product Name: </label>
          <select 
            onChange = {handleProductChange}
            className = "dd-button" 
          >
            <option key="SelectProduct" value="Select Product"> -- Select Product -- </option>
            {categories.map((cat, i) => <option key={i} value={cat.value}> {cat.value} </option>)}
          </select>
          
          <button 
            onClick = {addProduct}
            title   = "It adds a Product to Cart List"
          > 
            Add Product 
          </button>


        {/* cart list */}
        {
          cartList.length > 0 && <UpdateCartList />
        }
        
        {/* cart summary */}
        { cartList.length < 1
            ? <h3 className = "red-color">Add Some Items</h3>
            : <h3 className = "green-color">You have {cartList.length} item{cartList.length > 1 ? "s" : ""} in your cart</h3>
        }
      </form>
    </div>
  );
}

export default App;
