import s from "./Welcome.module.scss";
import { FunctionalComponent } from 'vue';

export const Third: FunctionalComponent = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#watermelon'></use>
    </svg>
    <h2>33333333333333<br />还会省钱</h2>
  </div>
}

Third.displayName = 'Third'
