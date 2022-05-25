import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import s from "./Welcome.module.scss";

import { WelcomeWapper } from "./WelcomeWapper";
import pig from "../../assets/icons/watermelon.svg";

export const Second = defineComponent({
  setup() {
    return () => <WelcomeWapper>
      {{
         icon : () => <img class={s.icon} src={pig} />,
         title : () =>  <h2>第二只<br/>还要会省钱</h2>,
         nextPage : () => <RouterLink to="/welcome/third">下一页</RouterLink>
      }}
    </WelcomeWapper>
  },
});