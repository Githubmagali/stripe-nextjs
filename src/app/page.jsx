"use client"
import { products } from "./products";

//body: JSON.stringify(product) le envio los datos al backend, para que viaje
//como un JSON le tengo que escribir una propiedad que se llama headers

//Content-Type: especifica el tipo de datos que se se envian al cuerpo de la solicitud.

//application/json:  indica que el valor esta en formato JSON

export default function Home() {

  const handlePay = async (product)=>{
   
   const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
  }


  return (
    <div className="flex gap-x-10 pt-10 pl-10 justify-center text-center">
      {products.map((product, i) => (
        <div key={i}>
          <div>{product.name}</div>
          <div className="w-24">
            <img src={product.img} className="w-full" />
          </div>
          <div>$ {product.price}</div>

          <button className="border rounded-xl px-2 py-1 "
          onClick={()=> handlePay(product)}>Pagar</button>
        </div>
      ))}

    </div>

  );
}
