"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../ui/modal";

function RegisterModal() {
  const registerModal = useRegisterModal();
  const body = <div>body</div>;
  const footer = <div>footer</div>;

  return (
    <Modal
      body={body}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    />
  );
}

export default RegisterModal;
