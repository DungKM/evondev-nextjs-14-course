'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import IconCalendar from '@/components/icons/IconCalendar';
import {  couponTypes } from '@/constants';
import { ECouponType } from '@/components/types/enums';
const formSchema = z.object({
  title: z.string({
    message: "Tiêu đề không được để trống",
  }).min(3, {
    message: 'Tiêu đề phải có ít nhất 3 ký tự',
  }),
  code: z.string({
    message: "Mã giảm giá không được để trống",
  }).min(3, {
    message: 'Mã giảm giá phải có ít nhất 3 ký tự',
  }).max(10, {
    message: 'Mã giảm giá không được quá 10 ký tự',
  }),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  active: z.boolean().optional(),
  type: z.string().optional(),
  value: z.number().optional(),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});

const NewCouponForm = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      code: '',
      start_date: '',
      end_date: '',
      active: true,
      type: 'PERCENT',
      value: 0,
      limit: 0,
      courses: [],
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) { }
  const couponTypeWatch = form.watch('type');
  if(couponTypeWatch === ECouponType.PERCENT) {

  }

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-8 mt-10 grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tiêu đề"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    className="font-bold uppercase"
                    placeholder="Mã giảm giá"
                    {...field}
                    onChange={(event) =>
                      field.onChange(event.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_date"
            render={() => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-full bg-white"
                        variant={'outline'}
                      >
                        <IconCalendar className="mr-2 size-4" />

                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0"
                    >
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={() => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-full bg-white"
                        variant={'outline'}
                      >
                        <IconCalendar className="mr-2 size-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0"
                    >
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại coupon</FormLabel>
                <FormControl className="h-12">
                  <RadioGroup
                    className="flex gap-5"
                    onValueChange={field.onChange}
                    defaultValue={ECouponType.PERCENT}
                  >
                    {couponTypes.map((type) => (
                      <div className="flex items-center space-x-2" key={type.value} >
                        <RadioGroupItem value={type.value} id={type.value} />
                        <Label className="cursor-pointer" htmlFor={type.value} >
                          {type.title}
                        </Label>
                      </div>
                    ))
                    }
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="100"
                      {...field}
                      onChange={(event) => field.onChange(event.target.valueAsNumber)}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl className="h-12">
                  <div className="flex flex-col justify-center">
                    <Switch
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tối đa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="100"
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(event.target.valueAsNumber)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courses"
            render={() => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Tìm kiếm khóa học..."
                    />
                    {/* <div className="!mt-5 flex flex-col gap-2">
                      <Label
                        className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                      >
                        <Checkbox

                        />
                      </Label>
                    </div> */}
                   
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="ml-auto flex w-[150px]"
          type="submit"
          variant="primary"
        >
          Tạo mã
        </Button>
      </form>
    </Form>
  );
};

export default NewCouponForm;