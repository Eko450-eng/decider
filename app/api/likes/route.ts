// import { SLike, SLiked } from "@/app/api/messages";
// import { LikeProps } from "@/prisma/types";
// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";
//
// const prisma = new PrismaClient()
//
// export async function POST(request: NextRequest) {
//   const props: LikeProps = await request.json()
//
//   const res = await prisma.question_likes
//     .create({
//       data: {
//         ownerId: props.userId,
//         questionId: props.question,
//       },
//     })
//     .then(() => {
//       return SLike;
//     });
//   prisma.$disconnect
//   return NextResponse.json(res)
// }
//
// export async function PUT(request: NextRequest) {
//   const props: LikeProps = await request.json()
//
//   const res = await prisma.question_likes
//     .deleteMany({
//       where: {
//         ownerId: props.userId,
//         questionId: props.question,
//       },
//     })
//     .then(() => {
//       return SLiked;
//     });
//   prisma.$disconnect
//   return NextResponse.json(res)
// }
