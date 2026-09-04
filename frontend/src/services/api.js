import axios from "axios";

const API = "http://localhost:5000/api";


export async function searchProducts(
    query
) {

    const response =
        await axios.get(

            `${API}/products?q=${query}`
        );

    return response.data;
}


// NEW FUNCTION
export async function selectProduct(
    tempId
) {

    const response =
        await axios.post(

            `${API}/select-product`,

            {
                tempId
            }
        );

    return response.data;
}


export async function optimizeCart(
    cart
) {

    const response =
        await axios.post(

            `${API}/search`,

            {
                cart
            }
        );

    return response.data;
}