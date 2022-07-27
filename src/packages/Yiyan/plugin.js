import { BasePlugin } from 'amis-editor';
import { Button, toast } from 'amis';
import style from './scss/plugin.module.scss'


export default class YiyanPlugin extends BasePlugin {
  rendererName = 'yi-yan';

  searchKeywords = '每日一句'

  // 暂时只支持这个，配置后会开启代码编辑器
  $schema = '/schemas/UnkownSchema.json';

  // 用来配置名称和描述
  name = '一言';
  description = '这是个自定义组件的demo';

  // tag，决定会在哪个 tab 下面显示的
  tags = ['Demo'];

  // 图标
  icon = 'fa-solid fa-icons';


  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'yi-yan',
    link: '/yiyan/',
    label: '百度一下,你就知道',
    showAbout: true,
    sentence: 'a'
  };

  // 用来生成预览图的
  previewSchema = {
    ...this.scaffold
  };
  // 右侧面板相关
  panelTitle = '一言';
  panelBodyCreator (context) {
    return [
      {
        type: 'tabs',
        tabsMode: 'line',
        className: 'm-t-n-xs',
        contentClassName: 'no-border p-l-none p-r-none',
        tabs: [
          {
            title: '常规',
            controls: [
              {
                type: 'text',
                name: 'link',
                label: '接口地址',
                description: '因一言官方接口存在跨域问题，需要后端代理，请在此填写接口地址'
              },
              {
                type: 'switch',
                name: 'showAbout',
                label: '展示"关于一言"'
              },
              {
                type: "radios",
                label: "句子类型",
                name: "sentence",
                description: "这个选项用来演示自定义事件,会在切换类型时弹出一个Toast",
                options: [
                  {
                    label: "动画",
                    value: "a"
                  },
                  {
                    label: "漫画",
                    value: "b"
                  },
                  {
                    label: "游戏",
                    value: "c"
                  },
                  {
                    label: "文学",
                    value: "d"
                  },
                  {
                    label: "原创",
                    value: "e"
                  },
                  {
                    label: "来自网络",
                    value: "f"
                  },
                  {
                    label: "其他",
                    value: "g"
                  },
                  {
                    label: "影视",
                    value: "h"
                  },
                  {
                    label: "诗词",
                    value: "i"
                  },
                  {
                    label: "网易云",
                    value: "j"
                  },
                  {
                    label: "哲学",
                    value: "k"
                  },
                  {
                    label: "抖机灵",
                    value: "l"
                  }
                ],
                onEvent: {
                  change: {
                    actions: [
                      {
                        actionType: "custom",
                        script: this.handleSentenceChange.bind(this, context.id)
                      }
                    ]
                  }
                },
                inline: false,
                columnsCount: 2
              },
              {
                type: 'container',
                name: 'clickAction',
                description: '这个按钮是用来演示如何在配置栏中调用组件内部方法',
                children: () => (
                  <Button className={style.configBtn} onClick={this.reloadText.bind(this, context.id)} level="primary">请求内容</Button>
                )
              }
            ]
          }
        ]
      }
    ];
  }

  reloadText (id) {
    const { manager } = this
    const { store } = manager
    const node = store.getNodeById(id);
    const component = node.getComponent()
    component.getYiyan() // renderer中定义的组件内部方法
  }

  handleSentenceChange (id) {
    toast.success('这个选项用来演示自定义事件,会在切换类型时弹出一个Toast')
  }
}
