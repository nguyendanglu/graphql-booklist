# **Tài liệu Thiết kế Mức cao (High Level Design) \- GraphQL Booklist Project**

## **1\. Giới thiệu (Introduction)**

Dự án **GraphQL Booklist** là một ứng dụng web quản lý sách và tác giả. Mục tiêu cốt lõi của dự án là áp dụng công nghệ **GraphQL** để tối ưu hóa việc truy vấn dữ liệu giữa Client và Server, giải quyết các vấn đề truyền thống của REST API như *over-fetching* (lấy thừa dữ liệu) và *under-fetching* (lấy thiếu dữ liệu).

## **2\. Kiến trúc Hệ thống (System Architecture)**

Hệ thống được thiết kế theo mô hình **Client-Server** hiện đại, sử dụng GraphQL làm lớp giao tiếp duy nhất.

### **Các thành phần chính:**

* **Frontend (Client):** Xây dựng bằng **ReactJS**. Sử dụng thư viện **Apollo Client** để quản lý trạng thái dữ liệu (state management) và thực hiện các cuộc gọi API tới server.  
* **Backend (Server):** Xây dựng trên nền tảng **Node.js** và **Express**. Sử dụng express-graphql hoặc Apollo Server để định nghĩa Schema và các Resolvers.  
* **Database (Lưu trữ):** Sử dụng **MongoDB** (NoSQL). Dữ liệu được tương tác thông qua thư viện **Mongoose ODM** để định nghĩa cấu trúc document.

## **3\. Công nghệ Sử dụng (Tech Stack)**

| Thành phần | Công nghệ |
| :---- | :---- |
| **Giao diện (Frontend)** | React, Apollo Client v3 |
| **Máy chủ (Backend)** | Node.js, Express, GraphQL |
| **Cơ sở dữ liệu** | MongoDB Atlas, Mongoose |
| **Giao tiếp** | HTTP POST (GraphQL standard) |

## **4\. Mô hình Dữ liệu (Data Model)**

Ứng dụng quản lý hai thực thể chính với mối quan hệ **1-N** (Một tác giả có thể viết nhiều cuốn sách).

### **4.1. Thực thể Author (Tác giả)**

* id: Mã định danh duy nhất (MongoDB ObjectId).  
* name: Tên tác giả (String).  
* age: Tuổi tác giả (Number).

### **4.2. Thực thể Book (Sách)**

* id: Mã định danh duy nhất.  
* name: Tên sách (String).  
* genre: Thể loại sách (String).  
* authorId: Khóa ngoại liên kết tới ID của Author.

## **5\. Thiết kế GraphQL API**

Toàn bộ logic truy xuất dữ liệu được định nghĩa trong GraphQL Schema.

### **5.1. Types (Kiểu dữ liệu)**

* **BookType:** Chứa thông tin sách và một trường author để truy vấn ngược lại thông tin tác giả.  
* **AuthorType:** Chứa thông tin tác giả và một mảng books để liệt kê tất cả sách của tác giả đó.

### **5.2. Root Queries (Truy vấn)**

* book(id): Truy xuất thông tin của một cuốn sách cụ thể.  
* author(id): Truy xuất thông tin của một tác giả cụ thể.  
* books: Danh sách toàn bộ sách trong hệ thống.  
* authors: Danh sách toàn bộ tác giả trong hệ thống.

### **5.3. Mutations (Thao tác dữ liệu)**

* addAuthor(name, age): Tạo mới một bản ghi tác giả.  
* addBook(name, genre, authorId): Tạo mới một cuốn sách và liên kết với một tác giả.

## **6\. Luồng Xử lý (Data Flow)**

1. **Client-side:** Người dùng thực hiện thao tác trên UI (ví dụ: điền form thêm sách).  
2. **Request:** Apollo Client gửi một truy vấn GraphQL (Query/Mutation) dưới dạng JSON qua phương thức POST tới /graphql.  
3. **Server-side:** \- Middleware GraphQL nhận request.  
   * So khớp với **Schema** để kiểm tra tính hợp lệ của dữ liệu.  
   * Gọi các hàm **Resolver** tương ứng.  
4. **Database:** Resolver sử dụng Mongoose để thực hiện lệnh find, save, hoặc update trên MongoDB.  
5. **Response:** Server trả về dữ liệu đúng theo cấu trúc mà Client yêu cầu (JSON).  
6. **UI Update:** React nhận dữ liệu mới, Apollo Client cập nhật cache và render lại giao diện mà không cần tải lại trang.

## **7\. Cấu trúc thư mục (Folder Structure)**

Dự án thường được chia làm hai phần chính:

* /server: Chứa logic Backend (Models, Schema, App entry).  
* /client: Chứa mã nguồn Frontend (Components, Queries, Assets).

*Tài liệu này được soạn thảo để phục vụ mục đích phân tích hệ thống GraphQL Booklist.*