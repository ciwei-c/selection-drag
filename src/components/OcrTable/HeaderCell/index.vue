<script>
import utils from '../utils';
export default {
  name: 'BsHeaHerCell',
  mixins: [utils],
  props: {
    /**
     * 自定义渲染事件
     * @memberof BsHeaderCell
     */
    render: {
      type: Function,
      required: true
    },
    /**
     * 单元格行列基本属性, 包括行数据record, 列数据column, 行索引index, 列索引columnIndex
     * @memberof BsHeaderCell
     */
    arguments: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  render() {
    return (
      <span class="bs-header-cell">
        {this.vnode}
      </span>
    );
  },
  watch: {
    arguments: {
      handler() {
        this.handle();
      },
      immediate: true
    }
  },
  mounted() {},
  data() {
    return {
      vnode: null
    };
  },
  methods: {
    /**
     * 获取单元格需要渲染的元素或者文本，调用自定义的渲染函数，处理是否有异步逻辑
     * @memberof BsHeaderCell
     * @instance
     */
    handle() {
      let { record = {}, index, columnIndex, column } = this.arguments;
      new Promise(res => {
        const _res = ret => res(ret);
        const commit = ret => _res(ret);
        const ret = this.render(Object.assign({}, {row: record, index, columnIndex, column }), commit);
        if (ret !== undefined) _res(ret);
      }).then(v => {
        this.update(v);
      });
    },
    /**
     * 更新单元格视图
     * @param {Object} [v] dom
     * @memberof BsHeaderCell
     * @instance
     */
    update(v) {
      if (v === undefined || v === null || v === '') v = '';
      if (typeof v === 'boolean') v = `${v}`;
      if (typeof v === 'object') {
        if (v.children || !!v.componentOptions) {
          if (Array.isArray(v.children)) {
            if (v.children.filter(_v => !!_v.componentOptions).length === v.children.length) {
              v = v;
            }
          } else {
            v = v;
          }
        } else {
          v = this.deepClone(v);
          v.children = JSON.stringify(v);
        }
      }
      let { children, attrs, on } = v;
      this.loading = false;
      this.vnode = v.tag && children ? v : children || v;
    }
  }
};
</script>
