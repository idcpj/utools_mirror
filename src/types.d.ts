// 全局类型定义
declare global {
  interface Window {
    setPayload?: (payload: string) => void;
    searchKeyword?: string;
    readMarkdownFile?: (filename: string) => string;
    utools?: {
      copyText: (text: string) => void;
      showNotification: (text: string, clickFeatureCode?: string) => void;
      onPluginEnter: (callback: (params: {
        code: string;
        type: string;
        payload: string;
      }) => void) => void;
      onPluginOut: (callback: () => void) => void;
      setSubInput: (callback: (params: { text: string }) => void, placeholder?: string, isFocus?: boolean) => boolean;
      setSubInputValue: (text: string) => boolean;
      subInputFocus: () => boolean;
      subInputBlur: () => boolean;
      subInputSelect: () => boolean;
    };
  }
}

export {}; 