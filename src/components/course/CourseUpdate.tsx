"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { createCourse } from "@/lib/actions/course.action"
import slugify from "slugify"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
const CourseUpdate = () => {
  return (
    <div>CourseUpdate</div>
  )
}

export default CourseUpdate