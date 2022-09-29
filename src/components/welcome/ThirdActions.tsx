import { FunctionalComponent } from "vue"
import { RouterLink } from "vue-router";
import s from './Welcome.module.scss';

export const ThirdActions: FunctionalComponent = () => {
  return <div class={s.actions}>
    <RouterLink class={s.fake} to="/start" >跳过</RouterLink>
    <RouterLink to="/welcome/Four" >下一页</RouterLink>
    <RouterLink to="/start" >跳过</RouterLink>
  </div>
}

ThirdActions.displayName = 'ThirdActions';