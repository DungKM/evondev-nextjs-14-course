import { ECouponType } from "@/components/types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface ICoupon extends Document {
    _id: string;
    title: string;
    code: string;
    active: boolean;
    start_date: Date;
    end_date: Date;
    limit: number;
    course: Schema.Types.ObjectId;
    type: ECouponType;
    value: number;
    created_at: Date;
}

const CouponSchema = new Schema<ICoupon>({
   title: {
        type: String,
        required: true,
   },
    code: {
          type: String,
          required: true,
          unique: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    limit: {
        type: Number,
        default: 0,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    type: {
        type: String,
        enum: Object.values(ECouponType),
        default: ECouponType.PERCENT,
    },
    value: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
const Coupon = models.Coupon || model<ICoupon>("Coupon", CouponSchema);
export default Coupon;