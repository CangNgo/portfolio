import { getBlogPosts } from "@/lib/data";
import { BlogClient } from "./blog-client";

export async function Blog() {
  const posts = await getBlogPosts();
  return <BlogClient posts={posts} />;
}
