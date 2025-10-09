import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";



const SuccessDialog = ({ openSuccessDialog, setOpenSuccessDialog }) => {
  return (
    <AlertDialog open={openSuccessDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Congratulations!</AlertDialogTitle>
          <AlertDialogDescription>
          Your story has been submitted successfully!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpenSuccessDialog(false)}>Cancel</AlertDialogCancel>
          <Link href="/add-your-story" onClick={() => setOpenSuccessDialog(false)}>
          <AlertDialogAction>Submit New Story</AlertDialogAction>
        </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessDialog;
