import './App.css';
import { useState } from "react";

// product categories will be used in the dropdown button
const products = [
  { value: "Apple"},
  { value: "Cherries"},
  { value: "Banana"},
  { value: "Cantalope"},
  { value: "Blueberries"},
  { value: "Mango"},
  { value: "Lemon"}
];



function App() {
  // message that informs user the need of selecting product first
  const NEED_TO_ADD_FIRST = "Please, select a product before adding it.";

  // both flags which class name to use regarding message for user
  const NO_MESSAGE = "no-message";
  const YES_MESSAGE = "message";
  
  // array of items added to cart
  const [cartList, setCartList] = useState([]);

  // it holds the item selected by the dropdown button, which, eventually, will be added to the cartList array
  const [item, setItem] = useState("");

  // handles message to user
  const [message, setMessage] = useState("");

  // holds classname for message
  const [messageClassName, setMessageClassName] = useState(NO_MESSAGE);

  // holds total quantities
  const [totalQtd, setTotalQtd] = useState(0);


  // function to add product, receives e only for prevent the button default behavior
  // it adds item to cartList
  const addProduct = e => {
    e.preventDefault();

    if (item !== "") {
      setMessage("");
      setMessageClassName(NO_MESSAGE);
      setTotalQtd(totalQtd + 1);

      const itemExist = cartList.filter(e => e.product === item);

      if (itemExist.length > 0) {
        const temp = cartList.map(e => {
          if (e.product === item)
            return({
              product: item,
              qtd: ++e.qtd
            });
          else
            return e;
        });

        setCartList(temp);

      } else {
        const addNewProd = {
          product: item,
          qtd: 1
        };

        setCartList([...cartList, addNewProd]);
      }


    } else{
      setMessageClassName(YES_MESSAGE);
      setMessage(NEED_TO_ADD_FIRST);
    }
  }


  // function to update the list of products placed in the cartList
  const UpdateCartList = () => {
    // use cartList array to build the li items
    const lis = cartList.map((e, i) => 
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
        <label 
          htmlFor   = "product name"
          className = "prod-name-label"
        > 
          Product Name: 
        </label>
        
        <select 
          onChange = {handleProductChange}
          className = "dd-button" 
        >
          <option key="SelectProduct" value="Select Product"> -- Select Product -- </option>
          {products.map((prod, i) => <option key={i} value={prod.value}> {prod.value} </option>)}
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
        
        {/* message to user */}
        <div className = {messageClassName}>
          { message }
        </div>

        {/* cart summary */}
        { totalQtd < 1
            ? <h3 className = "red-color">Add Some Items</h3>
            : <h3 className = "green-color">You have {totalQtd} item{totalQtd > 1 ? "s" : ""} in your cart</h3>
        }
      </form>
    </div>
  );
}

export default App;
