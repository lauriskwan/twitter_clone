import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
import Moment from "react-moment";
import { signIn, useSession } from "next-auth/react"; // help getting user.id
import { useEffect, useState } from "react";
import { db, storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIDState } from "@/atom/modalAtom";
import { useRouter } from "next/router";

export default function Post({ post, id }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postID, setPostID] = useRecoilState(postIDState);
  const router = useRouter();

  useEffect(() => {
    // getting number of likes
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    // getting number of comments
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  useEffect(() => {
    // get whether the signed-in user has like a post
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          userEmail: session.user.email,
        });
      }
    } else {
      signIn();
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // generating a modal automatically
      deleteDoc(doc(db, "posts", id)); // delete text elements
      if (post.data()?.image) {
        deleteObject(ref(storage, `posts/${id}/image`)); // delete media
      }
      router.push("/");
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* icon */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={post?.data()?.userImg}
        alt="user icon"
      />
      {/* right side */}
      <div className="w-[100%]">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* User info */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              {post?.data()?.userEmail} -
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* post text */}
        <p
          onClick={() => router.push(`/posts/${id}`)}
          className="text-gray-800 text-[15px] sm:text-[16px] mb-2"
        >
          {post?.data()?.text}
        </p>

        {/* post image */}
        {post?.data()?.image && (
          <img
            onClick={() => router.push(`/posts/${id}`)}
            className="rounded-2xl mr-2"
            src={post.data()?.image}
            alt="post image"
          />
        )}

        {/* utility icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatIcon
              onClick={() => {
                if (session) {
                  setPostID(id);
                  setOpen(!open);
                } else {
                  signIn();
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
            {comments.length > 0 && (
              <span className="text-gray-500 text-sm">{comments.length}</span>
            )}
          </div>
          {session?.user.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600"} text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
