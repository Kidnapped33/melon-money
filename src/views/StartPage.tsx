import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Overlay } from "../shared/Overlay";
import s from "./StartPage.module.scss";

export const StartPage = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref<boolean>(false);
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value;
    };
    return () => (
      <MainLayout>
        {{
          title: () => "西瓜",
          icon: () => (
            <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
          ),
          default: () => (
            <>
              <Center class={s.img_wrapper}>
                <Icon name="watermelon" class={s.img} />
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName="add" />
              </RouterLink>
              {overlayVisible.value && (
                <Overlay
                  onClose={() => (overlayVisible.value = false)}
                ></Overlay>
              )}
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
