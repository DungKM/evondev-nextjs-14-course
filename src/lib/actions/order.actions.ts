'use server';
import Order from "@/app/database/order.model";
import { connectToDatabase } from "../mongoose";
import { TCreateOrderParams } from "@/components/types";

export async function fetchOrders() {
    
}
export async function createOrder(params: TCreateOrderParams) {
   try {
    connectToDatabase();
    const newOrder = await Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
   } catch (error) {
    console.log(error)
   }
}