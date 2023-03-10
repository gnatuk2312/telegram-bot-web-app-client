import {useState} from "react"
import useTelegram from "../../hooks/useTelegram";

import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css"

const products = [
    {id: "1", title: "Cap", price: 100, description: "Black, GAP"},
    {id: "2", title: "Jeans", price: 400, description: "Blue, LEVIS"},
    {id: "3", title: "Jacket", price: 700, description: "Black, Stone Island"},
    {id: "4", title: "Umbrella", price: 300, description: "Rainbow, No Name"},
    {id: "5", title: "Boots", price: 1050, description: "Brown, Dr. Martins"},
    {id: "6", title: "Sneakers", price: 850, description: "White, Nike"},
    {id: "7", title: "Gloves", price: 200, description: "Black, No Name"},
    {id: "8", title: "Socks", price: 50, description: "White, Nike"},
]

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const {tg} = useTelegram();
    const [addedItems, setAddedItems] = useState([]);
    
    const onAdd = (product) => {
        const hasAlreadyAdded = addedItems.find(item => item.id === product.id)
        let newItems = []

        if (hasAlreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id)
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Buy all: ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
        <div className="list">
            {products.map((product) => (
                <ProductItem 
                    product={product}
                    onAdd={onAdd}
                    className={"item"}
                />
            ))}
        </div>
    )
}

export default ProductList;