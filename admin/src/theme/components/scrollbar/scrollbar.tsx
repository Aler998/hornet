/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import type { ReactNode, MutableRefObject } from "react";
import SimpleBarCore from "simplebar-core";
import type { SimpleBarOptions } from "simplebar-core";
type RenderFunc = (props: {
  scrollableNodeRef: MutableRefObject<HTMLElement | undefined>;
  scrollableNodeProps: {
    className: string;
    ref: MutableRefObject<HTMLElement | undefined>;
  };
  contentNodeRef: MutableRefObject<HTMLElement | undefined>;
  contentNodeProps: {
    className: string;
    ref: MutableRefObject<HTMLElement | undefined>;
  };
}) => ReactNode;
export interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    SimpleBarOptions {
  children?: ReactNode | RenderFunc;
  scrollableNodeProps?: {
    ref?: any;
    className?: string;
    [key: string]: any;
  };
}
declare const SimpleBar: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<SimpleBarCore | null>
>;
export default SimpleBar;

import { mergeClasses } from "minimal-shared/utils";

import { styled } from "@mui/material/styles";

import { scrollbarClasses } from "./classes";

import type { ScrollbarProps } from "./types";

// ----------------------------------------------------------------------

export function Scrollbar({
  sx,
  ref,
  children,
  className,
  slotProps,
  fillContent = true,
  ...other
}: ScrollbarProps) {
  return (
    <ScrollbarRoot
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      fillContent={fillContent}
      className={mergeClasses([scrollbarClasses.root, className])}
      sx={[
        {
          "& .simplebar-wrapper": slotProps?.wrapperSx as React.CSSProperties,
          "& .simplebar-content-wrapper":
            slotProps?.contentWrapperSx as React.CSSProperties,
          "& .simplebar-content": slotProps?.contentSx as React.CSSProperties,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {children}
    </ScrollbarRoot>
  );
}

// ----------------------------------------------------------------------

const ScrollbarRoot = styled(SimpleBar, {
  shouldForwardProp: (prop: string) => !["fillContent", "sx"].includes(prop),
})<Pick<ScrollbarProps, "fillContent">>(({ fillContent }) => ({
  minWidth: 0,
  minHeight: 0,
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  ...(fillContent && {
    "& .simplebar-content": {
      display: "flex",
      flex: "1 1 auto",
      minHeight: "100%",
      flexDirection: "column",
    },
  }),
}));
