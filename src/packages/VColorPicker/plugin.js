import { BasePlugin, getSchemaTpl } from 'amis-editor';

export default class VColorPickerPlugin extends BasePlugin {
  rendererName = 'v-color-picker';

  searchKeywords = ''

  // 暂时只支持这个，配置后会开启代码编辑器
  $schema = '/schemas/UnkownSchema.json';

  // 用来配置名称和描述
  name = 'Vue拾色器示例';
  description = '这是个自定义VUE示例组件';

  // tag，决定会在哪个 tab 下面显示的
  tags = ['Demo'];

  // 图标
  icon = 'fa-solid fa-icons';


  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'v-color-picker',
    name: 'color'
  }

  // 用来生成预览图的
  previewSchema = {
    ...this.scaffold
  };
  // 右侧面板相关
  panelTitle = 'Vue 拾色器';
  panelBodyCreator (context) {
    return [
      getSchemaTpl('tabs', [
        {
          title: '常规',
          body: [
            getSchemaTpl('formItemName'),
            getSchemaTpl('value')
          ]
        },
        {
          title: '外观',
          body: [
            getSchemaTpl('className')
          ]
        }
      ])
    ];
  }
}
