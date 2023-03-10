import { defineComponent, reactive } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import s from "./SignInPage.module.scss";
import service, { setToken } from "../api";
import { emailSignIn, IdentityType } from "../api/watermelon/api";
import { router } from "../main";

export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: "1@qq.com",
      code: "123456",
    });

    const errors = reactive({
      email: [],
      code: [],
    });

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const data = {
        email: formData.email,
        code: formData.code,
      };

      /**  输入错误后，再次输入正确的值，需要让错误信息消失  */
      Object.assign(errors, { email: [], code: [] });

      /** 验证结果 */
      const validateResult = validate(formData, [
        { key: "email", type: "required", message: "必填" },
        {
          key: "email",
          type: "pattern",
          regex: /.+@.+/,
          message: "必须是邮箱地址",
        },
        { key: "code", type: "required", message: "必填" },
      ]);

      Object.assign(errors, validateResult);

      // console.log("验证1", Object.keys(validateResult).length === 0);
      // console.log("验证2", Object.getOwnPropertyNames(validateResult).length === 0);
      // console.log("验证3", JSON.stringify(validateResult)  === "{}");

      if (!(Object.keys(validateResult).length === 0)) return;

      const res = await emailSignIn(data);

      if (res.data.jwt) {
        setToken(res.data.jwt);
        router.push({ path: "/welcome" })
      }else{
        /**在 index.js catch 了，不走这里 */
        console.log("登录失败，请重试");
      }
    };
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="left" />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="watermelon" />
                <h1 class={s.appName}>西瓜记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  placeholder="请输入邮箱，然后点击发送验证码"
                  v-model={formData.email}
                  error={errors.email?.[0] ? errors.email?.[0] : "　"}
                ></FormItem>
                <FormItem
                  label="验证码"
                  type="validationCode"
                  placeholder="请输入六位数字"
                  v-model={formData.code}
                  error={errors.code?.[0] ? errors.code?.[0] : "　"}
                ></FormItem>
                <FormItem style={{ paddingTop: "96px" }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
