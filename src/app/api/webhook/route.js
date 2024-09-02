const {NextResponse} = require('next/server');
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe('EC00BUTQdhR7') //https://dashboard.stripe.com/test/dashboard


const endpointSecet = 'lkfdflñdsfdsf'

export async function POST(request){

    const body = await request.body()
    const headersList = headers()
    const sig = headersList.get('stripe-signature')

    let event;

    try{
        event = stripe.webhooks.constructEvent(body, sig, endpointSecet)
    }catch(error){
        console.log(error)
        return NextResponse.json({error: error.message}, { status: 400})
    }

    switch(event.type){
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object

            //guardar en una base de datos 
            //enviar un correo

        console.log({checkoutSessionCompleted})
        break;
        default:
            console.log(`Evento desconocido ${event.type}`)

    }


    console.log(body)

    

    return new Response(null, {status: 200})
}