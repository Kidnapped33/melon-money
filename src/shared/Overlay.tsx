import { defineComponent, PropType, ref } from "vue";
import s from "./Overlay.module.scss";
import { Icon } from "../shared/Icon";
import { RouterLink } from "vue-router";

export const Overlay = defineComponent({
  name: "Overlay",
  props: {
    onClose: { type: Function as PropType<() => void> },
  },
  setup: (props, context) => {
    const close = () => {
      props.onClose?.();
    };

    const onClickSignIn = () => {};
    return () => (
      <>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser} onClick={onClickSignIn}>
            <h2>未登录用户</h2>
            <p>点击登录</p>
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="charts" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notify" class={s.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});

export const OverlayIcon = defineComponent({
  
  setup: (props, context) => {
    const overlayVisible = ref<boolean>(false);

    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value;
    };
    return () => (
      <>
        <Icon name="menu" class={s.icon} onClick={onClickMenu} />
        {overlayVisible.value && (
          <Overlay onClose={() => (overlayVisible.value = false)}></Overlay>
        )}
      </>
    );
  },
});
