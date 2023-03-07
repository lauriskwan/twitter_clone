import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  // Dummy Data
  const posts = [
    {
      id: "1",
      name: "Test User",
      username: "testusername",
      userImg: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      img: "https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/official/en_us/products/2022/recommendations-on-twitter/how-recommendations-help-discover-more-twitter-1.jpg.img.fullhd.medium.jpg",
      text: "UI demo",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Test User",
      username: "testusername",
      userImg: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      img: "https://poet.so/cover-photo.png",
      text: "another UI demo",
      timestamp: "3 hours ago",
    },
  ];
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 sm:ml-[73px] flex-grow max-w-xl ">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}
