"use client";
import { Carousel } from "@mantine/carousel";
import Questioncard from "./Components/Questions/Card";
import { Question } from "@/db/schema/schema";

interface PageProps {
  data: Question[];
}

export default function CarouselPage(props: PageProps) {
  const { data } = props;
  return (
    <Carousel
      slideSize="95%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
      slideGap="xl"
      align="center"
      slidesToScroll={1}
      withIndicators
      loop
      skipSnaps
    >
      {data.map((v: any, k: number) => {
        const { createdAt, ...question } = v;
        return (
          <Carousel.Slide
            sx={{width: "100%"}}
            key={`questionCard-${k}`}>
            <Questioncard index={k} question={question} data-superjson />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
