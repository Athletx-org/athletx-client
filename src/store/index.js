import { createStore } from "vuex";
import { auth } from "@/store/auth.module";
import { drawer} from "@/store/drawer.module";

const store = createStore({
  modules: {
    auth,
    drawer,
  },
});

export default store;