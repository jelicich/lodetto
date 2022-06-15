import "./Loading.scss";

export default {
  update(el, binding) {
    if (binding.value) {
      el.classList.add("is-loading");
      el.classList.add("default-loader");
      el.setAttribute("disabled", "disabled");
    } else {
      el.classList.remove("is-loading");
      el.classList.remove("default-loader");
      el.removeAttribute("disabled");
    }
  }
};
