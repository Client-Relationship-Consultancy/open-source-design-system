/* eslint no-param-reassign: 0 */

import React from "react"

import { storiesOf } from "@storybook/react"
import { text, boolean } from "@storybook/addon-knobs"

import { Menu } from "./Menu"

const stories = storiesOf("Menu", module)

const icon = (
  <svg width="16" height="16" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M27.9015 24.4824C27.1991 22.7984 26.1799 21.2687 24.9005 19.9786C23.625 18.6848 22.114 17.6533 20.451 16.941C20.4361 16.9334 20.4212 16.9296 20.4063 16.9221C22.726 15.2261 24.234 12.4636 24.234 9.34673C24.234 4.18342 20.101 0 15 0C9.89897 0 5.76602 4.18342 5.76602 9.34673C5.76602 12.4636 7.27399 15.2261 9.59365 16.9259C9.57876 16.9334 9.56387 16.9372 9.54897 16.9447C7.8809 17.657 6.3841 18.6784 5.09953 19.9824C3.82133 21.2735 2.80223 22.8029 2.09849 24.4862C1.40714 26.1341 1.03428 27.9009 1.00009 29.691C0.999099 29.7312 1.00607 29.7712 1.02059 29.8087C1.03512 29.8461 1.0569 29.8802 1.08466 29.909C1.11242 29.9378 1.14559 29.9607 1.18223 29.9763C1.21886 29.992 1.25821 30 1.29796 30H3.53199C3.69582 30 3.82614 29.8681 3.82986 29.706C3.90433 26.7965 5.05858 24.0716 7.09899 22.0063C9.21014 19.8693 12.0138 18.6935 15 18.6935C17.9862 18.6935 20.7899 19.8693 22.901 22.0063C24.9414 24.0716 26.0957 26.7965 26.1701 29.706C26.1739 29.8719 26.3042 30 26.468 30H28.702C28.7418 30 28.7811 29.992 28.8178 29.9763C28.8544 29.9607 28.8876 29.9378 28.9153 29.909C28.9431 29.8802 28.9649 29.8461 28.9794 29.8087C28.9939 29.7712 29.0009 29.7312 28.9999 29.691C28.9627 27.8894 28.5941 26.1369 27.9015 24.4824V24.4824ZM15 15.8291C13.291 15.8291 11.6825 15.1545 10.4724 13.9296C9.26227 12.7048 8.59579 11.0766 8.59579 9.34673C8.59579 7.61683 9.26227 5.98869 10.4724 4.76382C11.6825 3.53894 13.291 2.86432 15 2.86432C16.709 2.86432 18.3175 3.53894 19.5276 4.76382C20.7377 5.98869 21.4042 7.61683 21.4042 9.34673C21.4042 11.0766 20.7377 12.7048 19.5276 13.9296C18.3175 15.1545 16.709 15.8291 15 15.8291Z"
      fill="#595959"
    />
  </svg>
)

stories.add("Menu", () => {
  return (
    <div style={{ paddingBottom: "5rem" }}>
      <Menu
        showMenuArrow={boolean("Show dropdown icon", true)}
        items={[
          {
            label: text("Sub-menu 1", "Exclude"),
            icon: "users",
            onClick: () => console.log("Sub-menu 1 clicked"),
          },
          {
            label: text("Sub-menu 2", "Remove"),
            onClick: () => console.log("Sub-menu 2 clicked"),
            icon,
          },
          {
            label: text("Sub-menu 3", "Make active"),
            onClick: () => console.log("Sub-menu 3 clicked"),
          },
        ]}
      >
        {text("Menu label", "Bulk Actions")}
      </Menu>
    </div>
  )
})