import { DirectiveOptions } from "vue";
import { fromEvent, Subscription } from "rxjs";
import { throttleTime } from "rxjs/operators";

let subscription: Subscription;
export const animate: DirectiveOptions = {
  bind(el) {
    el.classList.add("animated");
  },
  inserted(el, binding) {
    subscription = fromEvent(window, "scroll")
      .pipe(throttleTime(100))
      .subscribe(res => {
        const rect = el.getBoundingClientRect();
        const isCheck =
          window &&
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;
        if (isCheck) {
          el.classList.add(binding.value);
        } else {
          el.classList.remove(binding.value);
        }
      });
  },
  unbind(el) {
    subscription?.unsubscribe();
  }
};
