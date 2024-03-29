import { defineComponent, PropType } from "vue";
import s from "./Button.module.scss";

interface Props {
  // onClick?: (e: MouseEvent) => void;
}

// export const Button = defineComponent<Props>({
export const Button = defineComponent({
  props:{
    onclick:{
      type:Function as PropType<(e: MouseEvent) => void>
    },
    level:{
      type:String as PropType<'important'|'normal'|'danger'>,
      default:'important'
    },
    type: {
      type: String as PropType<'submit' | 'button'>,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup: (props, context) => {
    return () =>(
    <button disabled={props.disabled} type={props.type} class={[s.button,s[props.level]]} onClick={props.onclick}>
        {context.slots.default?.()}
    </button>
    );
  },
});
