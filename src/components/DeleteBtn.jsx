import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "@/config/api";

export default function Delete({ resource, id, onDeleteCallback }) {
  const [isDeleting, setIsDeleting] = useState(false);

  let token = localStorage.getItem("token");

  const deleting = () => {
    setIsDeleting(true);
  };
  const onDelete = async () => {
    const options = {
      method: "GET",
      url: `/${resource}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let response = await axios.request(options);
      console.log(response.data);
      setFestival(response.data);
      if (onDeleteCallback) {
        onDeleteCallback(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return !isDeleting ? (
    <Button
      className="cursor-pointer text-red-500 hover:border-red-700 text:border-red-700"
      variant="outline"
      size="icon"
      onClick={deleting}
    >
      <Trash />
    </Button>
  ) : (
    <>
      <p>Are you sure?</p>
      <Button
        variant="outline"
        size="sm"
        className="text-red-500 border-red-500 hover:text-red-700 hover:border-red-700"
      >
        Yes
      </Button>
      <Button
        onClick={() => setIsDeleting(false)}
        variant="outline"
        size="sm"
        className="text-slate-500 border-slate-500 hover:text-slate-700 hover:border-slate-700"
      >
        No
      </Button>
    </>
  );
}
