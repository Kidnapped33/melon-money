import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import s from "./InputPad.module.scss";
import { time } from "../../shared/time";
import { DatetimePicker, NumberKeyboard, Popup } from "vant";
import 'vant/es/datetime-picker/style';

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<String>,
    },
  },
  setup: () => {
    const now = new Date();
    const refDate = ref<Date>(now);
    // const refDate = ref<Date>(new Date())
    const appendText = (n: number | string) => {
      const nString = n.toString();
      if (refAmount.value.length >= 13) return;
      if (nString === ".") {
        /**
         * 关于 .
         * 如果前面没有数字，就0.
         * 如果前面有数字，就直接 .
         * 如果前面已经有 .，就不能再添加 .
         */
        if (refAmount.value.length === 0) {
          refAmount.value = "0.";
        } else if (
          refAmount.value.length !== 0 &&
          refAmount.value.indexOf(".") === -1
        ) {
          refAmount.value += ".";
        } else {
          return;
        }
      } else if (nString === "0") {
        /**
         * 关于 0
         * 如果前面没有数字，就不能添加 0
         * 如果前面有数字，就直接添加 0
         */
        if (refAmount.value === "0") {
          return;
        } else {
          refAmount.value += n;
        }
      } else if (refAmount.value === "0" && refAmount.value.length === 1) {
        /**如果当前是0，输入8，则0变成8 */
        refAmount.value = n.toString(); 
      } else {
        return (refAmount.value += n.toString());
      }
    };
    const buttons = [
      { text: "1",onClick: () => { appendText(1)}},
      { text: "2",onClick: () => { appendText(2)}},
      { text: "3",onClick: () => { appendText(3)}},
      { text: "4",onClick: () => { appendText(4)}},
      { text: "5",onClick: () => { appendText(5)}},
      { text: "6",onClick: () => { appendText(6)}},
      { text: "7",onClick: () => { appendText(7)}},
      { text: "8",onClick: () => { appendText(8)}},
      { text: "9",onClick: () => { appendText(9)}},
      { text: ".",onClick: () => { appendText(".")}},
      { text: "0",onClick: () => { appendText(0)}},
      { text: "清空", onClick: () => { refAmount.value = '0'}},
      { text: "提交", onClick: () => { console.log("提交")}},
    ];

    const refDatePickerVisible = ref(false);
    const showDatePicker = () => (refDatePickerVisible.value = true);
    const hideDatePicker = () => (refDatePickerVisible.value = false);
    const setDate = (date: Date) => {
      refDate.value = date;
      hideDatePicker();
    };
    const refAmount = ref("0");
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />
            <span>
              <span onClick={showDatePicker}>
                { time(refDate.value).format() }
              </span>
              <Popup
                position="bottom"
                v-model:show={refDatePickerVisible.value}
              >
                <DatetimePicker
                  value={refDate.value}
                  type="date"
                  title="选择年月日"
                  onConfirm={setDate}
                  onCancel={hideDatePicker}
                />
              </Popup>
            </span>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map((button) => (
            <button class="button" onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </>
    );
  },
});
