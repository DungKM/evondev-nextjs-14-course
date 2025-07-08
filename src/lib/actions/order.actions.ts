'use server';
import Order from "@/app/database/order.model";
import { connectToDatabase } from "../mongoose";
import { TCreateOrderParams } from "@/components/types";
import Course from "@/app/database/course.model";
import User from "@/app/database/user.model";
import { FilterQuery } from "mongoose";
type FetchOrdersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};
export async function fetchOrders(params: FetchOrdersParams) {
    try {
       connectToDatabase();
           const {
                   page = 1,
                   limit = 10,
                   search,
                   status
               } = params;
               const skip = (page - 1) * limit;
               const query: FilterQuery<typeof Course> = {};
               if(search){
                   query.$or = [{code: {$regex: search, $options: "i"}}];
               }
               if(status) {
                   query.status = status;
               }
         const orders = await Order.find(query)
         .skip(skip)
         .limit(limit)
         .populate({
            model: Course,
            select: 'title',
            path: 'course'
         })
         .populate({
            model: User,
            select: 'name',
            path: "user"
         });
         return JSON.parse(JSON.stringify(orders));
    } catch (error) {
      
    }
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