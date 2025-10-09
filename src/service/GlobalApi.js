
import axios from 'axios';

const API_KEY= process.env.NEXT_PUBLIC_STRAPI_API;
const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api',
       headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
});

const GetBlogs = () => axiosClient.get('/blogs?populate=*');
const GetCategories = () => axiosClient.get('/categories');
const GetTags = () => axiosClient.get('/tags');
const GetBlogsByCategory = (category) => axiosClient.get(`/blogs?filters[categories][slug][$eq]=${category.toLowerCase()}&populate=*`);
const GetSingleBlog = (slug) => axiosClient.get(`/blogs?filters[slug][$eq]=${slug}&populate=*`);
const SubmitBlog = (blogData) => axiosClient.post('/blogs', blogData);
const UploadImage = (formData) =>
  axiosClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });



export default{ GetBlogs, GetCategories, GetTags, GetBlogsByCategory, GetSingleBlog, SubmitBlog, UploadImage };