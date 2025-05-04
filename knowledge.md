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
- prefetch: chạy khi thẻ link xuất hiện trên viewport mà chúng ta thấy hoặc khi chúng ta scroll
- hook `usePathname` trả ra pathname giúp chúng ta xử lý trong những trường hợp mà chúng ta muốn ví như active link
# Error: 
  × You're importing a component that needs `usePathname`. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
  │ Learn more: https://nextjs.org/docs/getting-started/react-essentials

# Routing
- Basic: Thư mục có file page.tsx -> sign-in: page.tsx . Sẽ tạo ra đường dẫn của webapp là /sign-in
- Lưu ý trong thư mục phải có file `page.tsx`
- Segment dynamic: [name] -> [course]: mục đích là để lấy các params ra để xử lý 1 công việc gì đó ví dụ lấy bài học từ khóa học là để gop các routing liên quan
- [course]/lesson/page.tsx

```ts
[course]/lesson/page.tsx
vscode-master/lesson?slug=bai-1-tong
```

- Nested routes:  `/hello/world`
```js
 /hello/world/page.tsx
```

- Group: không tạo ra routing. ví dụ `(dashboard)` sẽ không tạo ra /dashboard. Nếu truy cập vào thì sẽ hiển thị not-found. Mục đích sử dụng là để gom các routing liên quan vào chung
```js
 (dashboard);
```
- Ví dụ có đường dẫn là shop, shop/a, shop/b, shop/b/c thì Catch-all segments sẽ chấp nhận còn nếu /shop thì sẽ not-found
- Ví dụ có đường dẫn là shop, shop/a, shop/b, shop/b/c thì Optional Catch-all segments sẽ chấp nhận tất cả bao gồm /shop
- Catch-all Segments: sign-in/[...sign-in]
- Optional catch-all Segment: sign-in/[[...sign-in]]

- Lưu ý : khi để 2 thư mục dynmamic cùng cáp thì sẽ báo lỗi ví dụ [item] cùng cấp với [folder]
# Params

- params: thường là dynamic routes: [item]/lesson
- searchParams: thường là những query ở trên url ví dụ lesson?slug=html-css. thì slug chính là `searchParams`


# Next/image
- Image yêu cầu có 3 thuộc tính bắt buộc là alt, width, heigth
- Nếu sử dụng thuộc tính fill thì ko cần width và heigth vẫn hoạt động, Tuy nhiên thẻ img sẽ trở thành absolute, cho nên có 1 phần chứa nó sử dụng position:
relative hoặc absolute tùy vào mục đích code.

- Khi sử dụng `src` từ bên ngoài thì phải thiết lập trong next.config.mjs ví dụ

```
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
        ],
      },
};

export default nextConfig;
