// import { defineComponent } from "vue";

// import { usePointerSwipe } from "@vueuse/core";
// import { useSwipe } from 'useSwipe';

// export const Welcome = defineComponent({
//   setup() {
//     return () => (

//     );
//   },
// });

import s from "./Welcome.module.scss";
// import { useSwipe } from "@vueuse/core";
import { useSwipe } from "../hooks/useSwipe";
import { defineComponent, ref, Transition, VNode, watchEffect } from "vue";
import { RouteLocationNormalizedLoaded, RouterView } from "vue-router";

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>();
    const { swiping, direction } = useSwipe(main);
    watchEffect(() => {
      // console.log('watchEffect===================',swiping.value, direction.value);
    });
    return () => (
      <div class={s.wapper}>
        <header>
          <svg>
            <use xlinkHref='#watermelon'></use>
          </svg>
          <h3>测试用例</h3>
        </header>
        <main class={s.main} ref={main}>
          <RouterView name="main">
            {({
              Component: X,
              route: R,
            }: {
              Component: VNode;
              route: RouteLocationNormalizedLoaded;
            }) => (
              <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}
              >
                {X}
              </Transition>
            )}
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    );
  },
});
