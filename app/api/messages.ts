export type MessageType = {
  status: number,
  notification: {
    title: string
    message: string
    color: string
  }
}
export const ENoNo = { status: 500, notification: { message: "Something went wrong I don't know what" } }
export const ENoTitle: MessageType = { status: 400, notification: { title: "Whoops", message: "Please enter a title", color: "red" } }
export const ENoOption1: MessageType = { status: 400, notification: { title: "Whoops", message: "Please enter option one", color: "red" } }
export const ENoOption2: MessageType = { status: 400, notification: { title: "Whoops", message: "Please enter option two", color: "red" } }
export const ENoLogon: MessageType = { status: 400, notification: { title: "Whoops", message: "Are you sure you are logged in?", color: "red" } }
export const ENoPerm = { status: 400, notification: { title: "Whoops", message: "Are you sure you are allowed to do that?", color: "red" } }
export const EWrongUsername = { status: 400, notification: { title: "Woop", message: "Wrong username please try again", color: "red" } }
export const EWrongPassword = { status: 400, notification: { title: "Woop", message: "Wrong password please try again", color: "red" } }
export const ELiked = { status: 500, notification: { title: "Wow...", message: "You seem to double like this dont you", color: "red" } }
export const ENoUsername = { status: 400, notification: { title: "Who are you?", message: "No username found", color: "red" } }
export const EUsernameExists = { status: 400, notification: { title: "Woops", message: "This username is already taken", color: "red" } }
export const EEmailExists = { status: 400, notification: { title: "Woops", message: "This email already exists", color: "red" } }
export const EAlreadyVoted = { status: 400, notification: { title: "But...", message: "You have already voted", color: "red" } }

export const SUserCreated = { status: 200, notification: { title: "Welcome", message: "User created", color: "green" } }
export const SCreateQuestion: MessageType = { status: 200, notification: { title: "Good question!", message: `Askening has been done`, color: "green" } }
export const SDeleteQuestion = { status: 200, notification: { title: "Was it that bad?", message: `Question has been deleted`, color: "green" } }
export const SLike = { status: 200, notification: { title: "Ok", message: `You liked this question`, color: "green" } }
