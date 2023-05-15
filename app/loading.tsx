"use client";
import { Card, Stack, Group, Skeleton } from "@mantine/core";

export default function Loading() {
  return (
    <div className="cards">
      <Skeleton
        radius="md"
        height={"12rem"}
        top={"2rem"}
        bottom={"2rem"}
        sx={{
          margin: "1rem",
          marginBottom: "2rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      />
    </div>
  );
}
