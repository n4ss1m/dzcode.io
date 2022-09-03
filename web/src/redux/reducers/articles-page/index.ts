import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { SidebarTreeItem } from "src/components/sidebar";
import { Action } from "src/redux";

export interface ArticlesPageState {
  sidebarTree: LOADABLE<SidebarTreeItem[]>;
  expanded: string[];
  currentArticle: LOADABLE<Article>;
}

export const articlesPage = (
  state: ArticlesPageState = {
    sidebarTree: null,
    expanded: [],
    currentArticle: null,
  },
  action: Action<ArticlesPageState>,
) => {
  switch (action.type) {
    case "UPDATE_ARTICLES_PAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};