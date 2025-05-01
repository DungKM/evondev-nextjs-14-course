## Common
- Metadata là những thông tin của trang web, thường là để tối ưu cho việc SEO
- title: Tiêu đề của trang web
- description: Mô tả của trang web

## Next/font
- Google fonts
- Font weight
- Subset
- Variables
- Multiple fonts
- Local fonts
- Tailwind fonts
- Import: import { Manrope, Roboto } from "next/font/google"
- Khai báo: const manrope = Manrope({ subsets: ["latin"] })
- weight: font weight của chữ điền vào là chuỗi weight: "400" hoặc là mảng weight: ["400","500"]
- subsets: kiểu chữ, thông thường là latin
- variable: tên biến để sử dụng trong CSS, ví dụ: variable: "--font-manrope"
- Sử dụng trong css: body{font-family: var(--font-manrope)}

# Typescript
- `CompenentProps<"svg">`: Lấy ra các props của svg;
# Kiến thức 
- Nếu mà component có tính lặp đi lặp lại thì nên lưu vào 1 mang rồi sau đó loop ra thì sẽ tối ưu hơn
# Next/Link
- Link
- href: đường dẫn, có thể truyền vào là chuỗi hoặc object
```js
 <Link
    // href={{
    //     pathname: url,
    //     query: { slug: "bai-1-tong-quan" },
    // }}
    // href={`${url}?page=1`}
    href={url}
    className="p-3 rounded-md flex items-center gap-3 hover:text-primary hover:bg-primary hover:bg-opacity-10 transition-all">
    
 </Link>
```
- replace: chỉ thay thế đường dẫn và không lưu lại trong lịch sử ko thể back lại
- scroll: mặc định là `true` nghĩa là khi nhấn vào link thì sẽ scroll lên trên cùng, nếu không muốn scroll thì thiết lập `scroll={false}`
- prefetch: 

