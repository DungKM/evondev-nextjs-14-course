'use server';
import Order from "@/app/database/order.model";
import { connectToDatabase } from "../mongoose";
import { TCreateOrderParams } from "@/components/types";
import Course from "@/app/database/course.model";
import User from "@/app/database/user.model";
import { FilterQuery } from "mongoose";
import { EOrderStatus } from "@/components/types/enums";
import { revalidatePath } from "next/cache";
import { find } from "lodash";
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
export async function updateOrder({orderId, status} : {orderId: string, status?: EOrderStatus}) {
    try {
        connectToDatabase();
        const findOrder = await Order.findById(orderId).populate({

            path: "course",
            model: Course,
            select: "_id"
        })
        .populate({
            path: "user",
            model: User,
            select: "courses"
        });
        if(!findOrder){
            return;
        }
        if(findOrder.status === EOrderStatus.CANCELED) {
            return;
        }
        const findUser = await User.findById(findOrder.user._id);
        await Order.findByIdAndUpdate(orderId, {
            status
        });
       if(status === EOrderStatus.COMPLETED && findOrder.status === EOrderStatus.PENDING) {
            // Update user courses
            findUser.courses.push(findOrder.course._id);
            await findUser.save();
       }
       if(status === EOrderStatus.CANCELED && findOrder.status === EOrderStatus.COMPLETED) {
            // Update user courses
            findUser.courses = findUser.courses.filter((el : string) => el.toString() !== findOrder.course._id.toString());
            await findUser.save();
       }
        revalidatePath('/manage/order');
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
    }
}
export async function getOrderDetails({ code }: { code: string }) {
    try {
        connectToDatabase();
        const orderDetails = await Order.findOne({
            code
        }).populate({
            path: "course",
            select: 'title',
        });
        return JSON.parse(JSON.stringify(orderDetails));
    } catch (error) {
        console.log(error);
    }
}

    