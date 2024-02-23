import { ReactElement } from "react";
import { Dialog, DialogContent } from "./dialog";
import { X } from "lucide-react";

interface ModalProps {
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  body?: ReactElement;
  footer?: ReactElement;
  step?: number;
  totalSteps?: number;
}

export default function Modal({
  isOpen,
  onClose,
  body,
  footer,
  step,
  totalSteps,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black">
        <div className=" flex items-center gap-6">
          <button className=" p-1 border-stone-800 border rounded-sm text-white hover:opacity-70 transition w-fit">
            <X size={28} onClick={onClose} />
          </button>

          <div className=" text-xl font-bold">Step 1 of 2</div>
        </div>
        <div className="mt-4">{body}</div>
        {footer && <div className=" mt-4"> {footer} </div>}
      </DialogContent>
    </Dialog>
  );
}
