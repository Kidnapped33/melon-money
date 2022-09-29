import s from "./Welcome.module.scss";
import { FunctionalComponent } from 'vue';

export const Fourth:FunctionalComponent = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref='#watermelon'></use>
    </svg>
    <h2>每日提醒<br />不遗漏每一笔账单</h2>
  </div>
)

Fourth.displayName = 'Fourth'