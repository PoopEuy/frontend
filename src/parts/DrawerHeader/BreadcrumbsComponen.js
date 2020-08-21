import React from "react";
import { useRouter } from "next/router";

//material ui core
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import HomeIcon from "@material-ui/icons/Home";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function SimpleBreadcrumbs() {
  const router = useRouter();
  const texts = router.pathname.split("/");

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {texts.map((text, index) => {
        return (
          <Typography key={index} color="textPrimary">
            {index == 0 ? <HomeIcon /> : text.toLocaleUpperCase()}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}
