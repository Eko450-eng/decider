import { ENoLogon } from "@/app/api/messages";
import { Question } from "@/db/schema/schema";
import { UserResource } from "@clerk/types";
import { showNotification } from "@mantine/notifications";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { deleteQuestion, editQuestion } from "./logic";
import { displayMessage } from "./helpers";

interface QuestionProps {
  title: string;
  desc: string | null;
  option1: string;
  option2: string;
}

interface HandlerProps {
  isSignedIn: boolean | undefined,
  user: UserResource | null | undefined,
  router: AppRouterInstance,
}

export async function handleDelete(props: HandlerProps, question: Question) {
  const {isSignedIn, user, router} = props
  if (!isSignedIn || !question || !user) {
    return showNotification(ENoLogon.notification);
  }
  deleteQuestion(question, user.id).then((res: any) =>
    displayMessage(res, router)
  );
}
