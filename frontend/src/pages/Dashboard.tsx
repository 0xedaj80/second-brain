import { Card } from "../component/Card";
import { PlusIcon } from "../component/icons/PlusIcon";
import { ShareIcon } from "../component/icons/ShareIcon";
import { Sidebar } from "../component/Sidebar";
import { Button } from "../component/ui/Button";
import { CreateContentModal } from "../component/CreateContentModal";
import { useState } from "react";
import { useContent } from "../hooks/useContent";
// import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { DeleteModal } from "../component/DeleteModal";
import { HomeIcon } from "../component/icons/HomeIcon";
import {  useRecoilValue } from "recoil";
import { UserNameState } from "../recoil/atoms/username";
import { UpdateModal } from "../component/UpdateModal";
import { setTag, userState } from "../recoil/atoms/loginInfo";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { YoutubeIcon } from "../component/icons/YoutubeIcon";
import { TwitterIcon } from "../component/icons/TwitterIcon";
import { NotesIcon } from "../component/icons/NotesIcon";
import { LinkIcon } from "../component/icons/LinkIcon";
function Dashboard() {
  const [MoldalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [UpdateOpen, setUpdateOpen] = useState(false);
  const [contentId, setcontentId] = useState("");
  const content = useContent();
  const [sticky, setsticky] = useState(true);
  const username = useRecoilValue(UserNameState);
  const tagcomp = useRecoilValue(setTag);
  const user = useRecoilValue(userState);

  if (user.userEmail) {
    return (
      <div className="dark:bg-black">
        <div className="hidden md:block">
          <Sidebar></Sidebar>
        </div>
        <div>
          <CreateContentModal
            setSticky={setsticky}
            open={MoldalOpen}
            onClose={() => {
              setModalOpen(false);
              setsticky(true);
            }}
          ></CreateContentModal>
          <DeleteModal
            setSticky={setsticky}
            id={contentId}
            open={deleteOpen}
            onClose={() => {
              setDeleteOpen(false);
              setsticky(true);
            }}
          ></DeleteModal>
          <UpdateModal
            setSticky={setsticky}
            open={UpdateOpen}
            id={contentId}
            onClose={() => {
              setUpdateOpen(false);
              setsticky(true);
            }}
          ></UpdateModal>

          {/* i want that there should be a backgournd image in below div with gray-100 color fading it */}

          <div
            className=" md:ml-72 min-h-screen  bg-cover bg-gray-200 border-2 p-4  "
            style={{
              backgroundImage: "url('/random.jpg')",
              backgroundBlendMode: "overlay",
              backgroundAttachment: "fixed",
            }}
          >
            {/* make this component fixed so whilte scrolling cards it remain fixed home and two buttons and background too */}

            <div
              className={` flex justify-between border  bg-white p-4 rounded-3xl ${
                sticky ? " sticky" : " "
              } border-gray-200 shadow-lg top-5 z-10 `}
            >
              <div className="font-bold hidden md:block text-3xl pl-3 font-serif mt-1">
                <div className="flex ">
                  <div className="pr-2">
                    {tagcomp === "" ? (
                      <HomeIcon size="lgg"></HomeIcon>
                    ) : tagcomp === "twitter" ? (
                      <TwitterIcon size="lgg"></TwitterIcon>
                    ) : tagcomp === "youtube" ? (
                      <YoutubeIcon size="lgg"></YoutubeIcon>
                    ) : tagcomp === "Notes" ? (
                      <NotesIcon size="lgg"></NotesIcon>
                    ) : (
                      <LinkIcon size="lgg"></LinkIcon>
                    )}
                  </div>
                  <div>
                    {tagcomp === "" ? (
                      <h1>Home</h1>
                    ) : tagcomp === "twitter" ? (
                      <h1>Twitter</h1>
                    ) : tagcomp === "youtube" ? (
                      <h1>Youtube</h1>
                    ) : tagcomp === "Notes" ? (
                      <h1>Notes</h1>
                    ) : (
                      <h1>Links</h1>
                    )}
                  </div>
                </div>
              </div>
              <div className=" grid md:flex md:justify-end  gap-2  ">
                <div className="p-2 bg-gray-300  rounded-lg shadow-lg border font-bold font-serif">
                  {username}
                </div>

                <Button
                  startIcon={<PlusIcon size={"lg"}></PlusIcon>}
                  variant={"primary"}
                  text={"Add Content"}
                  size={"md"}
                  onClick={() => {
                    setModalOpen((e) => !e);
                    setsticky((e) => !e);
                  }}
                ></Button>
                <Button
                  onClick={async () => {
                    const response = await axios.post(
                      `${BACKEND_URL}/api/v1/brain/share`,
                      {
                        share: true,
                      },
                      {
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      }
                    );
                    const shareUrl = `${BACKEND_URL}${response.data.hash}`;
                    alert(shareUrl);
                  }}
                  startIcon={<ShareIcon size={"lg"}></ShareIcon>}
                  variant={"secondary"}
                  text={"Share Brain"}
                  size={"md"}
                ></Button>
                <div className="md:hidden">
                  <Button
                    onClick={() => {
                      localStorage.removeItem("token");
                      //  toast.error("signed out")
                      //  setrefe((e)=>(!e))
                      toast.error("signed out");
                      //  navigate("/landing")
                      window.location.href = "/landing";
                    }}
                    variant="danger"
                    text="Log-out"
                    startIcon={<RiLogoutBoxRLine></RiLogoutBoxRLine>}
                    size="md"
                  ></Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-3 flex-wrap  ">
              {content.map(({ type, title, link, _id, userId }) => {
                if (
                  tagcomp === "" ||
                  (tagcomp !== "" && type === tagcomp) // Render filtered cards when tagcomp matches type
                ) {
                  return (
                    <Card
                      key={_id}
                      type={type}
                      link={link}
                      title={title}
                      id={_id}
                      setDeleteOpen={setDeleteOpen}
                      setContentId={setcontentId}
                      setUpdateOpen={setUpdateOpen}
                      setSticky={setsticky}
                      userId={userId}
                      DateAdded={new Date()}
                    />
                  );
                }
                return null; // Skip rendering if none of the conditions are met
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="text-4xl items-center ">you need to login first</div>;
}

export default Dashboard;
