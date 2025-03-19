import React, { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { getEnrolledStudent, updatePaymentStatus } from "@/store/enroll";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/assets/hooks/use-toast";
const PaymentUpdate = ({ enrollId, setOpen }) => {
  const [payment, setPayment] = useState("");
  const { user }= useSelector((state) => state.user);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const id = enrollId;
  const tutorId =user.id

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePaymentStatus({ id, payment })).then((res) => {
      if (res?.payload.success) {
        toast({
          title: "Success",
          description: "Payment status updated successfully",
        });
        dispatch(getEnrolledStudent({ tutorId}));
        setOpen(false);
        setPayment("");
      }else{
        toast({
          title: "Error",
          description: "Something went wrong",
        });

      }
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Payment Status</DialogTitle>
        <DialogDescription>
          Please confirm the updated payment status. <br />
          <select
            name="payment"
            value={payment}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-2"
            onChange={(e) => setPayment(e.target.value)}
            id=""
          >
            <option value="">Select payment status</option>
            <option value="paid">paid</option>
            <option value="unpaid">unpaid</option>
          </select>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  );
};

export default PaymentUpdate;
