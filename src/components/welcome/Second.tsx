import s from "./Welcome.module.scss";
import { FunctionalComponent } from "vue";

export const Second:FunctionalComponent = () => {
  return <div class={s.card}>
     <svg>
      <use xlinkHref='#watermelon'></use>
    </svg>  
     <h2>第二只🐷<br />还会省钱</h2>
  </div>;
};


Second.displayName = 'Second';
