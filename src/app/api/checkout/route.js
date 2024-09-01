import { NextResponse } from "next/server";
import Stripe from "stripe";



const stripe = new Stripe('sk_test_51OFLfaBARSdRFOPFXS1Fo80bhLrg04JrunizBT5BFez3PxtpM8BPoUF6xdLpR2eF1lvAlOXr15keJ3Q4J3LxogEC00BUTQdhR7')

export async function POST(request) {
    const body = await request.json();


    //Success_url : Le digo al usuario a donde lo envio una vez que se ejecute el pago
    //line_items :los prductos que vamos a cobrar
    // quantity: 1 La cantidad de productos que esta llevando
    //mode: 'payment' modo de pago

    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/success',
        line_items: [
            {
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: body.name,
                        images: [body.img]
                    },
                    unit_amount: body.price
                },
                quantity: 1
            },
        ],
        mode: 'payment',

    });

    console.log(session)

    return NextResponse.json('Pagando producto...')
}