'use client'
import { createStyles, Container, Title, Text, Button, Group, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(120),
    paddingBottom: rem(120),
    backgroundColor: theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).background,
  },

  inner: {
    position: 'relative',
  },

  image: {
    ...theme.fn.cover(),
    opacity: 0.65,
  },

  content: {
    paddingTop: rem(220),
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),
    color: theme.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(460),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors[theme.primaryColor][1],
  },
}));

export function Maintenance() {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.inner}>
          {/* <Illustration className={classes.image} /> */}
          <div className={classes.content}>
            <Title className={classes.title}>We<span>&#39;</span>ll be back</Title>
            <Text size="lg" align="center" className={classes.description}>
              We are currently working on some updates and will be back online as soon as possible!
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
}
