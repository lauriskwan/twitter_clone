import { useRecoilState } from "recoil";
import { modalState, postIDState } from "../atom/modalAtom";
import Modal from "react-modal";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postID, setpostID] = useRecoilState(postIDState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { data: session } = useSession();
  const filePickerRef = useRef(null); // initial value is null
  const router = useRouter();

  useEffect(() => {
    // retriving entries inside a post to the modal
    onSnapshot(doc(db, "posts", postID), (snapshot) => {
      setPost(snapshot);
    });
  }, [postID, db]);

  const addImageToPost = (e) => {
    const reader = new FileReader(); // built-in JS function
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  async function sendComment() {
    await addDoc(collection(db, "posts", postID, "comments"), {
      comment: input,
      userID: session.user.uid,
      name: session.user.name,
      userEmail: session.user.email,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setOpen(false);
    setInput("");
    router.push(`posts/${postID}`);
  }

  return (
    <div>
      {open && ( // if the state of open is true, display modal. if the state is false, hide it.
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)} // click anywhere outside will close the modal
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-1  rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="relative border-b border-gray-200 py-5 px-1.5">
              <XIcon
                onClick={() => setOpen(false)}
                className="h-5 text-black absolute cursor-pointer bg-white hover:bg-gray-100 rounded-full top-2 right-2"
              />
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-1 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <img
                className="h-11 w-11 rounded-full mr-4"
                src={post?.data()?.userImg}
                alt="user icon"
              />
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
            <div className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              <p>{post?.data()?.text}</p>
            </div>
            <div className="flex p-3 space-x-3">
              <img
                src={session.user.image}
                alt=""
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                    rows="2"
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                      {/* ref can be used after importing useRef hook from react, to connect the icon to input */}
                    </div>
                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim() && !selectedFile}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
