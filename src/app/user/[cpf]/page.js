'use client'
import PFFormUpdate from "@/component/PFFormUpdate";

const EditUserPage = ({ params }) => {
  return (
    <div>
      <PFFormUpdate cpf={params.cpf} />
    </div>
  );
};

export default EditUserPage;