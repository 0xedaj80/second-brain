import { Button } from "./ui/Button"
import { PlusIcon } from "./icons/PlusIcon"
import axios from "axios"
import { ShareIcon } from "./icons/ShareIcon"
import { BACKEND_URL } from "../config"

export function Navbar({ setModalOpen }) {
    return (
      <div className="flex justify-between fixed top-0 left-0 w-full bg-white z-10 shadow-md px-6 py-4 border-b ml-72 " >
        <div className="text-lg font-bold font-sans text-3xl">
          All Notes
        </div>
        <div className="flex justify-end gap-2">
          <Button
            startIcon={<PlusIcon size={"lg"}></PlusIcon>}
            variant={"primary"}
            text={"Add Content"}
            size={"md"}
            onClick={() => {
              setModalOpen((e) => !e);
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
        </div>
      </div>
    );
  }
  