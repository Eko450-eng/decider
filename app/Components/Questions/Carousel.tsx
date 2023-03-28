'use client'
import { Carousel } from '@mantine/carousel'
import { Card, Text } from '@mantine/core'
import { Question } from '@prisma/client'
import Questioncard from './Card'

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <Carousel.Slide>
      {children}
    </Carousel.Slide>
  )
}

export default function CarouselCards({ data }: { data: Question[] }) {

  return (
    <Carousel
      maw={320}
      mx="auto"
      withIndicators
      slideSize="70%"
      slideGap="md" loop
    >
      {data && data.map((v: any, k: number) => {
        return (
          <Slide key={k} >
            <Questioncard question={v} />
          </Slide>
        )
      })}
    </Carousel>
  )
}
