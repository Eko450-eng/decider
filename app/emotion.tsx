'use client';

import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useServerInsertedHTML } from 'next/navigation';

export default function RootStyleRegistry({ children }: { children: React.ReactNode }) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        theme={{
          components: {
            Card: {
              styles: () => ({
                root: {
                  width: "fit-content",
                  textAlign: "center"
                }
              })
            }
          },
          colorScheme: "dark",
          colors: {
            "nord_pink": ["#CDB2B5", "#C4989D", "#BF7E84", "#BF616A", "#AC575F", "#94555B", "#805257", "#6F4E51", "#61494B", "#554446"],
            "nord_orange": ["#D5B7AE", "#D09F90", "#D08770", "#BD7963", "#AA6C59", "#936556", "#7F5E53", "#6E564F", "#604F4A"],
            "nord_yellow": ["#FBFAF7", "#EFE7D5", "#EAD7B2", "#EBCB8B", "#D9B977", "#C6A769", "#B3975D", "#9E8757", "#887755", "#766A51"],
            "nord_green": ["#DBE1D7", "#C7D1BE", "#B4C6A5", "#A3BE8C", "#93AC7D", "#849B70", "#778967", "#6B7960", "#616A59", "#575E51"],
            "nord_purple": ["#DBD2D9", "#CBBBC8", "#BEA5B9", "#B48EAD", "#A37F9C", "#93728D", "#82697D", "#72616F", "#655963", "#5A5158"],
            "nord_gray": ["#43474F", "#3C404A", "#353A44", "#2E3440", "#2B2F38", "#282B31", "#25272B", "#222327", "#1F2022", "#1C1D1E"],
            "nord_success": ["#548F54", "#458945", "#378437", "#2A812A", "#1C7F1C", "#0E7F0E", "#008000", "#0C680C", "#135513", "#174717",]
          },
          primaryColor: "nord_success",
        }}
        withNormalizeCSS withGlobalStyles>
        <Notifications />
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
